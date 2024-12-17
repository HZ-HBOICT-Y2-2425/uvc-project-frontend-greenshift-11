<script lang="ts">
  import { writable, derived } from 'svelte/store';

  type ItemType = 'animal' | 'plant';
  type Item = {
    id: number;
    name: string;
    emoji: string;
    price: number;
    description?: string;
  };

  const MAX_ITEM_OWNERSHIP = 5;
  const INITIAL_COINS = 500;

  const animals: Item[] = [
    { id: 1, name: "Cow", emoji: "🐄", price: 10 },
    { id: 2, name: "Sheep", emoji: "🐑", price: 15 },
    { id: 3, name: "Pig", emoji: "🐖", price: 20 },
    { id: 4, name: "Chicken", emoji: "🐔", price: 25 },
    { id: 5, name: "Horse", emoji: "🐎", price: 30 },
    { id: 6, name: "Dog", emoji: "🐕", price: 35 },
    { id: 7, name: "Cat", emoji: "🐈", price: 40 },
    { id: 8, name: "Rabbit", emoji: "🐇", price: 45 },
    { id: 9, name: "Duck", emoji: "🦆", price: 50 },
    { id: 10, name: "Goat", emoji: "🐐", price: 55 },
  ];

  const plants: Item[] = [
    { id: 1, name: "Mushroom", emoji: "🍄", price: 5 },
    { id: 2, name: "Sunflower", emoji: "🌻", price: 8 },
    { id: 3, name: "Cactus", emoji: "🌵", price: 12 },
    { id: 4, name: "Palm Tree", emoji: "🌴", price: 18 },
    { id: 5, name: "Bamboo", emoji: "🎍", price: 25 },
    { id: 6, name: "Rose", emoji: "🌹", price: 30 },
    { id: 7, name: "Lavender", emoji: "🌿", price: 35 },
    { id: 8, name: "Tulip", emoji: "🌷", price: 40 },
    { id: 9, name: "Orchid", emoji: "🌺", price: 45 },
    { id: 10, name: "Bonsai", emoji: "🌳", price: 50 },
  ];

  const coins = writable(INITIAL_COINS);
</script>

<style>
  .scrollable {
    overflow-y: auto;
    flex-grow: 1;
    padding: 1rem;
  }

  .currency-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>

<div class="flex flex-1 px-6 py-8 gap-8 h-full">
  <!-- Animals Section -->
  <div class="flex-1 flex flex-col border rounded-md">
    <div class="bg-green-500 text-center py-3 rounded-t-md">
      <h2 class="text-2xl font-bold text-white">Animals</h2>
    </div>
    <div class="scrollable grid grid-cols-2 gap-4">
      {#each animals as animal}
        <button
          class="flex flex-col items-center p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          <span class="text-6xl">{animal.emoji}</span>
          <p class="mt-2 text-lg font-semibold">{animal.name}</p>
          <p class="text-sm">{animal.price} coins</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Plants Section -->
  <div class="flex-1 flex flex-col border rounded-md">
    <div class="bg-green-500 text-center py-3 rounded-t-md">
      <h2 class="text-2xl font-bold text-white">Plants</h2>
    </div>
    <div class="scrollable grid grid-cols-2 gap-4">
      {#each plants as plant}
        <button
          class="flex flex-col items-center p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          <span class="text-6xl">{plant.emoji}</span>
          <p class="mt-2 text-lg font-semibold">{plant.name}</p>
          <p class="text-sm">{plant.price} coins</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Currency Section -->
  <div class="w-1/4 currency-container border rounded-md">
    <p class="text-6xl font-bold">{$coins}</p>
    <img
      src="https://emojicdn.elk.sh/💰"
      alt="Money Icon"
      class="w-16 h-16"
    />
  </div>
</div>