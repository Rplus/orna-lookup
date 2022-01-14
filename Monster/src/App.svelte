<script>
  import { _, locale } from 'svelte-i18n';
  import Lang from './Lang.svelte';
	import Monster from './Monster.svelte';
  import { handleData, saveItem, getItem } from './u.js';

  let historyId = getItem('historyId') || [];
  $: history = genHistory(historyId);

	let monsterId = +(new URLSearchParams(location.search).get('id') || historyId[0] || 404);
  let queryId = monsterId;

  let skills = [];
  $: monsters = [];
  $: monster = queryMonsterById(+monsterId, monsters);

  let items = [];

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
    const raw_monsters = await fetchJSON('../data/monster.min.json');
    const raw_skills = await fetchJSON('../data/skill.min.json');
    const raw_items = await fetchJSON('../data/item-lite.min.json');

    if (!raw_skills || !raw_monsters || !raw_items) {
      throw new Error('_ERROR_: fetch data fails');
    }

    const data = handleData(raw_monsters, raw_skills, raw_items);
    skills = data.skills;
    monsters = data.monsters;
    items = data.items;
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

  function nextMonster(dir = 1) {
    if (!monsters.length) { return; }
    let currentIndex = monsters.findIndex(m => m.id === monsterId);
    if (isNaN(currentIndex)) {
      return;
    }
    let newIndex = currentIndex + dir;
    if (newIndex < monsters.length - 1 && newIndex >= 0) {
      let newMonster = monsters[newIndex];
      monsterId = newMonster.id;
      queryId = newMonster.id;
    }
  }
</script>

<h2>Monsters Strategy | Orna RPG</h2>

{#await promise}
  <p>...waiting</p>
{:then monsters}
  <form class="form" on:submit|preventDefault={handleSubmit}>
    <input
      type="button"
      value="<"
      on:click|preventDefault|stopPropagation={() => nextMonster(-1)}
    />
    .
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
          {#if $locale === 'zh'}
            {monster.zh} -
          {/if}
          {monster.name} / T{monster.tier}
        </option>
      {/each}
    </datalist>
    <input type="submit" value="Q" />
    .
    <input
      type="button"
      value=">"
      on:click|preventDefault|stopPropagation={() => nextMonster()}
    />
  </form>

  <aside class="history">
    <details>
      <summary class="op-5">{$_('history')}</summary>
      <ul>
        {#each history as i}
          <li>
            <a
              href="./?id={i.id}"
              on:click|preventDefault={() => handleClickHistory(i.id)}
            >
              {i.id} - {i[$_('name_prop')]}
            </a>
          </li>
        {/each}
      </ul>
    </details>
  </aside>

  <hr>

  <Monster monster={monster} skills={skills} items={items} />

{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<hr>

<Lang />

