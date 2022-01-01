<script>
	import Monster from './Monster.svelte';
	import { en2zh } from './name.js';
  import { handleData } from './u.js';

	let monsterId = +(new URLSearchParams(location.search).get('id') || 404);
  let queryId = monsterId;

  let skills = [];
  $: monsters = [];
  $: monster = monsters.find(m => m.id === +monsterId);

  $: console.log({monsterId, monster});

  let promise = getData();

  async function getData() {
    const raw_monsters = await fetchJSON('./monster.json');
    const raw_skills = await fetchJSON('./skill.json');
    // const all_item = await fetchJSON('./item.json');

    if (!raw_skills || !raw_monsters) {
      throw new Error('_ERROR_: fetch data fails');
    }

    const data = handleData(raw_monsters, raw_skills);
    skills = data.skills;
    monsters = data.monsters;
    return monsters;
  }

  async function fetchJSON(url) {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (!data.length) {
        throw new Error('empty data');
      }
      return data;
    } else {
      throw new Error(data);
    }
  }

  function handleSubmit() {
    let id = !isNaN(queryId) && +queryId;
    if (id) {
      monsterId = id;
    }
  }
</script>

<h2>Monsters Strategy | Orna RPG</h2>

{#await promise}
  <p>...waiting</p>
{:then monsters}

  <form class="form" on:submit|preventDefault={handleSubmit}>
    <input
      list="monster_name"
      type="search"
      bind:value={queryId}
      pattern="[1-5]?[0-9]?[0-9]"
      title="1~500 數字"
    />
    <datalist id="monster_name">
      {#each monsters as monster}
        <option value={monster.id}>{monster.name} - {monster.zh}</option>
      {/each}
    </datalist>
    <input type="submit" value="Q" />
  </form>

  <hr>

  <Monster monster={monster} skills={skills} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
