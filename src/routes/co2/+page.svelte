<script>
  import { onMount } from 'svelte';

  let chartType = 'bar';
  // @ts-ignore
  let chart = null;

  // Eco-themed colors
  const ecoColors = [
    "#2E8B57", "#3CB371", "#66CDAA", "#8FBC8F", "#20B2AA", "#2E8B57", "#556B2F",
  ];  

  // Default chart options
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
      formatter: function (val) {
        return typeof val === 'number' ? val.toFixed(2) : val;
      }
    },
    labels: [],
  };

  // Initialize chart
  const initializeChart = async (chartOptions) => {
    if (!chartOptions) {
      console.error("Chart options are undefined");
      return;
    }
    if (typeof window !== 'undefined') {
      try {
        const ApexCharts = (await import('apexcharts')).default;
        // Destroy the existing chart if it exists
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

  // Fetch data from API
  const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3012/appliance/api/appliance-usage");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    
    console.log("Fetched data:", data);  // Log the fetched data to check the structure

    let chartOptions;

    // For bar chart, we'll use the appliance types as the x-axis categories and the carbon emissions as the data
    if (chartType === "bar") {
      chartOptions = {
        series: [{
          data: data.map((appliance) => parseFloat(appliance.carbonEmission)),  // Using carbonEmission for y-axis values
        }],
        xaxis: {
          categories: data.map((appliance) => appliance.type),  // Using appliance types for x-axis categories
        },
        chart: {
          type: chartType,
        },
        colors: ecoColors,
      };
    } else if (chartType === "pie") {
      // For pie chart, we can show the carbon emission of each appliance as the slices
      chartOptions = {
        series: data.map((appliance) => parseFloat(appliance.carbonEmission)),
        labels: data.map((appliance) => appliance.type),  // Labeling the slices with appliance types
        chart: {
          type: chartType,
        },
        colors: ecoColors,
      };
    }

    console.log("Chart options:", chartOptions);  // Log the chart options before rendering
    await initializeChart(chartOptions);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  // Change chart type
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
