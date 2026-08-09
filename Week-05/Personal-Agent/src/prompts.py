"""
prompts.py
==========

Prompt templates and builders for the Personal AI Agent.

The system prompt defines the assistant's identity, behaviour and available
tools.  Prompt *builders* turn raw conversation history plus a new user
message into the message list the model expects.
"""

from __future__ import annotations

import json
from typing import Dict, List, TypedDict


class ToolSpec(TypedDict):
    """Structure of a single entry in the tool catalogue."""

    name: str
    description: str
    required_args: Dict[str, str]


# ---------------------------------------------------------------------------
# Tool catalogue shared with the model
# ---------------------------------------------------------------------------
TOOL_CATALOG: List[ToolSpec] = [
    {
        "name": "search",
        "description": (
            "Search the web for up-to-date information. "
            "Use when the answer requires facts from the internet, news, "
            "or anything published after your training data."
        ),
        "required_args": {"query": "The search query string"},
    },
    {
        "name": "time",
        "description": (
            "Get the current date and time. "
            "Use when the user asks what time or date it is."
        ),
        "required_args": {},
    },
]

SYSTEM_PROMPT: str = (
    "You are Personal Agent, a helpful and professional personal AI assistant "
    "running locally. You are powered by Featherless AI and communicate via a "
    "terminal interface.\n\n"
    "## Your capabilities\n"
    "- Hold natural, multi-turn conversations.\n"
    "- Remember the conversation history you are given.\n"
    "- Use external tools when they are genuinely helpful.\n\n"
    "## Available tools\n"
    + json.dumps(TOOL_CATALOG, indent=2)
    + "\n\n"
    "## Tool usage contract\n"
    "If answering the user's request would benefit from a tool, your ENTIRE "
    "reply MUST be a single line of valid JSON with exactly this shape:\n\n"
    "  {\"tool\": \"search\", \"query\": \"<search phrase>\"}\n"
    "  {\"tool\": \"time\"}\n\n"
    "Rules:\n"
    "1. Output ONLY the JSON object. No prose, no markdown fences.\n"
    "2. Use \"search\" for anything needing current or external facts.\n"
    "3. Use \"time\" only for the current date/time.\n"
    "4. If no tool is needed, answer the user directly in plain text.\n\n"
    "## Answering style\n"
    "- Be concise but informative. Prefer short paragraphs over lists.\n"
    "- If tool results are provided, base your answer on them and cite the "
    "source.\n"
    "- Never fabricate facts. If you are unsure, say so honestly.\n"
    "- When asked about the current time/date after a tool result, state it "
    "directly.\n"
    "- Be polite, clear and professional at all times.\n"
)

# Injected before the model's final answer when a tool was executed.
TOOL_RESULT_PROMPT: str = (
    "\n\nThe following data was retrieved from an external tool:\n"
    "{tool_result}\n\n"
    "Use this data to answer the user's original question. "
    "If the tool failed, tell the user the search was unsuccessful and "
    "answer from general knowledge if safe."
)


def build_tool_result_prompt(tool_result: Dict[str, object]) -> str:
    """
    Build the contextual prompt shown to the model after a tool execution.

    Parameters
    ----------
    tool_result : Dict[str, object]
        Structured result returned by :func:`src.tools.execute_tool`.

    Returns
    -------
    str
        A formatted prompt containing the tool result.
    """
    try:
        serialized = json.dumps(tool_result, ensure_ascii=False, indent=2)
    except (TypeError, ValueError):
        serialized = str(tool_result)
    return TOOL_RESULT_PROMPT.format(tool_result=serialized)


def build_messages(
    history: List[Dict[str, str]], user_input: str
) -> List[Dict[str, str]]:
    """
    Build the message list sent to the model.

    The system prompt is always prepended; recent conversation history follows;
    the new user message is appended last.

    Parameters
    ----------
    history : List[Dict[str, str]]
        List of ``{"role": ..., "content": ...}`` messages (user/assistant).
    user_input : str
        The latest message typed by the user.

    Returns
    -------
    List[Dict[str, str]]
        Ready-to-send message list for the chat-completion API.
    """
    messages: List[Dict[str, str]] = [{"role": "system", "content": SYSTEM_PROMPT}]

    for entry in history:
        role = str(entry.get("role", "user")).strip().lower()
        content = str(entry.get("content", "")).strip()

        if not content:
            continue
        if role not in {"user", "assistant"}:
            continue

        messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": user_input})
    return messages
