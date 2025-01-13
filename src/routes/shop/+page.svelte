<script lang="ts">
  import { writable, derived } from "svelte/store";
  import { onMount } from "svelte";
 
  const BASE_URL = "https://uvc-project-backend-greenshift-11.onrender.com/auth";
 
  type ItemType = "animal" | "plant";
  type Item = {
    id: number;
    name: string;
    emoji: string;
    price: number;
  };
 
  type OwnedItem = {
    itemId: number;
    type: ItemType;
    quantity: number;
  };
 
  const MAX_ITEM_OWNERSHIP = 5;
 
  // Stores
  const coins = writable(0);
  const inventory = writable<OwnedItem[]>([]);
  const animals = writable<Item[]>([]);
  const plants = writable<Item[]>([]);
  const selectedItem = writable<{ item: Item; type: ItemType } | null>(null);
  const showModal = derived(selectedItem, ($selectedItem) => $selectedItem !== null);
  let showTutorial = false; // Controls tutorial visibility
  let currentStep = 0;
  let showHelpText = false;
  let helpText = "Need help? Click here to view the tutorial.";
  let tutorialText = [
    "Welcome to the shop! 🛒",
    "Here you can purchase items using your coins 🪙.",
    "Animals and plants can be bought to decorate your garden 🌱.",
    "Click on an item to see more details and purchase options.",
    "Make sure to manage your coins wisely 💰!",
    "and have fun shopping! 🎉"
  ];

 
  async function fetchItems() {
    try {
      const response = await fetch(`${BASE_URL}/items`);
      const data = await response.json();
      animals.set(data.animals);
      plants.set(data.plants);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }
 
  async function fetchUserData() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("authToken");
 
    if (!username || !token) {
      console.error("User not logged in");
      return;
    }
 
    try {
      const [currencyRes, inventoryRes] = await Promise.all([
        fetch(`${BASE_URL}/currency/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/inventory/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
 
      const currencyData = await currencyRes.json();
      const inventoryData = await inventoryRes.json();
 
      coins.set(currencyData.currency);
      inventory.set(inventoryData.inventory);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
 
  async function handlePurchase(item: Item, type: ItemType) {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("authToken");
 
    if (!username || !token) {
      alert("Please log in to make purchases");
      return;
    }
 
    try {
      const response = await fetch(`${BASE_URL}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: username,
          itemId: item.id,
          type,
          price: item.price,
        }),
      });
 
      const data = await response.json();
      
      if (response.ok) {
        coins.set(data.newBalance);
        inventory.set(data.inventory);
        closeModal();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error making purchase:", error);
      alert("Failed to complete purchase");
    }
  }
 
  function getOwnedQuantity(itemId: number, type: ItemType): number {
    const item = $inventory.find((i) => i.itemId === itemId && i.type === type);
    return item?.quantity || 0;
  }
 
  function handleItemClick(item: Item, type: ItemType) {
    selectedItem.set({ item, type });
  }
 
  function closeModal() {
    selectedItem.set(null);
  }

  function nextTutorialStep() {
    if (currentStep < tutorialText.length - 1) {
      currentStep++;
    }
  }

  function dismissTutorial() {
    showTutorial = false;
    localStorage.setItem("shopTutorialSeen", "true");
  }

  function toggleHelpText() {
    showHelpText = !showHelpText;
    helpText = showHelpText ? "Hide help text" : "Need help? Click here to view the tutorial.";
  }

 
  onMount(async () => {
    await Promise.all([fetchUserData(), fetchItems()]);

    const tutorialSeen = localStorage.getItem("shopTutorialSeen");
    if (!tutorialSeen) {
      showTutorial = true; // Show tutorial if it's the user's first visit
    }
  });
 </script>
 
 <!-- Template remains the same but use $animals and $plants instead of the const arrays -->
 <div class="flex flex-1 px-6 py-8 gap-8 h-full">
  <div class="flex-1 flex flex-col border rounded-md">
    <div class="bg-green-500 text-center py-3 rounded-t-md">
      <h2 class="text-2xl font-bold text-white">Animals</h2>
    </div>
    <div class="scrollable grid grid-cols-2 gap-4">
      {#each $animals as animal}
        <button
          class="flex flex-col items-center p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
          on:click={() => handleItemClick(animal, "animal")}
        >
          <span class="text-6xl">{animal.emoji}</span>
          <p class="mt-2 text-lg font-semibold">{animal.name}</p>
          <p class="text-sm">{animal.price} coins</p>
          {#if getOwnedQuantity(animal.id, "animal") > 0}
            <p class="text-sm text-green-600">
              Owned: {getOwnedQuantity(animal.id, "animal")}
            </p>
          {/if}
        </button>
      {/each}
    </div>
  </div>
 
  <!-- Plants section similar but with $plants -->
  <div class="flex-1 flex flex-col border rounded-md">
    <div class="bg-green-500 text-center py-3 rounded-t-md">
      <h2 class="text-2xl font-bold text-white">Plants</h2>
    </div>
    <div class="scrollable grid grid-cols-2 gap-4">
      {#each $plants as plant}
        <button
          class="flex flex-col items-center p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
          on:click={() => handleItemClick(plant, "plant")}
        >
          <span class="text-6xl">{plant.emoji}</span>
          <p class="mt-2 text-lg font-semibold">{plant.name}</p>
          <p class="text-sm">{plant.price} coins</p>
          {#if getOwnedQuantity(plant.id, "plant") > 0}
            <p class="text-sm text-green-600">
              Owned: {getOwnedQuantity(plant.id, "plant")}
            </p>
          {/if}
        </button>
      {/each}
    </div>
  </div>
 
  <div class="w-1/4 currency-container border rounded-md">
    <p class="text-6xl font-bold">{$coins}</p>
    <img src="https://emojicdn.elk.sh/💰" alt="Money Icon" class="w-16 h-16" />
    <button
      class="ml-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all p-1 w-6 h-6 flex items-center justify-center relative"
      on:mouseenter={() => (showHelpText = true)}
      on:mouseleave={() => (showHelpText = false)}
      on:click={() => (showTutorial = true)}
      aria-label="Help"
    >
      ❓
    </button>
    {#if showHelpText}
    <div class="absolute mt-[-2rem] ml-[2rem] bg-gray-800 text-white text-sm rounded-lg shadow-lg p-2 z-50">
      Need help? Click here to view the tutorial.
    </div>
  {/if}
  </div>
 </div>
 
 <!-- Modal code remains the same -->
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
              on:click={() => handlePurchase($selectedItem.item, $selectedItem.type)}
              disabled={$coins < $selectedItem.item.price || 
                getOwnedQuantity($selectedItem.item.id, $selectedItem.type) >= MAX_ITEM_OWNERSHIP}
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

 <!-- Tutorial Popup -->
{#if showTutorial}
<div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
    <p class="text-gray-800 text-lg mb-4">{tutorialText[currentStep]}</p>
    <div class="mt-4">
      {#if currentStep < tutorialText.length - 1}
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
          on:click={nextTutorialStep}
        >
          Next
        </button>
      {/if}

      {#if currentStep === tutorialText.length - 1}
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          on:click={dismissTutorial}
        >
          Got it!
        </button>
      {/if}
    </div>
  </div>
</div>
{/if}

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