<script>
	import Monster from './Monster.svelte';
	import { en2zh } from './name.js';
  import { handleData, saveItem, getItem } from './u.js';

  let historyId = getItem('historyId') || [];
  $: history = genHistory(historyId);

	let monsterId = +(new URLSearchParams(location.search).get('id') || historyId[0] || 404);
  let queryId = monsterId;

  let skills = [];
  $: monsters = [];
  $: monster = queryMonsterById(+monsterId, monsters);

  $: {
    if (monster) {
      historyId.unshift(monster.id);
      historyId = [...new Set(historyId)].slice(0, 5);

      saveItem({
        key: 'historyId',
        value: historyId,
      });
    }
  }

  let promise = getData();

  function queryMonsterById(mid, arr = monsters) {
    return arr.find(m => m.id === +mid);
  }

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

  function handleClickHistory(mid) {
    monsterId = mid;
  }

  function genHistory(monster_ids) {
    return monster_ids.map(mid => queryMonsterById(mid));
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
        <option value={monster.id}>
          {monster.zh} - {monster.name} / T{monster.tier}
        </option>
      {/each}
    </datalist>
    <input type="submit" value="Q" />
  </form>

  <aside class="history">
    <details>
      <summary>History</summary>
      <ul>
        {#each history as i}
          <li>
            <a href="./?id={i.id}" on:click|preventDefault={() => handleClickHistory(i.id)}>{i.id} - {i.zh}</a>
          </li>
        {/each}
      </ul>
    </details>
  </aside>

  <hr>

  <Monster monster={monster} skills={skills} />

{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
