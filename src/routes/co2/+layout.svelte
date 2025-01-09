<script>
  import { onMount } from 'svelte';

  /* @type {{ id: number; brand: string; type: string }[]} */
  /**
     * @type {string | any[]}
     */
  let appliances = [];
  /* @type {{ id: number; icon: string; name: string }[]} */
  /**
     * @type {string | any[]}
     */
  let rooms = [];

  const fetchData = async () => {
  try {
    const appliancesResponse = await fetch('http://localhost:3010/appliance/api/appliance-names');
    const roomsResponse = await fetch('http://localhost:3010/appliance/api/room-names');

    if (!appliancesResponse.ok || !roomsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const appliancesData = await appliancesResponse.json();
    // Build the appliances array from the API response
    // @ts-ignore
    appliances = appliancesData.brands.map((brand, index) => ({
      id: appliancesData.ids[index],
      brand,
      type: appliancesData.types[index],
    }));

    const roomsData = await roomsResponse.json();
    // Build the rooms array from the API response
    // @ts-ignore
    rooms = roomsData.names.map((name, index) => ({
      id: roomsData.ids[index],
      name,
      icon: roomsData.icons[index],
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  onMount(fetchData);
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="flex h-screen mx-0 my-0 p-0">
  <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg transition-all h-100%">
    <nav class="text-xl">
      <h1 class="text-white text-lg font-bold mb-2">Manage appliances</h1>
      <h2 class="block text-white text-base font-bold mt-4 hover:underline">All appliances</h2>

      <!-- Show appliance links if there are appliances available -->
      {#if appliances.length > 0}
        {#each appliances as appliance}
          <p>
            <a 
              class="block text-white text-sm hover:underline pl-4" 
              href={`/co2/appliance/${appliance.id}`}
            >
              {appliance.brand} {appliance.type}
            </a>
          </p>
        {/each}
      {:else}
        <p>
          <a 
            class="block text-white text-sm hover:underline" 
            id="addapp" 
            href="/co2/addAppliance"
          >
            Add an appliance first
          </a>
        </p>
      {/if}

      <!-- Rooms Section -->
      <h1><a class="text-white text-lg font-bold mb-2">All rooms</a></h1>
      {#if rooms.length > 0}
        {#each rooms as room}
          <p class="block text-white text-sm hover:underline pl-4">
            <a href={`/co2/room/${room.id}`}>{room.name}</a>
          </p>
        {/each}
      {:else}
        <p>
          <a 
            class="block text-white text-sm hover:underline" 
            id="addroom" 
            href="/co2/addRoom"
          >
            Add a room first
          </a>
        </p>
      {/if}

      <!-- Links to add appliances or rooms -->
      <h1>
        <a 
          class="block text-white text-base font-bold mt-4 hover:underline" 
          href="/co2/addAppliance"
        >
          Add an appliance
        </a>
      </h1>
      <h1>
        <a 
          class="block text-white text-base font-bold mt-4 hover:underline" 
          href="/co2/addRoom"
        >
          Add a room
        </a>
      </h1>
    </nav>
  </aside>

  <main class="flex-1 p-4 overflow-hidden">
    <div class="h-[70vh] flex flex-col"> 
      <slot></slot>
    </div>
  </main>
</div>