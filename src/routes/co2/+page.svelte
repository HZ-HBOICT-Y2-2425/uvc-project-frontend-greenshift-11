<script>
  import { chart } from "svelte-apexcharts";
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
      formatter: function (val) {
        return val.toFixed(2);
      }
    },
    labels: [],
  };

  const barData = [
    {
      name: "Average usage",
      data: [30, 40, 20, 25],
    },
    {
      name: "Current usage",
      data: [50, 65, 30, 35],
    },
  ];

  const pieData = [
    { name: "Refrigerator", data: 30 },
    { name: "Washing Machine", data: 40 },
    { name: "Dishwasher", data: 20 },
    { name: "Oven", data: 25 },
  ];

  function switchChart(type) {
    if (type === "bar") {
      options.chart.type = "bar";
      options.series = barData;
      options.xaxis.categories = ["Refrigerator", "Washing Machine", "Dishwasher", "Oven"];
    } else {
      options.chart.type = "pie";
      options.series = pieData.map(entry => entry.data);
      options.labels = pieData.map(entry => entry.name);
      options.dataLabels.enabled = true;
    }
    options = { ...options, chart: { ...options.chart } };
  }

  switchChart(chartType);
</script>

<div class="max-w-100% max-h-90% mx-0">
  <div use:chart={options}></div>
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