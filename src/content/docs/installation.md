---
title: Installation
description: How to install Engram on various platforms
---

# Installation

Engram is distributed as a single Go binary with no dependencies. Choose your preferred installation method.

## Homebrew (macOS/Linux)

```bash
brew install gentleman-programming/tap/engram
```

## Direct Download

Download the latest release from the [GitHub releases page](https://github.com/Gentleman-Programming/engram/releases):

```bash
# macOS (Apple Silicon)
curl -LO https://github.com/Gentleman-Programming/engram/releases/latest/download/engram-darwin-arm64
chmod +x engram-darwin-arm64
sudo mv engram-darwin-arm64 /usr/local/bin/engram

# macOS (Intel)
curl -LO https://github.com/Gentleman-Programming/engram/releases/latest/download/engram-darwin-amd64
chmod +x engram-darwin-amd64
sudo mv engram-darwin-amd64 /usr/local/bin/engram

# Linux (x86_64)
curl -LO https://github.com/Gentleman-Programming/engram/releases/latest/download/engram-linux-amd64
chmod +x engram-linux-amd64
sudo mv engram-linux-amd64 /usr/local/bin/engram

# Linux (ARM64)
curl -LO https://github.com/Gentleman-Programming/engram/releases/latest/download/engram-linux-arm64
chmod +x engram-linux-arm64
sudo mv engram-linux-arm64 /usr/local/bin/engram
```

## Windows

Download the Windows executable from the releases page and add it to your PATH.

## From Source

```bash
git clone https://github.com/Gentleman-Programming/engram.git
cd engram
go build -o engram ./cmd/engram
sudo mv engram /usr/local/bin/
```

## Verification

Verify the installation worked correctly:

```bash
engram version
# Should output something like: v0.1.0
```

## Troubleshooting

### "command not found" after installation

Ensure the installation directory (`/usr/local/bin` by default) is in your PATH.

### Permission denied

You may need to use `sudo` to move the binary to a system directory, or install to a user-writable location like `~/bin`.

### Wrong architecture

Make sure you downloaded the correct binary for your CPU architecture (arm64 vs amd64).