<script>
  import Item from './Item.svelte';
  import { _ } from 'svelte-i18n';
  import { uniq, sortByChar } from './u.js';
  export let data = [];

  let quotePerPage = 20;

  let tags = uniq(data.map(i => i.tags).flat()).filter(Boolean);

  let gives = uniq(data.map(i => Object.keys(i.metas.gives || [])).flat()).sort(sortByChar);
  let causes = uniq(data.map(i => Object.keys(i.metas.causes || [])).flat()).sort(sortByChar);
  gives.unshift('');
  causes.unshift('');

  let filteredItems = data;
  let queryS = '';
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

  $: {
    queryS,
    rules,
    filteredItems = filterItems();
  }

  let rules = [
    {
      prop: 'effect.causes',
      timestamp: +new Date(),
    },
  ];

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
    console.log(rule);
    if (!rule.value || !data.length) {
      return data;
    }

    switch (rule.prop) {
      case 'uid':
      case 'img':
      case 'tags':
      case 'titles':
      case 'intros': {
        return data.filter(i => i[rule.prop]?.includes(rule.value));
      }
      case 'tier': {
        return data.filter(i => i[rule.prop] === rule.value);
      }
      case 'effect.causes': {
        return data.filter(i => i.metas.causes?.[rule.value]);
      }
      case 'effect.gives': {
        return data.filter(i => i.metas.gives?.[rule.value]);
      }
      default:
        return data;
    }
  }

  function showMore() {
    quotePerPage += 10;
  }

</script>


<aside>
  <div class="filter-ctrl">
    <button on:click={ addFilter }>{$_('add.filter')}</button>
    <label>
      👁️
      <input id="quotePerPage" type="number" bind:value={quotePerPage} min="1">
      / {filteredItems.length}
    </label>
  </div>

  <!--
  <datalist id="effects">
    {#each effects as effect}
      <option value={effect}>{$_(effect)}</option>
    {/each}
  </datalist>
  -->

  <ul class="filters">
    {#each rules as rule}
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

        {:else if (rule.prop === 'effect.gives')}
          <select bind:value={rule.value}>
            {#each gives as effect}
              <option value={effect}>{$_(effect)}</option>
            {/each}
          </select>

        {:else if (rule.prop === 'effect.causes')}
          <select bind:value={rule.value}>
            {#each causes as effect}
              <option value={effect}>{$_(effect)}</option>
            {/each}
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
    justify-content: space-between;
  }
  .filter-ctrl input {
    width: 5em;
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
