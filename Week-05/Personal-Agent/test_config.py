"""
test_config.py
==============

Sanity checks for src/config.py.  Run with:

    python test_config.py
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from src import config  # noqa: E402


def test_constants_present() -> None:
    assert config.APP_NAME == "Personal AI Agent"
    assert config.APP_VERSION
    assert config.FEATHERLESS_BASE_URL.startswith("https://")
    assert config.MEMORY_FILE.name == "chat_history.json"


def test_client_builds() -> None:
    if not config.FEATHERLESS_API_KEY:
        # Without a key we expect a clear RuntimeError, not a crash.
        try:
            config.build_client()
        except RuntimeError as exc:
            assert "FEATHERLESS_API_KEY" in str(exc)
        return
    client = config.build_client()
    base = str(client.base_url).rstrip("/")
    assert base.endswith("v1"), f"unexpected base_url: {base}"
    assert client.api_key


def test_validate_config_missing_key() -> None:
    original = config.FEATHERLESS_API_KEY
    try:
        config.FEATHERLESS_API_KEY = None
        try:
            config.validate_config()
        except RuntimeError as exc:
            assert "FEATHERLESS_API_KEY" in str(exc)
        else:
            raise AssertionError("validate_config() should raise without a key")
    finally:
        config.FEATHERLESS_API_KEY = original


def test_get_client_cached() -> None:
    if not config.FEATHERLESS_API_KEY:
        return
    config.get_client.cache_clear()
    first = config.get_client()
    second = config.get_client()
    assert first is second
    config.get_client.cache_clear()


if __name__ == "__main__":
    test_constants_present()
    print("test_constants_present ......... OK")
    test_client_builds()
    print("test_client_builds ............. OK")
    test_validate_config_missing_key()
    print("test_validate_config_missing_key OK")
    test_get_client_cached()
    print("test_get_client_cached ......... OK")
    print("\nAll config tests passed.")
