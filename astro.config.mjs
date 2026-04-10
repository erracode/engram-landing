// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { head } from './src/config/starlight-head';

export default defineConfig({
  site: 'https://engram-landing.pages.dev',
  output: 'static',
  integrations: [
    react(),
    starlight({
      title: 'Engram Docs',
      tagline: 'Persistent memory for AI coding agents',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/engram-banner.png',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Gentleman-Programming/engram',
        },
      ],
      customCss: ['./src/styles/starlight-custom.css'],
      head,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
