"""
test_memory.py
==============

Tests for src.memory.ConversationMemory.  Uses a temporary file so the real
project history is never touched.  Run with:

    python test_memory.py
"""

from __future__ import annotations

import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from src.memory import ConversationMemory  # noqa: E402


def _fresh_memory() -> tuple[ConversationMemory, Path]:
    tmp = Path(tempfile.mkdtemp()) / "chat_history.json"
    memory = ConversationMemory(tmp)
    assert tmp.exists()
    return memory, tmp


def test_initial_state() -> None:
    memory, _ = _fresh_memory()
    assert memory.load() == []
    assert memory.size() == 0


def test_save_and_load() -> None:
    memory, _ = _fresh_memory()
    memory.save("user", "Hello")
    memory.save("assistant", "Hi there!")
    history = memory.load()
    assert len(history) == 2
    assert history[0]["role"] == "user"
    assert history[1]["role"] == "assistant"
    assert "timestamp" in history[0]


def test_get_recent() -> None:
    memory, _ = _fresh_memory()
    for i in range(5):
        memory.save("user", f"msg-{i}")
    recent = memory.get_recent(3)
    assert [m["content"] for m in recent] == ["msg-2", "msg-3", "msg-4"]
    assert memory.get_recent(0) == []


def test_clear() -> None:
    memory, _ = _fresh_memory()
    memory.save("user", "x")
    memory.clear()
    assert memory.size() == 0
    assert memory.load() == []


def test_invalid_role_raises() -> None:
    memory, _ = _fresh_memory()
    try:
        memory.save("system", "x")
    except ValueError:
        pass
    else:
        raise AssertionError("save() should reject invalid roles")


def test_corrupt_file_recovery() -> None:
    path = Path(tempfile.mkdtemp()) / "chat_history.json"
    path.write_text("{ this is not valid json", encoding="utf-8")
    memory = ConversationMemory(path)
    assert memory.load() == []
    corrupt_backups = list(path.parent.glob("chat_history.corrupt.*.json"))
    assert len(corrupt_backups) == 1


if __name__ == "__main__":
    test_initial_state()
    print("test_initial_state ............. OK")
    test_save_and_load()
    print("test_save_and_load ............. OK")
    test_get_recent()
    print("test_get_recent ................ OK")
    test_clear()
    print("test_clear ..................... OK")
    test_invalid_role_raises()
    print("test_invalid_role_raises ....... OK")
    test_corrupt_file_recovery()
    print("test_corrupt_file_recovery ..... OK")
    print("\nAll memory tests passed.")
