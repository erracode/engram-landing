// MDX Content Map - Engram Documentation
// This maps window IDs to their HTML content

export const MDX_CONTENT_MAP = {
  kernel: `
<div class="space-y-4">
<h1>Kernel</h1>

<div class="not-prose">

> **engram** <code>/ˈen.ɡræm/</code> — *neuroscience*: the physical trace of a memory in the brain.

Your AI coding agent forgets everything when the session ends. Engram gives it a brain.

</div>

## What is Engram?

A **Go binary** with SQLite + FTS5 full-text search. Works with **any agent** that supports MCP.

<pre class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
Agent → MCP stdio → Engram (single Go binary) → SQLite + FTS5
</pre>

**That's it.** No Node.js, no Python, no Docker. **One binary, one SQLite file.**

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

<p>Engram is a <strong>single binary</strong> with zero runtime dependencies.</p>

<h2>Homebrew (macOS / Linux)</h2>
<pre class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">brew install gentleman-programming/tap/engram</pre>

<h2>Windows</h2>
<pre class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">go install github.com/Gentleman-Programming/engram/cmd/engram@latest</pre>

<h2>Requirements</h2>
<ul>
<li><strong>Go 1.25+</strong> to build from source</li>
<li>That's it. No runtime dependencies.</li>
</ul>
</div>
  `,

  agentSetup: `
<div class="space-y-6">
<h1>Agent Setup</h1>

<p>Engram works with <strong>any MCP-compatible agent</strong>.</p>

<h2>Quick Reference</h2>
<ul class="list-disc list-inside space-y-2">
<li><strong>Claude Code:</strong> <code>claude plugin marketplace add Gentleman-Programming/engram</code></li>
<li><strong>OpenCode:</strong> <code>engram setup opencode</code></li>
<li><strong>Gemini CLI:</strong> <code>engram setup gemini-cli</code></li>
<li><strong>Codex:</strong> <code>engram setup codex</code></li>
<li><strong>VS Code:</strong> <code>code --add-mcp '{"name":"engram","command":"engram","args":["mcp"]}'</code></li>
</ul>

<h2>Surviving Compaction (Recommended)</h2>
<pre class="bg-[#050505] p-4 rounded border border-[#222222]">
## Memory
You have access to Engram persistent memory via MCP tools.
- Save proactively after significant work.
- After any compaction, call <code>mem_context</code> to recover session state.
</pre>

<p>This is the <strong>nuclear option</strong> — system prompts survive everything.</p>
</div>
  `,

  architecture: `
<div class="space-y-6">
<h1>Architecture</h1>

<p>Engram trusts the <strong>agent</strong> to decide what's worth remembering.</p>

<h2>How It Works</h2>
<ol class="list-decimal list-inside space-y-2">
  <li>Agent completes significant work</li>
  <li>Agent calls <code>mem_save</code> with structured summary</li>
  <li>Engram persists to SQLite with FTS5 indexing</li>
  <li>Next session: agent searches memory, gets relevant context</li>
</ol>

<h2>Session Lifecycle</h2>
<pre class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
Session starts → Agent works → Agent saves memories
Session ends → Agent writes summary
Next session → Previous context is injected
</pre>

<h2>MCP Tools</h2>
<ul class="list-disc list-inside space-y-1">
<li><code>mem_save</code> — Save structured observations</li>
<li><code>mem_search</code> — Full-text search</li>
<li><code>mem_context</code> — Get recent context</li>
<li><code>mem_session_summary</code> — End-of-session summary</li>
</ul>

<h2>Progressive Disclosure (3-Layer Pattern)</h2>
<ol class="list-decimal list-inside space-y-1">
  <li><code>mem_search</code> → compact results</li>
  <li><code>mem_timeline</code> → related sessions</li>
  <li><code>mem_get_observation</code> → full content</li>
</ol>
</div>
  `,

  mcpTools: `
<div class="space-y-6">
<h1>MCP Tools</h1>

<p>Engram exposes <strong>15 MCP tools</strong> for memory management.</p>

<table class="w-full my-4 text-sm">
  <thead>
    <tr class="border-b border-[#222222]">
      <th class="text-left py-2">Tool</th>
      <th class="text-left py-2">Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_save</code></td>
      <td class="py-2">Save structured observations</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_update</code></td>
      <td class="py-2">Update observations by ID</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_delete</code></td>
      <td class="py-2">Delete observations</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_search</code></td>
      <td class="py-2">Full-text search</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_context</code></td>
      <td class="py-2">Get recent context</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_timeline</code></td>
      <td class="py-2">Chronological context</td>
    </tr>
    <tr class="border-b border-[#222222]">
      <td class="py-2"><code>mem_session_summary</code></td>
      <td class="py-2">End-of-session summary</td>
    </tr>
  </tbody>
</table>

<h2>Progressive Disclosure Pattern</h2>
<ol class="list-decimal list-inside space-y-1">
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

<pre class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">engram tui</pre>

<h2>Navigation</h2>
<div class="bg-[#0a0a0a] p-6 rounded-lg border border-[#2596be] my-6">
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
<ul class="list-disc list-inside space-y-2">
  <li><strong>Dashboard:</strong> Recent memories, session summaries, quick stats</li>
  <li><strong>Detail:</strong> Full content, metadata, timeline, actions</li>
  <li><strong>Search:</strong> Full-text search with filters</li>
  <li><strong>Timeline:</strong> Chronological context</li>
  <li><strong>Settings:</strong> Theme, project, display options</li>
</ul>

<h2>Catppuccin Mocha Theme</h2>
<p>High contrast colors optimized for terminal use with reduced eye strain.</p>
</div>
  `,

  gitSync: `
<div class="space-y-6">
<h1>Git Sync</h1>

<p>Share memories across machines. Uses compressed chunks — no merge conflicts.</p>

<h2>Quick Start</h2>
<pre class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
engram sync
git add .engram/ && git commit -m "sync engram memories"
engram sync --import
</pre>

<h2>How It Works</h2>
<ul class="list-disc list-inside space-y-1">
<li>Each chunk is compressed with Zstandard (.zst)</li>
<li>Typically 10-50KB per chunk</li>
<li>No merge conflicts (append-only)</li>
<li>Manifest tracks chunks on each machine</li>
</ul>

<h2>Tips</h2>
<ul class="list-disc list-inside space-y-1">
<li><strong>Commit frequently</strong> — Sync after each session</li>
<li><strong>Pull before sync</strong> — <code>git pull && engram sync --import</code></li>
<li><strong>Use descriptive commits</strong> — "sync memories: auth fix"</li>
<li><strong>Don't edit chunks</strong> — Treat them as immutable</li>
</ul>
</div>
  `,

  docs: `
<div class="space-y-6">
<h1>Documentation</h1>

<p>Complete reference for Engram.</p>

<h2>Quick Links</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Installation</h3>
  <p class="text-sm">Install on macOS, Linux, or Windows.</p>
</div>
<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Agent Setup</h3>
  <p class="text-sm">Configure with your agent.</p>
</div>
<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Architecture</h3>
  <p class="text-sm">MCP tools, SQLite + FTS5.</p>
</div>
<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">MCP Tools</h3>
  <p class="text-sm">15 tools reference.</p>
</div>
<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Terminal UI</h3>
  <p class="text-sm">Interactive CLI interface.</p>
</div>
<div class="bg-[#0a0a0a] p-4 rounded border border-[#222222]">
  <h3 class="text-[#00f2ff] font-bold mb-2">Git Sync</h3>
  <p class="text-sm">Share memories across machines.</p>
</div>
</div>

---

<div class="text-center mt-8">

**License:** MIT

**Inspired by** <a href="https://github.com/thedotmack/claude-mem" class="text-[#00f2ff]">claude-mem</a> — but agent-agnostic, simpler, built different.

</div>
</div>
  `,
}
