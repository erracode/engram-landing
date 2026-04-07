import { BookOpen, FileText, Settings, GitBranch, Code, Heart } from 'lucide-react'

const docs = [
  { icon: BookOpen, title: 'Installation', desc: 'All install methods + platform support', href: '#' },
  { icon: Settings, title: 'Agent Setup', desc: 'Per-agent configuration + Memory Protocol', href: '#' },
  { icon: Code, title: 'Architecture', desc: 'How it works + MCP tools + project structure', href: '#' },
  { icon: FileText, title: 'Plugins', desc: 'OpenCode & Claude Code plugin details', href: '#' },
  { icon: Heart, title: 'Comparison', desc: 'Why Engram vs claude-mem', href: '#' },
  { icon: GitBranch, title: 'Contributing', desc: 'Contribution workflow + standards', href: '#' },
]

export function DocsLinks() {
  return (
    <div id="docs" className="pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-label text-cyan-neon mb-2">DOCUMENTATION</div>
        <h2 className="text-display-md text-text-display mb-12">Full docs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {docs.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              className="bg-surface border border-border rounded-lg p-5 hover:border-cyan-neon/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <doc.icon className="w-5 h-5 text-cyan-neon" />
                <h3 className="text-text-display font-mono text-sm group-hover:text-cyan-neon transition-colors">
                  {doc.title}
                </h3>
              </div>
              <p className="text-text-secondary text-xs">{doc.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
