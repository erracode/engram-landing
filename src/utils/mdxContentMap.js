// MDX Content Map - Engram Documentation
// This maps window IDs to their HTML content

export const MDX_CONTENT_MAP = {
  kernel: `
<div class="space-y-4">
<h1>Kernel Interface</h1>

<div class="not-prose">

> **engram** <code>/ˈen.ɡræm/</code> — *neuroscience*: the physical trace of a memory in the brain.

Your AI coding agent forgets everything when the session ends. Engram gives it a brain.

</div>

## Architecture

A **Go binary** with SQLite + FTS5 full-text search. Works with **any agent** that supports MCP.

<div class="grid gap-4 my-6">
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#e8e8e8] font-mono text-sm mb-2"><strong>[01] AGENT</strong></p>
<p class="text-[#999999] text-sm">Claude, OpenCode, Gemini CLI, Codex, VS Code</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#e8e8e8] font-mono text-sm mb-2"><strong>[02] MCP STDIO</strong></p>
<p class="text-[#999999] text-sm">Standardized protocol for agent-tool communication</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#e8e8e8] font-mono text-sm mb-2"><strong>[03] ENGRAM</strong></p>
<p class="text-[#999999] text-sm">Single Go binary · SQLite · FTS5</p>
</div>
</div>

<pre class="bg-[#0a0a0a] p-4 rounded border border-[#222222] font-mono text-sm">
Agent → MCP stdio → Engram → SQLite + FTS5
</pre>

**That's it.** No Node.js, no Python, no Docker. **One binary, one SQLite file.**

---

<div class="text-center mt-8">

**Persistent memory for AI coding agents**  
<em class="text-[#999999]">Agent-agnostic · Single binary · Zero dependencies</em>

</div>
</div>
  `,

  installation: `
<div class="space-y-6">
<h1>Installation</h1>

<p>Engram is a <strong>single binary</strong> with zero runtime dependencies.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[01] HOME BREW</strong></p>
<p class="text-[#e8e8e8] text-sm mb-2">macOS / Linux</p>
<pre class="font-mono text-xs text-[#e8e8e8] bg-[#0a0a0a] p-2 rounded">brew install gentleman-programming/tap/engram</pre>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[02] GO INSTALL</strong></p>
<p class="text-[#e8e8e8] text-sm mb-2">Windows / Source Build</p>
<pre class="font-mono text-xs text-[#e8e8e8] bg-[#0a0a0a] p-2 rounded">go install github.com/Gentleman-Programming/engram/cmd/engram@latest</pre>
</div>
</div>

<h2>Requirements</h2>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<ul class="list-disc list-inside space-y-2 text-[#999999] text-sm">
<li><strong>Go 1.25+</strong> to build from source</li>
<li><strong>SQLite3</strong> development headers (optional, for building)</li>
<li>No runtime dependencies required</li>
</ul>
</div>

<div class="bg-[#111111] border border-[#222222] p-4 rounded mt-4">
<p class="text-[#e8e8e8] font-mono text-sm mb-2"><strong>Binary Size:</strong></p>
<p class="text-[#999999] text-sm">~15MB compressed · ~45MB unpacked (statically linked)</p>
</div>
</div>
  `,

  agentSetup: `
<div class="space-y-6">
<h1>Agent Setup</h1>

<p>Engram works with <strong>any MCP-compatible agent</strong>.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[01] CLAUDE CODE</strong></p>
<pre class="text-[#e8e8e8] font-mono text-xs bg-[#0a0a0a] p-2 rounded mt-2">claude plugin marketplace add Gentleman-Programming/engram</pre>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[02] OPENCODE</strong></p>
<pre class="text-[#e8e8e8] font-mono text-xs bg-[#0a0a0a] p-2 rounded mt-2">engram setup opencode</pre>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[03] GEMINI CLI</strong></p>
<pre class="text-[#e8e8e8] font-mono text-xs bg-[#0a0a0a] p-2 rounded mt-2">engram setup gemini-cli</pre>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[04] VS CODE</strong></p>
<pre class="text-[#e8e8e8] font-mono text-xs bg-[#0a0a0a] p-2 rounded mt-2">code --add-mcp '{"name":"engram","command":"engram","args":["mcp"]}'</pre>
</div>
</div>

<h2>Surviving Compaction</h2>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<pre class="font-mono text-sm text-[#e8e8e8]">
## Memory
You have access to Engram persistent memory via MCP tools.
- Save proactively after significant work.
- After any compaction, call <code>mem_context</code> to recover session state.
</pre>
</div>
</div>
  `,

  architecture: `
<div class="space-y-6">
<h1>Architecture</h1>

<div class="not-prose">

> **Engineered for persistence**  
> *Every decision made for durability, performance, and simplicity.*

</div>

## Layered Architecture

Engram uses a **three-layer architecture** for clean separation of concerns:

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[01] INTERFACE</strong></p>
<p class="text-[#e8e8e8] text-sm">MCP Stdio Protocol</p>
<p class="text-[#999999] text-xs mt-2">Agent communication layer. Handles JSON-RPC messages, tool calls, and streaming responses.</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[02] LOGIC</strong></p>
<p class="text-[#e8e8e8] text-sm">Memory Operations</p>
<p class="text-[#999999] text-xs mt-2">Save, load, search, index. Business logic isolated from I/O concerns.</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[03] PERSISTENCE</strong></p>
<p class="text-[#e8e8e8] text-sm">SQLite + FTS5</p>
<p class="text-[#999999] text-xs mt-2">Structured data in SQLite, full-text search via FTS5 virtual tables.</p>
</div>
</div>

## Data Flow

<div class="bg-[#111111] border border-[#222222] p-4 rounded my-6">
<pre class="font-mono text-xs text-[#e8e8e8]">
┌──────────┐     ┌─────────┐     ┌──────────┐     ┌────────┐
│  Agent   │ ──▶ │  MCP    │ ──▶ │ Engram   │ ──▶ │ SQLite │
│ (Any)    │     │ Protocol│     │  Logic   │     │  + FTS │
└──────────┘     └─────────┘     └──────────┘     └────────┘
</pre>
</div>

## Design Principles

<div class="space-y-3">
<div class="flex items-start gap-3">
<span class="text-[#4A9E5C] font-mono text-sm mt-0.5">✓</span>
<div>
<p class="text-[#e8e8e8] text-sm"><strong>Single Responsibility</strong></p>
<p class="text-[#999999] text-xs">Each component does one thing exceptionally well</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="text-[#4A9E5C] font-mono text-sm mt-0.5">✓</span>
<div>
<p class="text-[#e8e8e8] text-sm"><strong>Zero Dependencies</strong></p>
<p class="text-[#999999] text-xs">No external packages beyond Go standard library</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="text-[#4A9E5C] font-mono text-sm mt-0.5">✓</span>
<div>
<p class="text-[#e8e8e8] text-sm"><strong>Fast by Default</strong></p>
<p class="text-[#999999] text-xs">FTS5 indexing enables sub-millisecond search</p>
</div>
</div>
</div>

---

<div class="mt-8 p-4 bg-[#111111] border border-[#222222] rounded">
<p class="text-[#999999] text-sm font-mono"><strong>[INFO]</strong> Architecture is minimal by design. Every line of code serves a purpose.</p>
</div>
</div>
  `,

  mcpTools: `
<div class="space-y-6">
<h1>MCP Tools</h1>

<div class="not-prose">

> **Model Context Protocol integration**  
> *Connect Engram to any MCP-compatible tool or agent.*

</div>

## Available Tools

Engram provides the following MCP tools:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[01] save</strong></p>
<p class="text-[#e8e8e8] text-sm">Store new memory items with optional tags</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[02] load</strong></p>
<p class="text-[#e8e8e8] text-sm">Retrieve memories by ID or UUID</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[03] search</strong></p>
<p class="text-[#e8e8e8] text-sm">FTS5 full-text search across all memories</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[04] list</strong></p>
<p class="text-[#e8e8e8] text-sm">Paginated listing with filters</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[05] delete</strong></p>
<p class="text-[#e8e8e8] text-sm">Remove memories permanently</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[06] export</strong></p>
<p class="text-[#e8e8e8] text-sm">Export memories to JSON or Markdown</p>
</div>
</div>

## Example Request

<div class="bg-[#111111] border border-[#222222] p-4 rounded my-6">
<pre class="font-mono text-xs text-[#e8e8e8]">
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "save",
    "arguments": {
      "content": "User prefers dark mode in IDE settings",
      "tags": ["preferences", "ui", "ide"],
      "metadata": {
        "source": "claude-code",
        "session": "2024-01-15"
      }
    }
  }
}
</pre>
</div>

## Response Format

<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<pre class="font-mono text-xs text-[#e8e8e8]">
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Memory saved successfully. ID: abc123"
      }
    ],
    "isError": false
  }
}
</pre>
</div>

---

<div class="mt-8 text-center">
<p class="text-[#e8e8e8] text-lg font-mono mb-2">Seamless integration</p>
<p class="text-[#999999] text-sm">Works with any MCP-compatible agent.</p>
</div>
</div>
  `,

  tui: `
<div class="space-y-6">
<h1>Text User Interface</h1>

<div class="not-prose">

> **Terminal-native operations**  
> *Direct control, full power, zero abstraction.*

</div>

## Features

Access Engram through a powerful terminal interface:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[01] COMMAND LINE</strong></p>
<p class="text-[#e8e8e8] text-sm">Full control via shell commands</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[02] PIPELINE</strong></p>
<p class="text-[#e8e8e8] text-sm">Integrate with existing workflows</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[03] SCRIPTING</strong></p>
<p class="text-[#e8e8e8] text-sm">Automate memory operations</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[04] EXPORT</strong></p>
<p class="text-[#e8e8e8] text-sm">Export memories in multiple formats</p>
</div>
</div>

## Basic Commands

<div class="bg-[#111111] border border-[#222222] p-4 rounded my-6">
<pre class="font-mono text-sm text-[#e8e8e8]">
$ engram list                    # List all memories
$ engram search "authentication" # Full-text search
$ engram load 12345              # Load specific memory
$ engram save                    # Manual save
$ engram export json             # Export to JSON
$ engram export markdown         # Export as Markdown
</pre>
</div>

## Interactive Mode

<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<pre class="font-mono text-xs text-[#e8e8e8]">
$ engram shell
─────────────────────────────────────
Engram Interactive Shell v0.1.0
─────────────────────────────────────
> list
[1] authentication-flow-2024-01-15
[2] api-integration-notes
[3] debugging-tips

> search "database"
Found 12 results...

> help
Show this help message
</pre>
</div>

---

<div class="mt-8 text-center">
<p class="text-[#e8e8e8] text-lg font-mono mb-2">Power in the terminal</p>
<p class="text-[#999999] text-sm">For those who prefer keyboards over mice.</p>
</div>
</div>
  `,

  gitSync: `
<div class="space-y-6">
<h1>Git Synchronization</h1>

<div class="not-prose">

> **Version-controlled memory backups**  
> *Every change tracked, reviewed, and versioned.*

</div>

## Automatic Backup

Engram syncs your memory vault to Git automatically:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[01] AUTOMATIC</strong></p>
<p class="text-[#e8e8e8] text-sm">Commits happen automatically on save</p>
<p class="text-[#999999] text-xs mt-2">No manual intervention required. Every memory operation is versioned.</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[02] ENCRYPTED</strong></p>
<p class="text-[#e8e8e8] text-sm">Sensitive data is encrypted before commit</p>
<p class="text-[#999999] text-xs mt-2">AES-256 encryption for personal or proprietary information.</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[03] BRANCHES</strong></p>
<p class="text-[#e8e8e8] text-sm">Support for multiple experiment branches</p>
<p class="text-[#999999] text-xs mt-2">Test different approaches with separate branches.</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
<p class="text-[#2596be] font-mono text-sm mb-2"><strong>[04] REMOTE</strong></p>
<p class="text-[#e8e8e8] text-sm">Push to GitHub, GitLab, or self-hosted</p>
<p class="text-[#999999] text-xs mt-2">Choose your hosting provider or keep local.</p>
</div>
</div>

## Configuration

<div class="bg-[#111111] border border-[#222222] p-4 rounded my-6">
<pre class="font-mono text-xs text-[#e8e8e8]"><strong>~/.engram/config.yaml:</strong>

sync:
  enabled: true
  auto_commit: true
  encryption_key: env:SYNC_KEY
  remote: https://github.com/user/memory-vault.git
  branch: main
  encrypt_patterns:
    - "api_key*"
    - "password*"
    - "secret*"</pre>
</div>

## Commands

<div class="space-y-2">
<div class="bg-[#111111] border border-[#222222] p-3 rounded">
<p class="text-[#2596be] font-mono text-sm mb-1"><strong>engram sync init</strong></p>
<p class="text-[#999999] text-xs">Initialize Git repository for memory vault</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-3 rounded">
<p class="text-[#2596be] font-mono text-sm mb-1"><strong>engram sync connect &lt;url&gt;</strong></p>
<p class="text-[#999999] text-xs">Connect to remote repository</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-3 rounded">
<p class="text-[#2596be] font-mono text-sm mb-1"><strong>engram sync enable</strong></p>
<p class="text-[#999999] text-xs">Enable automatic synchronization</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-3 rounded">
<p class="text-[#2596be] font-mono text-sm mb-1"><strong>engram sync status</strong></p>
<p class="text-[#999999] text-xs">Show current sync state and pending changes</p>
</div>
</div>

---

<div class="mt-8 text-center">
<p class="text-[#e8e8e8] text-lg font-mono mb-2">Your memory, versioned.</p>
<p class="text-[#999999] text-sm">Never lose context again.</p>
</div>
</div>
  `,

  docs: `
<div class="space-y-6">
<h1>Documentation</h1>

<p>Complete reference for Engram.</p>

<h2>Quick Links</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
<div class="bg-[#111111] p-4 rounded border border-[#222222]">
  <p class="text-[#2596be] font-mono font-bold mb-2"><strong>[01] INSTALLATION</strong></p>
  <p class="text-[#e8e8e8] text-sm">Install on macOS, Linux, or Windows.</p>
</div>
<div class="bg-[#111111] p-4 rounded border border-[#222222]">
  <p class="text-[#2596be] font-mono font-bold mb-2"><strong>[02] AGENT SETUP</strong></p>
  <p class="text-[#e8e8e8] text-sm">Configure with your agent.</p>
</div>
<div class="bg-[#111111] p-4 rounded border border-[#222222]">
  <p class="text-[#2596be] font-mono font-bold mb-2"><strong>[03] ARCHITECTURE</strong></p>
  <p class="text-[#e8e8e8] text-sm">MCP tools, SQLite + FTS5.</p>
</div>
<div class="bg-[#111111] p-4 rounded border border-[#222222]">
  <p class="text-[#2596be] font-mono font-bold mb-2"><strong>[04] MCP TOOLS</strong></p>
  <p class="text-[#e8e8e8] text-sm">15 tools reference.</p>
</div>
<div class="bg-[#111111] p-4 rounded border border-[#222222]">
  <p class="text-[#2596be] font-mono font-bold mb-2"><strong>[05] TERMINAL UI</strong></p>
  <p class="text-[#e8e8e8] text-sm">Interactive CLI interface.</p>
</div>
<div class="bg-[#111111] border border-[#222222] p-4 rounded">
  <p class="text-[#2596be] font-mono font-bold mb-2"><strong>[07] GIT SYNC</strong></p>
  <p class="text-[#e8e8e8] text-sm">Share memories across machines.</p>
</div>
</div>

---

<div class="mt-8 text-center">

<p class="text-[#999999] text-sm mb-2">License: MIT</p>

<p class="text-[#999999] text-sm">
Inspired by <a href="https://github.com/thedotmack/claude-mem" class="text-[#2596be] hover:text-[#00f2ff] hover:underline transition-colors">claude-mem</a>
— but agent-agnostic, simpler, <code>built different</code>.
</p>

</div>
</div>
  `,
}
