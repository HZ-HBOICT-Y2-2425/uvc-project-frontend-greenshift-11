<script>
  import { onMount } from 'svelte';

  let appliance = {
    id: null, // Ensure this is dynamically populated or passed as a prop
    brand: '',
    type: '',
    description: '',
    hoursPerWeek: 0,
  };

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
    "Electric Grill",
  ];

  // Fetch appliance data for editing (if `appliance.id` exists)
  const fetchData = async () => {
    if (!appliance.id) return;

    try {
      const response = await fetch(`http://localhost:3010/appliance/appliance/${appliance.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      appliance = { ...appliance, ...data };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const url = appliance.id
        ? `http://localhost:3010/appliance/appliance/${appliance.id}`
        : `http://localhost:3010/appliance/appliance`;

      const method = appliance.id ? 'PUT' : 'POST'; // Use PUT for updating, POST for creating

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appliance),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        window.location.href = "/co2"; // Redirect to app's home page
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  onMount(fetchData);
</script>

<!-- Main Content -->
<div class="flex-grow p-4">
  <div class="flex justify-between items-start">
    <!-- Form Section -->
    <form class="flex flex-col gap-4 w-2/3" method="POST" on:submit|preventDefault={handleSubmit}>
      <!-- Brand -->
      <label class="block">
        <span class="text-gray-700 font-medium">Brand</span>
        <input
          name="brand"
          type="text"
          bind:value={appliance.brand}
          class="w-full border rounded p-2 mt-1"
          placeholder="Enter appliance brand"
          required
        />
      </label>

      <!-- Type -->
      <label class="block">
        <span class="text-gray-700 font-medium">Type</span>
        <select
          bind:value={appliance.type}
          class="w-full border rounded p-2 mt-1"
          required
        >
          <option value="" disabled>Select an appliance type</option>
          {#each applianceTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </label>

      <!-- Description -->
      <label class="block">
        <span class="text-gray-700 font-medium">Description</span>
        <input
          name="description"
          type="text"
          bind:value={appliance.description}
          class="w-full border rounded p-2 mt-1"
          placeholder="Enter appliance description"
          required
        />
      </label>

      <!-- Hours Per Week -->
      <label class="block">
        <span class="text-gray-700 font-medium">Hours Per Week</span>
        <input
          name="hoursPerWeek"
          type="number"
          bind:value={appliance.hoursPerWeek}
          class="w-full border rounded p-2 mt-1"
          placeholder="Enter usage in hours per week"
          min="0"
          required
        />
      </label>

      <!-- Submit Button -->
      <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        {appliance.id ? 'Update Appliance' : 'Add Appliance'}
      </button>
    </form>

    <!-- Photo Upload Placeholder -->
    <div class="ml-4">
      <div class="w-40 h-40 border rounded flex items-center justify-center bg-gray-100">
        <span class="text-gray-500">Photo Placeholder</span>
      </div>
      <p class="text-center text-gray-700 mt-2">Photo upload coming soon!</p>
    </div>
  </div>
</div>
