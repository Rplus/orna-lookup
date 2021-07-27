<script>
  import { data, filters } from './stores.js';
  import Filters from './Filters.svelte';
  import { setContext } from 'svelte';


  let init = false;
  let oData = [];
  let items = [];
  $: allProps = [];
  let sortProp;
  let openedItems = [];
  $: sortDirASC = true;

  $: maxItem = 50;
  $: maxDetailsItem = 30;
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

  function getImgSrc(imgPath) {
    return `https://images.weserv.nl/?w=96&il&url=https://orna.guide/static/orna/img/${imgPath}`;
  }

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
          <Filters {...filter} />
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
        {#each allProps as p}
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
      <details class="item-details">
        <summary>
          <!-- {item.id} -->
          <ruby>
            <rb>{item.name_zh}</rb>
            <rt>{item.name}</rt>
          </ruby>

          <a href="https://orna.guide/items?show={item.id}" target="orna.guide">
            <sup>★{item.tier}</sup>
          </a>

          <div
            class="item-img-box"
            style={`--bg: url(${getImgSrc(item.image)})`}
          />
        </summary>

        <div class="item-more">
          <pre class="item-pre">
            { JSON.stringify({...item, context: null}, null, ' ') }
          </pre>
        </div>
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
  .workspace {
    max-width: 900px;
    margin: auto;
  }

  .items {
    margin-right: max(10vw, 3em);
    list-style: none;
  }

  .items summary {
    position: relative;
    z-index: 1;
    cursor: copy;
  }

  .items li {
    margin-bottom: 1em;
    background-color: #9991;
  }

  .items sup {
    color: #99c;
  }

  .item-img-box {
    display: block;
    width: 96px;
    margin-left: 3vw;
  }

  .items.showDetails .item-img-box,
  .item-details[open] .item-img-box {
    height: 96px;
    background-image: var(--bg);
    background-repeat: no-repeat;
  }

  .item-pre {
    margin-left: 5vw;
    padding: .5em 1em;
    white-space: pre;
    overflow: auto;
    font-size: 1.25em;
    background-color: #aaa3;
  }

  @media (min-width: 900px) {
    .item-pre {
      margin-top: -100px;
      margin-left: 200px
    }
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
  ruby {
    ruby-position: under;
    ruby-align: center;
  }
  rt {
    color: #999;
  }
</style>
