// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luvitaenerji.com',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'tr', locales: { tr: 'tr-TR', en: 'en-GB' } },
    }),
  ],
});
