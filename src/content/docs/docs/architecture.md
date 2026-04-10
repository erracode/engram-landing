---
title: Architecture
description: How Engram works under the hood
---

# Architecture

Engram is designed to be simple, reliable, and agent-agnostic. Here's how it works under the hood.

## Core Components

### 1. Single Go Binary
Engram is distributed as a single compiled Go binary with:
- **No runtime dependencies**
- **Static linking** when possible
- **Cross-platform compilation** support

### 2. SQLite + FTS5 Storage Engine
All memories are stored in a SQLite database with:
- **FTS5 (Full-Text Search version 5)** for fast, relevant search
- **ACID transactions** for data integrity
- **Efficient storage** with automatic compression
- **Location**: `~/.engram/engram.db` (configurable via `ENGRAM_DB_PATH`)

### 3. Model Context Protocol (MCP) Server
Engram implements the MCP standard for communication with AI agents:
- **Standard input/output (stdio)** transport
- **JSON-RPC 2.0** message format
- **Resource-based** memory organization
- **Tool-based** interaction model

### 4. Command Line Interface (CLI)
Direct terminal access to all Engram functions:
- Memory operations (`save`, `search`, `get`, etc.)
- Server management (`serve`, `mcp`)
- Utility functions (`stats`, `export`, `import`, `sync`)

### 5. Terminal User Interface (TUI)
Interactive interface for browsing and managing memories:
- Full-text search with real-time filtering
- Chronological timeline view
- Memory editing and deletion
- Project-based organization

## Data Flow

### Memory Lifecycle
```
Agent Action
    ↓
MCP Tool Call (e.g., mem_save)
    ↓
Engram Processes Request
    ↓
Data Stored in SQLite + FTS5
    ↓
Confirmation Returned to Agent
```

### Memory Retrieval
```
Agent Requests Context
    ↓
MCP Tool Call (e.g., mem_search or mem_context)
    ↓
Engram Queries SQLite + FTS5
    ↓
Relevant Memories Returned
    ↓
Agent Receives Context
```

## Technical Details

### Database Schema
The SQLite database contains tables for:
- **observations**: Individual memory entries with title, content, timestamps
- **sessions**: Grouping of observations by agent session
- **projects**: Logical grouping of memories (when using `ENGRAM_PROJECT`)
- **embeddings**: Optional vector embeddings for semantic search (future)

### FTS5 Configuration
Engram uses FTS5 with:
- **Trigram tokenization** for flexible matching
- **Ranking algorithm** prioritizing recent and relevant content
- **Automatic index maintenance**
- **Prefix search** support for autocomplete

### MCP Implementation
Engram follows the MCP specification:
- **Standardized tool definitions** (`mem_save`, `mem_search`, etc.)
- **Resource URIs** for accessing memories by ID or context
- **Notifications** for real-time updates (when applicable)
- **Error handling** with standardized error codes

## Security & Privacy

### Local-First Design
- All data stored locally on your machine
- No telemetry or data collection by default
- Network access only when explicitly enabled (HTTP API)

### Data Control
- Complete ownership of your memory data
- Easy export/import for backup and migration
- Ability to wipe all data with `engram delete-all`

### Memory Hygiene
Features to help manage memory growth:
- **Soft deletes** with configurable retention
- **Memory compaction** to remove obsolete entries
- **Project-based isolation** to prevent cross-contamination
- **Search relevance** to surface the most useful memories

## Performance Characteristics

### Storage Efficiency
- Typical compression ratio: 3-5x vs plain text
- FTS5 index overhead: ~30-50% of data size
- Efficient storage of structured data

### Query Performance
- Sub-second search response times
- Linear scaling with number of memories (optimized via FTS5)
- Efficient pagination for large result sets

### Concurrency
- Safe concurrent access from multiple agents
- Reader-writer locking for optimal performance
- Queue-based writes to prevent database locks

## Extensibility

### Plugin Architecture
While Engram is designed to work out-of-the-box, it supports:
- Custom memory types via configuration
- Hooks for pre/post memory operations
- Integration with external systems via MCP

### HTTP API
In addition to MCP stdio, Engram offers:
- RESTful HTTP API on port 7437 (configurable)
- Same functionality as MCP interface
- Useful for web-based agents or custom integrations

## Design Principles

### Simplicity
- Minimal moving parts
- Clear separation of concerns
- Easy to understand and debug

### Reliability
- ACID transactions prevent data corruption
- Graceful handling of disk full conditions
- Recovery from unexpected shutdowns

### Agent-Agnosticism
- No assumptions about agent capabilities
- Works with any MCP implementation
- No requirement for specific agent features

## Future Directions

Planned enhancements include:
- Vector embeddings for semantic search
- Memory clustering and summarization
- Cross-device synchronization protocols
- Advanced access controls and permissions
- Integration with popular agent frameworks

[See the MCP Tools Reference → docs/mcp-tools]
[Learn about the Terminal UI → docs/tui]
[Check the CLI Reference → docs/cli-reference]