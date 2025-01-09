<script>
  import "../../app.css";
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  const gardenStateStore = writable(1);
  let tasks = [];
  let randomTasks = [];
  let completedTasks = [];
  const TASK_REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  let username = localStorage.getItem("username");
function randomizeGardenHealth() {
  gardenStateStore.set(Math.floor(Math.random() * 3) + 1);
}
function getGardenDetails(state) {
  switch (state) {
    case 1:
      return {
        topMessage: "Carbon Chaos: Our Garden's Climate Kickback Zone! 🌡️🚨",
        description: "High CO2 Footprint",
        bgColor: "bg-red-100",
        borderColor: "border-red-300",
        textColor: "text-red-600",
        status: "Bad State - High Carbon Emissions",
        emoji: "🚨",
        image: "/level1.jpg",
      };
    case 2:
      return {
        topMessage: "Green Balance: Cultivating Our Carbon Compromise 🌿⚖️",
        description: "Moderate CO2 Footprint",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-300",
        textColor: "text-yellow-600",
        status: "Neutral State - Balanced Carbon",
        emoji: "⚖️",
        image: "/level2.jpg",
      };
    case 3:
      return {
        topMessage: "Eco-Champions: Our Garden's Climate Kudos Corner! 🏆🌱",
        description: "Low CO2 Footprint",
        bgColor: "bg-green-100",
        borderColor: "border-green-300",
        textColor: "text-green-600",
        status: "Good State - Low Carbon Emissions",
        emoji: "🏆",
        image: "/level3.jpg",
      };
    default:
      return {
        topMessage: "Garden state is unclear...",
        description: "Unknown Garden State",
        bgColor: "bg-gray-100",
        borderColor: "border-gray-300",
        textColor: "text-gray-600",
        status: "Garden state unclear",
        emoji: "❓",
        image: "",
      };
  }
}
$: gardenDetails = getGardenDetails($gardenStateStore);
async function fetchAllTasks() {
  try {
    const response = await fetch(`http://localhost:3011/api/tasks`);
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
  // Remove the task from `randomTasks`
  randomTasks = randomTasks.filter((t) => t.text !== task.text);
  // Add the task to `completedTasks`
  completedTasks.push(task.text);
  // Update `localStorage` for immediate UI sync
  const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
  savedCompletedTasks[username] = completedTasks;
  localStorage.setItem("completedTasks", JSON.stringify(savedCompletedTasks));
  // Send the completed task to the backend
  try {
    const response = await fetch("http://localhost:3010/auth/completed-tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username, // Make sure this is defined
        task: task.text, // Ensure task.text exists
        action: "complete", 
      }),
    });
    if (!response.ok) {
      console.error("Failed to update completed tasks in the backend");
    }
  } catch (err) {
    console.error("Error updating completed tasks in backend:", err);
  }
  // Update `localStorage` with updated tasks
  localStorage.setItem(
    "dailyTasks",
    JSON.stringify({ timestamp: Date.now(), tasks: randomTasks })
  );
}

async function refreshTask(task) {
    try {
      const response = await fetch(
        `http://localhost:3011/api/tasks/alternative/${task.category}?currentTask=${encodeURIComponent(task.text)}`
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

onMount(() => {
  fetchAllTasks();
  const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
  completedTasks = savedCompletedTasks[username] || [];
});
</script>

<!-- Garden section -->
<section class={`flex flex-col sm:flex-row justify-center items-center ${gardenDetails.bgColor} py-8 rounded-md shadow-md mx-4 sm:mx-0 border-2 ${gardenDetails.borderColor} relative`}>
<div class="absolute inset-0 overflow-hidden">
  <img 
    src={gardenDetails.image} 
    alt="Garden State Representation" 
    class="w-full h-full object-cover opacity-20"
  />
</div>
<div class="flex flex-col items-center text-center z-10 relative">
  <h2 class={`text-xl font-bold mb-4 ${gardenDetails.textColor}`}>
    {gardenDetails.topMessage}
  </h2>
  <div class="mb-4">
    <p class={`${gardenDetails.textColor}`}>{gardenDetails.status}</p>
  </div>
  <div class="w-48 h-48 mb-4 rounded-lg border-2 flex items-center justify-center ${gardenDetails.borderColor} relative">
    <div class={`text-6xl ${gardenDetails.textColor} z-10 relative`}>
      {gardenDetails.emoji}
    </div>
  </div>
  <button 
    on:click={randomizeGardenHealth} 
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-10 relative"
  >
    Randomize Garden CO2 Footprint
  </button>
</div>
</section>

<!-- Tasks Section -->
<section class="text-left px-6 py-4 bg-green-100 rounded-md shadow-md mx-4 sm:mx-auto max-w-3xl">
<h2 class="text-xl font-bold mb-4 text-green-800">Today's Tasks</h2>
{#if randomTasks.length === 0}
  <p class="text-green-800 font-bold">All tasks completed. Check in tomorrow for new ones!</p>
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