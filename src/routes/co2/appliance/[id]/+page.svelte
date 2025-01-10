<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let appliance: {
    id: number;
    brand: string;
    type: string;
    description: string;
    hoursPerWeek: number;
    emoji: string;
  } | undefined;

  let isEditing = false;
  let tempBrand = '';
  let tempType = '';
  let tempDescription = '';
  let tempHoursPerWeek = 0;
  let tempEmoji = ''; // Temporary emoji value
  let showEmojiPicker = false;

  // Curated list of emojis relevant to appliances
  const emojiOptions = [
    '😊', '🔧', '💡', '🛋️', '🚿', '🍽️', '🧺', '🖥️', 
    '📺', '📡', '☕', '🍳', '🍴', '🗄️', '📦', '🎛️', 
    '🍕', '⚙️', '💻', '📱', '🔌', '🌀', '💨', '🧊'
  ];

  async function fetchAppliance(id: string) {
    const response = await fetch(`http://localhost:3012/appliance/${id}`);
    if (response.ok) {
      appliance = await response.json();

      if (appliance) {
        tempBrand = appliance.brand;
        tempType = appliance.type;
        tempDescription = appliance.description;
        tempHoursPerWeek = appliance.hoursPerWeek;
        tempEmoji = appliance.emoji; // Initialize emoji for editing
      }
    } else {
      console.error('Failed to fetch appliance data:', response.statusText);
    }
  }

  // Automatically fetch appliance data when ID changes
  $: $page.params.id, fetchAppliance($page.params.id);

  const startEditing = () => {
    if (appliance) {
      // Initialize temporary variables
      tempBrand = appliance.brand;
      tempType = appliance.type;
      tempDescription = appliance.description;
      tempHoursPerWeek = appliance.hoursPerWeek;
      tempEmoji = appliance.emoji; // Initialize emoji for editing
    }
    isEditing = true; // Set editing mode on
  };

  const saveChanges = () => {
    console.log('Saving changes:', {
      brand: tempBrand,
      type: tempType,
      description: tempDescription,
      hoursPerWeek: tempHoursPerWeek,
      emoji: tempEmoji,
    });

    // Update the appliance data
    if (appliance) {
      appliance.brand = tempBrand;
      appliance.type = tempType;
      appliance.description = tempDescription;
      appliance.hoursPerWeek = tempHoursPerWeek;
      appliance.emoji = tempEmoji; // Update appliance with new emoji
    }

    isEditing = false; // Exit editing mode
  };

  onMount(() => {
    const id = $page.params.id;
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
        <div class="ml-4 relative">
          <button
            type="button"
            class="w-40 h-40 border rounded flex items-center justify-center text-6xl cursor-pointer"
            aria-label="Appliance emoji"
          >
            {appliance.emoji || "🛋️"}
          </button>
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
        <label class="block">
          <div class="ml-4 relative">
            <button
              type="button"
              class="w-40 h-40 border rounded flex items-center justify-center text-6xl cursor-pointer"
              on:click={() => showEmojiPicker = !showEmojiPicker}
              aria-label="Select appliance emoji"
            >
              {tempEmoji || "🛋️"}
            </button>
            
            {#if showEmojiPicker}
              <div class="absolute bg-white border rounded mt-2 p-2 grid grid-cols-4 gap-2">
                {#each emojiOptions as option}
                  <button
                    type="button"
                    class="cursor-pointer"
                    on:click={() => {
                      tempEmoji = option; // Set temporary emoji value
                      showEmojiPicker = false; // Hide emoji picker after selection
                    }} 
                    aria-label={option}
                  >
                    {option}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
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