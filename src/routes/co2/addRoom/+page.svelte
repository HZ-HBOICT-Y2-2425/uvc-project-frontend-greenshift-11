<script>
// @ts-nocheck

  // Functional setup for the component
  let name = "";
  let icon = "";
  // @ts-ignore
  /**
     * @type {never[]}
     */
  let appliances = [];
  import { onMount } from 'svelte';
  let showPopup = false;
  let showEmojiPicker = false;

  // List of possible room icon types
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

  // List of possible home appliance types
  // @ts-ignore
  /**
     * @type {any[]}
     */
  let applianceTypes = [];

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3012/appliance/api/appliance-names');
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

  const BASE_URL = "http://localhost:3012/room/";

  const handleSubmit = async () => {
    try {
        const url = new URL(`${BASE_URL}room`);
        const roomData = {
            name,
            icon,
            // @ts-ignore
            appliances
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roomData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            showPopup = true;
            setTimeout(() => {
                showPopup = false;
                window.location.href = "/co2"; // Redirect to app's home page
            }, 2000);
        } else {
            const errorText = await response.text();
            console.error(errorText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };
</script>

<!-- Main Content Area -->
<div class="flex-grow p-4">
  {#if showPopup}
    <div class="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
      Room added successfully!
    </div>
  {/if}
  <div class="flex justify-between items-start">
    <!-- Form Section -->
    <form class="flex flex-col gap-4 w-2/3" method="POST" on:submit|preventDefault={handleSubmit}>
      <label class="block">
        <span class="text-gray-700 font-medium">Room Name</span>
        <input name="name" type="text" bind:value={name} class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Appliances</span>
        <select bind:value={appliances} class="w-full border rounded p-2 mt-1" multiple>
          {#if appliances.length > 0}
            {#each applianceTypes as appliance}
            <option value={appliance.id}>
              {appliance.brand} {appliance.type}
            </option>  
            {/each}
          {:else}
            <!-- svelte-ignore node_invalid_placement_ssr -->
            <option disabled>Add an appliance first</option>
          {/if}
        </select>
      </label>
      <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Add a room
      </button>
    </form>

    <!-- Icon Selection Section -->
    <div class="ml-4">
      <button type="button" class="w-40 h-40 border rounded flex items-center justify-center text-6xl cursor-pointer" on:click={() => showEmojiPicker = !showEmojiPicker} aria-label="Select room icon">
        {icon || "🛋️"}
      </button>
      {#if showEmojiPicker}
        <div class="absolute bg-white border rounded mt-2 p-2 grid grid-cols-4 gap-2">
          {#each roomIconTypes as type}
            <button type="button" class="cursor-pointer" on:click={() => { icon = type.emoji; showEmojiPicker = false; }} aria-label={type.label}>
              {type.emoji}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>