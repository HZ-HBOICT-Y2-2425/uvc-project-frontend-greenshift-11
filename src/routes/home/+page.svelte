<script>
  import "../../app.css";
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  const gardenStateStore = writable(1);
  let randomTasks = [];
  let completedTasks = [];
  let username = localStorage.getItem("username");

  function randomizeGardenHealth() {
    const newState = Math.floor(Math.random() * 3) + 1;
    gardenStateStore.set(newState);
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

  function randomizeTasks() {
    // Simulate random task generation
    randomTasks = [
      { text: "Water the plants", isRefreshable: false },
      { text: "Check soil moisture", isRefreshable: false },
      { text: "Prune dead leaves", isRefreshable: false },
    ];
  }

  function markTaskAsCompleted(task) {
    randomTasks = randomTasks.filter((t) => t.text !== task.text);
    completedTasks.push(task.text);

    // Update localStorage for completed tasks
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
    savedCompletedTasks[username] = completedTasks;
    localStorage.setItem("completedTasks", JSON.stringify(savedCompletedTasks));

    // Save remaining tasks in localStorage
    localStorage.setItem(
      "dailyTasks",
      JSON.stringify({ timestamp: Date.now(), tasks: randomTasks })
    );
  }

  onMount(() => {
    randomizeGardenHealth();
    randomizeTasks();

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
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>
