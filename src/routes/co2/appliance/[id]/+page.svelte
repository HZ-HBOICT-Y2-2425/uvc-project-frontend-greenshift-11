<script lang="ts">
  import { onMount } from 'svelte';

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

  async function fetchAppliance() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:3012/appliance/${id}`);
      if (response.ok) {
        appliance = await response.json();
        if (appliance) {
          tempBrand = appliance.brand;
          tempType = appliance.type;
          tempDescription = appliance.description;
          tempHoursPerWeek = appliance.hoursPerWeek;
        }
      }
    } catch (error) {
      console.error('Failed to fetch appliance:', error);
    }
  }

  const startEditing = () => {
    if (appliance) {
      tempBrand = appliance.brand;
      tempType = appliance.type;
      tempDescription = appliance.description;
      tempHoursPerWeek = appliance.hoursPerWeek;
    }
    isEditing = true;
  };

  const saveChanges = async () => {
    if (!appliance) return;
    
    try {
      const response = await fetch(`http://localhost:3012/appliance/${appliance.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: tempBrand,
          type: tempType,
          description: tempDescription,
          hoursPerWeek: tempHoursPerWeek,
        })
      });

      if (response.ok) {
        appliance = await response.json();
        isEditing = false;
      }
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  onMount(fetchAppliance);
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