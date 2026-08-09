"""
config.py
=========

Central configuration for the Personal AI Agent.

Responsibilities
----------------
1. Load environment variables from the project's ``.env`` file.
2. Expose validated constants used across the application.
3. Build and return a configured OpenAI-compatible client for Featherless AI.

The module never hardcodes credentials.  All secrets are read from the
environment.  If a required variable is missing, a clear ``RuntimeError`` is
raised so the failure is obvious instead of failing deep inside an API call.
"""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from openai import OpenAI

# ---------------------------------------------------------------------------
# Project paths
# ---------------------------------------------------------------------------
# Resolving paths relative to this file makes the application work no matter
# what the current working directory is when the process starts.
PROJECT_ROOT: Path = Path(__file__).resolve().parent.parent
MEMORY_DIR: Path = PROJECT_ROOT / "memory"
ASSETS_DIR: Path = PROJECT_ROOT / "assets"

# ---------------------------------------------------------------------------
# Application metadata
# ---------------------------------------------------------------------------
APP_NAME: str = "Personal AI Agent"
APP_VERSION: str = "2.0.0"
AUTHOR: str = "Shaik Raihan Basha"
LICENSE: str = "MIT"

# ---------------------------------------------------------------------------
# Environment loading
# ---------------------------------------------------------------------------
# ``override=False`` (the default) ensures the shell environment always wins
# over the ``.env`` file, which is the safer behaviour for local development.
load_dotenv(PROJECT_ROOT / ".env", override=False)

# ---------------------------------------------------------------------------
# Required environment variables
# ---------------------------------------------------------------------------
FEATHERLESS_API_KEY: Optional[str] = os.getenv("FEATHERLESS_API_KEY")
FEATHERLESS_BASE_URL: str = os.getenv(
    "FEATHERLESS_BASE_URL",
    default="https://api.featherless.ai/v1",
)
MODEL_NAME: str = os.getenv(
    "MODEL_NAME",
    default="deepseek-ai/DeepSeek-V4-Pro",
)

# ---------------------------------------------------------------------------
# Application constants
# ---------------------------------------------------------------------------
MEMORY_FILE: Path = MEMORY_DIR / "chat_history.json"
MAX_HISTORY_MESSAGES: int = 40          # Cap of messages sent to the model.
MAX_RECENT_MESSAGES: int = 10           # Default window shown by ``history``.
REQUEST_TIMEOUT_SECONDS: float = 60.0   # LLM request timeout.
TOOL_TIMEOUT_SECONDS: float = 10.0      # HTTP timeout for external tools.
MAX_TOOL_RETRIES: int = 1               # Extra attempt for flaky tools.


def validate_config() -> None:
    """
    Validate that all required configuration values are present.

    Raises
    ------
    RuntimeError
        If ``FEATHERLESS_API_KEY`` is missing or empty.
    """
    if not FEATHERLESS_API_KEY or not FEATHERLESS_API_KEY.strip():
        raise RuntimeError(
            "FEATHERLESS_API_KEY is not set. "
            "Copy '.env.example' to '.env' and add your Featherless AI key."
        )


def build_client() -> OpenAI:
    """
    Build and return an OpenAI-compatible client configured for Featherless AI.

    The client points at ``FEATHERLESS_BASE_URL`` (defaults to the official
    Featherless endpoint) and authenticates with ``FEATHERLESS_API_KEY``.

    Returns
    -------
    OpenAI
        A ready-to-use client object.

    Raises
    ------
    RuntimeError
        If the API key is missing.
    """
    validate_config()

    return OpenAI(
        api_key=FEATHERLESS_API_KEY,
        base_url=FEATHERLESS_BASE_URL,
        timeout=REQUEST_TIMEOUT_SECONDS,
        max_retries=2,
    )


@lru_cache(maxsize=1)
def get_client() -> OpenAI:
    """
    Return a lazily-created, cached OpenAI client.

    The client is constructed on first use and reused afterwards, which avoids
    unnecessary re-initialisation overhead across the application lifetime.
    The cache is a single-entry ``lru_cache``; call ``get_client.cache_clear()``
    to force a rebuild (used by :func:`reload_config` and tests).

    Returns
    -------
    OpenAI
        The shared OpenAI-compatible client.
    """
    return build_client()


def reload_config() -> None:
    """
    Reload environment variables and reset the cached client.

    This is useful for tests or for processes that need to pick up changed
    environment values without restarting.
    """
    load_dotenv(PROJECT_ROOT / ".env", override=True)
    globals().update(
        FEATHERLESS_API_KEY=os.getenv("FEATHERLESS_API_KEY"),
        FEATHERLESS_BASE_URL=os.getenv(
            "FEATHERLESS_BASE_URL",
            default="https://api.featherless.ai/v1",
        ),
        MODEL_NAME=os.getenv(
            "MODEL_NAME",
            default="deepseek-ai/DeepSeek-V4-Pro",
        ),
    )
    get_client.cache_clear()
