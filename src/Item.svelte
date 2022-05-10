<script>
  export let item;
  import { getImgBgStyle } from './image.js';
  import { words } from './list.js';
  import { getZh, getDeepProp, createNewFilter } from './u.js';
  import { dialog, data, fixForm, filters } from './stores.js';
  import ListDetail from './_ListDetail.svelte';

  const statProps = [
    'hp',
    'mana',
    'attack',
    'magic',
    'defense',
    'resistance',
    'dexterity',
    'ward',
    'crit',
    'foresight',
  ];

  let effectTypes = [
    ['causes', '🔪'],
    ['immunities', '🛡️'],
    ['gives', '🎁'],
    ['cures', '❤️‍🩹'],
    ['other_effect', '✨'],
  ];

  let stats = statProps.map(prop => ({
    prop,
    value: item.stats?.[prop],
  }))
  .filter(i => i.value);

  function assess() {
    dialog.set({
      open: true,
      item: item,
      stats: stats,
    })
  }

  function goToFixForm() {
    fixForm.set({
      open: true,
      item: item,
    })
  }

  function getSpellUrl(spellEffect) {
    let zh = spellEffect.split(': ')[1];
    if (!zh) { return '###'; }
    let spell = $data.spells.find(s => s.name.zh === zh);
    if (!spell) { return '###'; }
    return `https://playorna.com/codex/spells/${spell.oid}/`;
  }
</script>

