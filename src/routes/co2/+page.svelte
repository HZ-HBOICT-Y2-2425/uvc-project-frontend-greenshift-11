<script>
import { onMount } from 'svelte';

let chartType = 'bar';
// @ts-ignore
let chart = null;

let options = {
  chart: {
    id: "appliance-usage-chart",
    type: chartType,
    height: 400,
    width: '100%',
  },
  series: [],
  xaxis: {
    categories: [],
  },
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
    // Ensure chartOptions is properly defined here
    const chartOptions = {
      series: data.series,
      chart: {
        type: chartType
      },
      xaxis: {
        categories: data.categories
      }
    };
    await initializeChart(chartOptions);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// @ts-ignore
const updateChartData = async (data) => {
  if (!data || !data.series) {
    console.error("Invalid data format:", data);
    return;
  }

  console.log("Data received:", data);

  let newOptions = { ...options };

  if (chartType === "bar") {
    newOptions.series = data.series;
    newOptions.xaxis.categories = data.categories || [];
    newOptions.chart.type = 'bar';
  } else if (chartType === "pie") {
    // Transform data for pie chart
    // @ts-ignore
    const pieData = data.series.map(series => ({
      name: series.name,
      // @ts-ignore
      value: series.data.reduce((sum, val) => sum + val, 0)
    }));
    
    newOptions = {
      ...newOptions,
      // @ts-ignore
      series: pieData.map(item => item.value),
      // @ts-ignore
      labels: pieData.map(item => item.name),
      chart: {
        ...newOptions.chart,
        type: 'pie'
      }
    };
  }

  console.log("Options updated:", newOptions);
  
  // Initialize or re-initialize the chart with new options
  await initializeChart(newOptions);
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
  <style>
    #chart {
      width: 100%;
      height: 400px;
    }
    .icon-button {
      font-size: 40px;
      cursor: pointer;
      margin: 0 0.5rem;
      transition: transform 0.2s;
    }
    .icon-button:hover {
      transform: scale(1.1);
    }
  </style>
</svelte:head>

<div id="chart"></div>

<div class="icon-container">
  <button 
    class="fa fa-bar-chart icon-button" 
    on:click={() => changeChartType("bar")} 
    aria-label="Switch to bar chart" 
    type="button">
  </button>
  <button 
    class="fa fa-pie-chart icon-button" 
    on:click={() => changeChartType("pie")} 
    aria-label="Switch to pie chart" 
    type="button">
  </button>
</div>