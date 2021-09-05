<script>
  export let item;
  import { getImgSrc, checkingImg } from './image.js';
  import { words } from './list.js';
  import { getZh } from './u.js';
  import { dialog, data } from './stores.js';

  let effectTypes = [
    ['causes', '🗡️'],
    ['prevents', '🛡️'],
    ['gives', '🔋'],
    ['cures', '❤️‍🩹'],
  ];
  let stats = item.stats;
  if (stats) {
    stats = Object.keys(stats).map(i => ({
      prop: i,
      value: stats[i].base,
    }))
  }
  let materials = null;

  $: {
    if (item.materials) {
      materials = item.materials
        .map(m => {
          m.tier = getItemTier(m.id);
          m.name_zh = getItemNameZh(m.name);
          return m;
        })
        .sort(sortByTier);
    }
  }

  function assess() {
    dialog.set({
      open: true,
      item: item,
      stats: stats,
    })
  }

  function sortByTier(a, b) {
    return a.tier - b.tier;
  }

  // function checkProxyImg(item) {
  //   checkingImg(item)
  //   .then()
  //   .catch(e => {
  //     let index = items.findIndex(i => i.id == item.id);
  //     items[index].deadProxyImage = true;
  //   })
  // }

  function getItemNameZh(name_en) {
    return $data?.find(i => i.name === name_en)?.name_zh || name_en;
  }

  function getItemTier(id) {
    const item = $data?.find(i => i.id === id);
    return item?.tier || '';
  }

</script>

<details class="item-details">
  <summary class="summary">
    <!-- {item.id} -->
    <ruby>
      <rb>{item.name_zh}</rb>
      <rt>{item.name}</rt>
    </ruby>

    <a href="https://orna.guide/items?show={item.id}" target="orna.guide">
      <sup>★{item.tier}</sup>
    </a>

    <div class="item-info" on:click|preventDefault>
      <div
        class="item-img-box"
        style={`--bg: url(${getImgSrc(item)}); --bg-fallback: url(${getImgSrc(item, 'small')})`}
      />

      {#if stats}
        <div>
          [ Stats ]
          <br>
          ---------
          <table on:click={assess} style="cursor: pointer;">
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
              <div>{getZh(p)}</div>
            {/each}
          </div>
        {/if}
      {/each}


    <div class="rt-box">
      <div class="item-equipped" data-by={item.equipped_by} />
      <div class="item-char">{words[item.element] ? `[${words[item.element]}]` : ''}</div>
      <div class="item-char">{item.boss ? '👿' : ''}</div>
      <div class="item-char">{item.arena ? '🏟️' : ''}</div>
      <div class="item-char">{item.view_distance ? '👁️' : ''}</div>
    </div>
  </summary>

  <div>
    <div class="item-more">
      <div class="dropped_by">
        {#if item.dropped_by}
          <details>
            <summary>掉落方</summary>
            <ul>
              {#each item.dropped_by as monster}
                <li>
                  <a href="https://orna.guide/monsters?show={monster.id}" target="orna.guide">
                    {monster.name}
                  </a>
                </li>
              {/each}
            </ul>
          </details>
        {/if}
      </div>
      <div class="materials">
        {#if materials}
          <details>
            <summary>材料</summary>
            <ul>
              {#each materials as material}
                <li>
                  <a href="https://orna.guide/items?show={material.id}" target="orna.guide">
                    <small>
                      ★{material.tier} -
                    </small>
                    {material.name_zh}
                  </a>
                </li>
              {/each}
            </ul>
          </details>
        {/if}
      </div>

      <details>
        <summary class="text-right"></summary>
        <pre class="item-pre">
          { JSON.stringify({...item, context: null}, null, ' ') }
        </pre>
      </details>
    </div>
  </div>
</details>



<style>
.summary {
  position: relative;
  z-index: 1;
  padding: .5em;
  cursor: copy;
  font-weight: bolder;
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
  background-image: var(--bg-mage, none), var(--bg-thief, none), var(--bg-warrior, none);
  background-repeat: no-repeat;
  background-position: 0 50%, 50% 50%, 100% 50%;
  background-size: contain;
  filter: sepia(1) brightness(.5);
}

.item-equipped[data-by*="Warrior" i] {
  --bg-mage: url('../images/Warrior.png');
}
.item-equipped[data-by*="Thief" i] {
  --bg-thief: url('../images/Thief.png');
}
.item-equipped[data-by*="Mage" i] {
  --bg-warrior: url('../images/Mage.png');
}

.item-info {
  display: var(--item-info--disply, none);
  align-items: flex-end;
  font-weight: normal;
  color: #fff9;
  font-family: monospace;
}

.item-info > * {
  margin-right: min(1em, 2vw);
  margin-left: min(1em, 2vw);
}

:global(.items.showDetails),
.item-details[open] {
  --item-info--disply: flex;
  --item-icons--display: block;
}

.item-img-box {
  --item-img-size: min(10vw, 96px);

  display: block;
  width: var(--item-img-size, 96px);
  margin-left: 3vw;
  margin-right: 3vw;
}

:global(.items.showDetails) .item-img-box,
.item-details[open] .item-img-box {
  margin-top: 1rem;
  height: var(--item-img-size, 96px);
  background-image: var(--bg, none), var(--bg-fallback, none);
  background-size: contain;
  background-repeat: no-repeat;
}

.item-pre {
  margin-left: 5vw;
  padding: .5em 1em;
  white-space: pre;
  overflow: auto;
  font-size: 1.25em;
  background-color: #6662;
  color: #aaa;
}

.item-more {
  margin-top: 1em;
  margin-left: 2em;
  line-height: 1.4;
  font-size: smaller;
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

rt {
  font-weight: normal;
  color: #999;
}

table {
  border-collapse: collapse;
}

table th {
  padding-right: 0.5em;
}

</style>
