<script>
  import { data } from './stores.js';
  import { filtersDef } from './filters.js';

  let init = false;
  let oData = [];
  let types = [];
  let items = [];

  let props = [];
  let filterLists = {
    types: [],
    tiers: [],
  };

  $: maxItem = 30;

  $: filterProp = 'boss';
  $: filterDef = filtersDef.find(i => i.prop === filterProp);
  $: filterValue = null;
  $: filterComparators = '=';
  console.log({filtersDef});

  // init data
  $: {
    if (!$data.waiting && !init) {
      init = true;
      oData = $data.filter(Boolean).map(i => {
        i.context = JSON.stringify(i);
        return i;
      });
      items = oData.slice(0);
      filterLists.types = [...new Set(oData.map(i => i.type))];
      filterLists.tiers = [...new Set(oData.map(i => i.tier))];
      // props = [...new Set(oData.map(i => Object.keys(i)).flat())];
    }
  }

  $: {
    filterComparators;
    items = filterItems(filterProp, filterValue, filterDef);
    console.log({ filterProp, filterValue, filterComparators, filterDef });
  }


  function filterItems(prop, value, def) {
    console.log('filterItems', {prop, value, def});
    let d = [...oData];
    if (!value) {
      return d;
    }

    if (typeof value === 'string') {
      value = value.toLowerCase();
    }

    // pre-transform value
    if (def.type === 'checkbox') {
      value = Boolean(+value);
    }

    switch (def.type) {
      case 'checkbox':
        return (
          value
            ? d.filter(i => i[prop])
            : d.filter(i => !i[prop])
        );
      case 'number':
        return d.filter(i => {
          switch (filterComparators) {
            case '+':
              return i[prop] >= value;
            case '-':
              return i[prop] <= value;
            default:
              return i[prop] === value;
          }
        });
      case 'text':
        let reg = new RegExp(value, 'i');
        return d.filter(i => reg.test(i[prop]));
      default:
        return d;
    }
  }

  function resetFilter() {
    filterValue = null;
  }

</script>

<div class="workspace">
  <aside class="filters">
    <h2>Filters</h2>
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
        {#each filterLists[filterDef.list] as item}
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
  </aside>

<hr />

items:
<input type="number" min="5" max="2000" step="5" bind:value={maxItem}> / { items.length }

<hr>

{#each items.slice(0, maxItem) as item (item.id)}
  <details>
    <summary>{item.id} {item.name}</summary>

    {#if items.length < 5}
      <img
        src="https://orna.guide/static/orna/img/{item.image}"
        alt=""
        loading="lazy"
        width="96"
        height="96"
      />
    {/if}

    <pre>
      { JSON.stringify(item, null, ' ') }
    </pre>
  </details>
  <hr>
{/each}
</div>


<style>
  .workspace pre {
    font-size: 1.5em;
  }

  .filters input[type="checkbox"] {
    width: 1.5em;
    height: 1.5em;
  }
</style>
