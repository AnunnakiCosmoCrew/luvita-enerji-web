import { ui, defaultLang, routes, type Lang, type UIKey } from './ui';

/** '' kök yayında, '/alt-yol' GitHub Pages proje sayfasında. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Site içi yola base ön ekini ekler. */
export const withBase = (path: string): string => `${BASE}${path}`;

/** Base ön ekini yoldan çıkarır (rota eşleştirmesi için). */
export function stripBase(path: string): string {
  if (BASE && path.startsWith(BASE)) return path.slice(BASE.length) || '/';
  return path;
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = stripBase(url.pathname).split('/');
  return first in ui ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

export function r(key: keyof typeof routes, lang: Lang): string {
  return withBase(routes[key][lang]);
}

/** Find the same page in the other language (falls back to that language's home). */
export function alternatePath(pathname: string, target: Lang): string {
  let norm = stripBase(pathname).replace(/index\.html$/, '');
  if (!norm.endsWith('/')) norm += '/';
  for (const pair of Object.values(routes)) {
    const match = (Object.keys(pair) as Lang[]).find((l) => pair[l] === norm);
    if (match) return withBase(pair[target]);
  }
  return withBase(routes.home[target]);
}

export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');