<details class="item-details item-rarity--{item.rarity || 'w'}">
  <summary class="summary">
    <ruby>
      <rb>{item.name.zh}</rb>
      <rt>
        <a href="https://playorna.com/codex/items/{item.oid}/" target="codex">
          {item.name.en}
        </a>
      </rt>
    </ruby>
    <sub class="tier" data-tier="{item.tier}">{item.tier}</sub>

    <a href="https://orna.guide/items?show={item.gid}" target="orna.guide">
      <sup>#{item.gid}</sup>
      <!-- <sup>★{item.tier}</sup> -->
    </a>

    <!--
    <a href="https://orna.guide/items?show={item.gid}" target="orna.guide">
      <sup>★{item.tier}</sup>
    </a>
    -->

    <div class="item-info" on:click|preventDefault>
      <div
        class="item-img-box"
        style={getImgBgStyle(item)}
      />

      {#if stats.length}
        <div on:click={assess} style="cursor: pointer;">
          [ Stats ]
          <br>
          ---------
          <table>
            {#each stats as stat}
              <tr>
                <th>{getZh(stat.prop)}</th>
                <td>{stat.value}</td>
              </tr>
            {/each}
          </table>
        </div>
      {/if}

      {#each effectTypes as effect}
        {#if item[effect[0]]}
          <div class="text-right">
            <span title={effect[0]}>[ {effect[1]} ]</span>
            <br>
            -------
            {#each item[effect[0]] as p}
              {#if p.startsWith && p.startsWith('技能:')}
                <div>
                  <a href={getSpellUrl(p)} target="codex" on:click|stopPropagation>{getZh(p)}</a>
                </div>
              {:else}
                <div>{getZh(p)}</div>
              {/if}
            {/each}
          </div>
        {/if}
      {/each}


    <div class="rt-box">
      <div class="item-equipped" title={item.equipped_by} />
      <div class="item-char">{words[item.element] ? `[${words[item.element]}]` : ''}</div>
      <div class="item-char" title="dropped from boss">{item.boss ? '👿' : ''}</div>
      <div class="item-char" title="dropped from arena">{item.arena ? '🏟️' : ''}</div>
      <div class="item-char" title="enhance view distance">{item.view_distance ? '👁️' : ''}</div>
      <div class="item-char" title="two hands">{item.two_handed ? '🙌' : ''}</div>
      <div class="item-slots" data-slots={item.slots} title="{item.slots} slots" />
    </div>
  </summary>

  <div>
    <div class="item-more"
      data-type="{words[item.type]}"
      data-category="{words[item.category] || ''}"
    >
      <div class="dropped_by">
        <ListDetail
          items={item.dropped_by}
          title="掉落方"
          type="monsters"
          prop="dropped_by"
        />
      </div>

      <div class="materials">
        <ListDetail
          items={item.materials}
          title="材料"
          type="items"
          prop="gid"
        />
      </div>

      {#if item.resource}
      <div class="resource">
        <ListDetail
          items={item.resource}
          title="分解來源"
          type="items"
          prop="gid"
        />
      </div>
      {/if}



      <details class="raw-details">
        <summary class="raw-summary text-right"></summary>
        <pre class="raw-pre item-pre">
          { JSON.stringify({...item, context: ''}, null, ' ') }
        </pre>
      </details>

      <div class="fixform" on:click={goToFixForm} title="FIX DATA">🛠️</div>
    </div>
  </div>
</details>



<style>
.item-rarity--p { --rarity-color: #c0c8; }
.item-rarity--b { --rarity-color: #44f8; }
.item-rarity--g { --rarity-color: #0808; }

.summary {
  position: relative;
  z-index: 1;
  padding: .5em;
  cursor: copy;
  font-weight: bolder;
}

.summary > a {
  opacity: .75;
  transition: opacity .5s;
}
.summary:not(:hover) > a {
  opacity: 0;
}

.summary::after {
  content: '';
  display: block;
}

.rt-box {
  position: absolute;
  top: .75em;
  right: .75em;
  text-align: right;
}

.item-char:not(:empty) {
  display: var(--item-icons--display, none);
  margin-top: .5em;
  font-weight: normal;
}

.item-equipped {
  height: 1.5em;
  width: 5.175em;
  background-image:
    var(--bg-mage, none),
    var(--bg-thief, none),
    var(--bg-warrior, none);
  background-repeat: no-repeat;
  background-position: 0 50%, 50% 50%, 100% 50%;
  background-size: contain;
  filter: sepia(1) brightness(.6);
}

.item-equipped[title*="Warrior" i] {
  --bg-mage: url('../images/Warrior.png');
  --bg-mage: url('https://playorna.com/static/img/weapons/blue_flame.png');
}
.item-equipped[title*="Thief" i] {
  --bg-thief: url('../images/Thief.png');
  --bg-thief: url('https://playorna.com/static/img/weapons/bow.png');
}
.item-equipped[title*="Mage" i] {
  --bg-warrior: url('../images/Mage.png');
  --bg-warrior: url('https://playorna.com/static/img/weapons/cane.png');
}

.item-slots[data-slots]::before {
  display: block;
  margin-top: 0.5em;
  content: attr(data-slots) '⊙';
}

.item-info {
  display: var(--item-info--disply, none);
  flex-wrap: wrap;
  align-items: flex-end;
  padding-right: 3em;
  font-weight: normal;
  color: #fff9;
  font-family: monospace;
  white-space: nowrap;
  cursor: initial;
}

.item-info > * {
  margin-right: min(1em, 2vw);
  margin-left: min(1em, 2vw);
  margin-bottom: .5em;
}

:global(.items.showDetails),
.item-details[open] {
  --item-info--disply: flex;
  --item-icons--display: block;
}

.item-img-box {
  --item-img-size: min(10vw, 96px);

  position: relative;
  display: block;
  width: var(--item-img-size, 96px);
  flex-shrink: 0;
  margin-left: 3vw;
  margin-right: 3vw;
}
.item-img-box::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
  z-index: -1;
  height: 5%;
  color: var(--rarity-color, #0000);
  background-color: currentcolor;
  box-shadow: 0 0 10px 10px;
  border-radius: 50%;
}

:global(.items.showDetails) .item-img-box,
.item-details[open] .item-img-box {
  margin-top: 1rem;
  height: var(--item-img-size, 96px);
  align-self: flex-start;
  background-image: var(--bg, none);
  background-size: contain;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

.raw-summary {
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  border: 0.5em solid #28231f;
  border-top-color: #9991;
  border-left-color: #9991;
  cursor: pointer;
}
.raw-details[open] .raw-summary {
  top: 0;
  left: 0;
  border: unset;
  backdrop-filter: blur(3px);
}
.raw-pre {
  position: absolute;
  top: 2em;
  left: 2em;
  right: 2em;
  bottom: 0;
  z-index: 1;
  margin: 0;
  padding: 1em;
  overflow: auto;
  background-color: #110;
}

.item-more {
  margin-top: 1em;
  margin-left: 5em;
  padding-bottom: .5em;
  line-height: 1.4;
  font-size: smaller;
  white-space: nowrap;
}

.item-more::before {
  content: '【' attr(data-type) '】' var(--category, '');
  opacity: 0.5;
  display: inline-block;
  bottom: 0.5em;
  margin-left: -1em;
}
.item-more:not([data-category=""]) {
  --category: '- ' attr(data-category);
}

@media (min-width: 900px) {
  .item-more {
    margin-left: 163px
  }
}

.item-details sup {
  color: #669;
}

ruby {
  ruby-position: under;
  ruby-align: center;
}

rt > a,
rt {
  font-weight: normal;
  color: #779;
}

.tier {
  position: absolute;
  bottom: 0;
  right: 0;
  visibility: hidden;
  overflow: hidden;
  font-size: 10em;
  font-family: monospace;
  font-weight: bolder;
}

.tier::before {
  content: attr(data-tier);
  position: absolute;
  top: 0.2em;
  right: -0.12em;
  visibility: visible;
  opacity: .05;
}

table {
  border-collapse: collapse;
}

table th {
  padding-right: 0.5em;
}

.fixform {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  opacity: 0.2;
  transition: opacity .3s;
  cursor: pointer;
}
.raw-details[open] + .fixform,
.fixform:hover {
  opacity: 1;
}

</style>
