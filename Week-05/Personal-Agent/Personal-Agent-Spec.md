# Personal-Agent — Design Specification

> **Status:** Implemented (MVP) · **Version:** 2.0.0
> **Author:** Shaik Raihan Basha · **Program:** AI Fluency Internship (FL-07 — Build the Agent)

---

## 1. Overview

A terminal-based personal AI assistant. The user types a message; the agent
decides whether it needs fresh/external information, optionally invokes a
tool, and returns a natural-language answer. All exchanges are persisted so the
agent has memory across sessions.

## 2. Goals

- Accept user input from the terminal.
- Use **Featherless AI** as the LLM provider (OpenAI-compatible API).
- Decide — at runtime — whether an **external tool** is required.
- Keep **persistent conversation memory** (JSON file).
- Search the web and return a final response.
- Work end-to-end, without crashing, with production-style practices
  (type hints, docstrings, logging, error handling, PEP8).

## 3. Non-goals (out of scope for the MVP)

- Streaming responses.
- RAG / local document retrieval.
- Voice I/O.
- Auth / multi-user support.
- Web UI (terminal only).

## 4. Tech Stack

| Layer | Choice | Rationale |
| --- | --- | --- |
| Language | Python 3.11+ | Broad ecosystem, rapid development. |
| LLM client | `openai` SDK | Featherless exposes an OpenAI-compatible API. |
| Provider | Featherless AI | Serverless open-model inference. |
| HTTP | `requests` | Simple, robust, widely known. |
| Config | `python-dotenv` | Secrets out of the code. |
| UI | `rich` + `colorama` | Professional, colourful terminal output. |

## 5. Components

| Module | Responsibility |
| --- | --- |
| `src/config.py` | Load `.env`, validate secrets, expose constants and a shared OpenAI client. |
| `src/logger.py` | Idempotent console logger at INFO level. |
| `src/utils.py` | Pure helpers (timestamps, truncation, JSON extraction). |
| `src/prompts.py` | System prompt, tool catalogue, message builder. |
| `src/memory.py` | Thread-safe JSON conversation store. |
| `src/tools.py` | `time` and `search` tools with a structured result contract. |
| `src/agent.py` | The pipeline: memory → prompt → tool decision → LLM → save → answer. |
| `src/main.py` | Rich REPL with `help` / `history` / `clear` / `tools` / `exit`. |

## 6. Tool Contract

Every tool returns a **dict**:

```json
{
  "status": "success | failed | error",
  "tool": "<tool name>",
  "result": "<human-readable text>"
}
```

## 7. Model Protocol (tool negotiation)

The system prompt instructs the model to reply with a **single JSON object**
when a tool is needed:

- `{"tool": "search", "query": "<phrase>"}`
- `{"tool": "time"}`

The agent parses the reply with `utils.parse_tool_json`, validates the tool
name, executes it, and re-prompts the model with the tool result to compose
the final answer. A **budget of 2 tool round-trips** per request prevents
infinite loops.

## 8. Memory Model

`memory/chat_history.json` stores messages:

```json
[
  {"role": "user", "content": "...", "timestamp": "2026-08-09T14:05:00"},
  {"role": "assistant", "content": "...", "timestamp": "2026-08-09T14:05:03"}
]
```

- The folder and file are created automatically.
- Writes are atomic (temp file + rename) and guarded by a lock.
- Corrupt files are backed up (never silently destroyed).
- Only the most recent `MAX_HISTORY_MESSAGES` (default 40) are sent to the model.

## 9. Failure Handling Policy

| Failure | Behaviour |
| --- | --- |
| Missing API key | Clear `RuntimeError` at startup with actionable message. |
| Network/LLM error | Logged; agent returns a friendly message; agent never crashes. |
| Tool timeout/error | Structured `"status": "error"` result; answer built from fallback. |
| Corrupt memory file | Backed up and reset to empty history. |

## 10. Configuration

| Variable | Required | Default |
| --- | --- | --- |
| `FEATHERLESS_API_KEY` | yes | — |
| `FEATHERLESS_BASE_URL` | no | `https://api.featherless.ai/v1` |
| `MODEL_NAME` | no | `deepseek-ai/DeepSeek-V4-Pro` |

## 11. Acceptance Criteria

- [x] Runs with `python -m src.main`.
- [x] `help`, `history`, `clear`, `exit` work.
- [x] Conversation persists after restart.
- [x] Time and search tools execute and shape the answer.
- [x] Missing key → informative error, no crash.
- [x] No hardcoded credentials.
