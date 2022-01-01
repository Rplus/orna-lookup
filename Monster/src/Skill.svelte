<script>
  export let skill;
  import { en2zh } from './name.js';

  $: skillSpec = [
    'type',
    'gives',
    'causes',
    'element',
  ].map(prop => {
    let value = skill[prop];
    if (!value) { return null; }
    if (value.map) {
      value = value.map(en2zh);
    } else if (typeof value === 'string') {
      value = en2zh(value);
    }
    return {
      prop: en2zh(prop),
      value,
    }
  }).filter(Boolean);
</script>



<dt>
  <a href="https://orna.guide/skills?show={skill.id}" target="orna.guide">
    <ruby>
      <rb>
        {skill.zh}
      </rb>
      <rt class="op-5">{skill.name}</rt>
    </ruby>
  </a>
  <sup>★{skill.tier}</sup>
</dt>

<dd>
  {#each skillSpec as spec}
    <div>
      <sup class="op-5">{spec.prop}:</sup>
      {spec.value}
    </div>
  {/each}

  <details class="skill-details op-5">
    <pre>
      {JSON.stringify(skill, null, 2)}
    </pre>
  </details>
</dd>
