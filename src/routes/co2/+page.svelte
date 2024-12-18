<script>
  let ApexCharts;
  let chartType = "bar";

  import.meta.env.SSR ? null : import("svelte-apexcharts").then((module) => {
    ApexCharts = module.default;
  });

  let options = {
    chart: {
      id: "appliance-usage-chart",
      type: chartType,
      height: 400,
      width: 800,
    },
    xaxis: {
      categories: ["Refrigerator", "Washing Machine", "Dishwasher", "Oven"],
    },
    dataLabels: {
      enabled: chartType === "pie",
      formatter: function (val) {
        return val.toFixed(2);
      },
    },
    labels: ["Refrigerator", "Washing Machine", "Dishwasher", "Oven"],
  };

  let barData = [
    { name: "Average usage", data: [30, 40, 20, 25] },
    { name: "Current usage", data: [50, 65, 30, 35] },
  ];

  let pieData = [30, 40, 20, 25];

  function switchChart(type) {
    chartType = type;
    if (type === "bar") {
      options.series = barData;
    } else {
      options.series = pieData;
      options.chart.type = "pie";
    }
    options = { ...options };
  }

  switchChart(chartType);
</script>

{#if ApexCharts}
  <div class="flex justify-center items-center mt-4">
    <ApexCharts {options} type={chartType} series={options.series} />
  </div>
{:else}
  <p class="text-center">Loading chart...</p>
{/if}

<div class="text-center mt-6">
  <button
    class="cursor-pointer mx-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
    on:click={() => switchChart("bar")}
  >
    Bar Chart
  </button>
  <button
    class="cursor-pointer mx-2 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700"
    on:click={() => switchChart("pie")}
  >
    Pie Chart
  </button>
</div>
