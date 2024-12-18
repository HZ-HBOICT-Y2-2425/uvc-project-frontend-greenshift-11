<script>
  // Functional setup for the component
  let selected = "";
  
  // List of possible home appliance types
  const applianceTypes = [
    "Refrigerator",
    "Washing Machine",
    "Dishwasher",
    "Microwave Oven",
    "Oven",
    "Stove",
    "Dryer",
    "Air Conditioner",
    "Heater",
    "Vacuum Cleaner",
    "Blender",
    "Toaster",
    "Coffee Maker",
    "Slow Cooker",
    "Rice Cooker",
    "Food Processor",
    "Induction Cooktop",
    "Electric Kettle",
    "Deep Fryer",
    "Electric Grill"
  ];
</script>

<!-- Main Content Area -->
<div class="flex-grow p-4">
  <div class="flex justify-between items-start">
    <!-- Form Section -->
    <form class="flex flex-col gap-4 w-2/3" method="POST">
      <label class="block">
        <span class="text-gray-700 font-medium">Brand</span>
        <input name="brand" type="text" class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Type</span>
        <select bind:value={selected} class="w-full border rounded p-2 mt-1" required>
          <option value="" disabled selected>Select an appliance type</option>
          {#each applianceTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Description</span>
        <input name="description" type="text" class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Hours per week usage</span>
        <input name="hoursPerWeek" type="number" class="w-full border rounded p-2 mt-1" required />
      </label>
      <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Add an appliance
      </button>
    </form>

    <!-- Photo Section -->
    <div class="ml-4">
      <!-- Replace "appliance" with a valid path to upload photo -->
      <p class="text-center text-gray-700 mt-2">Upload a photo</p>
    </div>
  </div>
</div>