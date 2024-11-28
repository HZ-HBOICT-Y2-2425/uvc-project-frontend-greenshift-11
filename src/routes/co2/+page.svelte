<script>
  //All the comments below will be used for creation of the chart
  // export let open = false;
  // import CanvasJS from "@canvasjs/charts";
	//import Appliance from '$lib/components/Appliance.svelte';

  let selected = $state();
</script>

<aside class="absolute w-64 bg-green-600 bg-opacity-65 h-[77vh] p-3 shadow-lg transition-all">
  <nav class="p-0 text-xl">
    <h1 class="text-white text-lg font-bold mb-2">Appliances</h1>
    <h2 class="text-white text-base mb-1">All appliances</h2>
    <p><a class="block text-white text-sm hover:underline" href="#addapp">Add an appliance first</a></p>
    <h2 class="text-white text-base mt-4 mb-1">Rooms</h2>
    <p><a class="block text-white text-sm hover:underline" href="#addroom">Add a room first</a></p>
    <h2><a class="block text-white text-base mt-4 hover:underline" id="addapp" href="#about">Add an appliance</a></h2>
    <h2><a class="block text-white text-base mt-2 hover:underline" id="addroom" href="#about">Add a room</a></h2>
    <h2><a class="block text-white text-base mt-2 hover:underline" href="#about">Log single activity</a></h2>
    <h2><a class="block text-white text-base mt-2 hover:underline" href="#about">Change defaults</a></h2>
  </nav>
</aside>

<form class="flex flex-col gap-4 p-4" method="GET">
  <label class="block">
    <span class="text-gray-700 font-medium">Brand</span>
    <input name="brand" type="text" class="w-full border rounded p-2 mt-1" />
  </label>
  <label class="block">
    <span class="text-gray-700 font-medium">Type</span>
    <select bind:value={selected} class="w-full border rounded p-2 mt-1">

    </select>
  </label>
  <label class="block">
    <span class="text-gray-700 font-medium">Description</span>
    <input name="description" type="text" class="w-full border rounded p-2 mt-1" />
  </label>
  <label class="block">
    <span class="text-gray-700 font-medium">Hours per week usage</span>
    <input name="hoursPerWeek" type="number" class="w-full border rounded p-2 mt-1" />
  </label>
  <button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    Log in
  </button>
</form>
