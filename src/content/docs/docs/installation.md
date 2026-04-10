---
title: Installation
description: Install Engram on macOS, Linux, or Windows
---

Engram is a **single binary** with zero runtime dependencies.

## Homebrew (macOS / Linux)

```bash
brew install gentleman-programming/tap/engram
```

Upgrade to latest:

```bash
brew update && brew upgrade engram
```

> **Migrating from Cask?** If you installed engram before v1.0.1, it was distributed as a Cask. Uninstall first, then reinstall:
> ```bash
> brew uninstall --cask engram 2>/dev/null; brew install gentleman-programming/tap/engram
> ```

## Windows

### Option A: Install via `go install` (recommended)

If you have Go installed, this is the cleanest path:

```powershell
go install github.com/Gentleman-Programming/engram/cmd/engram@latest
```

Ensure `%GOPATH%\bin` is on your PATH.

### Option B: Build from source

```powershell
git clone https://github.com/Gentleman-Programming/engram.git
cd engram
go install ./cmd/engram
```

### Option C: Download the prebuilt binary

1. Go to [GitHub Releases](https://github.com/Gentleman-Programming/engram/releases)
2. Download `engram_<version>_windows_amd64.zip`
3. Extract to a folder in your PATH

> **Antivirus false positives on prebuilt binaries**
>
> Windows Defender may flag some prebuilt releases as malware. This is a **heuristic false positive** — the binary is built reproducibly from public source code.
>
> **Recommended workaround**: Prefer **Option A** or **Option B** (compile locally).

> **Data storage**: Config stored in `%USERPROFILE%\.engram\engram.db`. Override with `ENGRAM_DATA_DIR`.

## Install from source (macOS / Linux)

```bash
git clone https://github.com/Gentleman-Programming/engram.git
cd engram
go install ./cmd/engram
```

## Download binary (all platforms)

Grab the latest release from [GitHub Releases](https://github.com/Gentleman-Programming/engram/releases).

| Platform | File |
|----------|------|
| macOS (Apple Silicon) | `engram_<version>_darwin_arm64.tar.gz` |
| macOS (Intel) | `engram_<version>_darwin_amd64.tar.gz` |
| Linux (x86_64) | `engram_<version>_linux_amd64.tar.gz` |
| Linux (ARM64) | `engram_<version>_linux_arm64.tar.gz` |
| Windows (x86_64) | `engram_<version>_windows_amd64.zip` |

## Requirements

- **Go 1.25+** to build from source (not needed for Homebrew or binary)
- No runtime dependencies required

The binary includes SQLite (pure Go, no CGO). Works natively on **macOS**, **Linux**, and **Windows** (x86_64 and ARM64).

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `ENGRAM_DATA_DIR` | Data directory | `~/.engram` (Windows: `%USERPROFILE%\.engram`) |
| `ENGRAM_PORT` | HTTP server port | `7437` |

## Config Paths

When using `engram setup`, config files are written to:

| Agent | macOS / Linux | Windows |
|-------|---------------|---------|
| OpenCode | `~/.config/opencode/` | `%APPDATA%\opencode\` |
| Gemini CLI | `~/.gemini/` | `%APPDATA%\gemini\` |
| Codex | `~/.codex/` | `%APPDATA%\codex\` |
| VS Code | `.vscode/mcp.json` (workspace) | `.vscode\mcp.json` (workspace) |
