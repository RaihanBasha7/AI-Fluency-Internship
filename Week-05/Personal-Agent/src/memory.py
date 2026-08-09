"""
memory.py
=========

Persistent, JSON-backed conversation memory for the Personal AI Agent.

The :class:`ConversationMemory` class stores every exchange (``user`` and
``assistant`` messages) in ``memory/chat_history.json`` so conversations
survive restarts.

Storage format
--------------
The file is a JSON object with a small metadata header and the messages
list::

    {
      "meta": {"description": "...", "version": "1.0"},
      "messages": [
        {"role": "user", "content": "...", "timestamp": "..."},
        {"role": "assistant", "content": "...", "timestamp": "..."}
      ]
    }

Design notes
------------
- The memory directory is created automatically on first use.
- Reads and writes are guarded by a thread lock to stay safe in threaded use.
- Corrupt JSON is backed up (``chat_history.corrupt.<hash>.json``) instead of
  being silently destroyed, then the store resets to empty history.
- Writes are atomic: the data is written to a temp file and renamed into place.
"""

from __future__ import annotations

import json
import threading
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from src.config import MEMORY_FILE
from src.logger import logger

_STORE_VERSION: str = "1.0"


class ConversationMemory:
    """
    JSON-file backed conversation store.

    Each message is a dict with ``role``, ``content`` and ``timestamp`` keys.
    """

    def __init__(self, memory_file: Optional[Path] = None) -> None:
        """
        Initialise memory and ensure the backing file exists.

        Parameters
        ----------
        memory_file : Optional[Path]
            Path to the JSON store.  Defaults to the configured memory file.
        """
        self.memory_file: Path = Path(memory_file) if memory_file else MEMORY_FILE
        self._lock = threading.RLock()
        self._initialize()

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------
    def _initialize(self) -> None:
        """Create the parent directory and seed an empty store if needed."""
        try:
            self.memory_file.parent.mkdir(parents=True, exist_ok=True)
        except OSError as exc:
            logger.error("Could not create memory directory: %s", exc)
            raise

        if not self.memory_file.exists():
            self._write([])
            logger.info("Created new memory file at %s", self.memory_file)

    def _store(self, messages: List[Dict[str, str]]) -> Dict[str, Any]:
        """Wrap a message list in the on-disk envelope."""
        return {
            "meta": {
                "description": "Persistent conversation history "
                               "for the Personal AI Agent.",
                "version": _STORE_VERSION,
            },
            "messages": messages,
        }

    def _write(self, messages: List[Dict[str, str]]) -> None:
        """
        Atomically persist messages to disk.

        Parameters
        ----------
        messages : List[Dict[str, str]]
            The full message list to store.
        """
        tmp_file = self.memory_file.with_suffix(".json.tmp")
        with self._lock:
            with tmp_file.open("w", encoding="utf-8") as handle:
                json.dump(self._store(messages), handle, indent=2, ensure_ascii=False)
            tmp_file.replace(self.memory_file)

    def _backup_corrupt(self) -> None:
        """Move a corrupt store aside so user data is not lost silently."""
        try:
            backup = self.memory_file.with_name(
                f"chat_history.corrupt.{uuid.uuid4().hex[:8]}.json"
            )
            self.memory_file.rename(backup)
            logger.warning("Backed up corrupt memory file to %s", backup)
        except OSError:
            logger.exception("Could not back up corrupt memory file")

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------
    def load(self) -> List[Dict[str, str]]:
        """
        Load all conversation messages from disk.

        Returns
        -------
        List[Dict[str, str]]
            Every stored message, oldest first.  An empty list is returned on
            failure so callers never crash.
        """
        with self._lock:
            if not self.memory_file.exists():
                return []

            try:
                with self.memory_file.open("r", encoding="utf-8") as handle:
                    data = json.load(handle)
            except json.JSONDecodeError:
                logger.warning("Memory file corrupt; resetting history")
                self._backup_corrupt()
                self._write([])
                return []
            except (OSError, UnicodeDecodeError):
                logger.exception("Could not read memory file")
                return []

            messages = data.get("messages") if isinstance(data, dict) else data
            if not isinstance(messages, list):
                logger.warning("Memory file has invalid structure; resetting")
                self._write([])
                return []

            return [item for item in messages if isinstance(item, dict)]

    def save(self, role: str, content: str) -> None:
        """
        Append a single message to the conversation and persist it.

        Parameters
        ----------
        role : str
            Either ``"user"`` or ``"assistant"``.
        content : str
            The message text.

        Raises
        ------
        ValueError
            If ``role`` is not ``user`` or ``assistant``.
        """
        role = role.strip().lower()
        if role not in {"user", "assistant"}:
            raise ValueError(f"Invalid role '{role}'; expected 'user' or 'assistant'")

        history = self.load()
        history.append(
            {
                "role": role,
                "content": content,
                "timestamp": datetime.now().isoformat(timespec="seconds"),
            }
        )
        self._write(history)
        logger.debug("Saved %s message (history length=%d)", role, len(history))

    def add_message(self, role: str, content: str) -> None:
        """Alias of :meth:`save` for readability in the agent loop."""
        self.save(role, content)

    def clear(self) -> None:
        """Delete all conversation history."""
        with self._lock:
            self._write([])
            logger.info("Conversation memory cleared")

    def get_recent(self, limit: int = 10) -> List[Dict[str, str]]:
        """
        Return the most recent ``limit`` messages.

        Parameters
        ----------
        limit : int
            Maximum number of messages to return.

        Returns
        -------
        List[Dict[str, str]]
            The newest messages, oldest-first within the window.
        """
        history = self.load()
        if limit <= 0:
            return []
        return history[-limit:]

    def size(self) -> int:
        """
        Return the total number of stored messages.

        Returns
        -------
        int
            Length of the current history.
        """
        return len(self.load())
