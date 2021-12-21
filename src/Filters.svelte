<script>
  import { filters } from './stores.js';
  import { createNewTextFilter } from './u.js';
  import Filter from './Filter.svelte';

  function addFilter() {
    filters.add(createNewTextFilter(''));
  }
</script>


<aside>
  <button on:click={ addFilter }>+過濾條件</button>
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
}
</style>
