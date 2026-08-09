"""
utils.py
========

Small, dependency-free helpers shared across the Personal AI Agent.

Everything in this module is pure and side-effect free (apart from reading the
system clock), which keeps it trivially testable.
"""

from __future__ import annotations

from datetime import datetime
from typing import List, Optional, Sequence


def format_timestamp(ts: Optional[datetime] = None) -> str:
    """
    Return a human-readable timestamp string.

    Parameters
    ----------
    ts : Optional[datetime]
        The moment to format.  Defaults to ``datetime.now()``.

    Returns
    -------
    str
        Timestamp formatted as ``"YYYY-MM-DD HH:MM:SS"``.
    """
    moment = ts or datetime.now()
    return moment.strftime("%Y-%m-%d %H:%M:%S")


def iso_timestamp(ts: Optional[datetime] = None) -> str:
    """
    Return an ISO-8601 timestamp suitable for machine consumption.

    Parameters
    ----------
    ts : Optional[datetime]
        The moment to format.  Defaults to ``datetime.now()``.

    Returns
    -------
    str
        ISO-8601 timestamp, e.g. ``"2026-08-09T14:32:05"``.
    """
    moment = ts or datetime.now()
    return moment.strftime("%Y-%m-%dT%H:%M:%S")


def divider(char: str = "-", width: int = 60) -> str:
    """
    Build a simple text divider line.

    Parameters
    ----------
    char : str
        The character repeated to build the divider.
    width : int
        Total width of the divider.

    Returns
    -------
    str
        A divider string of ``width`` ``char`` characters.

    Raises
    ------
    ValueError
        If ``width`` is negative.
    """
    if width < 0:
        raise ValueError("width must be non-negative")
    if len(char) != 1:
        raise ValueError("char must be exactly one character")
    return char * width


def truncate_text(
    text: str,
    limit: int = 120,
    suffix: str = "...",
) -> str:
    """
    Truncate a string to ``limit`` characters, appending ``suffix``.

    Parameters
    ----------
    text : str
        The input text.
    limit : int
        Maximum number of characters to keep (excluding suffix).
    suffix : str
        Marker appended when truncation happens.

    Returns
    -------
    str
        The possibly-truncated string.
    """
    if len(text) <= limit:
        return text
    return text[: limit - len(suffix)].rstrip() + suffix


def safe_head(items: Sequence[object], count: int) -> List[object]:
    """
    Return the first ``count`` items of a sequence without raising.

    Handles short sequences gracefully by simply returning what exists.

    Parameters
    ----------
    items : Sequence[object]
        Any sequence of items.
    count : int
        Number of items to return.

    Returns
    -------
    List[object]
        Up to ``count`` leading items.
    """
    if count <= 0:
        return []
    return list(items[:count])


def parse_tool_json(text: str) -> Optional[dict]:
    """
    Best-effort extraction of a JSON object from an LLM response.

    Models sometimes wrap JSON in code fences or include prose around it.  This
    helper attempts to locate the first ``{ ... }`` block and parse it.  It
    silently returns ``None`` when no valid JSON object can be found, letting
    callers fall back to a normal answer.

    Parameters
    ----------
    text : str
        Raw model output that may contain JSON.

    Returns
    -------
    Optional[dict]
        The parsed dictionary, or ``None`` on failure.
    """
    import json

    if not text:
        return None

    length = len(text)
    for start in range(length):
        if text[start] != "{":
            continue

        depth = 0
        in_string = False
        escaped = False

        for i in range(start, length):
            char = text[i]

            if in_string:
                if escaped:
                    escaped = False
                elif char == "\\":
                    escaped = True
                elif char == '"':
                    in_string = False
                continue

            if char == '"':
                in_string = True
            elif char == "{":
                depth += 1
            elif char == "}":
                depth -= 1
                if depth == 0:
                    candidate = text[start : i + 1]
                    try:
                        parsed = json.loads(candidate)
                    except json.JSONDecodeError:
                        break
                    if isinstance(parsed, dict):
                        return parsed
                    break

    return None
