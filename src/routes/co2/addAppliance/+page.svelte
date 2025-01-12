<script>
  import { onMount } from 'svelte';

  let appliance = {
    brand: '',
    type: '',
    description: '',
    hoursPerWeek: 0,
    wattage: 0,
    emoji: ''
  };

  let showEmojiPicker = false;
  let applianceTypes = [];

  const fetchApplianceTypes = async () => {
    try {
      const response = await fetch('http://localhost:3012/appliance/types');
      if (!response.ok) {
        throw new Error('Failed to fetch appliance types');
      }

      const typesData = await response.json();
      applianceTypes = typesData; // Populate appliance types dynamically
    } catch (error) {
      console.error('Error fetching appliance types:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3012/appliance/${appliance.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch appliance data');
      }

      const applianceData = await response.json();
      // Uncomment if you want to populate appliance state with fetched data
      // appliance = applianceData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = appliance.id
        ? `http://localhost:3012/appliance/${appliance.id}`
        : `http://localhost:3012/appliance/`;

      const method = appliance.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appliance)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        window.location.href = '/co2';
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  onMount(() => {
    fetchData();
    fetchApplianceTypes(); // Fetch appliance types when the component mounts
  });

  const emojiOptions = [
    { emoji: '😊', label: 'Smile' },
    { emoji: '🔧', label: 'Tool' },
    { emoji: '💡', label: 'Lightbulb' },
    { emoji: '🛋️', label: 'Couch' },
    { emoji: '🚿', label: 'Shower' },
    { emoji: '🍽️', label: 'Dining' },
    { emoji: '🧺', label: 'Basket' },
    { emoji: '🖥️', label: 'Computer' },
    { emoji: '📺', label: 'TV' },
    { emoji: '📡', label: 'Antenna' },
    { emoji: '☕', label: 'Coffee' },
    { emoji: '🍳', label: 'Cooking' },
    { emoji: '⚙️', label: 'Gear' },
    { emoji: '💻', label: 'Laptop' },
    { emoji: '📱', label: 'Phone' },
    { emoji: '🔌', label: 'Plug' },
    { emoji: '🎛️', label: 'Control' },
    { emoji: '🌀', label: 'Swirl' },
    { emoji: '💨', label: 'Wind' },
    { emoji: '🧊', label: 'Ice' }
  ];
</script>

<!-- Main Content Area -->
<div class="flex-grow p-4">
  <div class="flex justify-between items-start">
    <form class="flex flex-col gap-4 w-2/3" method="POST" on:submit|preventDefault={handleSubmit}>
      <label class="block">
        <span class="text-gray-700 font-medium">Brand</span>
        <input name="brand" type="text" bind:value={appliance.brand} class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Type</span>
        <select bind:value={appliance.type} class="w-full border rounded p-2 mt-1" required>
          <option value="" disabled selected>Select an appliance type</option>
          {#each applianceTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Description</span>
        <input name="description" type="text" bind:value={appliance.description} class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Hours per week usage</span>
        <input name="hoursPerWeek" type="number" bind:value={appliance.hoursPerWeek} class="w-full border rounded p-2 mt-1" required />
      </label>
      <label class="block">
        <span class="text-gray-700 font-medium">Wattage</span>
        <input name="wattage" type="number" bind:value={appliance.wattage} class="w-full border rounded p-2 mt-1" required />
      </label>
      <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Add an appliance
      </button>
    </form>
    <div class="ml-4 relative">
      <button
        type="button"
        class="w-40 h-40 border rounded flex items-center justify-center text-6xl cursor-pointer"
        on:click={() => showEmojiPicker = !showEmojiPicker}
        aria-label="Select appliance emoji"
      >
        {appliance.emoji || "🛋️"}
      </button>
      
      {#if showEmojiPicker}
        <div class="absolute bg-white border rounded mt-2 p-2 grid grid-cols-4 gap-2">
          {#each emojiOptions as option}
            <button
              type="button"
              class="cursor-pointer"
              on:click={() => {
                appliance.emoji = option.emoji;
                showEmojiPicker = false;
              }} 
              aria-label={option.label}
            >
              {option.emoji}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
