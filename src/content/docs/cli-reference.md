---
title: CLI Reference
description: Complete reference of Engram's command line interface
---

# CLI Reference

Engram's command line interface provides direct access to all functionality. This reference covers all available commands and their usage.

## Global Options

These options are available on all commands:

- `--help`: Show help for a command
- `--version`: Show Engram version
- `--verbose`: Enable verbose logging
- `--quiet`: Suppress non-essential output
- `--json`: Output results in JSON format

## Core Commands

### engram setup [agent]
Configure Engram for a specific AI coding agent.

**Usage:**
```bash
engram setup [agent]
```

**Arguments:**
- `agent`: Agent name (opencode, gemini-cli, codex, etc.)

**Examples:**
```bash
engram setup opencode
engram setup gemini-cli
engram setup codex
```

If no agent is specified, Engram will start the MCP server in stdio mode.

### engram serve [port]
Start the HTTP API server.

**Usage:**
```bash
engram serve [port]
```

**Arguments:**
- `port`: Port number to listen on (default: 7437)

**Examples:**
```bash
engram serve          # Starts on port 7437
engram serve 8080     # Starts on port 8080
```

### engram mcp
Start the MCP server (stdio mode). This is the default mode when no command is specified.

**Usage:**
```bash
engram mcp
```

**Options:**
- `--project NAME`: Set default project name for memories
- `--db-path PATH`: Specify custom path for SQLite database

**Examples:**
```bash
engram mcp
engram mcp --project my-web-app
engram mcp --db-path /data/engram.db
```

### engram tui
Launch the terminal user interface.

**Usage:**
```bash
engram tui
```

### engram save <title> <msg>
Save a new memory observation.

**Usage:**
```bash
engram save <title> <msg>
```

**Arguments:**
- `title`: Short title for the memory
- `msg`: Full content of the memory

**Options:**
- `-t, --type TYPE`: Memory type (default: "observation")
- `-p, --project PROJECT`: Project name for segmentation

**Examples:**
```bash
engram save "Fix login bug" "Fixed JWT validation in auth middleware"
engram save "API Design" "Decided to use REST with JSON over HTTP/2" --type design
engram save "Database schema" "Added user_preferences table" --type feature --project web-app
```

### engram search <query>
Search memories using full-text search.

**Usage:**
```bash
engram search <query>
```

**Arguments:**
- `query`: The search query

**Options:**
- `-l, --limit NUM`: Maximum results to return (default: 10)
- `-o, --offset NUM`: Number of results to skip (default: 0)
- `-p, --project PROJECT`: Limit search to specific project
- `--json`: Output results in JSON format

**Examples:**
```bash
engram search "authentication"
engram search "JWT token" --limit 5
engram search "database" --project web-app --json
```

### engram timeline <obs_id>
Get chronological context for a memory.

**Usage:**
```bash
engram timeline <obs_id>
```

**Arguments:**
- `obs_id`: The memory ID to get timeline for

**Options:**
- `-l, --limit NUM`: Maximum results to return (default: 50)
- `--json`: Output results in JSON format

**Examples:**
```bash
engram timeline abc123
engram timeline abc123 --limit 20 --json
```

### engram context [project]
Get recent session context.

**Usage:**
```bash
engram context [project]
```

**Arguments:**
- `project`: Optional project name to limit context

**Options:**
- `-l, --limit NUM`: Number of recent memories to return (default: 5)
- `--json`: Output results in JSON format

**Examples:**
```bash
engram context
engram context web-app
engram context --limit 10 --json
```

### engram stats
Get memory statistics.

**Usage:**
```bash
engram stats
```

**Options:**
- `--json`: Output results in JSON format

**Example:**
```bash
engram stats --json
# Output: {"count": 142, "size_bytes": 2048000, ...}
```

### engram export [file]
Export memories to JSON format.

**Usage:**
```bash
engram export [file]
```

**Arguments:**
- `file`: Output file path (default: stdout)

**Options:**
- `--project PROJECT`: Only export memories from specific project
- `--since DATE`: Only export memories since date (ISO format)
- `--until DATE`: Only export memories until date (ISO format)

**Examples:**
```bash
engram export                    # Output to stdout
engram export memories.json      # Save to file
engram export backup.json --project web-app
engram export recent.json --since 2024-01-01
```

### engram import <file>
Import memories from JSON format.

**Usage:**
```bash
engram import <file>
```

**Arguments:**
- `file`: Input file path

**Options:**
- `--project PROJECT`: Override project name for imported memories
- `--merge`: Merge with existing memories instead of replacing
- `--dry-run`: Show what would be imported without actually doing it

