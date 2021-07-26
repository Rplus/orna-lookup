<script>
  import { data, filters } from './stores.js';
  import Filters from './Filters.svelte';
  import { setContext } from 'svelte';


  let init = false;
  let oData = [];
  let items = [];
  $: allProps = [];
  let sortProp;
  $: sortDirASC = true;

  $: maxItem = 30;
  $: maxDetailsItem = 5;
  $: showDetails = items.length <= maxDetailsItem;

  // init data
  $: {
    if (!$data.waiting && !init) {
      init = true;
      items = $data;
      allProps = [...new Set(items.map(i => Object.keys(i)).flat())];
      if (allProps.includes('tier')) {
        sortProp = 'tier';
      } else {
        sortProp = allProps[0];
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
      switch (typeof a[sortProp]) {
        case 'string':
          return (a[sortProp][0].charCodeAt() - b[sortProp][0].charCodeAt()) * (sortDirASC ? 1: -1);
        case 'number':
          return (a[sortProp] - b[sortProp]) * (sortDirASC ? 1: -1);
        default:
          return 0;
      }
    });
  }

  function addFilter() {
    filters.add({ timestamp: +new Date });
  }

  // auto new one
  addFilter();

</script>

<h1><a href="https://playorna.com/" target="_blank">Orna</a> items Lookup tool</h1>

<div class="workspace">
  <aside>
    <button on:click={ addFilter }>add new filter</button>
    <ul>
      {#each $filters as filter (filter.timestamp)}
        <li>
          <Filters {...filter} />
        </li>
      {/each}
    </ul>
  </aside>

<hr />

{#if items.length}

  <div class="nav">
    <div>
      sort by:
      <select bind:value={sortProp}>
        {#each allProps as p}
          <option value={p} label={p} />
        {/each}
      </select>

      <input id="sortDir" type="checkbox" bind:checked={sortDirASC}>
    </div>

    <div>
      show images below
      <input type="number" min="1" max="50" bind:value={maxDetailsItem}>
      items
    </div>

    <div>
      list:
      <input type="number" min="5" max="2000" step="5" bind:value={maxItem}> / { items.length }
    </div>
  </div>

  <hr>

  <ul class="item-list">
  {#each items.slice(0, maxItem) as item (item.id)}
    <li>
      <details>
        <summary>
          <!-- {item.id} -->
          <ruby>
            <rb>{item.name_zh}</rb>
            <rt>{item.name}</rt>
          </ruby>

          <a href="https://orna.guide/items?show={item.id}" target="orna.guide"><sup>★{item.tier}</sup></a>

          {#if showDetails}
            <br>
            <img
              src="https://images.weserv.nl/?w=96&il&url=https://orna.guide/static/orna/img/{item.image}"
              alt=""
              loading="lazy"
              width="96"
              height="96"
            />
          {/if}
        </summary>

        <pre class="item-pre">
          { JSON.stringify({...item, context: null}, null, ' ') }
        </pre>
      </details>
    </li>
  {/each}
  </ul>
{/if}

</div>

<hr>

<footer>
  * data & image source: <a href="https://orna.guide/" target="_blank">https://orna.guide/</a> <br>
  * repo: <a href="https://github.com/rplus/orna-lookup" target="_blank">Rplus/orna-lookup</a>
</footer>


<style>
  .item-list {
    list-style: none;
  }

  .item-list li {
    margin-bottom: 1em;
  }

  .item-list sup {
    color: #99c;
  }

  .item-list img {
    margin-left: 3vw;
  }

  .item-pre {
    white-space: pre-wrap;
    font-size: 1.25em;
    margin-left: 5vw;
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
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
  ruby {
    ruby-position: under;
    ruby-align: center;
  }
  rt {
    color: #999;
  }
</style>
