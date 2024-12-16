<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  const gardenStateStore = writable(1);

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

  function randomizeTasks() {
    console.log("Randomizing tasks..."); // Replace with your logic
  }

  onMount(() => {
    randomizeGardenHealth();
  });

  // Store for tasks
  const tasksStore = writable([]);

  // Function to fetch tasks from backend
  async function fetchTasks() {
    try {
      const response = await fetch('/api/tasks'); // Call the API endpoint
      console.log('API Response: ', await response.json());
      const data = await response.json();

      // Log the fetched tasks
      console.log('Fetched tasks:', data);

      // Update the store with fetched tasks
      if (response.ok) {
        tasksStore.set(data);
      } else {
        console.error('Failed to fetch tasks:', data);
      }
    } catch (error) {
      console.error('Error during fetchTasks:', error);
    }
  }

  // Fetch tasks on mount
  onMount(() => {
    fetchTasks();
  });
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