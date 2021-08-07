<script>
  export let item;
  import { getImgSrc, checkingImg } from './image.js';
  import { words } from './list.js';
  import { getZh } from './u.js';
  import { dialog } from './stores.js';


  let stats = item.stats;
  if (stats) {
    stats = Object.keys(stats).map(i => ({
      prop: i,
      value: stats[i].base,
    }))
  }

  function assess() {
    console.log($dialog);
    dialog.set({
      open: true,
      item: item,
      stats: stats,
    })
  }

  // function checkProxyImg(item) {
  //   checkingImg(item)
  //   .then()
  //   .catch(e => {
  //     let index = items.findIndex(i => i.id == item.id);
  //     items[index].deadProxyImage = true;
  //   })
  // }

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
      {#if item.prevents}
        <div>
          [ 🛡️ ]
          <br>
          ------
          {#each item.prevents as p}
            <div>{getZh(p)}</div>
          {/each}
        </div>
      {/if}
      {#if item.causes}
        <div>
          [ 🗡️ ]
          <br>
          ------
          {#each item.causes as p}
            <div>{getZh(p)}</div>
          {/each}
        </div>
      {/if}
    </div>

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
  display: block;
  width: 96px;
  margin-left: 3vw;
  margin-right: 3vw;
}

:global(.items.showDetails) .item-img-box,
.item-details[open] .item-img-box {
  margin-top: 1em;
  height: 96px;
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

@media (min-width: 900px) {
  .item-more {
    margin-left: 200px
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
