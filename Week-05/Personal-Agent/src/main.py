"""
main.py
=======

Interactive terminal entry point for the Personal AI Agent.

Run with::

    python -m src.main

(executing ``python src/main.py`` works too when run from the project root)

Features
--------
- Rich welcome banner with version info.
- Coloured user/assistant/tool output.
- Slash-commands: ``help``, ``history``, ``clear``, ``exit``.
- Graceful shutdown on Ctrl-C / Ctrl-D.
"""

from __future__ import annotations

import sys

from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.rule import Rule
from rich.text import Text

from src.agent import PersonalAgent
from src.config import APP_NAME, APP_VERSION, MODEL_NAME
from src.logger import logger
from src.tools import list_tools

console = Console()

# ---------------------------------------------------------------------------
# Command handling
# ---------------------------------------------------------------------------
HELP_TEXT: str = (
    "Available commands\n"
    "------------------\n"
    "  help         Show this help message.\n"
    "  history      Show the last 10 saved messages.\n"
    "  clear        Erase all conversation memory.\n"
    "  exit         Leave the agent. (Also: Ctrl-C / Ctrl-D)\n"
    "\n"
    "Anything else is sent to the AI agent as a normal message.\n"
    "If the agent decides it needs fresh facts it will search the web\n"
    "and then answer using the retrieved data."
)


def show_help() -> None:
    """Print the help panel."""
    console.print(Panel(HELP_TEXT, title="Commands", border_style="cyan"))


def show_history(agent: PersonalAgent) -> None:
    """
    Print recent conversation history.

    Parameters
    ----------
    agent : PersonalAgent
        The active agent whose memory is displayed.
    """
    history = agent.get_history(limit=10)
    if not history:
        console.print("[yellow]No conversation history yet.[/yellow]")
        return

    console.print(Rule("[cyan]Conversation History[/cyan]"))
    for entry in history:
        role = Text(str(entry.get("role", "?")).upper(), style="bold")
        content = str(entry.get("content", ""))
        console.print(role, content)
    console.print(Rule())


def show_clear(agent: PersonalAgent) -> None:
    """Clear memory and confirm to the user."""
    agent.clear_memory()
    console.print("[green]Conversation memory cleared.[/green]")


def show_tools() -> None:
    """List the tools available to the agent."""
    console.print(Rule("[cyan]Available Tools[/cyan]"))
    for tool in list_tools():
        console.print(
            f"  [bold]{tool['name']}[/bold] - {tool['description']}"
        )
    console.print(Rule())


def show_banner() -> None:
    """Render the startup banner."""
    banner = (
        f"[bold blue]{APP_NAME}[/bold blue]\n"
        f"[dim]Version {APP_VERSION} | Model: {MODEL_NAME}[/dim]"
    )
    console.print(Panel(banner, border_style="blue", width=70))
    console.print(
        "[dim]Type [bold]help[/bold] for commands, or ask me anything. "
        "Type [bold]exit[/bold] to quit.[/dim]"
    )
    console.print()


# ---------------------------------------------------------------------------
# Main loop
# ---------------------------------------------------------------------------
def main() -> None:
    """
    Run the interactive agent REPL until the user exits.

    Never raises: all errors are caught, logged, and surfaced to the user.
    """
    try:
        agent = PersonalAgent()
    except Exception as exc:  # noqa: BLE001
        logger.critical("Failed to start agent: %s", exc)
        console.print(
            f"[red]Could not start the agent: {exc}[/red]\n"
            "[yellow]Check your .env file contains FEATHERLESS_API_KEY.[/yellow]"
        )
        sys.exit(1)

    show_banner()

    while True:
        try:
            raw = console.input("[bold cyan]You > [/bold cyan]").strip()
        except (KeyboardInterrupt, EOFError):
            console.print("\n[dim]Goodbye![/dim]")
            break

        if not raw:
            continue

        command = raw.lower()
        if command in {"exit", "quit", "q"}:
            console.print("[dim]Goodbye![/dim]")
            break
        if command == "help":
            show_help()
            continue
        if command == "history":
            show_history(agent)
            continue
        if command == "clear":
            show_clear(agent)
            continue
        if command == "tools":
            show_tools()
            continue

        _handle_message(agent, raw)


def _handle_message(agent: PersonalAgent, user_input: str) -> None:
    """
    Send a message to the agent and print its response.

    Parameters
    ----------
    agent : PersonalAgent
        The active agent.
    user_input : str
        The raw user message.
    """
    with console.status("[cyan]Thinking...[/cyan]"):
        result = agent.ask(user_input)

    if result.get("tool_used"):
        console.print(
            Text.assemble(
                "Tool used: ",
                (f" {result['tool_used']} ", "bold magenta"),
            )
        )

    answer = result.get("answer", "").strip()
    if not answer:
        console.print("[yellow]The agent returned an empty response.[/yellow]")
        return

    console.print(Rule(style="dim"))
    console.print(Markdown(answer))
    console.print(Rule(style="dim"))


if __name__ == "__main__":
    main()
