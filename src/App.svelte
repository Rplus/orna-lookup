<script>
  import { data, filters } from './stores.js';
  import Filters from './Filters.svelte';
  import { setContext } from 'svelte';


  let init = false;
  let oData = [];
  let types = [];
  let items = [];

  $: maxItem = 30;
  $: maxDetailsItem = 5;
  $: showDetails = items.length <= maxDetailsItem;

  // init data
  $: {
    if (!$data.waiting && !init) {
      init = true;
      items = $data;
    }
  }

  $: {
    filterItems($filters);
    items = filterItems($filters);
    console.log({items});
  }

  function filterItems(_filters) {
    let d = $data; // reset
    console.log('filterItems', _filters);

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

    return d;
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

  function addFilter() {
    console.log('addFilter');
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
      auto show image below
      <input type="number" min="1" max="50" bind:value={maxDetailsItem}>
    </div>
    <div>
      items:
      <input type="number" min="5" max="2000" step="5" bind:value={maxItem}> / { items.length }
    </div>
  </div>

  <hr>

  <ul class="item-list">
  {#each items.slice(0, maxItem) as item (item.id)}
    <li>
      <details>
        <summary>
          {item.id} - {item.name} <sup>T{item.tier}</sup>
          <a href="https://orna.guide/items?show={item.id}" target="orna.guide">🔗</a>
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
  data & image source: <a href="https://orna.guide/" target="_blank">https://orna.guide/</a>
</footer>


<style>
  .item-list {
    list-style: none;
  }

  .item-list li {
    margin-bottom: 1em;
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
</style>
