<script>
  export let skill;
  import { _, locale } from 'svelte-i18n';

  $: skillSpec = [
    'type',
    'gives',
    'causes',
    'element',
  ].map(prop => {
    let value = skill[prop];
    if (!value) { return null; }
    if (!value.map) {
      value = [value];
    }
    return {
      prop,
      value,
    }
  }).filter(Boolean);
</script>




<details class="skill-details">
  <summary>
    <dt>
      <a href="https://orna.guide/skills?show={skill.id}" target="orna.guide">
        {#if $locale !== 'en'}
          <ruby>
            <rb>{skill.zh}</rb>
            <rt class="op-5">{skill.name}</rt>
          </ruby>
        {:else}
          {skill.name}
        {/if}
      </a>
      <sup class="op-5">★{skill.tier}</sup>
    </dt>

    <dd>
      {#each skillSpec as spec}
        <div>
          <sup class="op-5">{$_(spec.prop)}:</sup>
          {#each spec.value as value}
            <span class="arr-item">{$_(value)}</span>
          {/each}
        </div>
      {/each}
    </dd>
  </summary>
  <pre>
    {JSON.stringify(skill, null, 2)}
  </pre>
</details>


<style>
.skill-details {
  margin-left: 1em;
  margin-top: 0.5em;
  margin-bottom: .5em;
}

.skill-details dt {
  display: inline-block;
}

.skill-details ::marker {
  font-size: smaller;
  color: #fff3;
}

.skill-details pre {
  margin-left: 2em;
  opacity: 0.3;
  font-size: smaller;
  transition: opacity .3s;
}

.skill-details pre:hover {
  opacity: 0.8;
}
</style>
