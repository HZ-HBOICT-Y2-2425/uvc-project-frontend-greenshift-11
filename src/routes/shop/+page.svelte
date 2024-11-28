<script>
  // Simulating dynamic coin count (if needed in the future)
  let coins = 42;
</script>



<!-- Main Content Section: Two Columns with Sidebar -->
<div class="flex flex-1 px-6 py-4 gap-8">
  
  <!-- Left Section: Animals -->
  <div class="flex-1">
    <!-- Section Header -->
    <div class="bg-green-500 text-center py-2 rounded-md mb-4">
      <h2 class="text-2xl font-bold text-white">Animals</h2>
    </div>
    
    <!-- Grid of Animals -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Animal Items -->
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🐄</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">cow</p>
      </div>
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🐑</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">sheep</p>
      </div>
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🦢</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">goose</p>
      </div>
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🐕</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">dog</p>
      </div>
    </div>
  </div>
  
  <!-- Right Section: Plants -->
  <div class="flex-1">
    <!-- Section Header -->
    <div class="bg-green-500 text-center py-2 rounded-md mb-4">
      <h2 class="text-2xl font-bold text-white">Plants</h2>
    </div>
    
    <!-- Grid of Plants -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Plant Items -->
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🍄</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">mushroom</p>
      </div>
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🌻</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">sunflower</p>
      </div>
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🌳</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">tree</p>
      </div>
      <div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
        <span class="text-6xl">🌷</span>
        <p class="mt-2 text-lg font-semibold text-gray-800">chrysanthemum</p>
      </div>
    </div>
  </div>
  
  <!-- Sidebar Section -->
  <div class="w-1/4 flex flex-col items-center gap-6">
    <!-- Coin Tracker -->
    <div class="flex items-center justify-center gap-4">
      <p class="text-6xl font-bold text-gray-800">{{ coins }}</p>
      <img src="https://emojicdn.elk.sh/🐷" alt="Piggy Bank" class="w-20 h-20">
    </div>
    
    <!-- Task Description -->
    <div class="text-center text-gray-800">
      <p>Use the money from completing <a href="#" class="text-green-600 underline">daily tasks</a> to decorate your garden</p>
    </div>
  </div>
</div>


