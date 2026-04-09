// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://engram-landing.vercel.app',
  integrations: [
    react(),
    starlight({
      title: 'Engram',
      logo: { src: '/src/assets/logo.svg', alt: 'Engram logo' },
      social: [{ href: 'https://github.com/Gentleman-Programming/engram', label: 'GitHub', icon: 'github' }],
      sidebar: [
        { label: 'Getting Started', link: '/getting-started' },
        { label: 'Installation', link: '/installation' },
        { label: 'Agent Setup', link: '/agent-setup' },
        { label: 'Architecture', link: '/architecture' },
        { label: 'MCP Tools', link: '/mcp-tools' },
        { label: 'Terminal UI', link: '/tui' },
        { label: 'CLI Reference', link: '/cli-reference' },
        { label: 'Git Sync', link: '/git-sync' },
      ],
      customCss: ['./src/styles/starlight-custom.css'],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});