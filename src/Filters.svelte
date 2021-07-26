<script>
  export let timestamp;
  export let rules;

  import { filters, filterLists } from './stores.js';
  import { filtersDef } from './filtersDef.js';

  $: filterProp = 'name_zh';
  $: filterDef = filtersDef.find(i => i.prop === filterProp);
  $: filterValue = null;
  $: filterComparators = '=';
  // console.log({filtersDef});

  $: {
    filters.update(timestamp, {
      prop: filterProp,
      type: filterDef.type,
      value: filterValue,
      comparator: filterComparators,
    });
  }

  function resetFilter() {
    // filterValue = null;
  }

  function removeFilter(timestamp) {
    filters.remove(timestamp);
  }

  function updateFilter(timestamp, rules) {
    filters.update(timestamp, rules);
  }
</script>

<div class="filters">
  <button on:click={removeFilter(timestamp)}>x</button>

  <select bind:value={filterProp} on:change={resetFilter}>
    {#each filtersDef as filter}
      <option value={filter.prop}>{filter.prop}</option>
    {/each}}
  </select>

  {#if filterDef.type === 'checkbox'}
    <label>
      T
      <input type="radio" bind:group={filterValue} value="1" />
    </label>
    <label>
      <input type="radio" bind:group={filterValue} value="0" />
      F
    </label>
  {:else if filterDef.list}
    <select bind:value={filterValue}>
      {#each $filterLists[filterDef.list] as item}
        <option value={item} label={item} />
      {/each}
    </select>
  {:else if filterDef.type === 'number'}
    <input
      type="number"
      bind:value={filterValue}
      min={filterDef.min}
      max={filterDef.max}
    />
  {:else if filterDef.type === 'text'}
    <input
      type="text"
      bind:value={filterValue}
    />
  {/if}

  {#if filterDef.type === 'number'}
    <select bind:value={filterComparators}>
      <option value="=">=</option>
      <option value="+">+</option>
      <option value="-">-</option>
    </select>
  {/if}
</div>
