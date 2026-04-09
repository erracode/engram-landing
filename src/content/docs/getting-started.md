---
title: Getting Started
description: Begin your journey with Engram
hero:
  image: /engram-banner.png
  alt: Engram banner
  actions:
    - text: Install Engram
      link: /installation
      variant: primary
    - text: Agent Setup
      link: /agent-setup
      variant: secondary
---

# Getting Started with Engram

Welcome to Engram - the persistent memory system for AI coding agents. This guide will help you get started quickly.

## Quick Start

### 1. Install Engram

```bash
brew install gentleman-programming/tap/engram
```

[See all installation methods → docs/installation]

### 2. Setup Your Agent

Choose your AI coding agent:

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

#### VS Code / Cursor / Windsurf
See [Agent Setup → docs/agent-setup] for detailed instructions.

### 3. Save Your First Memory

```bash
engram save "My first memory" "Testing Engram integration" --type observation
```

### 4. Search Your Memories

```bash
engram save "Testing" "testing"  # Create a test memory first
engram search "Testing"
```

## What's Next?

- Explore the [Architecture → docs/architecture] to understand how Engram works
- Learn about all available [MCP Tools → docs/mcp-tools]
- Try the [Terminal User Interface → docs/tui]
- Check the complete [CLI Reference → docs/cli-reference]
- Learn how to sync memories across machines with [Git Sync → docs/git-sync]

## Need Help?

Check our [troubleshooting guide] or reach out through our [GitHub Issues](https://github.com/Gentleman-Programming/engram/issues).

[Return to Home](/)