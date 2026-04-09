// MDX content loader for Engram documentation
// This maps MDX file IDs to their HTML content

export const MDX_CONTENT_MAP = {
  kernel: `
<div class="space-y-4">
<h1>Kernel</h1>

<div class="not-prose">

> **engram** <code>/ˈen.ɡræm/</code> — *neuroscience*: the physical trace of a memory in the brain.

Your AI coding agent forgets everything when the session ends. Engram gives it a brain.

</div>

## What is Engram?

A **Go binary** with SQLite + FTS5 full-text search, exposed via CLI, HTTP API, MCP server, and an interactive TUI. Works with **any agent** that supports MCP — Claude Code, OpenCode, Gemini CLI, Codex, VS Code (Copilot), Antigravity, Cursor, Windsurf, or anything else.

<div class="bg-[#0a0a0a] p-6 rounded-lg border border-[#222222] my-4">

<pre><code>Agent (Claude Code / OpenCode / Gemini CLI / Codex / VS Code / Antigravity / ...)
    ↓ MCP stdio
Engram (single Go binary)
    ↓
SQLite + FTS5 (~/.engram/engram.db)</code></pre>

</div>

## How It Works

<div class="space-y-4">

1. **Agent completes** significant work (bugfix, architecture decision, etc.)
2. **Agent calls** <code>mem_save</code> with structured summary
3. **Engram persists** to SQLite with FTS5 indexing
4. **Next session:** agent searches memory, gets relevant context

</div>

<div class="mt-6">

**That's it.** No Node.js, no Python, no Docker. **One binary, one SQLite file.**

</div>

---

<div class="text-center mt-8">

**Persistent memory for AI coding agents**  
*Agent-agnostic. Single binary. Zero dependencies.*

</div>
</div>
  `,

  installation: `
<div class="space-y-6">
<h1>Installation</h1>

<p>Engram is a <strong>single binary</strong> with zero runtime dependencies. Install it on any platform.</p>

<h2>Homebrew (macOS / Linux)</h2>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<pre><code>brew install gentleman-programming/tap/engram</code></pre>

<p>Upgrade to the latest version:</p>

<pre><code>brew update && brew upgrade engram</code></pre>

</div>

<h2>Windows</h2>

<h3>Option A: Install via <code>go install</code> (Recommended)</h3>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<pre><code>go install github.com/Gentleman-Programming/engram/cmd/engram@latest</code></pre>

</div>

<h3>Option B: Build from Source</h3>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<pre><code>git clone https://github.com/Gentleman-Programming/engram.git
cd engram
go install ./cmd/engram</code></pre>

</div>

<h2>Requirements</h2>

<ul>
<li><strong>Go 1.25+</strong> to build from source (not needed if installing via Homebrew or downloading a binary)</li>
<li>That's it. No runtime dependencies.</li>
</ul>
</div>
  `,

  agentSetup: `
<div class="space-y-6">
<h1>Agent Setup</h1>

<p>Engram works with <strong>any MCP-compatible agent</strong>. Pick your agent below.</p>

<h2>Quick Reference</h2>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<ul>
<li><strong>Claude Code:</strong> <code>claude plugin marketplace add Gentleman-Programming/engram</code></li>
<li><strong>OpenCode:</strong> <code>engram setup opencode</code></li>
<li><strong>Gemini CLI:</strong> <code>engram setup gemini-cli</code></li>
<li><strong>Codex:</strong> <code>engram setup codex</code></li>
<li><strong>VS Code:</strong> <code>code --add-mcp '{"name":"engram","command":"engram","args":["mcp"]}'</code></li>
</ul>

</div>

<h2>Surviving Compaction (Recommended)</h2>

<div class="bg-[#050505] p-4 rounded border border-[#222222]">

<pre><code>## Memory
You have access to Engram persistent memory via MCP tools (mem_save, mem_search, mem_session_summary, etc.).
- Save proactively after significant work — don't wait to be asked.
- After any compaction or context reset, call mem_context to recover session state before continuing.</code></pre>

</div>

<p>This is the <strong>nuclear option</strong> — system prompts survive everything, including compaction.</p>
</div>
  `,

  architecture: `
<div class="space-y-6">
<h1>Architecture</h1>

<p>Engram trusts the <strong>agent</strong> to decide what's worth remembering — not a firehose of raw tool calls.</p>

<h2>How It Works</h2>

<div class="bg-[#0a0a0a] p-6 rounded-lg border border-[#222222] my-4">

<pre>1. Agent completes significant work (bugfix, architecture decision, etc.)
2. Agent calls mem_save with a structured summary
3. Engram persists to SQLite with FTS5 indexing
4. Next session: agent searches memory, gets relevant context</pre>

</div>

<h2>Session Lifecycle</h2>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<pre>Session starts → Agent works → Agent saves memories proactively
                                    ↓
Session ends → Agent writes session summary
                                    ↓
Next session starts → Previous session context is injected automatically</pre>

</div>

<h2>MCP Tools</h2>

<ul class="list-disc list-inside space-y-1">
<li><code>mem_save</code> — Save a structured observation</li>
<li><code>mem_search</code> — Full-text search across all memories</li>
<li><code>mem_context</code> — Get recent context from previous sessions</li>
<li><code>mem_timeline</code> — Chronological context around a specific observation</li>
<li><code>mem_session_summary</code> — Save end-of-session summary</li>
</ul>

<h2>Progressive Disclosure (3-Layer Pattern)</h2>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<pre>1. mem_search "auth middleware"     → compact results with IDs (~100 tokens each)
2. mem_timeline observation_id=42  → what happened before/after in that session
3. mem_get_observation id=42       → full untruncated content</pre>

</div>
</div>
  `,

  mcpTools: `
<div class="space-y-6">
<h1>MCP Tools</h1>

<p>Engram exposes <strong>15 MCP tools</strong> for memory management. All tools work via stdio transport and are compatible with any MCP client.</p>

<h2>Core Memory Tools</h2>

<table class="w-full my-4">
  <thead>
    <tr class="border-b border-[#222222]">
      <th class="text-left py-2">Tool</th>
      <th class="text-left py-2">Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_save</code></td>
      <td class="py-2">Save a structured observation (decision, bugfix, pattern, etc.)</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_update</code></td>
      <td class="py-2">Update an existing observation by ID</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_delete</code></td>
      <td class="py-2">Delete an observation (soft or hard)</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_search</code></td>
      <td class="py-2">Full-text search across all memories</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_context</code></td>
      <td class="py-2">Get recent context from previous sessions</td>
    </tr>
    <tr>
      <td class="py-2"><code>mem_session_summary</code></td>
      <td class="py-2">Save end-of-session summary</td>
    </tr>
  </tbody>
</table>

<h2>Progressive Disclosure Pattern</h2>

<p>For token-efficient memory retrieval, use this 3-layer pattern:</p>

<ol class="list-decimal list-inside space-y-2">
  <li><code>mem_search</code> → returns ~10 compact results</li>
  <li><code>mem_timeline</code> → shows related sessions</li>
  <li><code>mem_get_observation</code> → untruncated details</li>
</ol>
</div>
  `,

  tui: `
<div class="space-y-6">
<h1>Terminal UI</h1>

<p>Launch the interactive terminal UI:</p>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<pre><code>engram tui</code></pre>

</div>

<h2>Navigation</h2>

<div class="bg-[#0a0a0a] p-6 rounded-lg border border-[#2596be] my-6">

<h3>Key Bindings:</h3>

<ul class="list-disc list-inside space-y-1">
  <li><code>j</code> / <code>↓</code> — Move down</li>
  <li><code>k</code> / <code>↑</code> — Move up</li>
  <li><code>Enter</code> — Open selected item</li>
  <li><code>/</code> — Search</li>
  <li><code>Esc</code> — Go back</li>
  <li><code>q</code> — Quit</li>
</ul>

</div>

<h2>Screens</h2>

<div class="space-y-4">

<h3>Dashboard Screen</h3>
<p>The main dashboard shows recent memories, session summaries, quick stats, and recent activity.</p>

<h3>Detail Screen</h3>
<p>Drill into any memory to see full content, metadata, timeline, and actions.</p>

<h3>Search Screen</h3>
<p>Full-text search across all memories with filters by project, scope, type, date range.</p>

<h3>Timeline Screen</h3>
<p>Chronological context around a specific observation — session context and related memories.</p>

<h3>Settings Screen</h3>
<p>Configure TUI preferences: theme, default project, auto-refresh, display options.</p>

</div>

<h2>Styling</h2>

<div class="bg-[#0a0a0a] p-6 rounded-lg border border-[#2596be]">

<h3>Catppuccin Mocha Theme</h3>

<p>The TUI uses the Catppuccin Mocha color scheme with high contrast and reduced eye strain.</p>

</div>
</div>
  `,

  gitSync: `
<div class="space-y-6">
<h1>Git Sync</h1>

<p>Share memories across machines. Uses compressed chunks — no merge conflicts, no huge files.</p>

<h2>Quick Start</h2>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">

<pre><code>engram sync
git add .engram/ && git commit -m "sync engram memories"
engram sync --import
engram sync --status</code></pre>

</div>

<h2>How It Works</h2>

<p><strong>Compressed Chunks:</strong></p>
<ul class="list-disc list-inside space-y-1">
<li>Each chunk is compressed with Zstandard (.zst)</li>
<li>Typically 10-50KB per chunk</li>
<li>No merge conflicts because chunks are append-only</li>
<li>Manifest tracks which chunks exist on each machine</li>
</ul>

<h2>Tips</h2>

<div class="bg-[#050505] p-4 rounded border border-[#222222]">

<ul class="list-disc list-inside space-y-1">
<li><strong>Commit frequently</strong> — Sync after each significant session</li>
<li><strong>Pull before sync</strong> — <code>git pull && engram sync --import</code></li>
<li><strong>Use descriptive commits</strong> — "sync memories: auth middleware fix"</li>
<li><strong>Don't edit chunks</strong> — Treat them as immutable</li>
</ul>

</div>
</div>
  `,

  docs: `
<div class="space-y-6">
<h1>Documentation</h1>

<p>Complete reference for Engram. Choose a topic to learn more.</p>

<h2>Quick Links</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Installation</h3>
  <p class="text-sm">Install Engram on macOS, Linux, or Windows.</p>
</div>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Agent Setup</h3>
  <p class="text-sm">Configure Engram with your preferred agent.</p>
</div>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Architecture</h3>
  <p class="text-sm">How Engram works: MCP tools, SQLite + FTS5, session lifecycle.</p>
</div>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">MCP Tools</h3>
  <p class="text-sm">Complete reference for all 15 MCP tools.</p>
</div>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Terminal UI</h3>
  <p class="text-sm">Interactive terminal UI with vim-style navigation.</p>
</div>

<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Git Sync</h3>
  <p class="text-sm">Share memories across machines with compressed chunks.</p>
</div>

</div>

---

<div class="text-center mt-8">

**License:** MIT

**Inspired by** <a href="https://github.com/thedotmack/claude-mem" class="text-[#00f2ff]">claude-mem</a> — but agent-agnostic, simpler, and built different.

</div>
</div>
  `,
}
