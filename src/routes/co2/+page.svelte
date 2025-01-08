<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import ApexCharts from 'apexcharts';

  // @ts-ignore
  let chart;
  let chartType = "bar";
  let options = {
    chart: {
      id: "appliance-usage-chart",
      type: chartType,
      height: 400,
      width: 800,
    },
    series: [],
    xaxis: {
      categories: [],
    },
    dataLabels: {
      enabled: chartType === 'pie',
      // @ts-ignore
      formatter: function (val) {
        return val.toFixed(2);
      }
    },
    labels: [],
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3010/appliance/api/appliance-usage");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      updateChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // @ts-ignore
  const updateChartData = (data) => {
    if (chartType === "bar") {
      options.series = data.series;
      options.xaxis.categories = data.categories;
    } else {
      // @ts-ignore
      options.series = data.series.map(entry => entry.data);
      options.labels = data.labels;
      options.dataLabels.enabled = true;
    }
    options = { ...options, chart: { ...options.chart } };
  };

  // @ts-ignore
  const switchChart = async (type) => {
    chartType = type;
    await fetchData();
    // @ts-ignore
    if (chart) {
      chart.updateOptions(options);
    }
  };

  onMount(() => {
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    fetchData();
  });
</script>

<div class="max-w-100% max-h-90% mx-0">
  <div id="chart"></div>
</div>

<div class="text-center m-10">
  <button 
    class="fa fa-bar-chart cursor-pointer text-6xl mx-2 transition-transform transform hover:scale-110" 
    on:click={() => switchChart("bar")} 
    aria-label="Switch to bar chart" 
    type="button"
    style="font-size: 40px;">
  </button>
  <button 
    class="fa fa-pie-chart cursor-pointer text-6xl mx-2 transition-transform transform hover:scale-110" 
    on:click={() => switchChart("pie")} 
    aria-label="Switch to pie chart" 
    type="button"
    style="font-size: 40px;">
  </button>
</div>