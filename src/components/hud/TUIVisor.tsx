export function TUIVisor() {
  return (
    <div className="bg-black/80 backdrop-blur-sm border border-border rounded-lg p-3 font-mono text-xs">
      <div className="text-text-secondary uppercase tracking-wider text-label mb-2">
        TUI Navigation
      </div>
      <div className="space-y-1 text-[10px]">
        <div className="flex gap-2">
          <kbd className="px-1.5 py-0.5 bg-surface border border-border-visible rounded text-text-primary">j</kbd>
          <span className="text-text-secondary">down</span>
        </div>
        <div className="flex gap-2">
          <kbd className="px-1.5 py-0.5 bg-surface border border-border-visible rounded text-text-primary">k</kbd>
          <span className="text-text-secondary">up</span>
        </div>
        <div className="flex gap-2">
          <kbd className="px-1.5 py-0.5 bg-surface border border-border-visible rounded text-text-primary">Enter</kbd>
          <span className="text-text-secondary">drill in</span>
        </div>
        <div className="flex gap-2">
          <kbd className="px-1.5 py-0.5 bg-surface border border-border-visible rounded text-text-primary">/</kbd>
          <span className="text-text-secondary">search</span>
        </div>
        <div className="flex gap-2">
          <kbd className="px-1.5 py-0.5 bg-surface border border-border-visible rounded text-text-primary">Esc</kbd>
          <span className="text-text-secondary">back</span>
        </div>
      </div>
    </div>
  )
}
