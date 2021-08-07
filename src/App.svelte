<script>
  import { data, filters } from './stores.js';
  import Filter from './Filter.svelte';
  import Item from './Item.svelte';
  import Dialog from './Dialog.svelte';
  import { filtersDef } from './filtersDef.js';
  import { setContext } from 'svelte';
  import { getImgSrc, checkingImg } from './image.js';


  let init = false;
  let items = [];
  $: sortableProps = [];
  let sortProp;
  $: sortDirASC = true;

  $: maxItem = 50;
  $: maxDetailsItem = 20;
  $: showDetails = items.length <= maxDetailsItem || maxItem <= maxDetailsItem;

  // init data
  $: {
    if (!$data.waiting && !init) {
      init = true;
      items = $data;
      let allProps = [...new Set(items.map(i => Object.keys(i)).flat())];
      sortableProps = allProps.filter(p => {
        let targetType = typeof items.find(i => i[p])?.[p];
        let definedFilter = filtersDef.find(i => i.prop === p);
        return targetType !== 'object' && definedFilter?.list;
      });
      if (sortableProps.includes('tier')) {
        // default sort by tier
        sortProp = 'tier';
      } else {
        sortProp = sortableProps[0];
      }
    }
  }

  $: {
    sortProp;
    sortDirASC;
    items = filterItems($filters);
  }

  function filterItems(_filters) {
    let d = $data; // reset

    if (
      !_filters ||
      !_filters.length ||
      (_filters.length === 1 && _filters[0].rules?.value == null)
    ) {
      return d;
    }

    let rules = _filters.map(f => f.rules)

    rules.forEach((rule) => {
      if (rule) {
        d = filterByRule(d, rule);
      }
    });

    return sortByProp(d);
  }

  function filterByRule(data, rule) {
    let { prop, type, value, comparator } = rule;
    if (!value || !data.length) {
      return data;
    }

    if (typeof value === 'string') {
      value = value.toLowerCase();
    }

    // pre-transform value
    if (type === 'checkbox') {
      value = Boolean(+value);
    }

    switch (type) {
      case 'checkbox':
        return (
          value
            ? data.filter(i => i[prop])
            : data.filter(i => !i[prop])
        );
      case 'number':
        return data.filter(i => {
          switch (comparator) {
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
        return data.filter(i => reg.test(i[prop]));
      default:
        return data;
    }
  }

  function sortByProp(data = items) {
    return data.sort((a, b) => {
      let dir = sortDirASC ? 1: -1;
      switch (typeof a[sortProp]) {
        case 'string':
          return a[sortProp].localeCompare(b[sortProp]) * dir;
        case 'number':
          return (a[sortProp] - b[sortProp]) * dir;
        default:
          return 0;
      }
    });
  }

  function addFilter() {
    filters.add({ timestamp: +new Date });
  }

  // function checkProxyImg(item) {
  //   checkingImg(item)
  //   .then()
  //   .catch(e => {
  //     let index = items.findIndex(i => i.id == item.id);
  //     items[index].deadProxyImage = true;
  //   })
  // }

  // auto new one
  addFilter();

</script>

<div class="workspace">
  <h1 class="text-center"><a href="https://playorna.com/" target="_blank">Orna RPG</a> items lookup tool</h1>

  <aside>
    <button on:click={ addFilter }>+過濾條件</button>
    <ul>
      {#each $filters as filter (filter.timestamp)}
        <li>
          <Filter {...filter} />
        </li>
      {/each}
    </ul>
  </aside>

<hr />

{#if items.length}

  <div class="nav">
    <div>
      排序:
      <select bind:value={sortProp}>
        {#each sortableProps as p}
          <option value={p} label={p} />
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
        / { items.length }
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
  {#each items.slice(0, maxItem) as item (item.id)}
    <li>
      <Item item={item} />
    </li>
  {/each}
  </ul>
{/if}

<Dialog />

</div>

<hr>

<footer>
  * data & image source: <a href="https://orna.guide/" target="_blank">https://orna.guide/</a> <br>
  * repo: <a href="https://github.com/rplus/orna-lookup" target="_blank">Rplus/orna-lookup</a>
</footer>


<style>
  .workspace {
    max-width: 900px;
    margin: auto;
  }

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

  footer {
    text-align: right;
    font-family: serif;
    font-style: italic;
    padding: 2em .5em;
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
