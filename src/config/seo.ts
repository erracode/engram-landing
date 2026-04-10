// SEO Configuration for Engram
export const SITE = {
  title: 'Engram — Persistent Memory for AI Agents',
  description: 'Persistent memory for AI coding agents. Agent-agnostic. Single binary. Zero dependencies.',
  lang: 'en',
  siteUrl: 'https://engram-landing.pages.dev',
  ogImage: '/og-image.svg',
  favicon: '/favicon.svg',
  themeColor: '#000000',
  
  // Open Graph
  ogTitle: 'Engram — Persistent Memory for AI Agents',
  ogDescription: 'Persistent memory for AI coding agents. Agent-agnostic. Single binary. Zero dependencies.',
  ogType: 'website',
  ogSiteName: 'Engram',
  
  // Twitter Card
  twitterHandle: '@engram',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Engram — Persistent Memory for AI Agents',
  twitterDescription: 'Persistent memory for AI coding agents. Agent-agnostic. Single binary. Zero dependencies.',
  
  // JSON-LD Structured Data
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Engram',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    description: 'Persistent memory for AI coding agents',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '100',
    },
  },
}

export const METADATA = {
  keywords: ['ai', 'agent', 'memory', 'coding', 'persistent', 'openai', 'claude', 'anthropic', 'mcp', 'automation'],
  robots: 'index, follow',
  author: 'Engram Team',
  publisher: 'Engram',
}
