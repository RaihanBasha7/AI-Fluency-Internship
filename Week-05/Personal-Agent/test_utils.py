"""
test_utils.py
=============

Tests for src.utils helpers.  Run with:

    python test_utils.py
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from src.utils import (  # noqa: E402
    divider,
    format_timestamp,
    parse_tool_json,
    safe_head,
    truncate_text,
)


def test_parse_tool_json_plain() -> None:
    assert parse_tool_json('{"tool": "search", "query": "AI"}') == {
        "tool": "search",
        "query": "AI",
    }


def test_parse_tool_json_wrapped_in_prose() -> None:
    text = 'Sure, here is my answer:\n```json\n{"tool": "time"}\n```\nDone.'
    assert parse_tool_json(text) == {"tool": "time"}


def test_parse_tool_json_nested_braces_in_string() -> None:
    # Braces inside a quoted string must not terminate the object early.
    text = '{"tool": "search", "query": "history of {the} universe"}'
    assert parse_tool_json(text) == {
        "tool": "search",
        "query": "history of {the} universe",
    }


def test_parse_tool_json_invalid() -> None:
    assert parse_tool_json("no json here") is None
    assert parse_tool_json("") is None
    assert parse_tool_json('{"broken": ') is None


def test_truncate_text() -> None:
    assert truncate_text("short") == "short"
    assert truncate_text("a" * 200, limit=10) == "aaaaaaa..."
    assert len(truncate_text("a" * 200, limit=10)) <= 10


def test_divider_and_head() -> None:
    assert divider("=", 4) == "===="
    assert safe_head([1, 2, 3], 2) == [1, 2]
    assert safe_head([1, 2, 3], 0) == []
    assert safe_head([1], 5) == [1]


def test_format_timestamp() -> None:
    from datetime import datetime

    formatted = format_timestamp(datetime(2026, 8, 9, 14, 5, 0))
    assert formatted == "2026-08-09 14:05:00"


if __name__ == "__main__":
    test_parse_tool_json_plain()
    print("test_parse_tool_json_plain ...... OK")
    test_parse_tool_json_wrapped_in_prose()
    print("test_parse_tool_json_wrapped .... OK")
    test_parse_tool_json_nested_braces_in_string()
    print("test_parse_tool_json_nested ..... OK")
    test_parse_tool_json_invalid()
    print("test_parse_tool_json_invalid .... OK")
    test_truncate_text()
    print("test_truncate_text .............. OK")
    test_divider_and_head()
    print("test_divider_and_head ........... OK")
    test_format_timestamp()
    print("test_format_timestamp ........... OK")
    print("\nAll utils tests passed.")
