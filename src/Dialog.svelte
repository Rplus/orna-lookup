<script>
  import { dialog } from './stores.js';
  import { words } from './list.js';
  import { numSort } from './u.js';
  import Assess from './Assess.svelte';

  $: _stats = [];
  $: assessData = null;

  let dialogElm;
  const LV = new Array(13).fill(1).map((i, index) => index + 1);
  let selectedLv = 1;

  $: {
    selectedLv;
    if ($dialog && $dialog.stats) {
      genStats($dialog.stats);

      setTimeout(() => {
        dialogElm.querySelector('input')?.select();
      });
    }
  }

  function close() {
    assessData = null;
    // reset items
    $dialog = {
      open: false,
    };
  }

  function genStats(stats) {
    _stats = stats.map(stat => {
      let [min, max] = [stat.value * 2, ~~(stat.value * .7)].sort(numSort);
      return {
        oProp: stat.prop.split('.')[1],
        prop: words[stat.prop] || stat.prop,
        value: stat.value,
        oValue: stat.value,
        max: selectedLv === 1 ? max : max * 3,
        min,
      };
    })
  }

  function reset() {
    assessData = null;

    _stats = _stats.map(stat => {
      return {...stat, value: stat.oValue };
    });
    selectedLv = 1;
  }

  function assessQuality(stat) {
    let q = 100 * stat.value / stat.oValue;
    return `${q.toFixed(1)}%`;
  }

  function assessAPI() {
    assessData = null;
    if (!_stats.length) { return; }

    let defaultData = {
      id: $dialog.item.id,
    };

    let newData = _stats.reduce((all, i) => {
      if (i.value !== i.oValue) {
        all[i.oProp] = i.value;
      }
      return all;
    }, defaultData);

    if (Object.keys(newData).length === 1) {
      _stats.forEach(i => {
        newData[i.oProp] = i.oValue;
      });
    }
    if (selectedLv > 1) {
      newData.level = selectedLv;
    }

    assessData = newData;
  }

  function _keydown(e) {
    if (e.code === 'Escape') {
      close();
    }
  }
</script>



<div class="dialog"
  hidden={!$dialog.open}
  bind:this={dialogElm}
  on:keydown={_keydown}
  tabindex="-1"
>
  <div class="dialog__overlay" on:click={close} />

  <main class="dialog__content">
    {#if $dialog.item}
      <form>
        <table class="assess-table">
          <caption>
            品質試算
            <br />
            [ {$dialog.item.name_zh} ] Lv.
            <select bind:value={selectedLv}>
              {#each LV as lv}
                <option value={lv}>{lv}</option>
              {/each}
            </select>
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

        <div class="form-ctrl">
          <button type="reset" on:click|preventDefault={reset}>
            Reset
          </button>

          <button type="submit" on:click|preventDefault={assessAPI}>
            Assess
          </button>
        </div>
      </form>

      {#if assessData}
        <Assess assessData={assessData} />
      {/if}
    {/if}
  </main>
</div>



<style>
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

.form-ctrl {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding-top: .5em;
}
</style>
