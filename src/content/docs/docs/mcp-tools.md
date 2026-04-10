---
title: MCP Tools
description: Complete reference of Engram's Model Context Protocol tools
---

# MCP Tools

Engram exposes all functionality through the Model Context Protocol (MCP) as a set of standardized tools. These tools are available to any MCP-compatible agent.

## Memory Operations

### mem_save
Save a new memory observation.

**Parameters:**
- `title` (string, required): Short title for the memory
- `message` (string, required): The full content of the memory
- `type` (string, optional): Type/category of memory (default: "observation")
- `project` (string, optional): Project name for memory segmentation

**Returns:**
- `id` (string): Unique identifier for the saved memory

**Example:**
```python
# Save a memory about a bug fix
await mem_save({
    title: "Fix authentication bug",
    message: "Fixed JWT token validation in auth middleware. Issue was with expired token handling.",
    type: "bugfix",
    project: "web-api"
})
```

### mem_update
Update an existing memory by ID.

**Parameters:**
- `id` (string, required): The memory ID to update
- `title` (string, optional): New title for the memory
- `message` (string, optional): New content for the memory
- `type` (string, optional): New type for the memory

**Returns:**
- `success` (boolean): Whether the update was successful

### mem_delete
Delete a memory (soft or hard delete).

**Parameters:**
- `id` (string, required): The memory ID to delete
- `hard` (boolean, optional): If true, permanently delete. If false, soft delete (default: false)

**Returns:**
- `success` (boolean): Whether the deletion was successful

### mem_get_observation
Retrieve a full memory by ID.

**Parameters:**
- `id` (string, required): The memory ID to retrieve

**Returns:**
- `observation` (object): The complete memory object with all fields

### mem_search
Search memories using full-text search.

**Parameters:**
- `query` (string, required): The search query
- `limit` (number, optional): Maximum number of results (default: 10)
- `offset` (number, optional): Number of results to skip (default: 0)
- `project` (string, optional): Limit search to specific project

**Returns:**
- `results` (array): Array of matching memory objects
- `total` (number): Total number of matches

**Example:**
```python
# Search for memories about authentication
results = await mem_search({
    query: "authentication JWT token",
    limit: 5
})
```

### mem_suggest_topic_key
Get a stable topic key for evolving topics.

**Parameters:**
- `title` (string, required): Proposed title/topic
- `context` (string, optional): Additional context for the topic

**Returns:**
- `topic_key` (string): A stable, normalized key for the topic

### mem_session_summary
Get a summary of the current session.

**Parameters:**
- None

**Returns:**
- `summary` (object): Session statistics and recent memories

### mem_context
Get recent session context.

**Parameters:**
- `limit` (number, optional): Number of recent memories to return (default: 5)
- `project` (string, optional): Limit to specific project

**Returns:**
- `memories` (array): Recent memories from the current session

### mem_timeline
Get chronological drill-in for memories.

**Parameters:**
- `start_date` (string, optional): Start date in ISO format
- `end_date` (string, optional): End date in ISO format
- `limit` (number, optional): Maximum number of results (default: 50)
- `project` (string, optional): Limit to specific project

**Returns:**
- `timeline` (array): Memories in chronological order

### mem_save_prompt
Save the user's prompt as a memory.

**Parameters:**
- `prompt` (string, required): The user's prompt to save
- `title` (string, optional): Title for the memory (default: "User Prompt")
- `project` (string, optional): Project name for segmentation

**Returns:**
- `id` (string): Unique identifier for the saved prompt

### mem_stats
Get memory statistics.

**Parameters:**
- None

**Returns:**
- `stats` (object): Database statistics including count, size, etc.

### mem_session_start
Register the start of a session.

**Parameters:**
- `agent_name` (string, optional): Name of the agent starting the session
- `project` (string, optional): Project name for the session

**Returns:**
- `session_id` (string): Unique identifier for the session

### mem_session_end
Mark the completion of a session.

**Parameters:**
- `session_id` (string, required): The session ID to end
- `summary` (string, optional): Summary of the session's work

**Returns:**
- `success` (boolean): Whether the session was ended successfully

### mem_capture_passive
Extract learnings from text output.

**Parameters:**
- `text` (string, required): Text content to analyze for learnings
- `source` (string, optional): Source of the text (e.g., "terminal output", "log file")
- `project` (string, optional): Project name for segmentation

**Returns:**
- `learnings` (array): Extracted learnings as memory objects

### mem_merge_projects
Merge project name variants (admin tool).

**Parameters:**
- `source` (string, required): Project name to merge from
- `target` (string, required): Project name to merge into
- `dry_run` (boolean, optional): If true, only show what would be merged (default: false)

**Returns:**
- `merged_count` (number): Number of memories that were merged

## Tool Categories

### Memory Creation
- `mem_save`: Create new memories
- `mem_save_prompt`: Save user prompts as memories

### Memory Retrieval
- `mem_get_observation`: Get single memory by ID
- `mem_search`: Full-text search memories
- `mem_context`: Get recent session context
- `mem_timeline`: Get chronological memories
- `mem_session_summary`: Get session summary

### Memory Modification
- `mem_update`: Update existing memories
- `mem_delete`: Delete memories (soft/hard)
- `mem_capture_passive`: Extract learnings from text

### Session Management
- `mem_session_start`: Start a new session
- `mem_session_end`: End a session

### Administrative
- `mem_stats`: Get database statistics
- `mem_merge_projects`: Merge project variants
- `mem_suggest_topic_key`: Get stable topic keys

## Best Practices

### Memory Titles
- Keep titles short and descriptive (under 60 characters)
- Use consistent capitalization and formatting
- Include relevant keywords for searchability

### Memory Content
- Include the "What/Why/Where/Learned" structure
- Be specific about technical details
- Include file names, function names, error messages when relevant
- Note alternatives considered and why they were rejected

### Project Organization
- Use projects to separate different codebases or features
- Use consistent project naming (kebab-case recommended)
- Consider using project names that match your git repositories

### Memory Types
- `observation`: General memory (default)
- `bugfix`: Memory about fixing a bug
- `feature`: Memory about implementing a feature
- `design`: Memory about architectural decisions
- `learned`: Memory about something new learned
- `reference`: Memory about documentation or references

### Search Optimization
- Include relevant keywords in both title and message
- Use consistent terminology for easier searching
- Consider adding synonyms or alternative phrasings
- Update memories when new information becomes available

[See the CLI Reference → docs/cli-reference]
[Learn about the Terminal UI → docs/tui]
[Review the Architecture → docs/architecture]