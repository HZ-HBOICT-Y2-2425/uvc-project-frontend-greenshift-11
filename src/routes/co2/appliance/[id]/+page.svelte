<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { page } from '$app/stores';

  let appliance: {
    id: number;
    brand: string;
    type: string;
    description: string;
    hoursPerWeek: number;
    wattage: number;
    emoji: string;
  } | undefined;

  let applianceTypes: string[] = [];
  let isEditing = false;
  let tempBrand = '';
  let tempType = ''; 
  let tempDescription = '';
  let tempHoursPerWeek = 0;
  let tempWattage = 0;
  let tempEmoji = '';
  let showEmojiPicker = false;

  const emojiOptions = [
    '😊', '🔧', '💡', '🛋️', '🚿', '🍽️', '🧺', '🖥️', 
    '📺', '📡', '☕', '🍳', '🍴', '🗄️', '📦', '🎛️', 
    '🍕', '⚙️', '💻', '📱', '🔌', '🌀', '💨', '🧊'
  ];

  async function fetchAppliance(id: string) {
    const response = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/${id}`);
    if (response.ok) {
      appliance = await response.json();
      if (appliance) {
        tempBrand = appliance.brand;
        tempType = appliance.type;
        tempDescription = appliance.description;
        tempHoursPerWeek = appliance.hoursPerWeek;
        tempWattage = appliance.wattage;
        tempEmoji = appliance.emoji;
      }
    } else {
      console.error('Failed to fetch appliance data:', response.statusText);
    }
  }

  async function fetchApplianceTypes() {
    const response = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/api/appliance-types`);
    if (response.ok) {
      applianceTypes = await response.json();
    } else {
      console.error('Failed to fetch appliance types:', response.statusText);
    }
  }

  // Run fetch when the page or appliance ID changes
  $: $page.params.id, fetchAppliance($page.params.id);

  // Initialize data when the component is mounted
  onMount(() => {
    fetchAppliance($page.params.id);
    fetchApplianceTypes();
  });

  const startEditing = () => {
    if (appliance) {
      tempBrand = appliance.brand;
      tempType = appliance.type;
      tempDescription = appliance.description;
      tempHoursPerWeek = appliance.hoursPerWeek;
      tempWattage = appliance.wattage;
      tempEmoji = appliance.emoji;
    }
    isEditing = true;
  };

  const saveChanges = async () => {
    if (!appliance) return;

    const updatedAppliance = {
      ...appliance,
      brand: tempBrand,
      type: tempType,
      description: tempDescription,
      hoursPerWeek: tempHoursPerWeek,
      wattage: tempWattage,
      emoji: tempEmoji
    };

    try {
      const response = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/${appliance.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAppliance)
      });

      if (response.ok) {
        appliance = updatedAppliance;
        isEditing = false;
      } else {
        console.error('Failed to save appliance:', await response.text());
      }
    } catch (error) {
      console.error('Error saving appliance:', error);
    }
  };

  const cancelEditing = () => {
    isEditing = false;
  };
</script>

<div class="flex-grow p-4">
  {#if appliance}
    {#if !isEditing}
      <div class="flex flex-col gap-6 w-full relative">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="font-medium">Brand:</span>
            <span>{appliance.brand}</span>
          </div>

          <button class="w-24 h-24 border rounded flex items-center justify-center text-7xl cursor-pointer mt-4 mr-4">
            {appliance.emoji || "🛋️"}
          </button>
        </div>

        <div><span class="font-medium">Type:</span> {appliance.type}</div>
        <div><span class="font-medium">Description:</span> {appliance.description}</div>
        <div><span class="font-medium">Hours per week usage:</span> {appliance.hoursPerWeek}</div>
        <div><span class="font-medium">Wattage:</span> {appliance.wattage} W</div>

        <button on:click={startEditing} class="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
      </div>
    {:else}
      <form class="flex flex-col gap-4 w-full relative" on:submit|preventDefault={saveChanges}>
        <label class="block">
          <span class="font-medium">Brand</span>
          <input bind:value={tempBrand} type="text" class="w-1/2 border rounded p-2 mt-1" required />
        </label>
        <label class="block">
          <span class="font-medium">Type</span>
          <select bind:value={tempType} class="w-1/2 border rounded p-2 mt-1" required>
            {#each applianceTypes as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </label>
        <label class="block">
          <span class="font-medium">Description</span>
          <input bind:value={tempDescription} type="text" class="w-1/2 border rounded p-2 mt-1" required />
        </label>
        <label class="block">
          <span class="font-medium">Hours per week usage</span>
          <input bind:value={tempHoursPerWeek} type="number" min="0" class="w-1/2 border rounded p-2 mt-1" required />
        </label>
        <label class="block">
          <span class="font-medium">Wattage (W)</span>
          <input bind:value={tempWattage} type="number" min="0" class="w-1/2 border rounded p-2 mt-1" required />
        </label>

        <button
          type="button"
          class="absolute top-0 right-0 w-24 h-24 border rounded flex items-center justify-center text-7xl cursor-pointer mt-4 mr-4"
          on:click={() => (showEmojiPicker = !showEmojiPicker)}
        >
          {tempEmoji || "🛋️"}
        </button>
        {#if showEmojiPicker}
          <div class="absolute bg-white border rounded p-2 grid grid-cols-4 gap-2 top-16 right-4">
            {#each emojiOptions as emoji}
              <button
                type="button"
                on:click={() => {
                  tempEmoji = emoji;
                  showEmojiPicker = false;
                }}
              >
                {emoji}
              </button>
            {/each}
          </div>
        {/if}

        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" on:click={cancelEditing} class="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      </form>
    {/if}
  {:else}
    <p class="text-red-500">Appliance not found.</p>
  {/if}
</div>
