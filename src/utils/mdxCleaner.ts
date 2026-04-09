// Clean MDX content for rendering
// Removes leading/trailing whitespace and extra newlines

export function cleanMDXContent(content: string): string {
  return content
    .trim()
    .replace(/\n\s*\n/g, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
