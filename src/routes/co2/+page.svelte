<script>
  import { onMount } from 'svelte';

  let chartType = 'bar'; // Default chart type
  let chart = null;
  let footprintSummary = {}; // Store summary data from /co2-footprint
  let totalFootprint = 0;

  const ecoColors = ["#2E8B57", "#3CB371", "#66CDAA", "#8FBC8F", "#20B2AA", "#2E8B57", "#556B2F"];

  // Initialize chart
  const initializeChart = async (chartOptions) => {
    if (!chartOptions) return;
    if (typeof window !== 'undefined') {
      try {
        const ApexCharts = (await import('apexcharts')).default;
        if (chart) chart.destroy();
        chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
        await chart.render();
      } catch (error) {
        console.error("Error initializing chart:", error);
      }
    }
  };

  // Fetch data for the chart
  const fetchChartData = async () => {
    try {
      const response = await fetch("http://localhost:3012/appliance/api/appliance-usage");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      totalFootprint = data.reduce((sum, appliance) => sum + parseFloat(appliance.carbonEmission), 0);

      const chartOptions = chartType === "pie" ? {
        series: data.map((appliance) => parseFloat(appliance.carbonEmission)),
        labels: data.map((appliance) => appliance.type),
        chart: { type: chartType, width: 800, height: 500 }, // Adjust pie chart size
        colors: ecoColors,
      } : {
        series: [{ name: "Carbon Emission [kg CO₂]", data: data.map((appliance) => parseFloat(appliance.carbonEmission)) }],
        xaxis: { categories: data.map((appliance) => appliance.type) },
        chart: { type: chartType },
        colors: ecoColors,
      };

      await initializeChart(chartOptions);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Fetch data for the CO₂ footprint table
  const fetchTableData = async () => {
    try {
      const response = await fetch("http://localhost:3012/appliance/api/co2-footprint");
      if (!response.ok) throw new Error("Network response was not ok");
      footprintSummary = await response.json();
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  // Change chart type (to table, bar, or pie)
  const changeChartType = async (newType) => {
    chartType = newType;
    if (newType === "table") {
      await fetchTableData(); // Fetch the table data when switching to table view
    } else {
      await fetchChartData(); // Fetch chart data when switching to chart view
    }
  };

  // On component mount, fetch chart data
  onMount(async () => {
    await fetchChartData();
  });
</script>

<!-- Layout HTML -->
<div class="text-center my-4">
  <h2 class="text-xl font-bold">Total Carbon Footprint</h2>
  <p class="text-lg">{totalFootprint > 0 ? `${totalFootprint.toFixed(2)} kg CO₂ per year` : 'Loading...'}</p>
</div>

<!-- Chart Container -->
<div id="chart" class="w-3/4 h-80 mx-auto" style="display: {chartType === 'table' ? 'none' : 'block'};"></div>

<!-- Table for Summary Data -->
<table id="table" class="table-auto border-collapse border border-gray-400 w-3/4 mx-auto mt-4" style="display: {chartType === 'table' ? 'table' : 'none'};">
  <thead>
    <tr class="bg-green-200">
      <th class="border px-4 py-2">Metric</th>
      <th class="border px-4 py-2">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border px-4 py-2">Total Carbon Footprint (kg CO₂)</td>
      <td class="border px-4 py-2">{footprintSummary.totalCarbonFootprint || 'Loading...'}</td>
    </tr>
    <tr>
      <td class="border px-4 py-2">Trees Needed</td>
      <td class="border px-4 py-2">{footprintSummary.treesNeeded || 'Loading...'}</td>
    </tr>
    <tr>
      <td class="border px-4 py-2">Percentage Compared to Average (%)</td>
      <td class="border px-4 py-2">{footprintSummary.percentageComparedToAverage || 'Loading...'}</td>
    </tr>
    <tr>
      <td class="border px-4 py-2">Difference From Average (kg CO₂)</td>
      <td class="border px-4 py-2">{footprintSummary.differenceFromAverage || 'Loading...'}</td>
    </tr>
  </tbody>
</table>

<!-- Buttons for Switching Views -->
<div class="flex justify-center mt-4">
  <button class="fa fa-bar-chart text-4xl mx-2" on:click={() => changeChartType("bar")} aria-label="Bar Chart"></button>
  <button class="fa fa-pie-chart text-4xl mx-2" on:click={() => changeChartType("pie")} aria-label="Pie Chart"></button>
  <button class="fa fa-table text-4xl mx-2" on:click={() => changeChartType("table")} aria-label="Table"></button>
</div>
