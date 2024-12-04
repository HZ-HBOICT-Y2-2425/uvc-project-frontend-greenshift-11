<div class="flex h-screen mx-0 my-0 p-0">
  <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg transition-all h-100%">
      <nav class="text-xl">
          <h1 class="text-white text-lg font-bold mb-2">Appliances</h1>
          <h2 class="text-white text-base mb-1">All appliances</h2>
          <p><a class="block text-white text-sm hover:underline" href="/co2/appliance">Add an appliance first</a></p>
          <h2 class="text-white text-base mt-4 mb-1">Rooms</h2>
          <p><a class="block text-white text-sm hover:underline" href="#addroom">Add a room first</a></p>
          <h2><a class="block text-white text-base mt-4 hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance</a></h2>
          <h2><a class="block text-white text-base mt-2 hover:underline" id="addroom" href="#about">Add a room</a></h2>
          <h2><a class="block text-white text-base mt-2 hover:underline" href="#about">Change defaults</a></h2>
      </nav>
  </aside>

  <main class="flex-1 p-4 overflow-hidden">
      <div class="h-[70vh] flex flex-col"> 
          <slot></slot>
      </div>
  </main>
</div>