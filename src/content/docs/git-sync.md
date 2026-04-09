---
title: Git Sync
description: Synchronize memories across machines using Git
---

# Git Sync

Engram includes built-in Git synchronization capabilities to share memories across machines or teams without merge conflicts or large file transfers.

## How Git Sync Works

Instead of transferring raw memory files, Engram's Git sync works by:

1. **Chunk-based storage**: Memories are stored as compressed, individual chunks
2. **Append-only structure**: New memories create new chunks, never modifying existing ones
3. **Content-addressable**: Chunks are named by their hash, preventing duplicates
4. **Git-friendly**: Small, binary-safe files that Git handles efficiently

This approach eliminates merge conflicts and keeps repository size manageable even with thousands of memories.

## Setup

### Initialize Git Repository

First, initialize a Git repository in your Engram directory:

```bash
# The default Engram directory is ~/.engram
cd ~/.engram
git init

# Configure user (if not already set)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Create initial commit
git add .
git commit -m "Initial Engram commit"
```

### Connect to Remote

Add your remote repository (GitHub, GitLab, self-hosted, etc.):

```bash
git remote add origin https://github.com/yourusername/engram-sync.git
git push -u origin main
```

## Usage

### Export New Memories

To export new memories as a compressed chunk:

```bash
engram sync
```

This command:
1. Finds memories not yet exported
2. Compresses them into a new chunk file
3. Adds the chunk to the Git index
4. Shows what will be committed

You then need to commit and push:

```bash
git add .engram/
git commit -m "sync engram memories"
git push
```

### Import Memories from Another Machine

On another machine, to import new chunks:

```bash
# Pull changes from remote
git pull

# Import new chunks
engram sync --import
```

### Check Sync Status

To see what needs to be synced:

```bash
engram sync --status
```

This shows:
- Number of memories ready for export
- Number of chunks available for import
- Last sync timestamp

### View Statistics

For detailed synchronization statistics:

```bash
engram sync --stats
```

Shows:
- Total chunks in repository
- Total memories represented
- Storage efficiency metrics
- Sync history

## Advanced Usage

### Custom Sync Directory

If you store Engram data in a non-standard location:

```bash
# Specify Engram directory
ENGRAM_DB_PATH=/path/to/your/engram/db engram sync
```

Or configure it permanently:

```bash
echo "ENGRAM_DB_PATH=/path/to/your/engram/db" >> ~/.engram/.env
```

### Selective Sync by Project

To sync only specific projects:

```bash
# Export only web-app project memories
engram sync --project web-app

# Import and apply only to web-app project
engram sync --import --project web-app
```

### Automated Sync

You can automate sync with cron jobs or similar:

```bash
# Export every 30 minutes
*/30 * * * * cd ~/.engram && engram sync && git add .engram/ && git commit -m "auto-sync engram memories" && git push

# Import every hour
0 * * * * cd ~/.engram && git pull && engram sync --import
```

### SSH Keys for Authentication

For password-less authentication with Git servers:

```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Add public key to your Git service (GitHub, GitLab, etc.)
```

## Best Practices

### Commit Frequency
- Sync regularly (daily or after significant work sessions)
- Avoid letting too many memories accumulate between syncs
- Consider syncing after completing meaningful tasks

### Commit Messages
Use descriptive commit messages:
- `"sync engram memories: bugfix authentication"`
- `"engram sync: feature development web-api"`
- `"memory sync: refactor database layer"`

### Branch Strategy
For teams, consider:
- `main` branch: stable, synced memories
- `feature/*` branches: work-in-progress memories
- Regular rebasing to keep history clean

### Conflict Resolution
While merge conflicts are rare with Engram's chunk-based approach, if they occur:
1. The conflicting chunks will be identified by Git
2. You can manually inspect and resolve them
3. Since chunks are append-only, usually you can keep both sides

### Security Considerations
- Remember that your Engram data may contain sensitive information
- Consider private repositories for proprietary code memories
- Review what you're syncing before pushing to shared repositories
- Use `.gitignore` to exclude sensitive files if needed

## Technical Details

### Chunk Format
Each chunk file contains:
- **Header**: Magic number, version, timestamp
- **Entry count**: Number of memories in the chunk
- **Memory entries**: Compressed individual memories with:
  - Length-prefixed title
  - Length-prefixed content
  - Metadata (type, project, timestamps)
- **Footer**: Checksum for integrity verification

### Compression
Engram uses:
- **Zstandard (zstd)** compression for excellent ratio and speed
- **Dictionary compression** for repeated patterns in similar memories
- **Chunk-level** rather than memory-level compression for better efficiency

### File Naming
Chunk files are named using:
- **Hash of content**: Prevents duplicates
- **Timestamp**: Allows rough chronological ordering
- **Project hash**: When project segmentation is used

Example: `a1b2c3d4_20240115_143022.chunk`

### Storage Efficiency
Typical results:
- 10x compression ratio vs JSON export
- 1-2KB per average memory chunk
- Minimal repository growth over time
- Fast sync operations even with large histories

## Troubleshooting

### "Nothing to sync" but know there are new memories
Run with verbose flag to see what's being checked:
```bash
ENGRAM_LOG_LEVEL=debug engram sync
```

### Sync taking too long
Check:
- Number of memories waiting to be exported
- Network bandwidth for large initial transfers
- Disk I/O speed on the machine

### Import fails with hash mismatch
This usually indicates:
- Corrupted chunk file (try re-pulling from remote)
- Concurrent modification during sync
- Disk corruption (verify your storage)

### Permission errors
Ensure you have read/write access to:
- The Engram directory (`~/.engram` by default)
- The Git repository directory
- Temporary files created during sync

## Examples

### Individual Developer Workflow
```bash
# After completing a task
engram save "Implemented user caching" "Added Redis caching layer to user service" --type feature --project web-app
engram sync
git add .engram/
git commit -m "feat: add user caching"
git push

# Next day, before starting work
git pull
engram sync --import
engram context --limit 20
```

### Team Shared Knowledge Base
```bash
# Setup (once per machine)
mkdir -p ~/engram-team
cd ~/engram-team
git init
git remote add origin https://github.com/team/engram-sync.git
git pull origin main

# Daily workflow
# Morning
git pull
engram sync --import
engram search "yesterday's topic"

# Throughout day
# Work normally, Engram saves memories automatically

# Evening
engram sync
git add .engram/
git commit -m "team sync: $(date +%Y-%m-%d)"
git push
```

### Open Source Project
For public projects wanting to share non-proprietary learnings:
```bash
# Public repo for shared engineering knowledge
git remote add origin https://github.com/yourorg/project-engram-public.git

# In .gitignore, exclude sensitive patterns:
# *private*
# *secret*
# *key*
# *token*

# Sync only public learnings
engram sync --project public-learnings
```

[See the CLI Reference → docs/cli-reference]
[Learn about MCP Tools → docs/mcp-tools]
[Review the Architecture → docs/architecture]