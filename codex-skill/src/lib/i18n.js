import { derived, writable } from 'svelte/store';
import words from './words.js';
import { uniq, getItem } from './u.js';

export const locales = uniq([
  'en',
  'zh',
  ...Object.values(words).map(i => Object.keys(i)).flat(),
]);

const fallbackLocale = locales[0];
let defaultLocale = getItem('lang') || navigator.language.split('-')[0];

if (!locales.includes(defaultLocale)) {
  defaultLocale = locales[0];
}
export const locale = writable(defaultLocale);

// ref: https://svelte.dev/repl/de39de663ef2445b8fe17b79c500013b?version=3.46.6
function translate(locale, key, vars) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.

  // if (!key) throw new Error('no key provided to $t()');
  // if (!locale) throw new Error(`no translation for key '${key}'`);

  if (!key || !locale) {
    return key;
  }

  // Grab the translation from the words object.
  let text = words[key]?.[locale] || words[key]?.[fallbackLocale] || key;

  // if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  if (vars) {
    Object.keys(vars).map((k) => {
      const regex = new RegExp(`{{${k}}}`, 'g');
      text = text.replace(regex, vars[k]);
    });
  }

  return text;
}

export const _ = derived(locale, ($locale) => (key = '', vars) =>
  translate($locale, key, vars)
);
