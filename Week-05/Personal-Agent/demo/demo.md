# Demo

An annotated walkthrough of the Personal AI Agent in action.

> Note: output is representative. Exact model wording will vary.

---

## Session 1 — Plain conversation

```
$ python -m src.main

┌──────────────────────────────────────────────────────────┐
│                🤖 Personal AI Agent                      │
│        Version 2.0.0 | Model: deepseek-ai/DeepSeek-V4-Pro│
└──────────────────────────────────────────────────────────┘
Type help for commands, or ask me anything. Type exit to quit.

You > Hi! What can you do?
──────────────
Hey! I'm your personal assistant. I can answer questions, remember our
conversation, tell you the time, and search the web for current information.
What would you like to know?
──────────────
```

---

## Session 2 — Tool use (current time)

```
You > What time is it?
Tool used:  time
──────────────
It is currently **Sunday, 09 August 2026 at 02:07 PM**.
──────────────
```

The agent decided a tool was needed, executed it, and answered from the result.

---

## Session 3 — Tool use (web search)

```
You > Search: who won the latest FIFA World Cup?
Tool used:  search
──────────────
According to the search result, the most recent FIFA World Cup was held in
2026. The final was contested in New York/New Jersey, and **Argentina** were the
champions. For complete details you can look up the official FIFA pages.
──────────────
```

The `search` tool hit the DuckDuckGo Instant Answer API and the final answer
was grounded in the retrieved data.

---

## Session 4 — Conversation memory

```
You > Remember that my favourite colour is teal.
──────────────
Got it! I'll remember that teal is your favourite colour.
──────────────

You > What is my favourite colour?
──────────────
Your favourite colour is **teal**.
──────────────
```

Even without a tool, the model uses the persisted history to recall the fact.

---

## Session 5 — REPL commands

```
You > history
──────────────
Conversation History
USER  Hi! What can you do?
ASSISTANT  Hey! I'm your personal assistant...
USER  What time is it?
ASSISTANT  It is currently Sunday...
...
──────────────

You > clear
Conversation memory cleared.

You > exit
Goodbye!
```

---

## Session 6 — Graceful failure (no key)

```
$ FEATHERLESS_API_KEY= python -m src.main
[CRITICAL] Could not start the agent: FEATHERLESS_API_KEY is not set...
Could not start the agent: FEATHERLESS_API_KEY is not set.
Check your .env file contains FEATHERLESS_API_KEY.
```

No crash — just a clear, actionable message.
