<script>
  import dataUrl from './orna-skills.json?url';
  // import { _, locale } from 'svelte-i18n';
  import Lang from './lib/Lang.svelte';
  import List from './lib/List.svelte';
  import { fetchJSON, handleData } from './lib/u.js';

  let promise = getData();

  async function getData() {
    const data = await fetchJSON(dataUrl);
    if (!data) {
      throw new Error('_ERROR_: fetch data fails');
    }
    return handleData(data);
  }
</script>

<main>
  <h1 class="text-center">ORnA SkIlLs</h1>

  {#await promise}
    Loading~
  {:then data}
    <List data={data} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<footer>
  <Lang />
</footer>

<style>
  @import './global.css';

  h1 {
    font-family: 'Cinzel Decorative', cursive;
    text-shadow: 0 2px 1px #ff33;
  }

  main {
    max-width: 500px;
    margin: auto;
  }
</style>
