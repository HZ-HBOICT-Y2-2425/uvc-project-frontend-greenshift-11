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

  // Game configuration constants
  const MAX_ITEM_OWNERSHIP = 5;
  const INITIAL_COINS = 500;

  // Predefined item collections with more comprehensive data
  const animals: Item[] = [
    { 
      id: 1, 
      name: "Cow", 
      emoji: "🐄", 
      price: 10, 
      description: "A gentle farm animal that provides milk and companionship." 
    },
    { 
      id: 2, 
      name: "Sheep", 
      emoji: "🐑", 
      price: 15, 
      description: "Woolly friend that provides soft fleece for warmth." 
    },
    { 
      id: 3, 
      name: "Pig", 
      emoji: "🐖", 
      price: 20, 
      description: "A cute piglet that loves to roll in the mud." 
    },
    {
      id: 4,
      name: "Chicken",
      emoji: "🐔",
      price: 25,
      description: "A clucking bird that lays fresh eggs for breakfast."
    },
    {
      id: 5,
      name: "Horse",
      emoji: "🐎",
      price: 30,
      description: "A majestic creature that loves to run and jump."
    },
    {
      id: 6,
      name: "Dog",
      emoji: "🐕",
      price: 35,
      description: "A loyal companion that guards your home and heart."
    },
    {
      id: 7,
      name: "Cat",
      emoji: "🐈",
      price: 40,
      description: "A playful feline that purrs and naps all day."
    },
    {
      id: 8,
      name: "Rabbit",
      emoji: "🐇",
      price: 45,
      description: "A fluffy bunny that hops around your garden."
    },
    {
      id: 9,
      name: "Duck",
      emoji: "🦆",
      price: 50,
      description: "A quacking bird that loves to swim in the pond."
    },
    {
      id: 10,
      name: "Goat",
      emoji: "🐐",
      price: 55,
      description: "A curious animal that eats everything in sight."
    }
  ];
  
  const plants: Item[] = [
    { 
      id: 1, 
      name: "Mushroom", 
      emoji: "🍄", 
      price: 5, 
      description: "A magical fungus that adds wonder to your garden." 
    },
    { 
      id: 2, 
      name: "Sunflower", 
      emoji: "🌻", 
      price: 8, 
      description: "A bright and cheerful flower that follows the sun." 
    },
    { 
      id: 3, 
      name: "Cactus", 
      emoji: "🌵", 
      price: 12, 
      description: "A prickly plant that thrives in the desert." 
    },
    {
      id: 4,
      name: "Palm Tree",
      emoji: "🌴",
      price: 18,
      description: "A tropical tree that provides shade and relaxation."
    },
    {
      id: 5,
      name: "Bamboo",
      emoji: "🎍",
      price: 25,
      description: "A fast-growing plant that symbolizes strength and resilience."
    },
    {
      id: 6,
      name: "Rose",
      emoji: "🌹",
      price: 30,
      description: "A fragrant flower that represents love and passion."
    },
    {
      id: 7,
      name: "Lavender",
      emoji: "🌿",
      price: 35,
      description: "A calming herb that soothes the mind and body."
    },
    {
      id: 8,
      name: "Tulip",
      emoji: "🌷",
      price: 40,
      description: "A colorful flower that blooms in the spring."
    },
    {
      id: 9,
      name: "Orchid",
      emoji: "🌺",
      price: 45,
      description: "An exotic flower that symbolizes luxury and beauty."
    },
    {
      id: 10,
      name: "Bonsai",
      emoji: "🌳",
      price: 50,
      description: "A miniature tree that requires patience and care."
    }
  ];

  // Reactive game state stores
  const coins = writable(INITIAL_COINS);
  const ownedAnimalsCount = writable(new Map<number, number>());
  const ownedPlantsCount = writable(new Map<number, number>());

  // Derived store to get current count of an item 
  const currentCountMap = derived([ownedAnimalsCount, ownedPlantsCount], 
    ([animalsMap, plantsMap]) => {
      return (id: number, isAnimal: boolean) => 
        isAnimal ? (animalsMap.get(id) || 0) : (plantsMap.get(id) || 0);
    }
  );

  // Modal state management
  const isModalOpen = writable(false);
  const currentItem = writable<Item | null>(null);
  const currentItemType = writable<ItemType | null>(null);

  /**
   * Opens the purchase modal for a specific item
   * @param item The item to be purchased
   * @param type Type of the item (animal or plant)
   */
  function openPurchaseModal(item: Item, type: ItemType) {
    currentItem.set(item);
    currentItemType.set(type);
    isModalOpen.set(true);
  }

  /**
   * Closes the purchase modal and resets related state
   */
  function closeModal() {
    isModalOpen.set(false);
    currentItem.set(null);
    currentItemType.set(null);
  }

  /**
   * Handles the purchase logic for items
   * Checks coin balance, ownership limits, and updates game state
   */
  function purchaseItem() {
    const item = $currentItem;
    const type = $currentItemType;

    // Early return if no item or type selected
    if (!item || !type) return;

    const currentCount = $currentCountMap(item.id, type === 'animal');

    // Check ownership limit
    if (currentCount >= MAX_ITEM_OWNERSHIP) {
      alert(`You can only own up to ${MAX_ITEM_OWNERSHIP} ${item.name}s!`);
      return;
    }

    // Check coin balance
    if ($coins >= item.price) {
      // Deduct coins
      coins.update(c => c - item.price);

      // Update item count based on type
      const currentCountMap = type === 'animal' ? ownedAnimalsCount : ownedPlantsCount;
      currentCountMap.update(map => {
        const newMap = new Map(map);
        newMap.set(item.id, (newMap.get(item.id) || 0) + 1);
        return newMap;
      });

      closeModal();
    } else {
      alert('Not enough coins to purchase this item!');
    }
  }
