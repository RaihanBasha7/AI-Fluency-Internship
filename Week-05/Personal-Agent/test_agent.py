"""
test_agent.py
=============

Offline tests for the PersonalAgent pipeline using a fake OpenAI client.
These validate the decision loop (tool call -> result -> final answer)
without spending tokens or needing network access.  Run with:

    python test_agent.py
"""

from __future__ import annotations

import json
import sys
import tempfile
from pathlib import Path
from typing import cast

sys.path.insert(0, str(Path(__file__).resolve().parent))

from openai import OpenAI  # noqa: E402

from src.agent import PersonalAgent  # noqa: E402
from src.memory import ConversationMemory  # noqa: E402


class _FakeChat:
    """Mimics ``client.chat.completions`` for the fake client."""

    class _Completions:
        def __init__(self, responses: list[str]) -> None:
            self._responses = list(responses)

        def create(self, model: str, messages: list[dict]) -> object:
            class _Message:
                content: str | None = None

            class _Choice:
                message = _Message()

            class _Response:
                choices: list[_Choice] = []

            content = self._responses.pop(0)
            choice = _Choice()
            choice.message.content = content
            response = _Response()
            response.choices = [choice]
            return response

    def __init__(self, responses: list[str]) -> None:
        self.completions = self._Completions(responses)


class _FakeClient:
    def __init__(self, responses: list[str]) -> None:
        self.chat = _FakeChat(responses)


def _memory() -> ConversationMemory:
    path = Path(tempfile.mkdtemp()) / "chat_history.json"
    return ConversationMemory(path)


def test_direct_answer() -> None:
    agent = PersonalAgent(
        memory=_memory(),
        client=cast(OpenAI, _FakeClient(["Hello there!"])),
        model="fake",
    )
    result = agent.ask("hi")
    assert result["answer"] == "Hello there!"
    assert result["tool_used"] is None
    assert result["error"] is None


def test_time_tool_flow() -> None:
    agent = PersonalAgent(
        memory=_memory(),
        client=cast(
            OpenAI,
            _FakeClient([json.dumps({"tool": "time"}), "It is 2 PM."]),
        ),
        model="fake",
    )
    result = agent.ask("What time is it?")
    assert result["tool_used"] == "time"
    assert result["answer"] == "It is 2 PM."


def test_search_tool_flow() -> None:
    agent = PersonalAgent(
        memory=_memory(),
        client=cast(
            OpenAI,
            _FakeClient(
                [
                    json.dumps({"tool": "search", "query": "AI news"}),
                    "Based on search results ...",
                ]
            ),
        ),
        model="fake",
    )
    result = agent.ask("Any AI news?")
    assert result["tool_used"] == "search"
    assert result["tool_result"]["tool"] == "search"
    assert result["answer"].startswith("Based on search")


def test_llm_failure_graceful() -> None:
    class _Boom:
        class _Chat:
            class _Completions:
                def create(self, model: str, messages: list[dict]) -> object:
                    raise RuntimeError("simulated network failure")

            completions = _Completions()

        chat = _Chat()

    agent = PersonalAgent(
        memory=_memory(), client=cast(OpenAI, _Boom()), model="fake"
    )
    result = agent.ask("hello?")
    assert result["answer"]  # a friendly fallback message, never a crash


def test_unknown_tool_flow() -> None:
    """An unknown tool request must not be echoed back as raw JSON."""
    agent = PersonalAgent(
        memory=_memory(),
        client=cast(
            OpenAI,
            _FakeClient(
                [
                    json.dumps({"tool": "weather", "query": "London"}),
                    "The weather tool is not available. I can help otherwise.",
                ]
            ),
        ),
        model="fake",
    )
    result = agent.ask("what is the weather in london?")
    assert result["tool_used"] is None
    expected = "The weather tool is not available. I can help otherwise."
    assert result["answer"] == expected
    assert not result["answer"].startswith("{")  # raw JSON is never echoed


def test_memory_persisted() -> None:
    mem = _memory()
    agent = PersonalAgent(
        memory=mem, client=cast(OpenAI, _FakeClient(["ok"])), model="fake"
    )
    agent.ask("hello")
    assert mem.size() == 2  # user + assistant
    roles = {m["role"] for m in mem.load()}
    assert roles == {"user", "assistant"}


if __name__ == "__main__":
    test_direct_answer()
    print("test_direct_answer ............. OK")
    test_time_tool_flow()
    print("test_time_tool_flow ............ OK")
    test_search_tool_flow()
    print("test_search_tool_flow .......... OK")
    test_llm_failure_graceful()
    print("test_llm_failure_graceful ...... OK")
    test_unknown_tool_flow()
    print("test_unknown_tool_flow ......... OK")
    test_memory_persisted()
    print("test_memory_persisted .......... OK")
    print("\nAll agent tests passed.")
