<script>
  export let item = {};
  import { _, locale } from './i18n.js';
  import { trans, Langs } from './u.js';
  let icons = window.icons;
</script>

<li class="item">
  <h3 class="title">
    <sup class="tier" data-tier={item.tier}>★{item.tier}</sup>
    {trans(item.title, $locale)}
    <a href="https://playorna.com/codex/spells/{item.uid}/?lang={Langs[$locale]}" target="orna.codex">↗</a>
  </h3>

  <div class="img">
    <img
      src="https://playorna.com/static/img/{item.img}"
      alt={trans(item.title, $locale)}
      width="64" height="64" loading="lazy"
    />

    <div class="intro">
      ★{item.tier}
      <br>
      {trans(item.intro, $locale)}
    </div>

    {#if item.tags}
      <div>
        {#each item.tags as tag}
          <button class="tags" disabled>{$_(tag)}</button>
        {/each}
      </div>
    {/if}
  </div>

  <dl class="effects">
    {#each item.effect_types as effect_type}
      {#if item.metas[effect_type]}
        <dt>{effect_type}</dt>
        {#each Object.keys(item.metas[effect_type]) as effect}
          <dd>
            <span class="percent">
              {item.metas[effect_type][effect] * 100}%
            </span>
            -
            <img class="effect-icon" src="https://playorna.com/static/img/{icons[effect]}" alt={effect} width="24" height="24" loading="lazy">
            {$_(effect)}
          </dd>
        {/each}
      {/if}
      <br>
    {/each}
  </dl>

  <details>
    <summary title="raw data" />
    <pre>{JSON.stringify(item, null, 2)}</pre>
  </details>
</li>


<style>
  .item {
    position: relative;
    margin-bottom: 1em;
    padding: 0.5em 1em;
    list-style: none;
    background-color: #9991;
    font-family: monospace;
    display: grid;
    gap: .5em;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "title title"
      "img effects";
  }
  .tier {
    position: absolute;
    top: 0;
    right: 0;
    visibility: hidden;
    overflow: hidden;
    font-size: 8em;
  }
  .tier::before {
    content: attr(data-tier);
    position: absolute;
    top: -.25em;
    right: -.12em;
    visibility: visible;
    opacity: 0.07;
  }
  .img {
    grid-area: img;
  }
  .intro {
    opacity: 0.8;
  }
  .title {
    grid-area: title;
  }
  .effects {
    grid-area: effects;
    font-size: 1rem;
    font-size: clamp(1em, 2vw, 1rem);
    line-height: 1.25;
  }
  dl {
    margin: 0;
  }
  dt {
    text-transform: capitalize;
    font-weight: 900;
    width: 5em;
    padding: 0 0.5em;
    box-shadow: inset 0 -.7em #fff2;
    margin-bottom: 0.25em;
  }
  dd {
    display: flex;
    gap: .5em;
    align-items: center;
    margin-left: 0.5em;
  }
  .effect-icon {
    opacity: 0.75;
    transition: opacity .3s;
  }
  dd:hover .effect-icon {
    opacity: 1;
  }
  .percent {
    display: inline-block;
    text-align: right;
    width: 2em;
  }
  h3 {
    margin-bottom: 0.5em;
  }
  .img > * {
    margin-bottom: .5em;
  }
  .tags {
    text-transform: capitalize;
  }
  details {
    padding-left: 3em;
    grid-column: 1 / -1;
  }
  details summary {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    border: .5em solid #28231f;
    border-top-color: #9991;
    border-left-color: #9991;
    cursor: pointer;
  }
  details summary:hover {
    background-color: #fff1;
  }
  details[open] summary {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: unset;
    backdrop-filter: blur(3px);
  }
  details pre {
    position: absolute;
    top: 2em;
    left: 2em;
    right: 2em;
    bottom: 0;
    margin: 0;
    padding: 1em;
    overflow: auto;
    background-color: #110;
  }
</style>