</script>

<!-- Main game layout with responsive design -->
<div class="flex flex-1 px-6 py-8 gap-8">
  <!-- Animals Section -->
  <div class="flex-1">
    <div class="bg-green-500 text-center py-3 rounded-md mb-6">
      <h2 class="text-2xl font-bold text-white">Animals</h2>
    </div>
    <div class="grid grid-cols-2 gap-4">
      {#each animals as animal}
        <button
          on:click={() => openPurchaseModal(animal, 'animal')}
          class="flex flex-col items-center p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-green-300"
          aria-label={`View ${animal.name}`}
        >
          <span class="text-6xl">{animal.emoji}</span>
          <p class="mt-2 text-lg font-semibold text-gray-800">{animal.name}</p>
          <p class="text-sm text-gray-500">{animal.price} coins</p>
          <p class="text-sm text-gray-500">
            Owned: {($ownedAnimalsCount.get(animal.id) || 0)}/5
          </p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Plants Section -->
  <div class="flex-1">
    <div class="bg-green-500 text-center py-3 rounded-md mb-6">
      <h2 class="text-2xl font-bold text-white">Plants</h2>
    </div>
    <div class="grid grid-cols-2 gap-4">
      {#each plants as plant}
        <button
          on:click={() => openPurchaseModal(plant, 'plant')}
          class="flex flex-col items-center p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-green-300"
          aria-label={`View ${plant.name}`}
        >
          <span class="text-6xl">{plant.emoji}</span>
          <p class="mt-2 text-lg font-semibold text-gray-800">{plant.name}</p>
          <p class="text-sm text-gray-500">{plant.price} coins</p>
          <p class="text-sm text-gray-500">
            Owned: {($ownedPlantsCount.get(plant.id) || 0)}/5
          </p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Sidebar Section -->
  <div class="w-1/4 flex flex-col justify-center items-center gap-6">
    <div class="flex items-center justify-center gap-4">
      <p class="text-6xl font-bold text-gray-800">{$coins}</p>
      <img src="https://emojicdn.elk.sh/💰" alt="Money Icon" class="w-16 h-16">
    </div>
  </div>
</div>

<!-- Purchase Modal -->
{#if $isModalOpen && $currentItem}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    on:click|self={closeModal}
    role="dialog"
  >
    <div class="bg-white p-6 rounded-lg max-w-md w-full">
      <div class="text-center">
        <span class="text-8xl">{$currentItem.emoji}</span>
        <h2 class="text-2xl font-bold mt-4">{$currentItem.name}</h2>
        <p class="text-gray-600 mt-2">{$currentItem.description}</p>
        <div class="mt-4">
          <p class="font-semibold">Price: {$currentItem.price} coins</p>
          <p class="text-sm text-gray-500">
            Current Owned: {$currentItemType === 'animal' 
              ? ($ownedAnimalsCount.get($currentItem.id) || 0)
              : ($ownedPlantsCount.get($currentItem.id) || 0)
            }/5
          </p>
        </div>
        <div class="flex justify-center gap-4 mt-6">
          <button 
            on:click={closeModal}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            on:click={purchaseItem}
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}