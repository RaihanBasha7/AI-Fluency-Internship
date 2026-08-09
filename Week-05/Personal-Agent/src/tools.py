"""
tools.py
========

External tools the Personal AI Agent can invoke.

Every tool returns a **structured dictionary** with a consistent shape::

    {"status": "success" | "failed" | "error",
     "tool": "<tool-name>",
     "result": "<human-readable string>"}

Current tools
-------------
1. ``time``   - current date/time from the system clock.
2. ``search`` - web search via the DuckDuckGo Instant Answer API.

All HTTP work uses ``requests`` with explicit timeouts and a single retry so
transient network failures degrade gracefully instead of crashing the agent.
"""

from __future__ import annotations

import time as _time
from datetime import datetime
from typing import Any, Callable, Dict, List, Optional, Union

import requests

from src.config import TOOL_TIMEOUT_SECONDS, MAX_TOOL_RETRIES
from src.logger import logger

# ---------------------------------------------------------------------------
# Tool 1: Current time
# ---------------------------------------------------------------------------


def get_current_time() -> Dict[str, Any]:
    """
    Return the current system date and time.

    Returns
    -------
    Dict[str, Any]
        Structured result with a readable timestamp.
    """
    now = datetime.now()
    readable = now.strftime("%A, %d %B %Y at %I:%M %p")
    return {
        "status": "success",
        "tool": "time",
        "result": readable,
        "iso": now.isoformat(timespec="seconds"),
    }


# ---------------------------------------------------------------------------
# Tool 2: Web search (DuckDuckGo)
# ---------------------------------------------------------------------------
_SEARCH_TIMEOUT = TOOL_TIMEOUT_SECONDS
_SEARCH_RETRIES = MAX_TOOL_RETRIES


def _parse_duckduckgo(data: Dict[str, Any]) -> Optional[str]:
    """
    Extract a usable answer string from a DuckDuckGo API payload.

    Parameters
    ----------
    data : Dict[str, Any]
        Parsed JSON response from the API.

    Returns
    -------
    Optional[str]
        A text answer, or ``None`` if nothing useful was found.
    """
    abstract = (data.get("AbstractText") or "").strip()
    if abstract:
        return abstract

    heading = (data.get("Heading") or "").strip()
    if heading:
        return f"{heading} - see the linked article for more details."

    topics = data.get("RelatedTopics") or []
    for topic in topics:
        if isinstance(topic, dict):
            text = (topic.get("Text") or "").strip()
            if text:
                return text
    return None


def web_search(query: str) -> Dict[str, Any]:
    """
    Search the web using the DuckDuckGo Instant Answer API.

    Parameters
    ----------
    query : str
        The search phrase supplied by the user or the model.

    Returns
    -------
    Dict[str, Any]
        Structured result containing the best available answer text.
    """
    url = "https://api.duckduckgo.com/"
    params: Dict[str, Union[str, int]] = {
        "q": query,
        "format": "json",
        "no_html": 1,
        "skip_disambig": 1,
    }

    last_error: Optional[Exception] = None
    for attempt in range(1, _SEARCH_RETRIES + 2):
        try:
            logger.info(
                "Search attempt %d for query %r", attempt, query
            )
            response = requests.get(
                url,
                params=params,
                timeout=_SEARCH_TIMEOUT,
                headers={"User-Agent": "Personal-Agent/2.0 (AI Fluency Internship)"},
            )
            response.raise_for_status()
            data = response.json()

            answer = _parse_duckduckgo(data)
            if answer:
                return {
                    "status": "success",
                    "tool": "search",
                    "result": answer,
                    "source": "DuckDuckGo Instant Answer",
                }

            return {
                "status": "failed",
                "tool": "search",
                "result": (
                    "No relevant information found for that query. "
                    "Please rephrase or provide more context."
                ),
            }

        except requests.exceptions.Timeout as exc:
            last_error = exc
            logger.warning("Search timed out (attempt %d)", attempt)
            _time.sleep(0.5 * attempt)
        except requests.exceptions.RequestException as exc:
            last_error = exc
            logger.warning("Search request failed (attempt %d): %s", attempt, exc)
            _time.sleep(0.5 * attempt)
        except ValueError as exc:
            last_error = exc
            logger.warning("Search returned invalid JSON (attempt %d)", attempt)
            _time.sleep(0.5 * attempt)

    return {
        "status": "error",
        "tool": "search",
        "result": f"Search failed after retries: {last_error}",
    }


# ---------------------------------------------------------------------------
# Tool registry
# ---------------------------------------------------------------------------
TOOL_REGISTRY: Dict[str, Callable[..., Dict[str, Any]]] = {
    "time": get_current_time,
    "search": web_search,
}


def execute_tool(tool_name: str, **kwargs: Any) -> Dict[str, Any]:
    """
    Route a tool name to its implementation and run it.

    Parameters
    ----------
    tool_name : str
        Name of the tool to run (e.g. ``"time"``, ``"search"``).
    **kwargs : Any
        Arguments forwarded to the tool, e.g. ``query`` for ``search``.

    Returns
    -------
    Dict[str, Any]
        Structured result.  Unknown tools produce a ``"failed"`` status so
        the agent can degrade gracefully.
    """
    key = str(tool_name).strip().lower()

    if key not in TOOL_REGISTRY:
        logger.warning("Unknown tool requested: %r", tool_name)
        return {
            "status": "failed",
            "tool": tool_name,
            "result": f"Unknown tool '{tool_name}'.",
        }

    try:
        result = TOOL_REGISTRY[key](**kwargs)
        logger.info("Tool '%s' returned status '%s'", key, result.get("status"))
        return result
    except TypeError as exc:
        logger.error("Wrong arguments for tool '%s': %s", key, exc)
        return {
            "status": "error",
            "tool": key,
            "result": f"Tool '{key}' received invalid arguments: {exc}",
        }
    except Exception as exc:  # noqa: BLE001 - agent must never crash
        logger.exception("Tool '%s' raised unexpectedly", key)
        return {"status": "error", "tool": key, "result": str(exc)}


def list_tools() -> List[Dict[str, Any]]:
    """
    Return metadata for all registered tools.

    Returns
    -------
    List[Dict[str, Any]]
        A summary suitable for display in the CLI ``help`` command.
    """
    descriptions = {
        "time": "Show the current date and time",
        "search": "Search the web for current information",
    }
    return [
        {"name": name, "description": descriptions.get(name, "")}
        for name in TOOL_REGISTRY
    ]
