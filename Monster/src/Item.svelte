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
    <div class="item" data-rarity={item.rarity}>
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
  margin: .25em 0 .25em 1.5em;
  padding-left: 0.5em;
  box-shadow: -.25em 0 0 0 var(--rarity-color, #0000);
}
.item[data-rarity="p"] { --rarity-color: #f098; }
.item[data-rarity="b"] { --rarity-color: #44f8; }
.item[data-rarity="g"] { --rarity-color: #0c08; }
.item-img {
  width: 1.5em;
  margin-right: .25em;
  aspect-ratio: 1;
  vertical-align: middle;
}

</style>
