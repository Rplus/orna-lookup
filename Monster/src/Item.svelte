<script>
  export let items = [];
  import Name from './Name.svelte';

  function sortByTier(a, b) {
    return b.tier - a.tier;
  }

</script>

<details open>
  <summary>Drop Items</summary>
  {#if items.filter(Boolean).length}
  {#each items.sort(sortByTier) as item (item.id)}
    <div class="item">
      <img class="item-img" src="https://playorna.com/static/img/{item.image}" alt="{item.name} - {item.zh}" />
      <a href="https://orna.guide/items?show={item.id}" target="orna.guide">
        <Name name={item.name} zh={item.zh} />
      </a>
      <sup class="op-5">
        ★{item.tier}
      </sup>
    </div>
  {/each}
  {/if}
</details>


<style>

.item {
  margin: .25em 0 .25em 2em;
}
.item-img {
  width: 1.5em;
  margin-right: .25em;
  aspect-ratio: 1;
  vertical-align: middle;
}

</style>
