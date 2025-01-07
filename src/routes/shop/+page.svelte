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

  type OwnedItem = {
    itemId: number;
    type: ItemType;
    quantity: number;
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

  // Stores
  const coins = writable(INITIAL_COINS);
  const inventory = writable<OwnedItem[]>([]);
  const selectedItem = writable<{ item: Item; type: ItemType } | null>(null);

  // Derived store for checking if modal should be shown
  const showModal = derived(selectedItem, $selectedItem => $selectedItem !== null);

  // Helper function to get owned quantity
  function getOwnedQuantity(itemId: number, type: ItemType): number {
    const item = $inventory.find(i => i.itemId === itemId && i.type === type);
    return item?.quantity || 0;
  }

  // Purchase handling
  function purchaseItem() {
    if (!$selectedItem) return;
    
    const { item, type } = $selectedItem;
    const currentQuantity = getOwnedQuantity(item.id, type);
    
    if (currentQuantity >= MAX_ITEM_OWNERSHIP) {
      alert(`You can't own more than ${MAX_ITEM_OWNERSHIP} of each item!`);
      return;
    }
    
    if ($coins < item.price) {
      alert("Not enough coins!");
      return;
    }
    
    coins.update(c => c - item.price);
    
    inventory.update(inv => {
      const existingItem = inv.find(i => i.itemId === item.id && i.type === type);
      if (existingItem) {
        existingItem.quantity++;
        return inv;
      }
      return [...inv, { itemId: item.id, type, quantity: 1 }];
    });
  }

  function handleItemClick(item: Item, type: ItemType) {
    selectedItem.set({ item, type });
  }

  function closeModal() {
    selectedItem.set(null);
  }
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

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    max-width: 400px;
    width: 90%;
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
          on:click={() => handleItemClick(animal, 'animal')}
        >
          <span class="text-6xl">{animal.emoji}</span>
          <p class="mt-2 text-lg font-semibold">{animal.name}</p>
          <p class="text-sm">{animal.price} coins</p>
          {#if getOwnedQuantity(animal.id, 'animal') > 0}
            <p class="text-sm text-green-600">
              Owned: {getOwnedQuantity(animal.id, 'animal')}
            </p>
          {/if}
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
          on:click={() => handleItemClick(plant, 'plant')}
        >
          <span class="text-6xl">{plant.emoji}</span>
          <p class="mt-2 text-lg font-semibold">{plant.name}</p>
          <p class="text-sm">{plant.price} coins</p>
          {#if getOwnedQuantity(plant.id, 'plant') > 0}
            <p class="text-sm text-green-600">
              Owned: {getOwnedQuantity(plant.id, 'plant')}
            </p>
          {/if}
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

<!-- Purchase Modal -->
{#if $showModal}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      {#if $selectedItem}
        <div class="flex flex-col items-center gap-4">
          <span class="text-8xl">{$selectedItem.item.emoji}</span>
          <h3 class="text-2xl font-bold">{$selectedItem.item.name}</h3>
          <p class="text-lg">Price: {$selectedItem.item.price} coins</p>
          <p class="text-md">
            Owned: {getOwnedQuantity($selectedItem.item.id, $selectedItem.type)}
            / {MAX_ITEM_OWNERSHIP}
          </p>
          <div class="flex gap-4 mt-4">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              on:click={purchaseItem}
              disabled={$coins < $selectedItem.item.price || getOwnedQuantity($selectedItem.item.id, $selectedItem.type) >= MAX_ITEM_OWNERSHIP}
            >
              Purchase
            </button>
            <button
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              on:click={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}