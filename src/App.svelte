<script>
  import { data, filters } from './stores.js';
  import Filters from './Filters.svelte';
  import List from './List.svelte';
  import Item from './Item.svelte';
  import Dialog from './Dialog.svelte';
  import { filtersDef } from './filtersDef.js';
  import { getDeepProp, escapeRegExp } from './u.js';
  import { setContext } from 'svelte';
  import { getImgSrc, checkingImg } from './image.js';

  let init = false;
  let items = [];

  // init data
  $: {
    if (!$data.waiting && !init) {
      init = true;
      items = $data;
    }
  }

</script>

<div class="workspace">
  <h1 class="text-center"><a href="https://playorna.com/" target="_blank">Orna RPG</a> items lookup tool</h1>

  {#if init}
    <Filters />

    <hr />

    <List items={items} />

    <Dialog />
  {:else}
    <hr />
    <hr />
    <div class="text-center">Loading...</div>
    <hr />
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

  footer {
    text-align: right;
    font-family: serif;
    font-style: italic;
    padding: 2em .5em;
  }
</style>
