// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'Engram',
      logo: {
        src: '/src/assets/logo.svg',
        alt: 'Engram logo',
      },
      social: [
        {
          href: 'https://github.com/Gentleman-Programming/engram',
          label: 'GitHub',
          icon: 'github',
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#000000',
          },
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});