<script>
  import { dialog } from './stores.js';
  import { words } from './list.js';

  $: _stats = [];

  $: {
    if ($dialog && $dialog.stats) {
      genStats($dialog.stats);
    }
  }

  function close() {
    // reset items
    $dialog = {
      open: false,
    };
  }

  function genStats(stats) {
    _stats = stats.map(stat => {
      return {
        prop: words[stat.prop] || stat.prop,
        value: stat.value,
        oValue: stat.value,
        max: stat.value * 2,
        min: ~~(stat.value * .7),
      };
    })
  }

  function reset() {
    _stats = _stats.map(stat => {
      return {...stat, value: stat.oValue };
    });
  }

  function assessQuality(stat) {
    let q = 100 * stat.value / stat.oValue;
    return `${q.toFixed(1)}%`;
  }
</script>



<div class="dialog" hidden={!$dialog.open}>
  <div class="overlay" on:click={close} />

  <main class="content">
    {#if $dialog.item}
      <form>
        <table class="assess-table">
          <caption>
            品質試算
            <br />
            [ {$dialog.item.name_zh} ]
          </caption>

          {#each _stats as stat, index}
            <tr>
              <th>{stat.prop}</th>
              <td class="text-center">
                <input type="number"
                  bind:value={stat.value}
                  max={stat.max}
                  min={stat.min}
                  step="1"
                />
                <br />
                <input type="range"
                  bind:value={stat.value}
                  max={stat.max}
                  min={stat.min}
                  step="1"
                />
              </td>
              <td>{assessQuality(stat)}</td>
            </tr>
          {/each}
        </table>

        <div class="text-right">
          <button type="reset"
            on:click|preventDefault={reset}
          >
            Reset
          </button>
        </div>
      </form>
    {/if}
  </main>
</div>



<style>
.dialog[hidden] {
  display: none;
}

.dialog {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  place-items: center;
  place-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #000a;
  backdrop-filter: blur(3px);
}

.content {
  position: relative;
  z-index: 10;
  width: auto;
  min-height: 10em;
  max-width: 85vw;
  max-height: 90vh;
  padding: 2em;
  overflow: auto;
  background-color: #28231f;
}

.assess-table caption {
  font-size: larger;
  margin-bottom: 1em;
}

.assess-table {
  white-space: nowrap;
}

.assess-table td,
.assess-table th {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px dotted #fff3;
}

.assess-table input {
  margin: 0;
  text-align: center;
}
</style>
