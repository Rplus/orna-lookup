<script>
  export let types = [];
  import { onMount } from 'svelte';
  import Chartist from 'chartist';

  console.log(types);
  let typesCount = {};
  let chartDiv;
  let chart;

  const defaultData = {
    // labels: ['Attack', 'Magic'],
    series: [1, 1, 1, 10],
  };

  $: {
    let count = types.reduce((all, i) => {
      all[i] = (all[i] || 0) + 1;
      return all;
    }, {});

    typesCount = Object.keys(count)
      .map(i => ({
        type: i.replace('Multi-round', '詠唱'),
        count: count[i],
      }))
      .sort((a, b) => (b.count - a.count));


    if (chartDiv && chart) {
      chart.update({
        labels: typesCount.map(i => `${i.type} ${i.count}`),
        series: typesCount.map(i => i.count),
      })
    }
  }

  function renderChart(typeData = defaultData) {
    var data = typeData;

    var options = {
      height: 300,
      // labelInterpolationFnc: function(value) {
      //   return value[0]
      // }
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];
    chart = new Chartist.Pie(chartDiv, data, options, null);
  }

  onMount(renderChart);

</script>


<div class="ct-chart" bind:this={chartDiv}></div>
<style>
  .ct-chart {
    max-width: 85%;
    /* aspect-ratio: 1; */
    margin: 0 auto;
  }
</style>
