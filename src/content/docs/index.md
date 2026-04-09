---
title: Engram
description: Persistent memory for AI coding agents
---

# Engram

Your AI coding agent forgets everything when the session ends. Engram gives it a brain.

A Go binary with SQLite + FTS5 full-text search, exposed via CLI, HTTP API, MCP server, and an interactive TUI. Works with any agent that supports MCP — Claude Code, OpenCode, Gemini CLI, Codex, VS Code (Copilot), Antigravity, Cursor, Windsurf, or anything else.

## Quick Start

### Install

```bash
brew install gentleman-programming/tap/engram
```

### Setup Your Agent

#### Claude Code
```bash
claude plugin marketplace add Gentleman-Programming/engram && claude plugin install engram
```

#### OpenCode
```bash
engram setup opencode
```

#### Gemini CLI
```bash
engram setup gemini-cli
```

#### Codex
```bash
engram setup codex
```

#### VS Code / Cursor / Windsurf / Any MCP
See [Agent Setup](/docs/agent-setup) for full per-agent configuration.

That's it. No Node.js, no Python, no Docker. One binary, one SQLite file.

---

## How It Works

1. Agent completes significant work (bugfix, architecture decision, etc.)
2. Agent calls `mem_save` → title, type, What/Why/Where/Learned
3. Engram persists to SQLite with FTS5 indexing
4. Next session: agent searches memory, gets relevant context

[Full details on session lifecycle → docs/architecture]

## Core Concepts

- **Agent-agnostic**: Works with any MCP-compatible agent
- **Single binary**: No dependencies, just download and run
- **Zero configuration**: Works out of the box with sensible defaults
- **Persistent storage**: SQLite database with FTS5 full-text search
- **MCP server**: Standard Model Context Protocol implementation

[Explore the architecture → docs/architecture]
[See all MCP tools → docs/mcp-tools]
[Try the Terminal UI → docs/tui]