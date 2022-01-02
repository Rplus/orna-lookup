<script>
  export let monster;
  export let skills;
  import { _, locale } from 'svelte-i18n';
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
    return {
      prop: p,
      value,
    }
  }).filter(Boolean);

  function skillSort(a, b) {
    return b.tier - a.tier;
  }
</script>



<section>
  <header class="mb1">
    <a href="./?id={monster.id}">⚓</a>
    #{monster.id} -
    <a href="https://orna.guide/monsters?show={monster.id}" target="orna.guide">
      {#if $locale !== 'en'}
        <ruby>
          <rb>{monster.zh}</rb>
          <rt class="op-5">{monster.name}</rt>
        </ruby>
      {:else}
        {monster.name}
      {/if}
    </a>
    <sup>
      ★{monster.tier}
    </sup>
  </header>

  <img class="avatar" src="https://playorna.com/static/img/{monster.image}" alt={monster.zh}>

  <div class="info flex text-start">
    <dl>
      {#each spec as point}
        <dt>{$_(point.prop)}</dt>
        <dd>
          {#each point.value as _type}
            {$_(_type)}
            <br>
          {/each}
        </dd>
      {/each}
    </dl>

    <dl>
      <dt>Debuffs</dt>
      {#if monster.skills_effect}
        {#each monster.skills_effect as debuff}
          <dd>
            <label>
              <input type="checkbox" readonly />
              {$_(debuff)}
              <a href="https://rplus.github.io/orna-lookup/?prevents={debuff}" target="ornagle">↗</a>
            </label>
          </dd>
        {/each}
      {/if}
    </dl>

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

  <hr>

  <details class="op-5">
    <summary>RAW DATA</summary>
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
    gap: 2em;
    text-align: start;
  }
  .info {
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  dt {
    margin-top: 0.75em;
    margin-bottom: 0.1em;
    padding-bottom: 0.1em;
    border-bottom: 1px dotted #fff4;
  }

  label a {
    margin-left: .5em;
  }
</style>