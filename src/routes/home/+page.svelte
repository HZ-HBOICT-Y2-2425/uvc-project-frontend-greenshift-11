<script>
  import "../../app.css";
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  const gardenStateStore = writable(1);
  let tasks = [];
  let randomTasks = [];
  let categories = [];
  let completedTasks = []; // Tracks completed tasks
  const TASK_REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Initialize completedTasks from localStorage
  function loadCompletedTasks() {
    const storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks = storedCompletedTasks;
  }

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

  onMount(() => {
    randomizeGardenHealth();
    loadCompletedTasks(); // Load completed tasks from localStorage
  });

  function getCategories() {
    const savedCategories = localStorage.getItem("taskCategories");
    return savedCategories ? JSON.parse(savedCategories) : ["general_users"];
  }

  async function fetchTasks() {
    categories = getCategories();

    console.log("Categories to fetch tasks for:", categories);

    let allTasks = [];
    for (const category of categories) {
      try {
        const response = await fetch(`http://localhost:3011/api/tasks/${category}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`Tasks for category ${category}:`, data.tasks);
          allTasks = allTasks.concat(data.tasks);
        } else {
          console.error(`Failed to fetch tasks for category ${category}`);
        }
      } catch (error) {
        console.error(`Error fetching tasks for category ${category}:`, error);
      }
    }

    tasks = allTasks;
    console.log("All tasks the user has access to:", tasks);

    handleDailyTasks();
  }

  function handleDailyTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("dailyTasks")) || {};
    const now = Date.now();

    if (!storedTasks.timestamp || now - storedTasks.timestamp > TASK_REFRESH_INTERVAL) {
      // Refresh tasks if no stored tasks or the interval has passed
      selectRandomTasks();
      localStorage.setItem(
        "dailyTasks",
        JSON.stringify({ timestamp: now, tasks: randomTasks })
      );
      console.log("New tasks selected:", randomTasks);
    } else {
      // Use stored tasks
      randomTasks = storedTasks.tasks || [];
      console.log("Using stored tasks:", randomTasks);
    }
  }

  function selectRandomTasks() {
    const shuffled = [...tasks].sort(() => 0.5 - Math.random());
    randomTasks = shuffled.slice(0, 3);
  }

  function markTaskAsCompleted(task) {
    // Add the marked task to the completed tasks list if not already added
    if (!completedTasks.includes(task)) {
      completedTasks.push(task);

      // Save completedTasks to localStorage
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
      console.log("Task marked as completed:", task);
    }
  }

  // Check if a task is completed
  function isTaskCompleted(task) {
    return completedTasks.includes(task);
  }

  onMount(fetchTasks);
</script>

<!-- Garden section -->
<section class={`flex flex-col sm:flex-row justify-center items-center ${gardenDetails.bgColor} py-8 rounded-md shadow-md mx-4 sm:mx-0 border-2 ${gardenDetails.borderColor} relative`}>
  <!-- Faded Background Image -->
  <div class="absolute inset-0 overflow-hidden">
    <img 
      src={gardenDetails.image} 
      alt="Garden State Representation" 
      class="w-full h-full object-cover opacity-20"
    />
  </div>

  <!-- Content Container -->
  <div class="flex flex-col items-center text-center z-10 relative">
    <h2 class={`text-xl font-bold mb-4 ${gardenDetails.textColor}`}>
      {gardenDetails.topMessage}
    </h2>
    
    <div class="mb-4">
      <p class={`${gardenDetails.textColor}`}>{gardenDetails.status}</p>
    </div>

    <!-- Garden Visual Representation -->
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

<!-- Daily Tasks Section -->
<section class="text-center px-4 py-6">
  <p class="text-lg font-medium">Do your Daily tasks.</p>
  <p class="text-greenDeep font-bold">to keep your garden nice! 👀</p>
</section>

<!-- Tasks Section -->
<section class="text-left px-6 py-4 bg-green-100 rounded-md shadow-md mx-4 sm:mx-auto max-w-3xl">
  <h2 class="text-xl font-bold mb-4 text-green-800">Today's Tasks</h2>
  <ul class="space-y-4">
    {#each randomTasks as task}
      <li class="flex items-start space-x-3">
        <input 
          type="checkbox" 
          class="h-5 w-5 mt-1 text-green-600" 
          checked={isTaskCompleted(task)}
          on:change={() => markTaskAsCompleted(task)}
        />
        <div>
          <p class="font-bold text-gray-800">{task}</p>
        </div>
      </li>
    {/each}
  </ul>
</section>
