<script>
  export let appliance;

  // State to hold appliance data (initially filled with some sample data)
  appliance = {
    id: 1,
    brand: 'Samsung',
    type: 'Washing Machine',
    description: 'Front-load washer with energy efficiency',
    hoursPerWeek: 10
  };

  let isEditing = false; // State to control edit mode

  // Function to handle saving data after editing
  const saveChanges = () => {
    // Here you would typically send the updated data to the server
    console.log('Saving changes:');
    isEditing = false; // Exit edit mode after saving
  };
</script>

<div class="flex-grow p-4">
  <div class="flex justify-between items-start">
    <!-- Display Section -->
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
          on:click={() => isEditing = true} 
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
          Edit
        </button>
      </div>
    {:else} <!-- Edit Mode -->
      <form class="flex flex-col gap-4 w-2/3" on:submit|preventDefault={saveChanges}>
        <label class="block">
          <span class="text-gray-700 font-medium">Brand</span>
          <input 
            bind:value={appliance.brand} 
            type="text" 
            class="w-full border rounded p-2 mt-1" 
            required />
        </label>
        <label class="block">
          <span class="text-gray-700 font-medium">Type</span>
          <input 
            bind:value={appliance.type} 
            type="text" 
            class="w-full border rounded p-2 mt-1" 
            required />
        </label>
        <label class="block">
          <span class="text-gray-700 font-medium">Description</span>
          <input 
            bind:value={appliance.description} 
            type="text" 
            class="w-full border rounded p-2 mt-1" 
            required />
        </label>
        <label class="block">
          <span class="text-gray-700 font-medium">Hours per week usage</span>
          <input 
            bind:value={appliance.hoursPerWeek} 
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
    
    <!-- Photo Section (for illustration) -->
    <div class="ml-4">
      <p class="text-center text-gray-700 mt-2">Upload a photo</p>
      <!-- You can insert an image here if you want -->
    </div>
  </div>
</div>