<script>
  import { onMount } from 'svelte';

  let appliance = {
    brand: '',
    type: '',
    description: '',
    hoursPerWeek: 0
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3010/appliance/appliance/{$JSON.stringify(appliance.id)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const appliance = await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onMount(fetchData);
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

   const BASE_URL = "http://localhost:3010/appliance/appliance/${appliance.id}";

  const handleSubmit = async () => {
    try {
        const url = new URL(`${BASE_URL}`);
        url.searchParams.append('brand', appliance.brand);
        url.searchParams.append('type', appliance.type);
        url.searchParams.append('description', appliance.description);
        url.searchParams.append('hoursPerWeek', appliance.hoursPerWeek.toString());
        const response = await fetch(url, {
            method: "POST",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            window.location.href = "/co2"; // Redirect to app's home page
        } else {
            const errorData = await response.json();
            console.error(errorData.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
</script>

<!-- Main Content Area -->
<div class="flex-grow p-4">
  <div class="flex justify-between items-start">
    <!-- Form Section -->
    <form class="flex flex-col gap-4 w-2/3" method="POST" on:submit|preventDefault={handleSubmit}>
      <label class="block">
        <span class="text-gray-700 font-medium">Brand</span>
        <input name="brand" type="text" bind:value={appliance.brand} class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Type</span>
        <select bind:value={appliance.type} class="w-full border rounded p-2 mt-1" required>
          <option value="" disabled selected>Select an appliance type</option>
          {#each applianceTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Description</span>
        <input name="description" type="text" bind:value={appliance.description} class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Hours per week usage</span>
        <input name="hoursPerWeek" type="number" bind:value={appliance.hoursPerWeek} class="w-full border rounded p-2 mt-1" required />
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