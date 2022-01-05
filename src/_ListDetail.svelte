<script>
  export let items = null;
  export let title = '';
  export let type = 'monsters';
  export let prop = '';
  import { filters } from './stores.js';
  import { createNewFilter } from './u.js';

  function handleClick(value) {
    let newRule = createNewFilter({
      prop,
      value,
      type: 'number',
    });
    filters.set([newRule]);
  }
</script>



{#if items}
  <details open>
    <summary>{title}</summary>
    <ul>
      {#each items as item}
        <li>
          <a href="https://orna.guide/{type}?show={item.id}" target="orna.guide" on:click|preventDefault={() => handleClick(item.id)}>
            <small>
              ★{item.tier} -
            </small>
            {item.name_zh || item.name}
          </a>
        </li>
      {/each}
    </ul>
  </details>
{/if}
