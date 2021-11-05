<script>
  export let filter;
  import { filters, filterLists } from './stores.js';
  import { filtersDef } from './filtersDef.js';

  let filterDef = getFilterDef(filter.rule.prop);

  $: {
    filterDef = getFilterDef(filter.rule.prop);
    filter.rule.type = filterDef.type;
  }

  function resetFilter() {
    filter.rule.value = '';
  }

  function removeFilter(timestamp) {
    filters.remove(timestamp);
  }

  function getFilterDef(prop) {
    return filtersDef.find(i => i.prop === prop);
  }
</script>


<div class="filters">
  <button on:click={removeFilter(filter.timestamp)}>x</button>

  <select bind:value={filter.rule.prop} on:change={resetFilter}>
    {#each filtersDef as _filter}
      <option value={_filter.prop}>{_filter.label}</option>
    {/each}}
  </select>

  {#if filterDef.type === 'checkbox'}
    <label>
      T
      <input type="radio" bind:group={filter.rule.value} value="1" />
    </label>
    <label>
      <input type="radio" bind:group={filter.rule.value} value="0" />
      F
    </label>
  {:else if filterDef.list}
    <select bind:value={filter.rule.value}>
      {#each $filterLists[filterDef.list] as item}
        <option value={item.value} label={item.label} />
      {/each}
    </select>
  {:else if filterDef.type === 'number'}
    <input
      type="number"
      bind:value={filter.rule.value}
      min={filterDef.min}
      max={filterDef.max}
    />
  {:else if filterDef.type === 'text'}
    <input
      type="text"
      bind:value={filter.rule.value}
    />
  {/if}

  {#if filterDef.type === 'number'}
    <select bind:value={filter.rule.comparator}>
      <option value="=">=</option>
      <option value="+">+</option>
      <option value="-">-</option>
    </select>
  {/if}
</div>
