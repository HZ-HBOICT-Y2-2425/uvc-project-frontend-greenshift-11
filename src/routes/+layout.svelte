<script>
  import "../app.css"; // Ensure your styles are imported
  import { page } from "$app/stores";

  // Page-specific flags
  $: isMainPage = $page.url.pathname === '/';
  $: isSignupPage = $page.url.pathname === '/signup';
  $: isLoginPage = $page.url.pathname === '/login';
  $: isCO2Page = $page.url.pathname.startsWith('/co2');

  // Sample data for appliances and rooms (from her layout)
  let appliances = [
    { id: 1, brand: 'Samsung', type: 'Washing Machine' },
    { id: 2, brand: 'LG', type: 'Refrigerator' },
    { id: 3, brand: 'Bosch', type: 'Dishwasher' }
  ];

  let rooms = [
    { id: 1, name: 'Living Room', appliances: ['Television', 'Air Conditioner', 'Lamp'] },
    { id: 2, name: 'Kitchen', appliances: ['Refrigerator', 'Microwave', 'Oven'] },
    { id: 3, name: 'Bedroom', appliances: ['Bedside Lamp', 'Fan', 'Heater'] }
  ];
</script>

{#if !isMainPage && !isSignupPage && !isLoginPage}
  <div class="flex flex-col h-screen bg-greenPale">
    <!-- Header -->
    <header class="bg-greenLight text-greenDeep py-4 shadow-md w-full">
      <div class="container mx-auto text-center px-4">
        <h1 class="text-2xl font-bold sm:text-3xl">
          {#if $page.url.pathname === "/home"}
            Your Garden 🍌
          {:else if $page.url.pathname.startsWith("/articles")}
            Articles
          {:else if $page.url.pathname.startsWith("/co2")}
            CO2
          {:else if $page.url.pathname.startsWith("/shop")}
            Shop
          {:else if $page.url.pathname.startsWith("/setting")}
            Setting
          {:else}
            GreenShift
          {/if}
        </h1>
      </div>
    </header>

    <!-- Layout for CO2 Page with Sidebar -->
    {#if isCO2Page}
      <div class="flex h-screen mx-0 my-0 p-0">
        <!-- Sidebar -->
        <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg transition-all h-100%">
          <nav class="text-xl">
            <h1 class="text-white text-lg font-bold mb-2">Manage appliances</h1>
            <h2 class="block text-white text-base font-bold mt-4 hover:underline">All appliances</h2>
            {#if appliances.length > 0}
              {#each appliances as appliance}
                <p>
                  <a 
                    class="block text-white text-sm hover:underline" 
                    href="/co2/appliance"
                  >
                    {appliance.brand} {appliance.type}
                  </a>
                </p>
              {/each}
            {:else}
              <p><a class="block text-white text-sm hover:underline" href="/co2/addAppliance">Add an appliance first</a></p>
            {/if}

            <h1><a class="block text-white text-base font-bold mt-4 hover:underline" href="/co2/addAppliance">Add an appliance</a></h1>
            <h1><a class="text-white text-lg font-bold mb-2" href="/co2/rooms">Manage rooms</a></h1>
            {#if rooms.length > 0}
              <ul class="list-none pl-4">
                {#each rooms as room}
                  <li class="block text-white text-sm hover:underline">
                    <a href="/co2/rooms">{room.name}</a>
                  </li>
                {/each}
              </ul>
            {:else}
              <p><a class="block text-white text-sm hover:underline" href="/co2/addRoom">Add a room first</a></p>
            {/if}
          </nav>
        </aside>

        <!-- Main Content with CO2 Slot -->
        <main class="flex-1 p-4 overflow-hidden">
          <slot />
        </main>
      </div>
    {:else}
      <!-- Standard Page Content -->
      <main class="flex-grow container mx-0 px-0 py-0 text-center sm:text-left overflow-hidden">
        <slot />
      </main>
    {/if}

    <!-- Footer -->
    <footer class="bg-greenDeep text-greenPale h-15vh flex justify-center items-center">
      <div class="flex justify-center items-center gap-6">
        <a href="/home" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
          <img src="home.png" alt="Home" class="w-14 h-auto mb-1" />
          <span>Home</span>
        </a>
        <a href="/articles" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
          <img src="articles.png" alt="Articles" class="w-14 h-auto mb-1" />
          <span>Articles</span>
        </a>
        <a href="/co2" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
          <img src="CO2.png" alt="CO2 Info" class="w-14 h-auto mb-1" />
          <span>CO2</span>
        </a>
        <a href="/shop" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
          <img src="shop.png" alt="Shop" class="w-14 h-auto mb-1" />
          <span>Shop</span>
        </a>
        <a href="/setting" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
          <img src="setting.png" alt="Setting" class="w-14 h-auto mb-1" />
          <span>Settings</span>
        </a>
      </div>
    </footer>
  </div>
{/if}

{#if isMainPage || isSignupPage || isLoginPage}
  <!-- Custom layout for main, signup, and login pages -->
  <slot />
{/if}
