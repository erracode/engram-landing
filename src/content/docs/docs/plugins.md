---
title: Plugins
description: OpenCode & Claude Code plugins for enhanced memory management
---

# Plugins

Engram provides enhanced plugins for OpenCode and Claude Code that add session management on top of the MCP tools.

## OpenCode Plugin

For [OpenCode](https://opencode.ai) users, the plugin adds enhanced session management:

```bash
# Install via engram (recommended)
engram setup opencode

# Or manually: cp plugin/opencode/engram.ts ~/.config/opencode/plugins/
```

The plugin auto-starts the HTTP server if not already running.

> **Local model compatibility:** Works with all models, including local ones (llama.cpp, Ollama). Memory Protocol is concatenated into existing system prompt.

### What the Plugin Does

- **Auto-starts** the engram server if not running
- **Auto-imports** git-synced memories from `.engram/manifest.json`
- **Creates sessions** on-demand via `ensureSession()`
- **Injects the Memory Protocol** into agent's system prompt
- **Injects previous session context** into the compaction prompt
- **Instructs the compressor** to persist compacted summaries
- **Strips `<private>` tags** before sending data

### Memory Protocol

The plugin injects strict rules into every agent message:

- **WHEN TO SAVE**: Mandatory after bugfixes, decisions, discoveries, config changes, patterns, preferences
- **WHEN TO SEARCH**: Reactive (user says "remember") + proactive (starting work that might overlap past sessions)
- **SESSION CLOSE**: Mandatory `mem_session_summary` before ending
- **AFTER COMPACTION**: Immediately call `mem_context` to recover state

### Three Layers of Memory Resilience

| Layer | Mechanism | Survives Compaction? |
|-------|-----------|---------------------|
| **System Prompt** | `MEMORY_INSTRUCTIONS` concatenated into existing prompt | Always present |
| **Compaction Hook** | Auto-saves checkpoint + injects context + reminds compressor | Fires during compaction |
| **Agent Config** | "After compaction, call `mem_context`" in agent prompt | Always present |

---

## Claude Code Plugin

For [Claude Code](https://docs.anthropic.com/en/docs/claude-code) users:

```bash
# Install via marketplace (recommended)
claude plugin marketplace add Gentleman-Programming/engram
claude plugin install engram

# Or via engram binary
engram setup claude-code

# Or for local development
claude --plugin-dir ./plugin/claude-code
```

### Plugin Features (vs Bare MCP)

| Feature | Bare MCP | Plugin |
|---------|----------|--------|
| 13 memory tools | ✓ | ✓ |
| Session tracking (auto-start) | ✗ | ✓ |
| Auto-import git-synced memories | ✗ | ✓ |
| Compaction recovery | ✗ | ✓ |
| Memory Protocol skill | ✗ | ✓ |
| Previous session context injection | ✗ | ✓ |

### Plugin Structure

```
plugin/claude-code/
├── .claude-plugin/plugin.json  # Plugin manifest
├── .mcp.json                   # Registers engram MCP server
├── hooks/hooks.json            # Session lifecycle hooks
├── scripts/
│   ├── session-start.sh        # Ensures server, creates session, imports chunks
│   ├── post-compaction.sh      # Injects context + recovery instructions
│   ├── subagent-stop.sh        # Passive capture trigger
│   └── session-stop.sh         # Logs end-of-session event
└── skills/memory/SKILL.md      # Memory Protocol
```

### How It Works

**On session start**:
1. Ensures engram HTTP server is running
2. Creates a new session via API
3. Auto-imports git-synced chunks (if present)
4. Injects previous session context

**On compaction**:
1. Injects previous session context + compacted summary
2. Tells agent: "FIRST ACTION REQUIRED — call `mem_session_summary`"
3. Ensures no work is lost when context is compressed

**Memory Protocol skill**:
- Strict rules for **when to save** (mandatory after bugfixes, decisions)
- **When to search** (reactive + proactive)
- **Session close protocol** — mandatory `mem_session_summary`
- **After compaction** — persist summary → load context → continue

---

## Privacy

Engram processes all memory locally. Your data stays in `~/.engram/engram.db` on your machine. No data is sent to external servers unless you enable Git Sync to your own repository.