**Examples:**
```bash
engram import backup.json
engram import memories.json --merge
engram import new.json --dry-run
```

### engram sync
Git sync export/import of memories.

**Usage:**
```bash
engram sync [options]
```

**Options:**
- `--export`: Export new memories as compressed chunk (default)
- `--import`: Import new chunks
- `--status`: Check sync status
- `--stats`: Show synchronization statistics

**Examples:**
```bash
engram sync             # Export new memories
engram sync --import    # Import chunks from another machine
engram sync --status    # Check synchronization status
engram sync --stats     # Show sync statistics
```

### engram version
Show Engram version.

**Usage:**
```bash
engram version
```

**Example:**
```bash
$ engram version
v0.1.0
```

## Project Commands

### engram projects list
Show all projects with observation/session/prompt counts.

**Usage:**
```bash
engram projects list
```

**Options:**
- `--json`: Output results in JSON format

**Example:**
```bash
engram projects list --json
```

### engram projects consolidate
Interactive merge of similar project names.

**Usage:**
```bash
engram projects consolidate [options]
```

**Options:**
- `--all`: Process all similar projects without prompting
- `--dry-run`: Show what would be merged without actually doing it

**Examples:**
```bash
engram projects consolidate
engram projects consolidate --all --dry-run
```

### engram projects prune
Remove projects with 0 observations.

**Usage:**
```bash
engram projects prune [options]
```

**Options:**
- `--dry-run`: Show what would be pruned without actually doing it

**Examples:**
```bash
engram projects prune
engram projects prune --dry-run
```

### engram delete <id>
Delete a memory by ID.

**Usage:**
```bash
engram delete <id>
```

**Options:**
- `--hard`: Permanently delete (default is soft delete)
- `--json`: Output result in JSON format

**Examples:**
```bash
engram delete abc123
engram delete abc123 --hard
engram delete abc123 --json
```

### engram delete-all
Delete all memories (use with caution!).

**Usage:**
```bash
engram delete-all
```

**Options:**
- `--hard`: Permanently delete (default is soft delete)
- `--confirm`: Skip confirmation prompt
- `--json`: Output result in JSON format

**Examples:**
```bash
engram delete-all --confirm
engram delete-all --hard --confirm
```

## Examples

### Typical Workflow
```bash
# Save a memory after fixing a bug
engram save "Fix auth timeout" "Increased JWT expiry from 1h to 24h in auth config" --type bugfix --project web-api

# Later, search for authentication-related work
engram search "authentication" --limit 5

# Get recent context before starting work
engram context --limit 10

# Export memories for backup
engram export backup-$(date +%Y%m%d).json

# Sync with another machine
engram sync
# [Push to git, pull on other machine]
engram sync --import
```

### Agent Integration Examples
```bash
# In your agent's startup script or configuration:
# For Claude Code
claude plugin marketplace add Gentleman-Programming/engram
claude plugin install engram

# For OpenCode
engram setup opencode

# For Gemini CLI
engram setup gemini-cli

# For manual MCP configuration:
# Add to your agent's MCP configuration:
# {
#   "mcpServers": {
#     "engram": {
#       "command": "engram",
#       "args": ["mcp"]
#     }
#   }
# }
```

## Error Codes

Engram uses standard exit codes:
- `0`: Success
- `1`: General error
- `2`: Invalid arguments
- `3`: Memory not found
- `4`: Database error
- `5`: Permission denied
- `6`: Configuration error

## Environment Variables

You can customize Engram's behavior with environment variables:

- `ENGRAM_PROJECT`: Set a default project name for memory segmentation
- `ENGRAM_DB_PATH`: Specify a custom path for the SQLite database (default: `~/.engram/engram.db`)
- `ENGRAM_HTTP_PORT`: Port for HTTP API server (default: 7437)
- `ENGRAM_LOG_LEVEL`: Log level (trace, debug, info, warn, error)
- `ENGRAM_DISABLE_TELEMETRY`: Set to `true` to disable any telemetry

## TCP/IP vs STDIO

Engram supports two communication methods:

### Standard I/O (Default)
- Used by MCP clients like Claude Code, OpenCode, etc.
- No network exposure
- Automatic startup/shutdown with agent
- Best for local agent integration

### HTTP API
- Accessible via `engram serve [port]`
- Useful for web-based agents or remote access
- Same functionality as MCP interface
- Requires explicit network configuration

Choose the method that best fits your agent's capabilities and security requirements.

[See all MCP Tools → docs/mcp-tools]
[Learn about the Terminal UI → docs/tui]
[Review the Architecture → docs/architecture]