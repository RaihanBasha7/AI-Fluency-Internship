# Installation Guide

This guide walks through setting up the Personal AI Agent from scratch on
Windows, macOS, or Linux.

---

## 1. Prerequisites

- **Python 3.11 or newer** — check with:

  ```bash
  python --version
  ```

- **Git** (optional — only needed to clone a repository).

---

## 2. Get the code

```bash
git clone https://github.com/yourusername/Personal-Agent.git
cd Personal-Agent
```

Or copy the project folder wherever you like.

---

## 3. Create a virtual environment

Isolate the project dependencies from your system Python.

```bash
python -m venv venv
```

Activate it:

| OS / shell | Command |
| --- | --- |
| Windows (CMD) | `venv\Scripts\activate` |
| Windows (PowerShell) | `venv\Scripts\Activate.ps1` |
| macOS / Linux (bash/zsh) | `source venv/bin/activate` |

You should now see `(venv)` at the start of your prompt.

---

## 4. Install dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Installed packages:

- `openai` — OpenAI-compatible SDK used to talk to Featherless AI.
- `python-dotenv` — loads `.env` configuration.
- `requests` — HTTP client for the search tool.
- `rich` — terminal UI.
- `colorama` — cross-platform colour support.

---

## 5. Get a Featherless AI API key

1. Go to [https://featherless.ai](https://featherless.ai) and sign up / log in.
2. Navigate to **API Keys** and create a new key.
3. Copy the key (it looks like a long random string).

> Keep the key secret. Never commit it to a repository.

---

## 6. Configure the environment

Create your local `.env` from the template:

```bash
cp .env.example .env
```

Then edit `.env` and set your real key:

```env
FEATHERLESS_API_KEY=sk-your-actual-key-here
FEATHERLESS_BASE_URL=https://api.featherless.ai/v1
MODEL_NAME=deepseek-ai/DeepSeek-V4-Pro
```

| Variable | Required | Default | Notes |
| --- | --- | --- | --- |
| `FEATHERLESS_API_KEY` | ✅ | — | Your secret key. |
| `FEATHERLESS_BASE_URL` | ❌ | `https://api.featherless.ai/v1` | Keep unless you proxy the API. |
| `MODEL_NAME` | ❌ | `deepseek-ai/DeepSeek-V4-Pro` | Any model Featherless serves. |

---

## 7. Verify installation

Check the client connects to Featherless:

```bash
python test_config.py
python test_featherless.py
```

The Featherless test makes a real API call and prints the model's reply.

---

## 8. Run the agent

```bash
python -m src.main
```

If everything is configured, the banner appears and you can start chatting.
See [usage.md](usage.md) for a full walkthrough.

---

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `FEATHERLESS_API_KEY is not set` | No `.env` or key empty | Copy `.env.example` to `.env`, set the key. |
| `ModuleNotFoundError: openai` | venv not activated / deps missing | Activate venv, run `pip install -r requirements.txt`. |
| `401` / `403` from the API | Bad or expired key | Regenerate the key in Featherless. |
| `timeout` on search | No internet / DNS | Check connectivity; the agent answers from knowledge. |
| Agent forgets context | Memory cleared | Use `history` to inspect; don't run `clear` unless intended. |
