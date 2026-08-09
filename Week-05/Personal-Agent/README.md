# 🤖 Personal AI Agent

A production-style **Personal AI Agent** built in Python that runs in your
terminal. It can hold multi-turn conversations, **remember** them across
restarts, decide **when to use external tools**, **search the web**, and answer
using current information — all powered by **[Featherless AI](https://featherless.ai)**.

Built for the **AI Fluency Internship (FL-07 — Build the Agent)**.

---

## ✨ Features

| Capability | Description |
| --- | --- |
| 🧠 LLM-powered chat | Uses Featherless AI via the OpenAI-compatible SDK. |
| 🔧 Tool use | The agent *decides* whether it needs a tool, executes it, and answers from the result. |
| 🌐 Web search | DuckDuckGo Instant Answer API (no API key required). |
| 🕒 Current time | System-clock tool for date/time questions. |
| 🗂️ Persistent memory | JSON-backed history in `memory/chat_history.json`, survives restarts. |
| 🖥️ Rich CLI | Colourful `rich`-powered REPL with `help` / `history` / `clear` / `exit`. |
| 🛡️ Never crashes | Every failure is caught, logged, and surfaced gracefully. |
| 🧪 Testable | Pure helpers, injectable client, and a mockable agent pipeline. |

---

## 🛠 Tech Stack

- **Python 3.11+**
- **OpenAI SDK** (`openai`) — OpenAI-compatible client
- **Featherless AI** — model provider
- **requests** — HTTP for external tools
- **python-dotenv** — environment configuration
- **rich** — beautiful terminal UI
- **colorama** — cross-platform ANSI colour support

---

## 📥 Installation

See the full guide in [`docs/installation.md`](docs/installation.md).

```bash
# 1. Clone or copy the project, then enter it
cd Personal-Agent

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure your API key
cp .env.example .env            # then edit .env and set FEATHERLESS_API_KEY

# 5. Run it
python -m src.main
```

> **Get an API key** at [https://featherless.ai](https://featherless.ai), then
> create a model endpoint and copy its key.

---

## ⚙️ Configuration

The agent reads configuration from a `.env` file at the project root.

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `FEATHERLESS_API_KEY` | ✅ | — | Your Featherless AI secret key. |
| `FEATHERLESS_BASE_URL` | ❌ | `https://api.featherless.ai/v1` | OpenAI-compatible base URL. |
| `MODEL_NAME` | ❌ | `deepseek-ai/DeepSeek-V4-Pro` | Model identifier served by Featherless. |

---

## 🚀 Usage

```bash
python -m src.main
```

Type a message and the agent replies. Try:

```
You > What is the capital of France?
You > What time is it?
You > Search the web: latest AI news
```

### REPL commands

| Command | Action |
| --- | --- |
| `help` | Show available commands and tools. |
| `history` | Show the last 10 saved messages. |
| `clear` | Erase all conversation memory. |
| `tools` | List the external tools the agent can call. |
| `exit` (or `q` / Ctrl-C) | Leave the agent. |

> ℹ️ Every exchange is saved to `memory/chat_history.json`. The agent passes the
> recent window back to the model so it has conversational memory.

---

## 🏗 Architecture

```
┌────────────┐      ┌──────────────┐      ┌───────────────────────┐
│  main.py   │ ───► │    agent     │ ───► │ Featherless AI (LLM)  │
│  (Rich CLI)│      │  PersonalAgent│      │  /v1/chat/completions │
└────────────┘      └──────┬───────┘      └───────────────────────┘
                           │
                    ┌──────┴───────┐
                    │   memory     │          ┌───────────────┐
                    │  (JSON file) │          │   tools.py    │
                    └──────────────┘          │ search / time │
                                              └───────────────┘
```

- **`src/config.py`** — env vars, constants, OpenAI client factory.
- **`src/agent.py`** — decision loop: does the model want a tool? → run it →
  answer from the result.
- **`src/tools.py`** — every tool returns the same structured shape.
- **`src/memory.py`** — thread-safe JSON persistence.

Full details and diagrams: [`architecture.md`](architecture.md) and
[`workflow.md`](workflow.md).

---

## 📂 Project Structure

```
Personal-Agent/
├── README.md              # this file
├── requirements.txt       # pinned dependencies
├── LICENSE                # MIT license
├── .gitignore             # ignored files (venv, .env, caches)
├── .env.example           # template for local configuration
├── Personal-Agent-Spec.md # design specification
├── architecture.md        # architecture + Mermaid diagram
├── workflow.md            # request workflow + Mermaid diagram
├── build-log.md           # build journal (problems, fixes, tradeoffs)
├── assets/                # generated diagrams (architecture.png, workflow.png)
├── docs/
│   ├── installation.md    # complete setup guide
│   └── usage.md           # usage guide
├── demo/
│   └── demo.md            # walkthrough with sample output
├── memory/
│   └── chat_history.json  # conversation history (auto-created)
└── src/
    ├── __init__.py
    ├── config.py          # configuration + OpenAI client
    ├── logger.py          # shared console logger
    ├── utils.py           # helper functions
    ├── prompts.py         # system prompt + message builders
    ├── memory.py          # ConversationMemory
    ├── tools.py           # web search + time tools
    ├── agent.py           # PersonalAgent pipeline
    └── main.py            # interactive CLI
```

---

## 🧪 Testing

```bash
# Quick sanity checks for each module
python test_config.py
python test_memory.py
python test_tools.py
python test_featherless.py   # requires a valid FEATHERLESS_API_KEY

# End-to-end smoke test (uses the real model)
python -m src.main
```

---

## 🚀 Future Improvements

- 🌤 Weather, 📅 calendar, 📧 email and ⏰ reminder tools.
- 💬 Streaming responses and conversation topic summarisation.
- 🧠 RAG over local documents (PDF / Markdown).
- 🔊 Voice input / output.
- 💾 Pluggable backends (SQLite/vector store) for memory.
- 🤖 Multi-agent orchestration (planner + worker + tools).

---

## 📄 License

[MIT](LICENSE) © 2026 Shaik Raihan Basha.

---

## 👤 Author

**Shaik Raihan Basha** · AI Fluency Internship **FL-07**.
