"""
logger.py
=========

Reusable logging configuration for the Personal AI Agent.

A single console logger at ``INFO`` level is created once and shared across
all modules via :data:`logger`.  The setup is idempotent: calling
:func:`setup_logger` multiple times never duplicates handlers, so every module
can safely request the logger it wants.
"""

from __future__ import annotations

import logging
import sys
from typing import Optional

# Default format.  The datefmt keeps console lines short but readable.
_DEFAULT_FORMAT: str = "[%(levelname)s] %(asctime)s - %(name)s - %(message)s"
_DEFAULT_DATEFMT: str = "%Y-%m-%d %H:%M:%S"
_DEFAULT_LEVEL: int = logging.INFO


def setup_logger(
    name: str = "personal-agent",
    level: int = _DEFAULT_LEVEL,
    fmt: Optional[str] = None,
    datefmt: Optional[str] = None,
) -> logging.Logger:
    """
    Create (or reuse) a configured console logger.

    Parameters
    ----------
    name : str
        Logger name.  Defaults to ``"personal-agent"``.
    level : int
        Logging threshold, e.g. ``logging.INFO``.
    fmt : Optional[str]
        Custom log format string.  Defaults to the module constant.
    datefmt : Optional[str]
        Custom date format string.  Defaults to the module constant.

    Returns
    -------
    logging.Logger
        A logger with a single ``StreamHandler`` attached.
    """
    logger = logging.getLogger(name)

    # Idempotency: never stack duplicate handlers on the same logger.
    if logger.handlers:
        logger.setLevel(level)
        return logger

    logger.setLevel(level)
    logger.propagate = False

    formatter = logging.Formatter(
        fmt or _DEFAULT_FORMAT,
        datefmt or _DEFAULT_DATEFMT,
    )

    console_handler = logging.StreamHandler(sys.stderr)
    console_handler.setLevel(level)
    console_handler.setFormatter(formatter)

    logger.addHandler(console_handler)
    return logger


# Shared logger instance.  Modules import this directly:
#
#     from src.logger import logger
#     logger.info("agent started")
#
logger: logging.Logger = setup_logger()
