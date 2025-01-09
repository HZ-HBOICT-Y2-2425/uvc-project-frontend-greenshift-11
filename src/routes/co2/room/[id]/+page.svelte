<script lang="ts">
  export let data;
  const { room } = data;

  let showPopup = false;

  const handleDeleteRoom = async () => {
    try {
      const res = await fetch(`http://localhost:3010/appliance/room/${room.id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        showPopup = true;
        setTimeout(() => {
          window.location.href = '/co2/room';
        }, 1500);
      } else {
        throw new Error('Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Failed to delete room');
    }
  };

  const handleEditRoom = () => {
    window.location.href = `/co2/room/edit/${room.id}`;
  };

  const navigateToAppliance = (appliance: { id: any; }) => {
    window.location.href = `/co2/appliance/${appliance.id}`;
  };
</script>

<div class="flex-grow p-4">
  {#if showPopup}
    <div class="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
      Room deleted successfully!
    </div>
  {/if}

  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-bold">{room.name}</h2>
    <span class="w-40 h-40 border border-gray-300 rounded-full flex items-center justify-center text-8xl bg-gray-100 cursor-pointer">
      {room.icon}
    </span>
  </div>
  
  <div class="flex flex-col gap-6 w-full">
    <div>
      <span class="text-gray-700 font-medium">Appliances:</span>
      {#if room.applianceDetails && room.applianceDetails.length > 0}
        <ul class="list-disc ml-6 mt-2">
          {#each room.applianceDetails as appliance}
            <li>
              <button 
                on:click={() => navigateToAppliance(appliance)}
                class="text-blue-600 hover:underline text-left"
              >
                {appliance.brand} {appliance.type}
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <span class="text-gray-500 italic">No appliances in this room</span>
      {/if}
    </div>
    
    <div class="flex gap-2 mt-4">
      <button 
        class="bg-blue-600 text-white font-semibold py-1.5 px-3 rounded hover:bg-blue-700" 
        on:click={handleEditRoom}
      >
        Edit Room
      </button>
      <button 
        class="bg-red-600 text-white font-semibold py-1.5 px-3 rounded hover:bg-red-700" 
        on:click={handleDeleteRoom}
      >
        Delete Room
      </button>
    </div>
  </div>
</div>