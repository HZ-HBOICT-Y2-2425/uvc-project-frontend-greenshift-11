<script lang="ts">
  import { writable, derived } from "svelte/store";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import "../../app.css";
  import { notifications } from "../../lib/stores/notificationStore.js";
  export { userCoins };

  let isMusicPlaying = true;
  let musicVolume = 100;
  let tasks = [];
  let coins;
  let randomTasks = [];
  let completedTasks = [];
  const TASK_REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  let username = localStorage.getItem("username");
  let allTasksCompleted = false;
  let showTaskPopup = false;
  let taskPopupMessage = "";
  let showTutorial = false; // Controls tutorial visibility
  let currentStep = 0;
  let showHelpText = false;
  let helpText = "Need help? Click here to view the tutorial.";
  let tutorialText = [
    "Welcome to GreenShift! 🌿",
    "This is your home page where you can perform tasks to maintain your garden's health and streak! 👀",
    "You can only have a limited number of items based on your garden health.",
    "On completion of each task, click the checkbox to earn points, which you can use to buy items to customize your garden.",
    "Refresh tasks if you don't like them.",
    "Enjoy your time in the garden! 🌻",
    "Don't forget to explore the other features of the app 🌚 by clicking on the items on the footer 😉."
  ];

     
  const BASE_URL = "https://uvc-project-backend-greenshift-11.onrender.com/auth";
  const GARDEN_IMAGE = "/images/garden/level1.jpg";

  type ItemType = "animal" | "plant";
  type Item = {
    id: number;
    name: string;
    emoji: string;
    price: number;
    description: string;
  };

  type OwnedItem = {
    itemId: number;
    type: ItemType;
    quantity: number;
    name: string;
    emoji: string;
  };

  type DisplayedItem = {
    id: number;
    type: ItemType;
    name: string;
    emoji: string;
    position: {
      left: string;
      top: string;
      rotation: string;
      direction: number;
      speed: number;
      distance?: number;
      angle?: number;
      startX?: number;
      movementType?: "walk" | "bounce" | "circle";
    };
  };

  const gardenStatePercentage = writable(100);
  const gardenState = derived(gardenStatePercentage, ($percentage) => {
    if ($percentage <= 33) return 1;
    if ($percentage <= 66) return 2;
    return 3;
  });

  const inventory = writable<OwnedItem[]>([]);
  const displayedItems = writable<DisplayedItem[]>([]);
  const allItems = writable<{ plants: Item[]; animals: Item[] }>({
    plants: [],
    animals: [],
  });
  const showInventoryModal = writable(false);

  const animals = writable<Item[]>([]);
  const plants = writable<Item[]>([]);

  function getRandomMovementType(): "walk" | "bounce" | "circle" {
    const types = ["walk", "bounce", "circle"];
    return types[Math.floor(Math.random() * types.length)] as
      | "walk"
      | "bounce"
      | "circle";
  }

  function generatePosition(type: ItemType): DisplayedItem["position"] {
    if (type === "animal") {
      // Animals spawn between 25% and 50% from top
      const top = `${25 + Math.random() * 25}%`; // Between 25% and 50% from top
      const left = `${15 + Math.random() * 70}%`; // Between 15% and 85% from left
      const rotation = `${-15 + Math.random() * 30}deg`;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const speed = 0.3 + Math.random() * 0.7;
      const startX = parseFloat(left);

      // Calculate safe movement distances
      const distance = 100 + Math.random() * 150; // More controlled movement range
      const angle = Math.random() * 360;
      const movementType = getRandomMovementType();

      return {
        top,
        left,
        rotation,
        direction,
        speed,
        angle,
        distance,
        startX,
        movementType,
      };
    } else {
      // Plants spawn in middle-bottom area
      const top = `${35 + Math.random() * 25}%`; // Between 35% and 60% from top
      const left = `${10 + Math.random() * 80}%`;
      const rotation = `${-15 + Math.random() * 30}deg`;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const speed = 0.8 + Math.random() * 0.4;

      return { top, left, rotation, direction, speed };
    }
  }
  // Rest of the store and utility functions remain the same
  function getOwnedQuantity(itemId: number, type: ItemType): number {
    const item = $inventory.find((i) => i.itemId === itemId && i.type === type);
    return item?.quantity || 0;
  }

  async function fetchInventoryAndItems() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("authToken");

    if (!username || !token) {
      console.error("User not logged in");
      return;
    }

    try {
      const [itemsRes, inventoryRes] = await Promise.all([
        fetch(`${BASE_URL}/items`),
        fetch(`${BASE_URL}/inventory/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!itemsRes.ok || !inventoryRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const itemsData = await itemsRes.json();
      const inventoryData = await inventoryRes.json();

      allItems.set({
        plants: itemsData.plants || [],
        animals: itemsData.animals || [],
      });

      const enhancedInventory = inventoryData.inventory.map((item) => {
        const itemsList =
          item.type === "animal" ? itemsData.animals : itemsData.plants;
        const itemDetails = itemsList.find((i) => i.id === item.itemId);

        return {
          ...item,
          name: itemDetails.name,
          emoji: itemDetails.emoji,
        };
      });

      inventory.set(enhancedInventory);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function setGardenState(percentage: number) {
  if ($gardenStatePercentage === percentage) {
    notifications.add(
      "Garden is already in this state!",
      "info"
    );
    return;
  }

  gardenStatePercentage.set(percentage);

  if (percentage <= 33) {
    displayedItems.set([]);
    notifications.add(
      "Garden health set to 'Bad'. All garden items removed.",
      "warning"
    );
  } else if (percentage <= 66) {
    notifications.add(
      "Garden health set to 'Average'. You can now add up to 3 plants and animals.",
      "info"
    );
  } else {
    notifications.add(
      "Garden health set to 'Great'. Your garden is thriving!",
      "success"
    );
  }
}

  function getGardenDetails(state: number) {
    const baseDetails = {
      1: {
        maxItems: { plants: 0, animals: 0 }, // Level 1: No items allowed
        filter: "grayscale(100%)",
      },
      2: {
        maxItems: { plants: 3, animals: 3 }, // Level 2: 3 plants, 3 animals
        filter: "saturate(50%)",
      },
      3: {
        maxItems: { plants: 6, animals: 6 }, // Level 3: 6 plants, 6 animals
        filter: "saturate(100%)",
      },
    };

    return baseDetails[state];
  }

  function addItemToGarden(item: OwnedItem) {
    const details = getGardenDetails($gardenState);
    const currentTypeCount = $displayedItems.filter(
      (i) => i.type === item.type
    ).length;
    const maxItemsForType = details.maxItems[item.type];

    if (currentTypeCount >= maxItemsForType) {
      alert(
        `You can only have ${maxItemsForType} ${item.type}s in this garden state.`
      );
      return;
    }

    const newDisplayItem: DisplayedItem = {
      id: item.itemId,
      type: item.type,
      name: item.name,
      emoji: item.emoji,
      position: generatePosition(item.type),
    };

    displayedItems.update((items) => [...items, newDisplayItem]);

    inventory.update((inv) =>
      inv.map((i) =>
        i.itemId === item.itemId && i.type === item.type
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  }

  function removeItemFromGarden(index: number) {
    const removedItem = $displayedItems[index];

    displayedItems.update((items) => items.filter((_, i) => i !== index));

    inventory.update((inv) =>
      inv.map((i) =>
        i.itemId === removedItem.id && i.type === removedItem.type
          ? { ...i, quantity: (i.quantity || 0) + 1 }
          : i
      )
    );
  }

  onMount(() => {
    fetchUserData();
    fetchInventoryAndItems();
    setTimeout(() => {
       notifications.add("Welcome to your GreenShift Garden! 🌿", 'success');
     }, 2000);
 
     // Additional test notifications with different types
     setTimeout(() => {
       notifications.add("Don't forget to water your plants today! 💧", 'info');
     }, 4000);
 
     setTimeout(() => {
       notifications.add("New eco-friendly products available in the shop! 🛍", 'info');
     }, 6000);

     fetchAllTasks();
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
    completedTasks = savedCompletedTasks[username] || [];

    const tutorialSeen = localStorage.getItem("tutorialSeen");
    if (!tutorialSeen) {
      showTutorial = true; // Show tutorial if it's the user's first visit
    }

   });

    function nextTutorialStep() {
    if (currentStep < tutorialText.length - 1) {
      currentStep++;
    }
  }

  // Dismiss the tutorial and mark it as seen
  function dismissTutorial() {
    showTutorial = false;
    localStorage.setItem("tutorialSeen", "true"); // Save flag in local storage
  }

  function toggleHelpText() {
    showHelpText = !showHelpText;
    helpText = showHelpText ? "Hide help text" : "Need help? Click here to view the tutorial.";
  }

   // Store for tasks
  const tasksStore = writable([]);

// Function to fetch tasks from backend
async function fetchAllTasks() {
  try {
    const response = await fetch("https://uvc-project-backend-greenshift-11-task.onrender.com/api/tasks");
    if (response.ok) {
      const data = await response.json();
      tasks = data.tasks;
      handleDailyTasks();
    } else {
      console.error("Failed to fetch tasks:", response.status);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

async function refreshTask(task) {
    try {
      const response = await fetch(
        `https://uvc-project-backend-greenshift-11-task.onrender.com/api/tasks/alternative/${task.category}?currentTask=${encodeURIComponent(task.text)}`
      );
      if (response.ok) {
        const data = await response.json();
        const newTask = data.task;
        
        // Remove the old task from completedTasks if it was completed
        completedTasks = completedTasks.filter(t => t.text !== task.text);
        // Replace the refreshed task in randomTasks
        const taskIndex = randomTasks.findIndex((t) => t.text === task.text);
        if (taskIndex !== -1) {
          randomTasks[taskIndex] = newTask;
          randomTasks = [...randomTasks]; // Trigger Svelte reactivity
          // Update localStorage with the new task list
          localStorage.setItem(
            "dailyTasks",
            JSON.stringify({ timestamp: Date.now(), tasks: randomTasks })
          );
        }
      } else {
        console.error("Failed to refresh task:", response.status);
      }
    } catch (error) {
      console.error("Error refreshing task:", error);
    }
  }


  function isTaskCompleted(task) {
    return completedTasks.includes(task.text);
  }

  function handleDailyTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("dailyTasks")) || {};
    const now = Date.now();

    if (!storedTasks.timestamp || now - storedTasks.timestamp > TASK_REFRESH_INTERVAL) {
      selectRandomTasks();
      localStorage.setItem(
        "dailyTasks",
        JSON.stringify({ timestamp: now, tasks: randomTasks })
      );
    } else {
      randomTasks = storedTasks.tasks || [];
    }
  }

  function selectRandomTasks() {
    const shuffled = [...tasks].sort(() => 0.5 - Math.random());
    randomTasks = shuffled.slice(0, 3);
  }

  async function markTaskAsCompleted(task) {
    // Remove the task from randomTasks
    randomTasks = randomTasks.filter((t) => t.text !== task.text);

    // Add the task to completedTasks
    completedTasks.push(task.text);

    await updateUserCoins(); // Update user coins when a task is completed

      // Show the popup
    taskPopupMessage = "Congratulations! You earned 10 coins 🥳 Perform more tasks to earn more points";
    showTaskPopup = true;
    setTimeout(() => {
       showTaskPopup = false;
    }, 3000); // Hide the popup after 3 second

    // Update localStorage for immediate UI sync
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
    savedCompletedTasks[username] = completedTasks;
    localStorage.setItem("completedTasks", JSON.stringify(savedCompletedTasks));

    // Send the completed task to the backend
    try {
      const response = await fetch("https://uvc-project-backend-greenshift-11.onrender.com/auth/completed-tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: username,
          task: task.text, // Send only the task text
          action: "complete",
        }),
      });

      if (!response.ok) {
        console.error("Failed to update completed tasks in the backend");
      }
    } catch (err) {
      console.error("Error updating completed tasks in backend:", err);
    }

    // Update localStorage with updated tasks
    localStorage.setItem(
      "dailyTasks",
      JSON.stringify({ timestamp: Date.now(), tasks: randomTasks })
    );
  }

  $: gardenDetails = getGardenDetails($gardenState);
  $: allTasksCompleted = randomTasks.every((task) => isTaskCompleted(task));

  function randomizeTasks() {
    console.log("Randomizing tasks..."); // Replace with your logic
  }

  let userCoins = writable(0);
  
  const fetchUserData = async () => {
  try {
    const username = localStorage.getItem("username");
    const response = await fetch(`https://uvc-project-backend-greenshift-11.onrender.com/auth/users/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    
    if (response.ok) {
      const userData = await response.json();
      // Update the store with the new value
      userCoins.set(userData.user.currency);
      console.log("Updated userCoins:", userData.user.currency);
    } else {
      console.error("Failed to fetch user data:", await response.text());
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

//function to update user coins in backend when user completes a task
async function updateUserCoins() {
  try {
    const username = localStorage.getItem("username");

    // Debugging logs
    console.log("Updating coins for user:", username);

    if (!username) {
      console.error("Username is missing in localStorage.");
      return;
    }

    const response = await fetch(`https://uvc-project-backend-greenshift-11.onrender.com/auth/${username}/update-coins`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ user: username }), // Send only the user
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User coins updated successfully:", data.coins);
      userCoins.set(data.coins); // Update the Svelte store with the new value
    } else {
      console.error("Failed to update user coins:", await response.text());
    }
  } catch (error) {
    console.error("Error updating user coins:", error);
  }
}

