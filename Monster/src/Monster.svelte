<script>
  export let monster;
  export let skills;
  import { en2zh } from './name.js';
  import Skill from './Skill.svelte';
  import Chart from './Chart.svelte';

  $: m_skills = monster.skills?.map(
  	sid => skills.find(s => s.id === sid)
	).sort(skillSort) || [];

  $: skill_types = m_skills.map(s => s.type);

  $: spec = [
    'weak_to',
    'immune_to',
    'resistant_to',
    'immune_to_status',
  ].map(p => {
    let value = monster[p];
    if (!value) { return null; }
    if (value.map) {
      value = value.map(en2zh);
    }
    return {
      prop: p,
      name: en2zh(p),
      value,
    }
  }).filter(Boolean);

  function skillSort(a, b) {
  	return b.tier - a.tier;
  }
</script>



<section>
  <header class="mb1">
    #{monster.id} -
    <a href="https://orna.guide/monsters?show={monster.id}" target="orna.guide">
      <ruby>
        <rb>{monster.zh}</rb>
        <rt>{monster.name}</rt>
      </ruby>
    </a>
    <sup>
      ★{monster.tier}
    </sup>
  </header>

  <img class="avatar" src="https://playorna.com/static/img/{monster.image}" alt={monster.zh}>

  <div class="info flex text-start">
    <dl>
      {#each spec as point}
        <dt>{point.name}</dt>
        <dd>
          {#each point.value as _type}
            {_type}
            <br>
          {/each}
        </dd>
      {/each}
    </dl>

    <ul>
      <li>
        Debuffs
        <hr>
      </li>
      {#if monster.skills_effect}
        {#each monster.skills_effect as debuff}
          <li>
            <label>
              <input type="checkbox" />
              {debuff.label}
              <a href="https://rplus.github.io/orna-lookup/?prevents={debuff.value}" target="ornagle">↗</a>
            </label>
          </li>
        {/each}
      {/if}
    </ul>
  </div>

  <Chart types={skill_types} />

  <hr>

  {#if monster.skills}
    <details open class="mb1">
      <summary>Skill Details</summary>
      <div>
        {#each m_skills as skill}
          <Skill skill={skill} />
        {/each}
      </div>
    </details>
  {/if}

  <details>
    <pre>
    { JSON.stringify(monster, null, 2)}
    </pre>
  </details>
</section>



<style>
  img.avatar {
    width: 96px;
    aspect-ratio: 1;
    image-rendering: pixelated;
  }
  .info {
    display: flex;
    justify-content: center;
    gap: 1em;
    text-align: start;
  }
  .info {
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  dd ~ dt {
    margin-top: 0.5em;
  }
  li {
    list-style: none;
  }
  label a {
    margin-left: .5em;
  }
</style>
