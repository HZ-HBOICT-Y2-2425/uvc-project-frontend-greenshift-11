<script>
  //All the comments below will be used for creation of the chart
  // export let open = false;
  // import CanvasJS from "@canvasjs/charts";
    //import Appliance from '$lib/components/Appliance.svelte';

  let selected = $state();
</script>


<!-- Main Content Area -->
<div class="flex-grow p-4">
  <div class="flex justify-between items-start">
    <!-- Form Section -->
    <form class="flex flex-col gap-4 w-2/3" method="GET">
      <label class="block">
        <span class="text-gray-700 font-medium">Brand</span>
        <input name="brand" type="text" class="w-full border rounded p-2 mt-1" />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Type</span>
        <select bind:value={selected} class="w-full border rounded p-2 mt-1">
          <!-- Options to be filled dynamically -->
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

    <!-- Photo Section -->
    <div class="ml-4">
      <!-- <img src="appliance" alt="Upload photo" class="w-32 h-32 border rounded" /> -->
      <p class="text-center text-gray-700 mt-2">Upload a photo</p>
    </div>
  </div>
</div>