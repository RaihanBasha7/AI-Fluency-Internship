# Usage Guide

This guide explains how to use the Personal AI Agent day-to-day.

---

## 1. Start the agent

```bash
python -m src.main
```

You should see:

```
┌──────────────────────────────────────────────────────┐
│         🤖 Personal AI Agent                         │
│         Version 2.0.0 | Model: deepseek-ai/...       │
└──────────────────────────────────────────────────────┘
Type help for commands, or ask me anything. Type exit to quit.

You >
```

> Tip: run from the **project root** so paths to `.env` and `memory/` resolve.

---

## 2. Have a conversation

Simply type a message and press Enter:

```
You > What is the capital of France?
You > Tell me a fun fact about octopuses.
```

The agent replies with a Markdown-formatted answer. Each exchange is saved to
`memory/chat_history.json`, so it remembers earlier turns:

```
You > My name is Raihan.
You > What is my name?
Assistant > Your name is Raihan!
```

---

## 3. Asking for the time

```
You > What time is it?
```

The agent decides this needs the **time** tool, runs it, and answers.

---

## 4. Searching the web

Ask something that needs current facts:

```
You > Search the web: latest news about DeepSeek
You > What is the weather outlook?  (the agent may search)
```

The agent invokes the **search** tool, then answers from the retrieved data.
You will see a `Tool used: search` marker above the answer.

> The search uses the DuckDuckGo Instant Answer API and needs no API key.

---

## 5. REPL commands

| Command | What it does |
| --- | --- |
| `help` | Show commands and available tools. |
| `history` | Show the last 10 messages (persisted). |
| `clear` | Erase all conversation memory. |
| `tools` | List the external tools the agent can call. |
| `exit` (or `q`) | Quit. `Ctrl-C` / `Ctrl-D` also work. |

---

## 6. Managing memory

- **Persist across sessions** — memory is stored in
  `memory/chat_history.json` and survives restarts automatically.
- **View** — type `history`.
- **Wipe** — type `clear`.
- **Cap** — only the last 40 messages are sent to the model per turn
  (configured by `MAX_HISTORY_MESSAGES` in `src/config.py`).

---

## 7. Logs

The agent logs INFO-level diagnostics to the terminal (stderr):

```
[INFO] 2026-08-09 14:05:00 - personal-agent - PersonalAgent initialised (model=...)
[INFO] 2026-08-09 14:05:01 - personal-agent - Tool 'search' returned status 'success'
```

Use `history` for chat memory; the log lines are for diagnostics.

---

## 8. Example session

```
You > help
You > What time is it?
You > Search: what is Python?
You > Remember that I like coffee.
You > What do I like?
You > clear
You > exit
```

See [demo/demo.md](../demo/demo.md) for annotated sample output.
