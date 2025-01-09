<script>
  import { onMount } from 'svelte';

  let chartType = 'bar';
  // @ts-ignore
  let chart = null;

  // Eco-themed colors
  const ecoColors = [
    "#2E8B57", // Sea Green
    "#3CB371", // Medium Sea Green
    "#66CDAA", // Aquamarine
    "#8FBC8F", // Dark Sea Green
    "#20B2AA", // Light Sea Green
    "#2E8B57", // Forest Green
    "#556B2F", // Dark Olive Green
  ];

  // Default chart options
  // @ts-ignore
  let options = {
    chart: {
      id: "appliance-usage-chart",
      type: chartType,
      height: 200,
      width: '80%',
    },
    series: [],
    xaxis: {
      categories: [],
    },
    colors: ecoColors,
    dataLabels: {
      enabled: true,
      // @ts-ignore
      formatter: function (val) {
        return typeof val === 'number' ? val.toFixed(2) : val;
      }
    },
    labels: [],
  };

  // @ts-ignore
  const initializeChart = async (chartOptions) => {
    if (!chartOptions) {
      console.error("Chart options are undefined");
      return;
    }
    if (typeof window !== 'undefined') {
      try {
        const ApexCharts = (await import('apexcharts')).default;
        // @ts-ignore
        if (chart) {
          chart.destroy();
        }
        chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
        await chart.render();
      } catch (error) {
        console.error("Error initializing chart:", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3010/appliance/api/appliance-usage");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let chartOptions;

      if (chartType === "bar") {
        chartOptions = {
          // @ts-ignore
          series: data.series.map((item) => ({
            // @ts-ignore
            data: item.data.map((val) => parseFloat(val)),
          })),
          xaxis: {
            categories: data.categories,
          },
          chart: {
            type: chartType,
          },
          colors: ecoColors,
        };
      } else if (chartType === "pie") {
        // Aggregate data for pie chart using "labels" and "data"
        // @ts-ignore
        const pieData = data.labels.map((label, index) => ({
          name: label,
          value: parseFloat(data.series[0].data[index]),
        }));

        chartOptions = {
          // @ts-ignore
          series: pieData.map((item) => item.value), // Data values
          // @ts-ignore
          labels: pieData.map((item) => item.name), // Corresponding labels
          chart: {
            type: chartType,
          },
          colors: ecoColors,
        };
      }

      await initializeChart(chartOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // @ts-ignore
  const changeChartType = async (newType) => {
    chartType = newType;
    await fetchData();
  };

  onMount(async () => {
    if (typeof window !== 'undefined') {
      await fetchData();
    }
  });
</script>

<svelte:head>
  <!-- Remove existing styles -->
</svelte:head>

<div id="chart" class="w-3/4 h-80 mx-auto"></div>

<div class="flex justify-center mt-4">
  <button 
    class="fa fa-bar-chart text-4xl cursor-pointer mx-2 transition-transform transform hover:scale-110" 
    on:click={() => changeChartType("bar")} 
    aria-label="Switch to bar chart" 
    type="button">
  </button>
  <button 
    class="fa fa-pie-chart text-4xl cursor-pointer mx-2 transition-transform transform hover:scale-110" 
    on:click={() => changeChartType("pie")} 
    aria-label="Switch to pie chart" 
    type="button">
  </button>
</div>
