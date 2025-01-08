<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="flex h-screen mx-0 my-0 p-0">
  <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg transition-all h-100%">
    <nav class="text-xl">
      <h1 class="text-white text-lg font-bold mb-2">Manage appliances</h1>
      <h2 class="block text-white text-base font-bold mt-4 hover:underline">All appliances</h2>
      
      <!-- Show appliance links if there are appliances available -->
      {#if appliances.length > 0}
        {#each appliances as appliance}
          <p><a class="block text-white text-sm hover:underline" href={`/co2/appliance`}>{appliance.brand} {appliance.type}</a></p>
        {/each}
      {:else}
        <p><a class="block text-white text-sm hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance first</a></p>
      {/if}

      <h1><a class="block text-white text-base font-bold mt-4 hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance</a></h1>
      <!-- Show appliance links if there are appliances available -->
      <!-- In the same aside tag -->
      <h1><a class="text-white text-lg font-bold mb-2" href="/co2/rooms">Manage rooms</a></h1>
      {#if rooms.length > 0}
        <ul class="list-none pl-4">
          {#each rooms as room}
            <li class="block text-white text-sm hover:underline">
              <a href={`/co2/rooms`}>{room.name}</a>
            </li>
          {/each}
        </ul>
      {:else}
        <p><a class="block text-white text-sm hover:underline" id="addroom" href="/co2/addRoom">Add a room first</a></p>
      {/if}
    </nav>
  </aside>

  <main class="flex-1 p-4 overflow-hidden">
      <div class="h-[70vh] flex flex-col"> 
          <slot></slot>
      </div>
  </main>
</div>

<script>
    /** @type {{ id: number; brand: string; type: string; description: string; hoursPerWeek: number }[]} */
    let appliances = [];
    /** @type {{ id: number; name: string; icon: string; appliances: {} }[]} */
    let rooms = [];
  const fetchData = async () => {
    try {
      const appliancesResponse = await fetch('http://localhost:3010/appliance/api/appliance-names');
      const roomsResponse = await fetch('http://localhost:3010/appliance/api/rooms');

      if (!appliancesResponse.ok || !roomsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      appliances = await appliancesResponse.json();
      rooms = await roomsResponse.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
</script>