<!-- src/routes/co2/room/[id]/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  
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
          goto('/co2/room');
        }, 1500);
      } else {
        throw new Error('Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Failed to delete room');
    }
  };
</script>

<div class="flex-grow p-4">
  {#if showPopup}
    <div class="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
      Room deleted successfully!
    </div>
  {/if}
  
  <h2 class="text-2xl font-bold mb-4">{room.name}</h2>
  
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center gap-2">
      <span class="text-gray-700 font-medium">Icon: </span>
      <span class="text-3xl">{room.icon}</span> <!-- Display emoji here -->
    </div>
    
    <div>
      <span class="text-gray-700 font-medium">Appliances: </span>
      {#if room.applianceDetails && room.applianceDetails.length > 0}
        <ul class="list-disc ml-6 mt-2">
          {#each room.applianceDetails as appliance}
            <li>{appliance.brand} {appliance.type}</li>
          {/each}
        </ul>
      {:else}
        <span class="text-gray-500 italic">No appliances in this room</span>
      {/if}
    </div>
    
    <div class="flex gap-4 mt-4">
      <a 
        href="/co2/room" 
        class="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
      >
        Back to Rooms
      </a>
      <button 
        class="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700" 
        on:click={handleDeleteRoom}
      >
        Delete Room
      </button>
    </div>
  </div>
</div>