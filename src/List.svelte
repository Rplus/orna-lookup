<script>
  export let items = [];
  import Item from './Item.svelte';
  import { filters } from './stores.js';
  import { filtersDef } from './filtersDef.js';
  import { escapeRegExp } from './u.js';

  let sortableProps = filtersDef.filter(i => i.sort);
  $: sortProp = 'tier';
  $: sortDirASC = true;

  let filteredItems = [];
  $: maxItem = 50;
  $: maxDetailsItem = 20;
  $: showDetails = filteredItems.length <= maxDetailsItem || maxItem <= maxDetailsItem;


  $: {
    sortProp;
    sortDirASC;
    filteredItems = filterItems($filters);
  }

  function filterItems(_filters) {
    let d = items; // reset

    if (
      !_filters ||
      !_filters.length ||
      (_filters.length === 1 && _filters[0].rule?.value == null)
    ) {
      return d;
    }

    let rules = _filters.map(f => f.rule)

    rules.forEach((rule) => {
      if (rule) {
        d = filterByRule(d, rule);
      }
    });

    return sortByProp(d);
  }

  const exactIdProps = [
    'dropped_by',
    'materials',
  ];
  function filterByRule(data, rule) {
    let { prop, type, value, comparator } = rule;
    if (!value || !data.length) {
      return data;
    }
    let _define = filtersDef.find(i => i.prop === prop);

    if (_define.checkId) {
      return data.filter(i => {
        return i[prop]?.some(j => j.id === value);
      });
    }

    switch (type) {
      case 'checkbox':
        return (
          Boolean(+value)
            ? data.filter(i => i[prop])
            : data.filter(i => !i[prop])
        );
      case 'number':
        return data.filter(i => {
          let targetValue = i[prop];
          switch (comparator) {
            case '+':
              return targetValue >= value;
            case '-':
              return targetValue <= value;
            default:
              return targetValue === value;
          }
        });
      case 'text':
        return data.filter(i => {
          if (_define.list) {
            return i[prop]?.includes(value);
          }
          let reg = new RegExp(escapeRegExp(value), 'i');
          return reg.test(i[prop])
        });
      default:
        return data;
    }
  }

  function sortByProp(data = items) {
    return data.sort((a, b) => {
      let dir = sortDirASC ? 1: -1;
      let targetValueA = a[sortProp] || -9999;
      let targetValueB = b[sortProp] || -9999;

      if (typeof targetValueB === 'object') {
        targetValueB = -9999;
      }
      if (typeof targetValueA === 'object') {
        targetValueA = -9999;
      }

      switch (typeof targetValueA) {
        case 'string':
          return targetValueA.localeCompare(targetValueB) * dir;
        case 'number':
          return (targetValueA - targetValueB) * dir;
        default:
          return 0;
      }
    });
  }

</script>



<div class="nav">
  <div>
    排序:
    <select bind:value={sortProp}>
      {#each sortableProps as p}
        <option value={p.prop} label={p.label} />
      {/each}
    </select>

    <input id="sortDir" type="checkbox" bind:checked={sortDirASC}>
  </div>

  <details>
    <summary>
      顯示數量
      <input
        class="text-center"
        type="number" min="5" max="2000" step="5"
        bind:value={maxItem}
      >
      / { filteredItems.length }
    </summary>

    <div>
      總數
      <input
        class="text-center"
        type="number" min="1" max="50"
        bind:value={maxDetailsItem}
      >
      以下秀圖
    </div>
  </details>

</div>

<hr>

<ul class="items" class:showDetails>
  {#each filteredItems.slice(0, maxItem) as item (item.id)}
    <li>
      <Item item={item} />
    </li>
  {/each}
</ul>


<style>
  .items {
    padding: 0;
    list-style: none;
  }

  .items li {
    margin-bottom: 1em;
    background-color: #9991;
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 40px;
  }

  #sortDir {
    -webkit-appearance: none;
    cursor: pointer;
  }
  #sortDir::after {
    content: '▼';
  }
  #sortDir:checked::after {
    content: '▲';
  }
</style>
