"""
agent.py
========

The "brain" of the Personal AI Agent.

The :class:`PersonalAgent` orchestrates the full request cycle:

1. Load recent conversation memory.
2. Build the prompt/message list for the model.
3. Decide whether an external tool is needed.
4. Execute the tool (if any) and feed the result back to the model.
5. Call Featherless AI (OpenAI-compatible SDK) for the final answer.
6. Persist the exchange to memory.
7. Return the answer.

Nothing in this module hardcodes credentials; the client and model are taken
from :mod:`src.config` (and can be injected for testing).
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional, TypeGuard

from openai import OpenAI

from src import prompts
from src.config import MAX_HISTORY_MESSAGES, get_client
from src.logger import logger
from src.memory import ConversationMemory
from src.tools import execute_tool
from src.utils import parse_tool_json

# Maximum number of tool round-trips per single user request.
MAX_TOOL_ROUNDS: int = 2

# Injected when the model asks for a tool that does not exist.  This stops the
# loop from echoing raw JSON back to the user as if it were a real answer.
_UNKNOWN_TOOL_PROMPT: str = (
    "You tried to call a tool that does not exist. "
    "Do NOT output JSON again. Answer the user's question directly using "
    "your own knowledge, and say that the requested tool is unavailable."
)


class PersonalAgent:
    """
    High-level agent that turns a user message into an answer.

    Parameters
    ----------
    memory : Optional[ConversationMemory]
        Persistence layer.  A fresh store is created when omitted.
    client : Optional[OpenAI]
        OpenAI-compatible client.  Defaults to the shared configured client.
    model : Optional[str]
        Model identifier.  Defaults to the configured ``MODEL_NAME``.
    max_history : int
        Maximum number of messages from memory sent to the model.
    """

    def __init__(
        self,
        memory: Optional[ConversationMemory] = None,
        client: Optional[OpenAI] = None,
        model: Optional[str] = None,
        max_history: int = MAX_HISTORY_MESSAGES,
    ) -> None:
        self.memory = memory or ConversationMemory()
        self.client = client or get_client()
        self.model: str = model or _resolve_model_name()
        self.max_history = max_history
        logger.info("PersonalAgent initialised (model=%s)", self.model)

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------
    def ask(self, user_input: str) -> Dict[str, Any]:
        """
        Process a single user message end-to-end.

        Parameters
        ----------
        user_input : str
            The message typed by the user.

        Returns
        -------
        Dict[str, Any]
            A structured result with keys ``answer``, ``tool_used``,
            ``tool_result`` and ``error`` (empty on success).
        """
        user_input = (user_input or "").strip()
        if not user_input:
            return {"answer": "", "tool_used": None, "tool_result": None, "error": None}

        self.memory.add_message("user", user_input)

        error: Optional[str] = None
        try:
            history = self.memory.get_recent(self.max_history)
            messages = prompts.build_messages(history, user_input)

            answer, tool_used, tool_result = self._run_loop(messages)
        except Exception as exc:  # noqa: BLE001 - agent must never crash
            logger.exception("Agent pipeline failed")
            answer = (
                "I ran into an unexpected problem while answering. "
                f"Details: {exc}"
            )
            tool_used, tool_result = None, None
            error = str(exc)

        self.memory.add_message("assistant", answer)
        return {
            "answer": answer,
            "tool_used": tool_used,
            "tool_result": tool_result,
            "error": error,
        }

    def get_history(self, limit: int = 10) -> List[Dict[str, str]]:
        """
        Return the most recent conversation messages.

        Parameters
        ----------
        limit : int
            Number of messages to return.

        Returns
        -------
        List[Dict[str, str]]
            Recent messages, oldest first within the window.
        """
        return self.memory.get_recent(limit)

    def clear_memory(self) -> None:
        """Wipe all stored conversation history."""
        self.memory.clear()

    def memory_size(self) -> int:
        """Return how many messages are stored."""
        return self.memory.size()

    # ------------------------------------------------------------------
    # Internal pipeline
    # ------------------------------------------------------------------
    def _run_loop(
        self,
        messages: List[Dict[str, str]],
    ) -> tuple[str, Optional[str], Optional[Dict[str, Any]]]:
        """
        Execute the tool-decision / final-answer loop.

        Parameters
        ----------
        messages : List[Dict[str, str]]
            Initial message list (system + history + current user message).

        Returns
        -------
        tuple[str, Optional[str], Optional[Dict[str, Any]]]
            Final answer, the tool name used (if any), and the raw tool result.
        """
        tool_used: Optional[str] = None
        tool_result: Optional[Dict[str, Any]] = None

        for _ in range(MAX_TOOL_ROUNDS):
            raw = self._chat(messages)
            if raw is None:
                return ("The model returned an empty response.", tool_used, tool_result)

            intent = parse_tool_json(raw)

            if not self._is_valid_tool_call(intent):
                if self._looks_like_tool_intent(intent):
                    # The model asked for a tool we do not have - steer it
                    # back to answering directly instead of leaking the JSON.
                    logger.warning(
                        "Model requested an unknown tool: %r",
                        intent.get("tool"),
                    )
                    messages = [
                        *messages,
                        {"role": "system", "content": _UNKNOWN_TOOL_PROMPT},
                    ]
                    continue
                return (raw.strip(), tool_used, tool_result)

            tool_name = str(intent["tool"]).strip().lower()
            query = str(intent.get("query", "")).strip()

            if tool_name == "search" and not query:
                return (
                    "The model asked for a search without a query; "
                    "answering without tools.",
                    tool_used,
                    tool_result,
                )

            logger.info("Executing tool '%s'", tool_name)
            if tool_name == "search":
                tool_result = execute_tool(tool_name, query=query)
            else:
                tool_result = execute_tool(tool_name)

            tool_used = tool_name
            context = prompts.build_tool_result_prompt(tool_result)
            messages = [*messages, {"role": "system", "content": context}]

        # Exhausted the tool budget without a final answer - force one.
        raw = self._chat(messages)
        if raw is None:
            return ("The model returned an empty response.", tool_used, tool_result)
        if self._is_valid_tool_call(parse_tool_json(raw)):
            return (
                "I was unable to finish answering within the tool-use limit.",
                tool_used,
                tool_result,
            )
        return (raw.strip(), tool_used, tool_result)

    def _looks_like_tool_intent(
        self, intent: Optional[Dict[str, Any]]
    ) -> TypeGuard[Dict[str, Any]]:
        """
        Return ``True`` when the parsed output resembles a tool request.

        This is deliberately broader than :meth:`_is_valid_tool_call`: it also
        matches requests for tools we do not know about, so the agent can react
        instead of echoing raw JSON.  Acts as a ``TypeGuard``.

        Parameters
        ----------
        intent : Optional[Dict[str, Any]]
            Parsed JSON from the model output.

        Returns
        -------
        bool
            ``True`` when the dict carries a ``tool`` key.
        """
        return isinstance(intent, dict) and "tool" in intent

    def _is_valid_tool_call(
        self, intent: Optional[Dict[str, Any]]
    ) -> TypeGuard[Dict[str, Any]]:
        """
        Decide whether a parsed JSON object is an actionable tool call.

        Acts as a ``TypeGuard`` so callers can access ``intent["tool"]``
        without an extra ``None`` check after a positive result.

        Parameters
        ----------
        intent : Optional[Dict[str, Any]]
            Parsed JSON from the model output.

        Returns
        -------
        bool
            ``True`` when it looks like a tool call for a known tool.
        """
        if not isinstance(intent, dict):
            return False
        tool = str(intent.get("tool", "")).strip().lower()
        return tool in {"search", "time"}

    def _chat(self, messages: List[Dict[str, str]]) -> Optional[str]:
        """
        Send a message list to the model and return the response text.

        Parameters
        ----------
        messages : List[Dict[str, str]]
            Messages formatted for the chat-completions API.

        Returns
        -------
        Optional[str]
            The model's text content, or ``None`` on any failure.
        """
        try:
            logger.debug(
                "Calling model '%s' with %d messages", self.model, len(messages)
            )
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,  # type: ignore[arg-type]
            )
        except Exception as exc:  # noqa: BLE001
            logger.error("LLM request failed: %s", exc)
            return None

        if not response.choices:
            logger.warning("Model returned no choices")
            return None

        content = response.choices[0].message.content
        if content is None:
            logger.warning("Model returned empty content")
            return None

        return str(content).strip()


def _resolve_model_name() -> str:
    """
    Resolve the model identifier from configuration.

    Returns
    -------
    str
        The configured model name, or a safe fallback if unset.
    """
    from src.config import MODEL_NAME

    return MODEL_NAME or "deepseek-ai/DeepSeek-V4-Pro"
