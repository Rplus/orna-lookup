<script>
  import { locale, locales } from 'svelte-i18n';
  import { saveItem } from './u.js';

  locale.subscribe((newLang) => {
    saveItem({
      key: 'lang',
      value: newLang,
    })
  })
</script>


<div class="lang">
  <span class="lang-emoji"></span>:
  <select bind:value={$locale}>
    {#each $locales as locale}
      <option value={locale}>{locale}</option>
    {/each}
  </select>
</div>


<style>
.lang:hover .lang-emoji::before {
  animation: lang 1.5s infinite steps(3);
}

.lang-emoji::before {
  content: '🌏';
}

@keyframes lang {
   0% { content: '🌏'; }
  33% { content: '🌍'; }
  66% { content: '🌎'; }
}
</style>
