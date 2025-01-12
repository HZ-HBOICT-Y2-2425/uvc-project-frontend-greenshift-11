<script lang="ts">
  export let data;
  import { onMount } from 'svelte';
  const { room } = data;

  let isEditing = false;
  let tempRoomName = room.name;
  let tempRoomIcon = room.icon;
  let appliances: number[] = []; // Array to hold selected appliance IDs

  let applianceTypes = { brands: [], types: [], ids: [] };
  let showPopup = false;
  let showEmojiPicker = false;

  const roomIconTypes = [
    { emoji: "🛋️", label: "Living room or furniture" },
    { emoji: "🛏️", label: "Bedroom" },
    { emoji: "🚿", label: "Bathroom" },
    { emoji: "🚽", label: "Restroom" },
    { emoji: "🚰", label: "Kitchen or bathroom sink" },
    { emoji: "📺", label: "Television or entertainment" },
    { emoji: "💡", label: "Lighting in any room" },
    { emoji: "🚪", label: "Door for entry/exit" },
    { emoji: "🪟", label: "Windows in a house" },
    { emoji: "🧹", label: "Cleaning tools" },
    { emoji: "🪑", label: "Furniture in a room" },
    { emoji: "🍽️", label: "Dining or general table" },
    { emoji: "🍴", label: "Kitchen or dining" },
    { emoji: "🌀", label: "Cooling or air circulation" },
    { emoji: "🔥", label: "Fireplace or heating" },
    { emoji: "💧", label: "Plumbing or water access" },
    { emoji: "🏠", label: "General house icon" },
    { emoji: "🔑", label: "Door or room security" },
    { emoji: "📦", label: "Storage or organization" },
    { emoji: "🌡️", label: "Temperature control" },
    { emoji: "💨", label: "Ventilation or air flow" },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch('https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/api/appliance-names');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      applianceTypes = await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onMount(() => {
    fetchData();
  });

  const handleDeleteRoom = async () => {
    try {
      const res = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/room/${room.id}`, {
        method: 'DELETE',
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
    isEditing = true;
  };

  const saveRoomChanges = async () => {
    try {
      const updatedRoom = {
        id: room.id,
        name: tempRoomName,
        icon: tempRoomIcon,
        appliances,
      };

      const res = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/room/${room.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRoom),
      });

      if (res.ok) {
        room.name = tempRoomName;
        room.icon = tempRoomIcon;
        room.appliances = appliances;
        isEditing = false;
      } else {
        throw new Error('Failed to save room changes');
      }
    } catch (error) {
      console.error('Error saving room changes:', error);
      alert('Failed to save room changes');
    }
  };

  const cancelEditing = () => {
    isEditing = false;
    tempRoomName = room.name;
    tempRoomIcon = room.icon;
    appliances = room.appliances || [];
  };

  const navigateToAppliance = (appliance: { id: any; }) => {
    window.location.href = `/co2/appliance/${appliance.id}`;
  };
</script>

<div class="flex-grow p-4 min-h-screen overflow-auto">
  {#if showPopup}
    <div class="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
      Room deleted successfully!
    </div>
  {/if}

  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-bold">{room.name}</h2>
    <div class="ml-4 relative">
      <!-- The large icon that will trigger the emoji picker -->
      <button type="button" class="w-40 h-40 border border-gray-300 rounded-full flex items-center justify-center text-8xl bg-gray-100 cursor-pointer" on:click={() => showEmojiPicker = !showEmojiPicker} aria-label="Select room icon">
        {tempRoomIcon || "🛋️"}
      </button>

      <!-- Emoji picker shown below the large icon -->
      {#if showEmojiPicker}
        <div class="absolute bg-white border rounded mt-2 p-2 grid grid-cols-4 gap-2">
          {#each roomIconTypes as type}
            <button type="button" class="cursor-pointer" on:click={() => { tempRoomIcon = type.emoji; showEmojiPicker = false; }} aria-label={type.label}>
              {type.emoji}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if !isEditing}
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
  {:else}
    <form class="flex flex-col gap-4 w-full" on:submit|preventDefault={saveRoomChanges}>
      <label class="block">
        <span class="font-medium">Room Name</span>
        <input bind:value={tempRoomName} type="text" class="w-full border rounded p-2 mt-1" required />
      </label>

      <label class="block">
        <span class="text-gray-700 font-medium">Appliances</span>
        <div>
          {#if applianceTypes.brands && applianceTypes.brands.length > 0}
            {#each applianceTypes.brands as brand, i}
              <label class="flex items-center mt-2">
                <input
                  type="checkbox"
                  value={applianceTypes.ids[i]}
                  checked={appliances.includes(applianceTypes.ids[i])}
                  on:change={() => {
                    if (appliances.includes(applianceTypes.ids[i])) {
                      appliances = appliances.filter(id => id !== applianceTypes.ids[i]);
                    } else {
                      appliances.push(applianceTypes.ids[i]);
                    }
                  }}
                  class="mr-2"
                />
                <span>{brand} {applianceTypes.types[i]}</span>
              </label>
            {/each}
          {:else}
            <span class="text-gray-500 italic">No appliances available</span>
          {/if}
        </div>
      </label>

      <div class="flex gap-2 mt-4">
        <button type="submit" class="bg-green-600 text-white font-semibold py-1.5 px-3 rounded hover:bg-green-700">
          Save Changes
        </button>
        <button type="button" on:click={cancelEditing} class="bg-gray-600 text-white font-semibold py-1.5 px-3 rounded hover:bg-gray-700">
          Cancel
        </button>
      </div>
    </form>
  {/if}
</div>