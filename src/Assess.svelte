<script>
  export let assessData = {};
  import { numSort, fetchAssessData, getZh } from './u.js';
  $: [data, loading, error, get] = fetchAssessData(assessData);
</script>

{#if $loading}
Loading...
{/if}

{#if $data}
<table class="text-right">
  <caption>品質: {$data.quality * 100}%</caption>
  {#if $data.quality !== '0'}
    <thead>
      <tr>
        <th>Lv.</th>
        {#each Object.keys($data.stats) as stat}
          <th>{getZh(stat)}</th>
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each Object.values($data.stats)[0].values as value, index}
        <tr>
          <th>{index + 1}</th>
          {#each Object.values($data.stats) as stat2}
            <td>{stat2.values[index]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  {:else}
    <caption>Wrong values.</caption>
  {/if}
</table>

{:else if !$loading}
<blockquote>
  若點了 [ Assess ] 沒反應，<br>
  請至 cors-anywhere ，並點擊按鈕，<br>
  以允許將裝備資料傳至 Orna.guide API。<br>
  <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">https://cors-anywhere.herokuapp.com/corsdemo</a>
</blockquote>
{/if}


<style>

table {
  border-collapse: collapse;
  width: 100%;
  margin: auto;
}

caption {
  line-height: 2;
}

tbody tr:nth-of-type(odd) {
  background-color: #9991;
}

blockquote {
  background: #9991;
  border-left: .75em solid #ff01;
  margin: 1em 0 0;
  padding: .5em;
}
</style>
