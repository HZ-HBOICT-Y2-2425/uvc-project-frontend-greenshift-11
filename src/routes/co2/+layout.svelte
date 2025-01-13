<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let appliances = [];
  let rooms = [];
  let currentRoomId;

  $: currentRoomId = $page.params.id;

  // Fetch appliances and rooms data from the backend
  const fetchData = async () => {
    try {
      // Fetch appliances data
      const appliancesResponse = await fetch('https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/api/appliance-names');
      if (!appliancesResponse.ok) {
        throw new Error(`Failed to fetch appliances: ${appliancesResponse.statusText}`);
      }

      const appliancesData = await appliancesResponse.json();
      // Build appliances array
      appliances = appliancesData.brands.map((brand, index) => ({
        id: appliancesData.ids[index],
        brand: appliancesData.brands[index],  
        type: appliancesData.types[index],
      }));

      // Fetch rooms data
      const roomsResponse = await fetch('https://uvc-project-backend-greenshift-11-5q6c.onrender.com/api/room-names');
      if (!roomsResponse.ok) {
        throw new Error(`Failed to fetch rooms: ${roomsResponse.statusText}`);
      }

      const roomsData = await roomsResponse.json();
      // Build rooms array
      rooms = roomsData.names.map((name, index) => ({
        id: roomsData.ids[index],
        name,
        icon: roomsData.icons[index],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToRoom = (roomId) => {
    window.location.href = `/co2/room/${roomId}`;
  };
  
  // Fetch data on component mount
  onMount(fetchData);
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="flex h-screen mx-0 my-0 p-0">
  <aside class="w-1/4 bg-aside p-3 shadow-lg transition-all h-100%">
    <nav class="text-xl">
      <h1 class="text-white text-lg font-bold mb-2 pb-3"><a href={`/co2`}>Appliance Statistics</a></h1>
      <h1 class="text-white text-lg font-bold mb-2">Manage Appliances</h1>
      <h2 class="block text-white text-base font-bold mt-4 hover:underline"><a href={`/co2/appliance`}>All Appliances</a></h2>
  
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
  
      <h1><a class="text-white text-lg font-bold mb-2" href="/co2/room">All Rooms</a></h1>
      {#if rooms.length > 0}
        {#each rooms as room}
          <button 
            class="block text-white text-sm hover:underline pl-4 w-full text-left {currentRoomId === room.id ? 'font-bold' : ''}"
            on:click={() => navigateToRoom(room.id)}
          >
            {room.name}
          </button>
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
  
      <h1><a class="block text-white text-base font-bold mt-4 hover:underline" href="/co2/addAppliance">Add an Appliance</a></h1>
      <h1><a class="block text-white text-base font-bold mt-4 hover:underline" href="/co2/addRoom">Add a Room</a></h1>
    </nav>
  </aside>
  

  <main class="flex-1 p-4 overflow-hidden">
    <div class="h-[70vh] flex flex-col"> 
      <slot></slot>
    </div>
  </main>
</div>
