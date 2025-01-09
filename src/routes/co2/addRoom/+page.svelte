<script>
  // @ts-nocheck
  
  // Functional setup for the component
  let name = "";
  let icon = "🛋️"; // Set a default icon
  // @ts-ignore
  /**
     * @type {string[]}
     */
  let appliances = [];

  import { onMount } from 'svelte';
  let showPopup = false;
  let showEmojiPicker = false;
  
  // List of possible room icon types
  const roomIconTypes = [
    { label: 'Living Room', emoji: '🛋️' },
    { label: 'Bedroom', emoji: '🛏️' },
    { label: 'Kitchen', emoji: '🍳' },
    { label: 'Bathroom', emoji: '🚽' },
    { label: 'Office', emoji: '💻' },
    { label: 'Dining Room', emoji: '🍽️' },
    { label: 'Garage', emoji: '🚗' },
    { label: 'Garden', emoji: '🌳' },
    { label: 'Hallway', emoji: '🚪' },
    { label: 'Gym', emoji: '🏋️' },
    { label: 'Storage', emoji: '📦' },
    { label: 'Playroom', emoji: '🎲' },
  ];
  
  // List of possible home appliance types
  // @ts-ignore
  /**
     * @type {any[]}
     */
  let applianceTypes = [];
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3010/appliance/api/appliance-names');
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
  
  const BASE_URL = "http://localhost:3010/room/";
  
  const handleSubmit = async () => {
    try {
      const url = new URL(`${BASE_URL}room`);
      const roomData = {
          name,
          icon,
          appliances // Send selected appliances
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
  
  const toggleAppliance = (type) => {
    if (appliances.includes(type)) {
      appliances = appliances.filter(appliance => appliance !== type);
    } else {
      appliances = [...appliances, type];
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
        <input
          name="name"
          type="text"
          bind:value={name}
          class="w-full border rounded p-2 mt-1"
          required
        />
      </label>
      
      <label class="block">
        <span class="text-gray-700 font-medium">Appliances</span>
        <div class="flex flex-col">
          {#if applianceTypes.length > 0}
            {#each applianceTypes as appliance}
              <label class="flex items-center mt-2">
                <input
                  type="checkbox"
                  value={appliance.type}
                  checked={appliances.includes(appliance.type)}
                  on:change={() => toggleAppliance(appliance.type)}
                  class="mr-2"
                />
                <span>{appliance.brand} {appliance.type}</span>
              </label> 
            {/each}
          {:else}
            <span class="text-gray-500 italic">Add an appliance first</span>
          {/if}
        </div>
      </label>
  
      <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Add a room
      </button>
    </form>
  
    <!-- Icon Selection Section -->
    <div class="ml-4 relative">
      <button
        type="button"
        class="w-40 h-40 border rounded flex items-center justify-center text-6xl cursor-pointer"
        on:click={() => showEmojiPicker = !showEmojiPicker}
        aria-label="Select room icon"
      >
        {icon || "🛋️"}
      </button>
      
      {#if showEmojiPicker}
        <div class="absolute bg-white border rounded mt-2 p-2 grid grid-cols-4 gap-2">
          {#each roomIconTypes as type}
            <button
              type="button"
              class="cursor-pointer"
              on:click={() => { icon = type.emoji; showEmojiPicker = false; }}
              aria-label={type.label}
            >
              {type.emoji}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>