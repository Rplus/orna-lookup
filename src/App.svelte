<script>
  import { data, filters } from './stores.js';
  import Filters from './Filters.svelte';
  import List from './List.svelte';
  import Item from './Item.svelte';
  import Dialog from './Dialog.svelte';
  import FixForm from './FixForm.svelte';
  import { filtersDef } from './filtersDef.js';
  import { escapeRegExp } from './u.js';
  import { setContext } from 'svelte';
  import { getImgSrc, checkingImg } from './image.js';

  let init = false;
  let items = [];

  // init data
  $: {
    if (!$data.waiting && !init) {
      init = true;
      items = $data.items;
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
    <FixForm />
  {:else}
    <hr />
    <hr />
    <div class="text-center">Loading...</div>
    <hr />
  {/if}
</div>

<hr>

<footer>
  <ul>
    <li>
      ↬ go to check <a href="./monster/">Monsters Strategy</a>
    </li>
    <li>
      ↬ go to check <a href="./skill/">Skills</a>
    </li>
  </ul>
  <div>
  * comment on <a href="https://docs.google.com/spreadsheets/d/1JZM_9U7hYtq39T0BeZHaUrJVKSWWNfxLxcZnrJPiHBQ/edit#gid=2050818910">Google spreadsheet</a> to update data <br>
  -- <br>
  * repo: <a href="https://github.com/rplus/orna-lookup" target="_blank">Rplus/orna-lookup</a> <br>
  * origin data: <a href="https://orna.guide/" target="_blank">https://orna.guide/</a> api<br>
  </div>
</footer>


<style>
  .workspace {
    max-width: 900px;
    margin: auto;
  }

  footer {
    padding: 2em 1em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-family: serif;
    font-style: italic;
  }
  footer ul {
    padding: 0;
    list-style: none;
  }
  footer div {
    text-align: right;
  }
</style>
