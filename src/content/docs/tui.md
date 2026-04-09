---
title: Terminal UI
description: Engram's interactive terminal interface
---

# Terminal UI (TUI)

Engram includes an interactive terminal user interface for browsing, searching, and managing your memories.

## Launching the TUI

```bash
engram tui
```

## Navigation

The TUI uses vim-inspired keybindings:

- **j / ↓**: Move down
- **k / ↑**: Move up
- **h / ←**: Move left
- **l / →**: Move right
- **Enter**: Select / drill in
- **Escape**: Go back / cancel
- **/**: Start search
- **n**: Next search match
- **N**: Previous search match
- **g**: Go to top
- **G**: Go to bottom
- **d**: Delete selected item
- **e**: Edit selected item
- **s**: Save changes
- **c**: Create new memory
- **r**: Refresh view
- **?**: Show help

## Views

### Memory Browser
The main view shows your memories in a list format. You can:
- Browse through recent memories
- Search with `/` to filter the list
- Select memories to view details
- Delete or edit memories

### Memory Detail View
When you select a memory, you see:
- Full title and content
- Metadata (timestamp, type, project)
- Related memories
- Options to edit, delete, or link to other memories

### Search View
When you press `/` to search:
- Real-time filtering as you type
- Results ranked by relevance
- Press Enter to select a result
- Press Escape to cancel search

### Timeline View
Access chronological views of your memories:
- View memories by date
- Drill down into specific time periods
- See patterns in your work over time

### Project View
Organize memories by project:
- List all your projects
- See memory counts per project
- Drill into individual projects
- Merge or rename projects

## Customization

### Appearance
The TUI uses the Catppuccin Mocha theme by default, but you can customize colors through your terminal theme.

### Keybindings
While the keybindings are vim-inspired and not currently customizable, they are designed to be efficient for touch typists.

### Layout
The TUI adapts to your terminal size:
- Wider terminals show more context
- Taller terminals show more items in lists
- Responsive panes for detailed views

## Usage Tips

### Effective Searching
- Use specific keywords from your memories
- Search for error messages, function names, or file paths
- Try different variations if you don't find what you're looking for
- Remember that FTS5 supports prefix matching

### Memory Management
- Regularly review and clean up old memories
- Use projects to separate different work contexts
- Link related memories to build knowledge chains
- Use the edit function to improve memory quality over time

### Workflow Integration
- Open the TUI during your daily planning
- Search for relevant context before starting work
- Save important decisions or learnings immediately after
- Use the timeline view to see your progress over days/weeks

## Commands

All TUI actions are also available as MCP tools or CLI commands:

| TUI Action | Equivalent Command |
|------------|-------------------|
| Save memory | `engram save "Title" "Content"` |
| Search memories | `engram search "query"` |
| View timeline | `engram timeline` |
| Get stats | `engram stats` |
| Delete memory | `engram delete <id>` |

[See all MCP Tools → docs/mcp-tools]
[Learn about the CLI → docs/cli-reference]
[Review the Architecture → docs/architecture]