import { SITE } from './seo';

export const head: { tag: string; attrs: Record<string, string | boolean | undefined> }[] = [
  // Meta tags
  {
    tag: 'meta',
    attrs: {
      name: 'description',
      content: SITE.description,
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      name: 'keywords',
      content: 'ai,agent,memory,coding,persistent,openai,claude,anthropic,mcp,automation',
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      name: 'author',
      content: 'Engram Team',
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      name: 'robots',
      content: 'index, follow',
    },
  } as const,
  
  // Open Graph
  {
    tag: 'meta',
    attrs: {
      property: 'og:title',
      content: SITE.ogTitle,
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      property: 'og:description',
      content: SITE.ogDescription,
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      property: 'og:type',
      content: 'website',
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      property: 'og:url',
      content: SITE.siteUrl,
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      property: 'og:image',
      content: `${SITE.siteUrl}/og-image.svg`,
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      property: 'og:site_name',
      content: 'Engram Docs',
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      property: 'og:locale',
      content: 'en',
    },
  } as const,
  
  // Twitter
  {
    tag: 'meta',
    attrs: {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      name: 'twitter:site',
      content: '@engram',
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      name: 'twitter:title',
      content: SITE.twitterTitle,
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      name: 'twitter:description',
      content: SITE.twitterDescription,
    },
  } as const,
  {
    tag: 'meta',
    attrs: {
      name: 'twitter:image',
      content: `${SITE.siteUrl}/og-image.svg`,
    },
  } as const,
  
  // Favicon
  {
    tag: 'link',
    attrs: {
      rel: 'icon',
      type: 'image/svg+xml',
      href: SITE.favicon,
    },
  } as const,
  
  // Fonts
  {
    tag: 'link',
    attrs: {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
  } as const,
  {
    tag: 'link',
    attrs: {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true,
    },
  } as const,
];
