<script>
  import { onMount } from 'svelte';
  
  let name = "";
  let icon = "🛋️";
  let appliances = [];
  let applianceTypes = [];
  let isLoading = true;
  let error = null;
  let showPopup = false;
  let showEmojiPicker = false;

  const MOCK_DATA = {
    ids: [0,1,2,3,4,5,6,7,8,9,10],
    brands: ["Samsung","Dyson","Sony","Philips","Whirlpool","Yes","Samsung","LG","GE","abs","SuzieBrand"],
    types: ["Refrigerator","Vacuum Cleaner","Television","Air Purifier","Washing Machine","Dryer","Rice Cooker","Microwave","Dishwasher","Washing Machine","Washing Machine"]
  };

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

  const mockFetchAppliances = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const formattedData = MOCK_DATA.ids.map((id, index) => ({
          id,
          brand: MOCK_DATA.brands[index],
          type: MOCK_DATA.types[index]
        }));
        resolve(formattedData);
      }, 500);
    });
  };

  const fetchAppliances = async () => {
    try {
      isLoading = true;
      applianceTypes = await mockFetchAppliances();
    } catch (err) {
      error = `Failed to load appliances: ${err.message}`;
      console.error('Error:', err);
    } finally {
      isLoading = false;
    }
  };

  onMount(fetchAppliances);

  const handleSubmit = async () => {
    try {
      console.log('Submitting:', { name, icon, appliances });
      showPopup = true;
      setTimeout(() => {
        showPopup = false;
        window.location.href = "/co2";
      }, 2000);
    } catch (err) {
      error = `Failed to create room: ${err.message}`;
      console.error("Error:", err);
    }
  };

  const toggleAppliance = (id) => {
    appliances = appliances.includes(id) 
      ? appliances.filter(a => a !== id)
      : [...appliances, id];
  };
</script>

<div class="flex-grow p-4">
  {#if showPopup}
    <div class="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
      Room added successfully!
    </div>
  {/if}

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  {/if}

  <div class="flex justify-between items-start">
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
          {#if isLoading}
            <span class="text-gray-500">Loading appliances...</span>
          {:else if error}
            <button 
              class="text-blue-500 underline"
              on:click={() => { error = null; fetchAppliances(); }}
            >
              Retry loading appliances
            </button>
          {:else if applianceTypes.length === 0}
            <span class="text-gray-500 italic">Add an appliance first</span>
          {:else}
            {#each applianceTypes as appliance}
              <label class="flex items-center mt-2">
                <input
                  type="checkbox"
                  value={appliance.id}
                  checked={appliances.includes(appliance.id)}
                  on:change={() => toggleAppliance(appliance.id)}
                  class="mr-2"
                />
                <span>{appliance.brand} {appliance.type}</span>
              </label>
            {/each}
          {/if}
        </div>
      </label>

      <button 
        class="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        Add a room
      </button>
    </form>

    <div class="ml-4 relative">
      <button
        type="button"
        class="w-40 h-40 border rounded flex items-center justify-center text-6xl cursor-pointer"
        on:click={() => showEmojiPicker = !showEmojiPicker}
        aria-label="Select room icon"
      >
        {icon}
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