userCoins.subscribe(value => {
  coins = value;
  console.log("Store value updated:", value);
});


</script>

<div class="w-full p-4">
  <div class="relative min-h-[50vh] rounded-xl overflow-hidden">
    <div class="absolute inset-0">
      <img
        src={GARDEN_IMAGE}
        alt="Garden background"
        class="w-full h-full object-cover object-bottom transition-all duration-500"
        style="filter: {gardenDetails.filter}"
      />
      <div
        class="absolute inset-0 border-8 rounded-xl transition-colors duration-300"
        class:border-red-500={$gardenState === 1}
        class:border-orange-500={$gardenState === 2}
        class:border-green-500={$gardenState === 3}
      ></div>
    </div>

    <div class="absolute top-4 left-4 w-64 z-20">
      <div class="bg-white/90 p-2 rounded-lg shadow-lg mb-2">
        <div class="flex items-center justify-between mb-1">
          <span class="text-sm font-medium">Garden Health</span>
          <span class="text-sm font-medium">{$gardenStatePercentage}%</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 transition-all duration-500"
            style="width: {$gardenStatePercentage}%"
          ></div>
        </div>
      </div>

      <div class="bg-white/90 p-2 rounded-lg shadow-lg">
        <div class="flex gap-2 justify-between">
          <button
          class="flex-1 px-2 py-1 text-sm font-medium rounded transition-colors"
          class:bg-red-500={$gardenState === 1}
          class:bg-gray-200={$gardenState !== 1}
          class:text-white={$gardenState === 1}
          class:text-gray-700={$gardenState !== 1}
          on:click={() => setGardenState(33)}
        >
          Bad
        </button>
        <button
          class="flex-1 px-2 py-1 text-sm font-medium rounded transition-colors"
          class:bg-yellow-500={$gardenState === 2}
          class:bg-gray-200={$gardenState !== 2}
          class:text-white={$gardenState === 2}
          class:text-gray-700={$gardenState !== 2}
          on:click={() => setGardenState(66)}
        >
          Average
        </button>
        <button
          class="flex-1 px-2 py-1 text-sm font-medium rounded transition-colors"
          class:bg-green-500={$gardenState === 3}
          class:bg-gray-200={$gardenState !== 3}
          class:text-white={$gardenState === 3}
          class:text-gray-700={$gardenState !== 3}
          on:click={() => setGardenState(100)}
        >
          Great
        </button>
        </div>
      </div>
    </div>

    {#if $gardenState > 1}
      <div class="absolute inset-0">
        {#each $displayedItems as item, index}
          <div
            role="button"
            tabindex="0"
            class="absolute cursor-pointer transition-transform"
            class:animal-walk={item.type === "animal" &&
              item.position.movementType === "walk"}
            class:animal-bounce={item.type === "animal" &&
              item.position.movementType === "bounce"}
            class:animal-circle={item.type === "animal" &&
              item.position.movementType === "circle"}
            class:plant-sway={item.type === "plant"}
            style="
              left: {item.position.left};
              top: {item.position.top};
              transform-origin: bottom;
              --rotation: {item.position.rotation};
              --direction: {item.position.direction};
              --speed: {item.position.speed};
              --distance: {item.position.distance || 0}px;
              --angle: {item.position.angle || 0}deg;
              --startX: {item.position.startX || 0};
              font-size: {item.type === 'animal' ? '5rem' : '4rem'};
            "
            on:click={() => removeItemFromGarden(index)}
          >
            {item.emoji}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="mt-4 flex justify-center">
    <button
      class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
      on:click={() => showInventoryModal.set(true)}
    >
      Manage Garden Items
    </button>
  </div>
</div>

<!-- Tasks Section -->
<section class="text-left px-6 py-4 bg-green-100 rounded-md shadow-md mx-4 sm:mx-auto max-w-3xl">
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-bold mb-4 text-green-800 flex items-center">
      Today's Tasks
      <button
        class="ml-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all p-1 w-6 h-6 flex items-center justify-center"
        on:mouseenter={() => (showHelpText = true)}
        on:mouseleave={() => (showHelpText = false)}
        on:click={() => (showTutorial = true)}
        aria-label="Help"
      >
        ❓
      </button>
    </h2>
    {#if showHelpText}
      <div class="absolute mt-[-4rem] bg-gray-800 text-white text-sm rounded-lg shadow-lg p-2">
        Need help? Click here to view the tutorial.
      </div>
    {/if}
  </div>
  {#if randomTasks.length === 0}
    <p class="text-green-800 font-bold">
      All tasks completed. Check in tomorrow for new ones!
    </p>
  {:else}
    <ul class="space-y-4">
      {#each randomTasks as task}
        <li class="flex items-start space-x-3">
          <input
            type="checkbox"
            class="h-5 w-5 mt-1 text-green-600"
            on:change={() => markTaskAsCompleted(task)}
          />
          <div>
            <p class="font-bold text-gray-800">{task.text}</p>
            {#if task.isRefreshable}
              <button
                on:click={() => refreshTask(task)}
                class="ml-2 text-blue-500 hover:underline"
              >
                Refresh
              </button>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

{#if $showInventoryModal}
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    on:click={() => showInventoryModal.set(false)}
  >
    <div
      class="bg-white w-[90%] max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-green-100"
      on:click|stopPropagation
    >
      <div
        class="bg-gradient-to-r from-green-500 to-green-600 p-6 flex items-center justify-between"
      >
        <div>
          <h2 class="text-2xl font-bold text-white mb-1">
            Your Garden Inventory
          </h2>
          <p class="text-green-100 text-sm">
            Click any item to add it to your garden
          </p>
        </div>
        <button
          class="text-white hover:bg-white/10 rounded-lg p-2.5 transition-colors"
          on:click={() => showInventoryModal.set(false)}
        >
          <span class="text-2xl">×</span>
        </button>
      </div>

      <div
        class="grid grid-cols-2 h-[calc(80vh-8.5rem)] divide-x divide-green-100"
      >
        <div class="p-6 overflow-y-auto">
          <h3
            class="text-xl font-semibold mb-4 flex items-center text-gray-800 sticky top-0 bg-white"
          >
            <span class="text-3xl mr-3">🐾</span>
            Animals
          </h3>
          <div class="grid grid-cols-2 gap-4">
            {#each $inventory.filter((item) => item.type === "animal") as item}
              {#if item.quantity > 0}
                <button
                  class="aspect-square p-4 bg-white border border-green-100 rounded-2xl hover:border-green-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex flex-col items-center justify-center group"
                  on:click={() => {
                    addItemToGarden(item);
                    showInventoryModal.set(false);
                  }}
                >
                  <div
                    class="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200"
                  >
                    {item.emoji}
                  </div>
                  <div class="font-medium text-gray-800 text-center">
                    {item.name}
                  </div>
                  <div
                    class="text-sm text-gray-500 mt-1 px-3 py.5 bg-gray-50 rounded-full"
                  >
                    {item.quantity} available
                  </div>
                </button>
              {/if}
            {/each}
          </div>
        </div>

        <div class="p-6 overflow-y-auto">
          <h3
            class="text-xl font-semibold mb-4 flex items-center text-gray-800 sticky top-0 bg-white"
          >
            <span class="text-3xl mr-3">🌱</span>
            Plants
          </h3>
          <div class="grid grid-cols-2 gap-4">
            {#each $inventory.filter((item) => item.type === "plant") as item}
              {#if item.quantity > 0}
                <button
                  class="aspect-square p-4 bg-white border border-green-100 rounded-2xl hover:border-green-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex flex-col items-center justify-center group"
                  on:click={() => {
                    addItemToGarden(item);
                    showInventoryModal.set(false);
                  }}
                >
                  <div
                    class="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200"
                  >
                    {item.emoji}
                  </div>
                  <div class="font-medium text-gray-800 text-center">
                    {item.name}
                  </div>
                  <div
                    class="text-sm text-gray-500 mt-1 px-3 py-0.5 bg-gray-50 rounded-full"
                  >
                    {item.quantity} available
                  </div>
                </button>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if showTaskPopup}
  <div class="fixed inset-0 flex items-center justify-center modal-bg" in:fade>
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
      <div class="text-green-600 font-semibold text-lg">
        {taskPopupMessage}
      </div>
    </div>
  </div>
{/if}

<div class="relative">

  <!-- Tutorial Popup -->
  {#if showTutorial}
    <div
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      in:fade
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <p class="text-gray-800 text-lg mb-4">{tutorialText[currentStep]}</p>
        <div class="mt-4">
          <!-- Show "Next" button for all steps except the last -->
          {#if currentStep < tutorialText.length - 1}
            <button
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              on:click={nextTutorialStep}
            >
              Next
            </button>
          {/if}

          <!-- Show "Got it!" button on the last step -->
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
</div>

<style>
  .animal-walk {
    animation: walk calc(20s / var(--speed)) linear infinite;
  }

  .animal-bounce {
    animation: bounce calc(15s / var(--speed)) ease-in-out infinite;
  }

  .animal-circle {
    animation: circle calc(25s / var(--speed)) linear infinite;
  }

  .plant-sway {
    animation: sway calc(4s / var(--speed)) ease-in-out infinite;
  }

  @keyframes walk {
    0% {
      transform: translateX(0) rotate(var(--rotation))
        scale(var(--direction), 1);
    }
    45% {
      transform: translateX(150px) rotate(var(--rotation))
        scale(var(--direction), 1);
    }
    50% {
      transform: translateX(150px) rotate(var(--rotation))
        scale(calc(var(--direction) * -1), 1);
    }
    95% {
      transform: translateX(0) rotate(var(--rotation))
        scale(calc(var(--direction) * -1), 1);
    }
    100% {
      transform: translateX(0) rotate(var(--rotation))
        scale(var(--direction), 1);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0) rotate(var(--rotation))
        scale(var(--direction), 1);
    }
    50% {
      transform: translateY(-20px) rotate(var(--rotation))
        scale(var(--direction), 1);
    }
  }

  @keyframes circle {
    from {
      transform: rotate(0deg) translateX(80px) rotate(0deg)
        scale(var(--direction), 1);
    }
    to {
      transform: rotate(360deg) translateX(80px) rotate(-360deg)
        scale(var(--direction), 1);
    }
  }

  @keyframes sway {
    0% {
      transform: rotate(calc(var(--rotation) + 0deg));
    }
    50% {
      transform: rotate(calc(var(--rotation) + 12deg));
    }
    100% {
      transform: rotate(calc(var(--rotation) + 0deg));
    }
  }
</style>
