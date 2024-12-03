<script>
  //import {appliance} from "./+page.svelte"
  //All the comments below will be used for creation of the chart
  // export let open = false;
  // import CanvasJS from "@canvasjs/charts";
    //import Appliance from '$lib/components/Appliance.svelte';
</script>

<div class="flex mx-0 my-0 p-0">
    <!-- Sidebar Navbar -->
  <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg transition-all h-100%">
    <nav class="p-0 text-xl">
      <h1 class="text-white text-lg font-bold mb-2">Appliances</h1>
      <h2 class="text-white text-base mb-1">All appliances</h2>
      <p><a class="block text-white text-sm hover:underline" href="#about">Add an appliance first</a></p>
      <h2 class="text-white text-base mt-4 mb-1">Rooms</h2>
      <p><a class="block text-white text-sm hover:underline" href="#addroom">Add a room first</a></p>
      <h2><a class="block text-white text-base mt-4 hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance</a></h2>
      <h2><a class="block text-white text-base mt-2 hover:underline" id="addroom" href="#about">Add a room</a></h2>
      <h2><a class="block text-white text-base mt-2 hover:underline" href="#about">Change defaults</a></h2>
    </nav>
  </aside>

  <main class="flex-1 p-4 my-0 overflow-y-auto">
    <slot></slot>
  </main>
</div>