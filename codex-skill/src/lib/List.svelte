<script>
  import Item from './Item.svelte';
  import { _, locale, locales } from './i18n.js';
  import { uniq, sortByChar } from './u.js';
  export let data = [];

  let quotePerPage = 10;

  let tags = uniq(data.map(i => i.tags).flat()).filter(Boolean);

  let gives = uniq(data.map(i => Object.keys(i.meta.gives || [])).flat()).sort(sortByChar);
  let causes = uniq(data.map(i => Object.keys(i.meta.causes || [])).flat()).sort(sortByChar);
  gives.unshift('');
  causes.unshift('');

  let defaultRules = [{
    prop: 'effect.causes',
    timestamp: +new Date(),
  }];

  let filteredItems = data;
  let ruleProps = [
    'titles',
    'effect.causes',
    'effect.gives',
    'intros',
    'tier',
    'tags',
    'img',
    'uid',
  ];
  let querylink = '';

  $: {
    rules,
    filteredItems = filterItems();
    querylink = updateUrl();
  }

  let rules = initRules();

  function initRules() {
    let sp = new URLSearchParams(location.search);
    let _rules = [...sp]
      .filter(i => i[1])
      .map((i, index) => {
        let _rule = {
          prop: i[0],
          value: i[1],
          timestamp: +new Date() + index,
        };

        if (i[1].includes('_')) {
          let arr = i[1].split('_');
          _rule.value = arr[0];
          _rule.rate = arr[1];
          _rule.comparator = arr[2];
        }
        return _rule;
      });
    return _rules.length ? _rules : defaultRules;
  }

  function updateUrl() {
    let sp = new URLSearchParams();
    rules.forEach(rule => {
      let v = rule.value;
      if (rule.rate) {
        v += `_${rule.rate}_${rule.comparator}`;
      }
      sp.append(rule.prop, v);
    });
    return sp.toString();
  }

  function addFilter(argument) {
    rules = rules.concat({
      prop: 'effect.causes',
      timestamp: +new Date(),
    });
  }

  function rmRule(timestamp) {
    rules = rules.filter(i => i.timestamp !== timestamp);
  }

  function filterItems() {
    let _data = data;
    rules.forEach(rule => {
      if (rule) {
        _data = filterByRule(_data, rule);
      }
    });
    return _data;
  }

  function filterByRule(data, rule) {
    if (!rule.value || !data.length) {
      return data;
    }

    switch (rule.prop) {
      // strings
      case 'uid':
      case 'img':
      case 'tags':
      case 'titles':
      case 'intros': {
        let regex = new RegExp(rule.value, 'i');
        return data.filter(i => regex.test(i[rule.prop]));
      }
      case 'tier': {
        return data.filter(i => i[rule.prop] === rule.value);
      }
      case 'effect.causes': {
        return data.filter(i => filterByEffect(i, rule, 'causes'));
      }
      case 'effect.gives': {
        return data.filter(i => filterByEffect(i, rule, 'gives'));
      }
      default:
        return data;
    }
  }

  function filterByEffect(skill, rule, type = 'gives') {
    let _rate = skill.meta[type]?.[rule.value];
    if (_rate && rule.rate) {
      switch (rule.comparator) {
        case '=':
          return _rate === rule.rate;
        case '+':
          return _rate >= rule.rate;
        case '-':
          return _rate <= rule.rate;
      }
    }
    return _rate;
  }

  function showMore() {
    quotePerPage += 10;
  }

</script>


<aside>
  <div class="filter-ctrl">
    <button on:click={ addFilter }>{$_('add.filter')}</button>
    <a href="./?{querylink}">⚓</a>
    <span />
    <span />
    <label>
      👁️
      <input id="quotePerPage" type="number" bind:value={quotePerPage} min="1">
      / {filteredItems.length}
    </label>
  </div>

  <ul class="filters">
    {#each rules as rule (rule.timestamp)}
      <li>
        <button on:click={rmRule(rule.timestamp)}>x</button>

        <select bind:value={rule.prop}>
          {#each ruleProps as _p}
            <option value={_p}>{$_(_p)}</option>
          {/each}
        </select>

        {#if rule.prop === 'tags'}
          <select bind:value={rule.value}>
            {#each tags as tag}
              <option value={tag}>{$_(tag)}</option>
            {/each}
          </select>

        {:else if (rule.prop === 'effect.gives') || (rule.prop === 'effect.causes')}
          <select bind:value={rule.value}>
            {#each ((rule.prop === 'effect.gives') ? gives : causes) as effect}
              <option value={effect}>{$_(effect)}</option>
            {/each}
          </select>

          <input type="number" bind:value={rule.rate} step="10" max="100" min="0">
          <select bind:value={rule.comparator}>
            <option value="=">=</option>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>

        {:else if rule.prop === 'tier'}
          <input type="number" min="1" max="10" bind:value={rule.value}>

        {:else}
          <input type="search" bind:value={rule.value}>

        {/if}

      </li>
    {/each}
  </ul>
</aside>


<ul class="items">
  {#each filteredItems.slice(0, quotePerPage) as item (item.uid)}
    <Item item={item} />
  {/each}
</ul>

{#if filteredItems.length > quotePerPage}
  <button class="more" on:click={showMore}>more</button>
{/if}


<style>
  .filter-ctrl {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .filter-ctrl input {
    width: 5em;
    text-align: center;
  }
  .filters input {
    max-width: 30%;
  }
  .more {
    display: block;
    margin: 0 auto;
    width: fit-content;
  }
</style>
