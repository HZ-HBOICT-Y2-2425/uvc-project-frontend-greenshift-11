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
                  class="block text-white text-sm hover:underline" 
                  href={`/co2/appliance`}
                >
                  {appliance.brand} {appliance.type}
                </a>
              </p>
            {/each}
          {:else}
            <p><a class="block text-white text-sm hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance first</a></p>
          {/if}

          <h1><a class="block text-white text-base font-bold mt-4 hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance</a></h1>
          <h1><a class="text-white text-lg font-bold mb-2" href="/co2/rooms">Manage rooms</a></h1>
      </nav>
  </aside>

  <main class="flex-1 p-4 overflow-hidden">
      <div class="h-[70vh] flex flex-col"> 
          <slot></slot>
      </div>
  </main>
</div>

<script>
  // Sample data for appliances
  export let appliances = [
    // Uncomment the line below to test with no appliances
    { id: 1, brand: 'Samsung', type: 'Washing Machine' },
    { id: 2, brand: 'LG', type: 'Refrigerator' },
    { id: 3, brand: 'Bosch', type: 'Dishwasher' }
  ];
</script>