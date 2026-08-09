"""
test_featherless.py
===================

End-to-end connectivity test against the real Featherless AI API.

Requires a valid FEATHERLESS_API_KEY in .env.  Run with:

    python test_featherless.py
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from src.config import MODEL_NAME, get_client  # noqa: E402


def test_connection() -> None:
    client = get_client()
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": "Reply with exactly the word: connected",
            }
        ],
        max_tokens=32,
    )
    content = response.choices[0].message.content
    assert content and content.strip()
    print(f"\nModel reply: {content.strip()}")


if __name__ == "__main__":
    test_connection()
    print("OK - Featherless AI connection works.")
