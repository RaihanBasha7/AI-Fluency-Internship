"""
Personal AI Agent
=================

A production-style personal AI assistant with conversation memory, web
search, and tool use, powered by Featherless AI.

Packages
--------
- ``config``  : environment variables, constants and the OpenAI client.
- ``logger``  : shared console logger.
- ``utils``   : generic helpers (timestamps, JSON extraction, ...).
- ``prompts`` : system prompt and message builders.
- ``memory``  : JSON-backed conversation memory.
- ``tools``   : external tools (web search, current time).
- ``agent``   : the agent pipeline (tool decision + LLM calls).
- ``main``    : interactive terminal REPL.

Run the agent from the project root::

    python -m src.main
"""

from src.agent import PersonalAgent
from src.memory import ConversationMemory
from src.tools import execute_tool, list_tools

__version__ = "2.0.0"

__all__ = [
    "PersonalAgent",
    "ConversationMemory",
    "execute_tool",
    "list_tools",
    "__version__",
]
