import { ui, defaultLang, routes, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first in ui ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

export function r(key: keyof typeof routes, lang: Lang): string {
  return routes[key][lang];
}

/** Find the same page in the other language (falls back to that language's home). */
export function alternatePath(pathname: string, target: Lang): string {
  const norm = pathname.endsWith('/') ? pathname : pathname + '/';
  for (const pair of Object.values(routes)) {
    const match = (Object.keys(pair) as Lang[]).find((l) => pair[l] === norm);
    if (match && match !== target) return pair[target];
  }
  return routes.home[target];
}

export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');
