<script context="module">
  import { init, register, waitLocale } from 'svelte-intl-precompile';
  import { uniq, getItem } from './lib/u.js';

  register('en', () => import('$locales/en'));
  register('zh', () => import('$locales/zh'));

  export async function load() {
    init({
      initialLocale: getItem('lang') || navigator.language.split('-')[0],
      fallbackLocale: 'en',
    });
    await waitLocale(); // awaits the default locale, "en" in this case.
    return {};
  }
</script>


<slot/>

