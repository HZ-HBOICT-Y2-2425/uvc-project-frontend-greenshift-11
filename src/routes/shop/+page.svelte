<script lang="ts">
  let coins = 500; // Initial coins

  type Item = {
    id: number;
    name: string;
    emoji: string;
    price: number;
  };

  let animals: Item[] = [
    { id: 1, name: "cow", emoji: "🐄", price: 10 },
    { id: 2, name: "sheep", emoji: "🐑", price: 15 },
    { id: 3, name: "goose", emoji: "🦢", price: 8 },
    { id: 4, name: "dog", emoji: "🐕", price: 20 },
    { id: 5, name: "cat", emoji: "🐈", price: 12 },
    { id: 6, name: "rabbit", emoji: "🐇", price: 18 },
    { id: 7, name: "horse", emoji: "🐎", price: 25 },
    { id: 8, name: "pig", emoji: "🐖", price: 22 },
  ];
  
  let plants: Item[] = [
    { id: 1, name: "mushroom", emoji: "🍄", price: 5 },
    { id: 2, name: "sunflower", emoji: "🌻", price: 12 },
    { id: 3, name: "tree", emoji: "🌳", price: 25 },
    { id: 4, name: "chrysanthemum", emoji: "🌷", price: 10 },
    { id: 5, name: "cactus", emoji: "🌵", price: 8 },
    { id: 6, name: "rose", emoji: "🌹", price: 15 },
    { id: 7, name: "lily", emoji: "💐", price: 18 },
    { id: 8, name: "tulip", emoji: "🌷", price: 12 },
  ];

  let ownedItems = new Set<number>();
  let ownedAnimalsCount = new Map<number, number>(); // Track how many of each animal
  let ownedPlantsCount = new Map<number, number>(); // Track how many of each plant

  function buyItem(item: Item, isAnimal: boolean) {
    const maxCount = 5;

    // Check if item is already owned or if max is reached
    if (
      ownedItems.has(item.id) || 
      (isAnimal && (ownedAnimalsCount.get(item.id) || 0) >= maxCount) || 
      (!isAnimal && (ownedPlantsCount.get(item.id) || 0) >= maxCount)
    ) {
      return;
    }

    if (coins >= item.price) {
      coins -= item.price;
      ownedItems.add(item.id);

      // Update counts for animals and plants
      if (isAnimal) {
        ownedAnimalsCount.set(item.id, (ownedAnimalsCount.get(item.id) || 0) + 1);
      } else {
        ownedPlantsCount.set(item.id, (ownedPlantsCount.get(item.id) || 0) + 1);
      }
    }
  }
</script>

<div class="flex flex-1 px-6 py-8 gap-8">
  <!-- Animals Section -->
  <div class="flex-1">
    <div class="bg-green-500 text-center py-3 rounded-md mb-6 flex justify-between px-4">
      <h2 class="text-2xl font-bold text-white">Animals</h2>
      <p class="text-white text-lg">Owned: {ownedAnimalsCount.size}/5</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      {#each animals as animal}
        <button
          on:click={() => buyItem(animal, true)}
          on:keydown={(e) => e.key === 'Enter' && buyItem(animal, true)}
          class="flex flex-col items-center p-4 rounded-lg shadow-md transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 hover:scale-105"
          class:bg-green-100={ownedItems.has(animal.id)}
          class:bg-gray-50={!ownedItems.has(animal.id)}
          aria-label={`Buy ${animal.name} for ${animal.price} coins`}
        >
          <span class="text-6xl">{animal.emoji}</span>
          <p class="mt-2 text-lg font-semibold text-gray-800">{animal.name}</p>
          <p class="text-sm text-gray-500">{animal.price} coins</p>
          <p class="text-sm text-gray-500">Owned: {ownedAnimalsCount.get(animal.id) || 0}</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Plants Section -->
  <div class="flex-1">
    <div class="bg-green-500 text-center py-3 rounded-md mb-6 flex justify-between px-4">
      <h2 class="text-2xl font-bold text-white">Plants</h2>
      <p class="text-white text-lg">Owned: {ownedPlantsCount.size}/5</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      {#each plants as plant}
        <button
          on:click={() => buyItem(plant, false)}
          on:keydown={(e) => e.key === 'Enter' && buyItem(plant, false)}
          class="flex flex-col items-center p-4 rounded-lg shadow-md transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 hover:scale-105"
          class:bg-green-100={ownedItems.has(plant.id)}
          class:bg-gray-50={!ownedItems.has(plant.id)}
          aria-label={`Buy ${plant.name} for ${plant.price} coins`}
        >
          <span class="text-6xl">{plant.emoji}</span>
          <p class="mt-2 text-lg font-semibold text-gray-800">{plant.name}</p>
          <p class="text-sm text-gray-500">{plant.price} coins</p>
          <p class="text-sm text-gray-500">Owned: {ownedPlantsCount.get(plant.id) || 0}</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Sidebar Section -->
  <div class="w-1/4 flex flex-col items-center gap-6">
    <!-- Coin Tracker -->
    <div class="flex items-center justify-center gap-4">
      <p class="text-6xl font-bold text-gray-800">{coins}</p>
      <img src="https://emojicdn.elk.sh/💰" alt="Money Icon" class="w-16 h-16">
    </div>
    <div class="text-center text-gray-800 text-sm">
      <p>
        Use the money from completing 
        <a href="#" class="text-green-600 underline focus:outline-none focus:ring-2 focus:ring-green-300" aria-label="Learn more about daily tasks">
          daily tasks
        </a> 
        to decorate your garden.
      </p>
    </div>
  </div>
</div>
