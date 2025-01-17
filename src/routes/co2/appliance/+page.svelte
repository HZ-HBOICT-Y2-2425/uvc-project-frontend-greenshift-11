<script>
    import { onMount } from 'svelte';
  
    let appliances = [];
    let isLoading = true;
    let error = null;
  
    // Fetch all appliances from the backend
    const fetchAppliances = async () => {
      try {
        isLoading = true; // Start loading state
        const response = await fetch('https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/api/appliance-names'); // Correct API endpoint
  
        if (!response.ok) {
          throw new Error(`Failed to fetch appliances: ${response.statusText}`);
        }
  
        const responseData = await response.json(); // Fetch response
  
        // Combine ids, brands, and types into a single array of objects
        appliances = responseData.ids.map((id, index) => ({
          id,
          brand: responseData.brands[index],
          type: responseData.types[index],
          emoji: responseData.emojis[index], // Add emoji to the object
        }));
      } catch (err) {
        error = `Error fetching appliances: ${err.message}`;
      } finally {
        isLoading = false; // End loading state
      }
    };
     // Delete a appliance from the list
  const deleteappliance = async (id) => {
    try {
      appliances = appliances.filter(appliance => appliance.id !== id); // Update local state
      const res = await fetch(`http://localhost:3012/appliance/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {        
        setTimeout(() => {
          window.location.href = '/co2/appliance';
        }, 1500);
      } else {
        throw new Error('Failed to delete appliance');
      }
    } catch (err) {
      error = `Failed to delete appliance: ${err.message}`;
    }
  };
  
    onMount(fetchAppliances); // Fetch data on component mount
  </script>
  
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">All Appliances</h1>
      <a 
        href="/co2/addAppliance" 
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Appliance
      </a>
    </div>
  
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    {/if}
  
    {#if isLoading}
      <div class="text-gray-500">Loading appliances...</div>
    {:else if appliances.length === 0}
      <div class="text-center py-10">
        <p class="text-gray-500 mb-4">No appliances added yet</p>
        <a 
          href="/co2/addAppliance" 
          class="text-green-600 hover:text-green-700 underline"
        >
          Add your first appliance
        </a>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each appliances as appliance (appliance.id)} <!-- Use `id` as the key -->
          <div class="bg-white rounded-lg shadow-md p-6">  
            <div class="flex justify-between items-start mb-4">                       
            <div class="mb-4">
              <h2 class="text-xl font-semibold text-gray-800">{appliance.brand} {appliance.type}</h2>
              <p class="text-gray-500">{appliance.emoji}</p>
            </div>
            <button
              on:click={() => deleteappliance(appliance.id)}
              class="text-red-600 hover:text-red-700"
              aria-label="Delete appliance"
              title="Delete appliance"
            >
              ✕
            </button>  
          </div>
            <div class="mt-4">
              <a 
                href={`/co2/appliance/${appliance.id}`}
                class="text-blue-600 hover:text-blue-800 underline"
              >
                View Details
              </a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  