# Build Log

A journal of the journey building the Personal AI Agent for the AI Fluency
Internship (FL-07). This documents what was built, what went wrong, what was
fixed, and the tradeoffs made along the way.

---

## Phase 1 — Initial build (v1.0)

**What was built**

- Basic project skeleton with `src/config.py`, `src/logger.py`,
  `src/memory.py`, `src/tools.py`, `src/prompts.py`.
- OpenAI-compatible client wired to Featherless AI.
- Minimal CLI that read a message and printed the model reply.
- DuckDuckGo search, current time and weather tools.

**First design decisions**

- Environment variables via `python-dotenv`; no hardcoded keys.
- JSON file memory because it is transparent and zero-infrastructure.

---

## Phase 2 — Problems encountered

1. **Broken configuration defaults**
   - `FEATHERLESS_BASE_URL` and `MODEL_NAME` were read without defaults; if
     only the key was present the client silently pointed at OpenAI and failed.
   - *Fix:* added sensible defaults and validation (`config.validate_config`).

2. **Fragile path handling**
   - Memory file was a relative path, so the agent broke when launched from
     another directory.
   - *Fix:* all paths resolve from `Path(__file__).resolve().parent.parent`.

3. **Instant-Answer API returns empty results often**
   - DuckDuckGo's Instant Answer API frequently returns no abstract for
     general queries.
   - *Fix:* layered fallbacks (`AbstractText` → `Heading` → `RelatedTopics`),
     plus a clean `failed` status so the agent can answer from knowledge.

4. **Model tool-calling reliability**
   - Native OpenAI tool-calling was inconsistent across open models on
     Featherless.
   - *Fix:* switched to a **JSON tool-intent contract** in the system prompt
     with a forgiving parser (`parse_tool_json`) and a 2-round budget.

5. **Corrupt memory file kills the agent**
   - A truncated JSON file raised on `load()`.
   - *Fix:* detect `JSONDecodeError`, back the file up
     (`chat_history.corrupt.<hash>.json`), reset to `[]`, log a warning.

6. **Unsafe string building / empty content**
   - Empty assistant replies and multi-byte Unicode in the tool result broke
     rendering.
   - *Fix:* guard empty content everywhere and serialise tool results with
     `ensure_ascii=False`.

---

## Phase 3 — Fixes applied (v2.0)

- Rewrote every module with full docstrings, type hints and PEP8 layout.
- Centralised logging in `src/logger.py` (idempotent, INFO level).
- Added lazy cached OpenAI client (`get_client()`) so tests/tools import
  cleanly without a key.
- Reworked `main.py` on `rich`: banner, panels, status spinner, Markdown
  answers, REPL commands (`help`, `history`, `clear`, `tools`, `exit`).
- Added `utils.py` helpers and unit-style smoke tests.
- Generated `assets/architecture.png` and `assets/workflow.png`.

---

## Phase 4 — Tradeoffs

| Tradeoff | Chosen | Why / Cost |
| --- | --- | --- |
| Tool decision | JSON contract in prompt vs native tool-calling API | More portable across open models; slightly higher prompt complexity. |
| Search | DuckDuckGo Instant Answer (no key) | Zero setup; fewer results than a paid search API. |
| Memory | Flat JSON file | Simple and debuggable; not scalable to huge histories. |
| UI | Terminal / rich | MVP scope; a web UI is a later iteration. |
| Model default | `deepseek-ai/DeepSeek-V4-Pro` | Configurable via `MODEL_NAME`; swap anytime. |

---

## Phase 5 — Lessons learned

- **Fail loudly at the edge, fail softly in the core.** Missing API keys should
  abort startup with a clear message; runtime errors should degrade gracefully.
- **A uniform tool contract** (`{status, tool, result}`) makes adding tools
  trivial and keeps the agent robust.
- **Never trust the model's output shape** — always parse defensively.
- **Paths must be absolute** or the app breaks depending on where it is run.
- **Atomic file writes** (temp + rename) prevent corruption under interruption.
- **Test the pipeline with a fake client** — it validates the whole decision
  loop without spending tokens.

---

## Phase 6 — What's next

- Streaming responses.
- Weather, calendar, email and reminder tools.
- RAG over local documents.
- SQLite/vector-store memory backend.
- A small web UI.

---

## Phase 7 — Senior code review fixes

A review pass (flake8, mypy, compileall + live end-to-end test) fixed:

**Type-safety**
- `prompts.py`: `TOOL_CATALOG` annotated `List[Dict[str, str]]` but holds
  nested dicts — replaced with a `ToolSpec` `TypedDict`.
- `config.py`: client cache used a function attribute mypy cannot see —
  replaced with `functools.lru_cache`; `reload_config()` now calls
  `get_client.cache_clear()`.
- `tools.py`: query `params` dict explicitly typed to match `requests`.
- `agent.py`: tool-intent checks now use `typing.TypeGuard` so callers get
  non-`None` narrowing.

**Robustness**
- `agent.py`: unknown-tool JSON intents were returned to the user verbatim.
  The agent now detects them, warns, and asks the model to answer directly.
- `agent.py`: the post-budget forced answer no longer leaks a tool-call JSON.
- `utils.py`: `parse_tool_json` regex broke on nested braces / braces inside
  strings — replaced with a brace/string-aware scanner.
- `test_config.py` updated for the `lru_cache` client; added `test_utils.py`
  and an unknown-tool flow test in `test_agent.py`.

**Verification:** `flake8` clean, `mypy` clean, all 6 test suites pass, live
Featherless session confirmed (direct answer, `time` and `search` tools).

