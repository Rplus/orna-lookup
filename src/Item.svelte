<script>
  export let item;
  import { getImgSrc, checkingImg } from './image.js';
</script>



<details class="item-details">
  <summary>
    <!-- {item.id} -->
    <ruby>
      <rb>{item.name_zh}</rb>
      <rt>{item.name}</rt>
    </ruby>

    <a href="https://orna.guide/items?show={item.id}" target="orna.guide">
      <sup>★{item.tier}</sup>
    </a>

    <div
      class="item-img-box"
      style={`--bg: url(${getImgSrc(item)}); --bg-fallback: url(${getImgSrc(item, 'small')})`}
    />

    <div class="item-equipped" data-by={item.equipped_by} />
  </summary>

  <div class="item-more">
    <pre class="item-pre">
      { JSON.stringify({...item, context: null}, null, ' ') }
    </pre>
  </div>
</details>


<style>

.item-details summary {
  position: relative;
  z-index: 1;
  padding: .5em;
  cursor: copy;
  font-weight: bolder;
}

.item-equipped {
  position: absolute;
  top: .5em;
  right: .5em;
  height: 1em;
  width: 3.45em;
  font-size: 1.5em;
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

.item-img-box {
  display: block;
  width: 96px;
  margin-left: 3vw;
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
  .item-pre {
    margin-top: -100px;
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
</style>
