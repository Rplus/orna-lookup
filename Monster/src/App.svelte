<script>
	import Monster from './Monster.svelte';
	import { monsterNames } from './name.js';
	let monsterId = +(new URLSearchParams(location.search).get('id') || 348);
  let promise = getMonster();

  $: monsters = monsterNames;

  getMonsters();

  async function getMonster() {
    const monster = await getDataById('monster', { id: +monsterId || 1 });
		if (!monster) { return false; }
    const skills = monster.skills ? await getSkills(monster.skills) : [];
		const debuffs = [...new Set(skills.map(s => s.causes).filter(Boolean).flat())];
		const result = {
			id: monster.id,
			name: monster.name,
			img: monster.image,
			debuffs: debuffs,
			skillTypes: skills.map(s => s.type),
			immune_to_status: monster.immune_to_status,
			raw: monster,
			allSkills: skills,
		}
    return result;
  }

  async function getSkills(skills) {
    return await getDataById('skill', {
      exact: {
        or:skills.map(skill => ({ id: skill.id }))
      }
    }, false);
    // return await Promise.all(
    //   skills.map(
    //     async skill => getDataById('skill', { id: +skill.id } )
    //   )
    // );
  }

  async function getDataById(type, para, onlyOne = true) {
    const res = await fetch(`https://orna.guide/api/v1/${type}`, {
      body: JSON.stringify(para),
      method: 'POST',
    });
    const data = await res.json();
    if (res.ok) {
      if (!data.length) {
        throw new Error('empty data');
      }
      return onlyOne ? data[0] : data;
    } else {
      throw new Error(data);
    }
  }

  function handleSubmit() {
   	promise = getMonster();
  }

  async function getMonsters() {
    fetch('./monster.json')
      .then(res => res.json())
      .then(data => {
        monsters = data.map(i => [i.id, i.en, i.zh || i.en]);
      });
  }
</script>

	<h2>Monsters Strategy | Orna RPG</h2>
  <form on:submit|preventDefault={handleSubmit}>
  	<input list="monster_name" type="search" bind:value={monsterId} pattern="[1-5]?[0-9]?[0-9]" title="1~500 數字" />
  	<datalist id="monster_name">
  		{#each monsters as monster}
    		<option value={monster[0]}>{monster[1]} - {monster[2]}</option>
  		{/each}
  	</datalist>
    <input type="submit" value="Q" />
  </form>

{#await promise}
  <p>...waiting</p>
{:then monster}
  <Monster monster={monster} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
