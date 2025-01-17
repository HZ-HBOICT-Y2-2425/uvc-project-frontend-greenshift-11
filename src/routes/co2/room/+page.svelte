<script>
  import { onMount } from 'svelte';

  let rooms = [];
  let appliances = []; 
  let isLoading = true;
  let error = null;

  // Static mapping of room IDs to their corresponding appliance IDs
  const roomAppliancesMapping = {
    0: [0, 1], // Living Room associated with Appliance IDs 0 and 1
    1: [2],    // Kitchen associated with Appliance ID 2
    2: [],     // Laundry Room has no appliances
    3: [3, 4], // Bedroom associated with Appliance IDs 3 and 4
    4: [],     // Storage has no appliances
    // More mappings can be added based on your app logic
  };

  // Fetch room and appliance data from APIs
  const fetchData = async () => {
    try {
      isLoading = true; // Set loading state
      const roomsResponse = await fetch('https://uvc-project-backend-greenshift-11-5q6c.onrender.com/api/room-names');
      if (!roomsResponse.ok) {
        throw new Error('Failed to fetch rooms');
      }
      
      const roomsData = await roomsResponse.json();
      
      // Constructing the rooms array with appliance IDs using the mapping
      rooms = roomsData.names.map((name, index) => {
        const roomID = roomsData.ids[index];
        return {
          id: roomID,
          name,
          icon: roomsData.icons[index],
          appliances: roomAppliancesMapping[roomID] || [], // Map appliances based on room ID
        };
      });

      const appliancesResponse = await fetch('https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/api/appliance-names');
      if (!appliancesResponse.ok) {
        throw new Error('Failed to fetch appliances');
      }

      const appliancesData = await appliancesResponse.json();
      appliances = appliancesData.brands.map((brand, index) => ({
        id: appliancesData.ids[index],
        brand,
        type: appliancesData.types[index],
      }));

    } catch (err) {
      error = `Error fetching data: ${err.message}`;
    } finally {
      isLoading = false; // End loading state
    }
  };

  // Get appliance information based on its ID
  const getApplianceInfo = (applianceId) => {
    const appliance = appliances.find(a => a.id === applianceId);
    return appliance ? `${appliance.brand} ${appliance.type}` : 'Unknown Appliance';
  };

  // Delete a room from the list
  const deleteRoom = async (id) => {
    try {
      rooms = rooms.filter(room => room.id !== id); // Update local state
      const res = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/room/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {        
        setTimeout(() => {
          window.location.href = '/co2/room';
        }, 1500);
      } else {
        throw new Error('Failed to delete room');
      }
    } catch (err) {
      error = `Failed to delete room: ${err.message}`;
    }
  };

  onMount(fetchData); 
</script>

<div class="p-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">My Rooms</h1>
    <a 
      href="/co2/addRoom" 
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Add Room
    </a>
  </div>

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  {/if}

  {#if isLoading}
    <div class="text-gray-500">Loading rooms...</div>
  {:else if rooms.length === 0}
    <div class="text-center py-10">
      <p class="text-gray-500 mb-4">No rooms added yet</p>
      <a 
        href="/co2/addRoom" 
        class="text-green-600 hover:text-green-700 underline"
      >
        Add your first room
      </a>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each rooms as room (room.id)}
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center">
              <span class="text-4xl mr-3">{room.icon}</span>
              <h2 class="text-xl font-semibold">{room.name}</h2>
            </div>
            <button
              on:click={() => deleteRoom(room.id)}
              class="text-red-600 hover:text-red-700"
              aria-label="Delete room"
            >
              ✕
            </button>
          </div>

          <div class="space-y-2">
            <h3 class="font-medium text-gray-700">Appliances:</h3>
            {#if room.appliances.length === 0}
              <p class="text-gray-500 italic">No appliances added</p>
            {:else}
              <ul class="list-disc list-inside space-y-1">
                {#each room.appliances as applianceId}
                  <li class="text-gray-600">{getApplianceInfo(applianceId)}</li>
                {/each}
              </ul>
            {/if}
          </div>
          <div class="mt-4">
            <a 
              href={`/co2/room/${room.id}`}
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