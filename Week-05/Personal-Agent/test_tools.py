"""
test_tools.py
=============

Tests for src.tools.  The DuckDuckGo search test needs network access; the
rest run offline.  Run with:

    python test_tools.py
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from src.tools import (  # noqa: E402
    execute_tool,
    get_current_time,
    list_tools,
    web_search,
)


def test_current_time_shape() -> None:
    result = get_current_time()
    assert result["status"] == "success"
    assert result["tool"] == "time"
    assert isinstance(result["result"], str)
    assert len(result["result"]) > 0


def test_list_tools() -> None:
    tools = list_tools()
    names = {t["name"] for t in tools}
    assert {"time", "search"}.issubset(names)


def test_execute_tool_time() -> None:
    result = execute_tool("time")
    assert result["status"] == "success"
    assert result["tool"] == "time"


def test_execute_tool_unknown() -> None:
    result = execute_tool("does-not-exist")
    assert result["status"] == "failed"
    assert "Unknown tool" in result["result"]


def test_execute_tool_search_offline() -> None:
    # Should never raise, even with no network.
    result = execute_tool("search", query="hello world")
    assert result["tool"] == "search"
    assert result["status"] in {"success", "failed", "error"}


def test_web_search_network() -> None:
    result = web_search("python programming language")
    assert result["status"] == "success"
    assert "tool" in result and "result" in result


if __name__ == "__main__":
    test_current_time_shape()
    print("test_current_time_shape ........ OK")
    test_list_tools()
    print("test_list_tools ................ OK")
    test_execute_tool_time()
    print("test_execute_tool_time ......... OK")
    test_execute_tool_unknown()
    print("test_execute_tool_unknown ...... OK")
    test_execute_tool_search_offline()
    print("test_execute_tool_search_offline OK")
    test_web_search_network()
    print("test_web_search_network ........ OK")
    print("\nAll tool tests passed.")
