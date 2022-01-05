<script>
  export let name = '';
  export let zh = '';
  import { _, locale } from 'svelte-i18n';
</script>

{#if $locale !== 'en'}
  <ruby>
    <rb>{zh}</rb>
    <rt class="op-5">{name}</rt>
  </ruby>
{:else}
  {name}
{/if}
