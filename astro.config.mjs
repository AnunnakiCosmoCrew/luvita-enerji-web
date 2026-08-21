// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site = process.env.ASTRO_SITE ?? 'https://luvitaenerji.com';
// Alan adı bağlanana kadar GitHub Pages proje alt yolunda yayınlanıyor (ASTRO_BASE).
const base = process.env.ASTRO_BASE ?? '/';

export default defineConfig({
  site,
  base,
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
