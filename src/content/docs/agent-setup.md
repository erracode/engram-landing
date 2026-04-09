---
title: Agent Setup
description: Configure Engram with your AI coding agent
---

# Agent Setup

Engram works with any agent that supports the Model Context Protocol (MCP). Below are setup instructions for popular agents.

## Claude Code

```bash
# Add the plugin from the marketplace
claude plugin marketplace add Gentleman-Programming/engram

# Install the plugin
claude plugin install engram
```

That's it! Claude Code will automatically detect and use Engram.

## OpenCode

```bash
# Run the setup command
engram setup opencode
```

This will configure OpenCode to use Engram as its MCP server.

## Gemini CLI

```bash
# Run the setup command
engram setup gemini-cli
```

This configures Gemini CLI to connect to Engram via MCP.

## Codex

```bash
# Run the setup command
engram setup codex
```

This sets up Codex to use Engram for persistent memory.

## VS Code / Cursor / Windsurf / Any MCP-compatible Agent

For agents that support MCP via standard configuration:

1. Open your agent's settings
2. Look for "MCP Servers" or "Model Context Protocol" configuration
3. Add a new MCP server with:
   - **Name**: `engram`
   - **Command**: `engram`
   - **Arguments**: `["mcp"]`
   - **Environment**: (leave blank unless you need to set `ENGRAM_PROJECT`)

### Manual Configuration Example

If your agent uses a JSON configuration file, add:

```json
{
  "mcpServers": {
    "engram": {
      "command": "engram",
      "args": ["mcp"]
    }
  }
}
```

## Environment Variables

You can customize Engram's behavior with environment variables:

- `ENGRAM_PROJECT`: Set a default project name for memory segmentation
- `ENGRAM_DB_PATH`: Specify a custom path for the SQLite database (default: `~/.engram/engram.db`)

## Verification

After setting up your agent, verify the connection works by asking your agent to save a memory:

```
Please save this observation: "Testing Engram integration with [your-agent-name]"
```

Then in a new session, ask your agent to search for that observation.