<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // For SvelteKit

  // Initialize the appliance object and editing state
  let appliance: {
    id: number;
    brand: string;
    type: string;
    description: string;
    hoursPerWeek: number;
  } | undefined;

  let isEditing = false;
  let tempBrand = '';
  let tempType = '';
  let tempDescription = '';
  let tempHoursPerWeek = 0;

  // Function to fetch appliance data based on ID
  async function fetchAppliance(id: string) {
    const response = await fetch(`http://localhost:3010/appliance/appliance/${id}`);
    if (response.ok) {
      appliance = await response.json();
      // Initialize temporary values for editing
      if (appliance) {
        tempBrand = appliance.brand;
        tempType = appliance.type;
        tempDescription = appliance.description;
        tempHoursPerWeek = appliance.hoursPerWeek;
      }
    } else {
      console.error('Failed to fetch appliance data:', response.statusText);
    }
  }

  // Trigger fetching data on mount and when ID changes
  $: $page.params.id, fetchAppliance($page.params.id);

  // Start editing mode
  const startEditing = () => {
    if (appliance) {
      tempBrand = appliance.brand;
      tempType = appliance.type;
      tempDescription = appliance.description;
      tempHoursPerWeek = appliance.hoursPerWeek;
    }
    isEditing = true;
  };

  // Save changes
  const saveChanges = () => {
    console.log('Saving changes:', {
      brand: tempBrand,
      type: tempType,
      description: tempDescription,
      hoursPerWeek: tempHoursPerWeek,
    });
    isEditing = false; // Optionally reset editing state
  };

  // Fetch the initial appliance data on mount
  onMount(() => {
    const id = $page.params.id; // Get the appliance ID from the URL
    fetchAppliance(id);
  });
</script>

<div class="flex-grow p-4">
  {#if appliance}
    {#if !isEditing}
      <div class="flex flex-col gap-4 w-2/3">
        <div>
          <span class="text-gray-700 font-medium">Brand: </span>
          <span>{appliance.brand}</span>
        </div>
        <div>
          <span class="text-gray-700 font-medium">Type: </span>
          <span>{appliance.type}</span>
        </div>
        <div>
          <span class="text-gray-700 font-medium">Description: </span>
          <span>{appliance.description}</span>
        </div>
        <div>
          <span class="text-gray-700 font-medium">Hours per week usage: </span>
          <span>{appliance.hoursPerWeek}</span>
        </div>
        <button 
          on:click={startEditing} 
          class="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
          Edit
        </button>
      </div>
    {:else}
      <form class="flex flex-col gap-4 w-2/3" on:submit|preventDefault={saveChanges}>
        <label class="block">
          <span class="text-gray-700 font-medium">Brand</span>
          <input 
            bind:value={tempBrand} 
            type="text" 
            class="w-full border rounded p-2 mt-1" 
            required />
        </label>
        <label class="block">
          <span class="text-gray-700 font-medium">Type</span>
          <input 
            bind:value={tempType} 
            type="text" 
            class="w-full border rounded p-2 mt-1" 
            required />
        </label>
        <label class="block">
          <span class="text-gray-700 font-medium">Description</span>
          <input 
            bind:value={tempDescription} 
            type="text" 
            class="w-full border rounded p-2 mt-1" 
            required />
        </label>
        <label class="block">
          <span class="text-gray-700 font-medium">Hours per week usage</span>
          <input 
            bind:value={tempHoursPerWeek} 
            type="number" 
            min="0" 
            class="w-full border rounded p-2 mt-1" 
            required />
        </label>
        <button 
          type="submit" 
          class="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600">
          Save
        </button>
        <button 
          type="button" 
          on:click={() => isEditing = false} 
          class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600">
          Cancel
        </button>
      </form>
    {/if}
  {:else}
    <div class="flex flex-col gap-4 w-2/3">
      <p class="text-red-500">Appliance not found.</p>
    </div>
  {/if}
</div>

<div class="ml-4">
  <p class="text-center text-gray-700 mt-2">Upload a photo</p>
</div>