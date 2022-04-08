<script>
  import { filters } from './stores.js';
  import { createNewTextFilter } from './u.js';
  import Filter from './Filter.svelte';

  let queryLink = '';

  $: {
    $filters;
    genQueryLink();
  }

  function addFilter() {
    filters.add(createNewTextFilter(''));
  }

  function genQueryLink() {
    let qs = new URLSearchParams();
    $filters.forEach(f => {
      if (typeof f.rule.value === 'string' && !f.rule.value) {
        return;
      }

      qs.append(
        f.rule.prop,
        f.rule.comparator === '='
          ? f.rule.value
          : `${f.rule.value}|${encodeURIComponent(f.rule.comparator)}`
      );
    });
    queryLink = qs.toString();
  }
</script>


<aside>
  <button on:click={ addFilter }>+過濾條件</button>
  <a href="./?{queryLink}">⚓</a>
  <ul>
    {#each $filters as filter (filter.timestamp)}
      <li>
        <Filter bind:filter={filter} />
      </li>
    {/each}
  </ul>
</aside>


<style>
@media (max-width: 500px) {
  aside {
    font-size: smaller;
  }
  aside ul {
    padding-left: 2em;
  }
  aside :global(input) {
    max-width: 10em;
  }
}
</style>
