<script>
  import { setContext } from 'svelte';
  import dataUrl from './orna-skills.min.json?url';
  import Lang from './lib/Lang.svelte';
  import List from './lib/List.svelte';
  import { fetchJSON, handleData } from './lib/u.js';

  let promise = getData();

  async function getData() {
    const data = await fetchJSON(dataUrl);
    if (!data) {
      throw new Error('_ERROR_: fetch data fails');
    }
    window.icons = data.icons;
    return handleData(data.skills);
  }
</script>

<main>
  <h1 class="text-center">ORnA SkIlLs</h1>
  <hr>

  {#await promise}
    Loading~
  {:then skills}
    <List data={skills} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<hr>

<footer>
  <Lang />

  <div class="info">
    Made by Rplus
    <br>
    data from <a href="https://playorna.com/codex/spells/" target="orna.codex">playorna / codex</a>
    <br>
    ↸ back to <a href="../">../orna-lookup tool</a>
  </div>
</footer>

<style>
  @import './global.css';

  h1 {
    font-family: 'Cinzel Decorative', cursive;
    text-shadow: 0 2px 1px #ff33;
  }

  footer {
    display: flex;
    justify-content: space-between;
  }

  .info {
    font-family: serif;
    font-style: italic;
    text-align: right;
  }
</style>
