<script>
  import "../../app.css";
  import { fade } from "svelte/transition";

  let questions = [
    { id: "appliance_count", question: "How many high energy consumption appliances do you have in your house?", options: ["none", "1-3", "4-6", "7 or more"] },
    { id: "appliance_usage", question: "How often do you use your listed appliances?", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
    { id: "personal_devices", question: "How many personal devices do you use daily?", options: ["1-3", "4-6", "More than 6"] },
    { id: "green_energy", question: "Are you part of a green energy program?", options: ["Yes", "No", "I'd like to join one"] },
    { id: "monitor_energy", question: "Do you regularly monitor your energy consumption?", options: ["Yes", "No"] },
    { id: "heating_system", question: "What kind of heating system do you use at home?", options: ["Gas", "Solar", "Electric", "Heat Pump", "None"] },
    { id: "energy_source", question: "What is the primary energy source for your appliances?", options: ["Electricity", "Gas", "Solar", "Other"] },
    { id: "charge_frequency", question: "How often do you charge your devices?", options: ["Multiple times a day", "Once a day", "Rarely"] },
    { id: "energy_efficiency", question: "Would you be willing to switch to energy-efficient appliances if they are more affordable?", options: ["Yes", "No"] },
];

  let selectedOption = null;
  let currentQuestionIndex = 0;
  let showModal = false; // Controls the visibility of the modal
  let skipClicked = false;
  let userResponses = {};

  let generalTasks = []; 

   // Fetch general tasks from the backend API
   async function fetchAllTasks() {
  try {
    const response = await fetch("https://uvc-project-backend-greenshift-11-task.onrender.com/api/tasks");
    if (response.ok) {
      const data = await response.json();
      tasks = data.tasks;
    } else {
      console.error("Failed to fetch tasks:", response.status);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

   // Function to generate tasks based on responses
   async function generateTasks() {
    let tasks = [...generalTasks];

    if (userResponses.appliance_count == "4-6" || userResponses.appliance_count == "7 or more") {
      tasks.push("Monitor fridge temperature and clean AC filters regularly.");
    }
    if (userResponses.appliance_usage == "Daily" || userResponses.appliance_usage == "Weekly") {
      tasks.push("Run appliances like washing machines only with full loads.");
    }
    if (userResponses.personal_devices == "4-6" || userResponses.personal_devices == "More than 6") {
      tasks.push("Unplug devices when not in use and use power-saving modes.");
    }
    if (userResponses.green_energy == "No") {
      tasks.push("Consider joining a green energy program to reduce emissions.");
    }
    if (userResponses.monitor_energy == "No") {
      tasks.push("Start using an energy monitoring app to track your usage.");
    }
    if (userResponses.heating_system == "Gas" ) {
      tasks.push("Don't keep your heating system at the highest ");
    }
    return tasks;
  }

  async function saveUserTasks() {
  const tasks = await generateTasks(); // Ensure generateTasks() provides new tasks to add.

  try {
    const response = await fetch("http://localhost:3011/api/tasks/general_users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks }), // Send only the new tasks.
    });

    if (response.ok) {
      console.log("Tasks successfully added to general_users:", tasks);
    } else {
      console.error("Failed to add tasks to general_users.");
    }
  } catch (error) {
    console.error("Error saving tasks to general_users:", error);
  }
}

  function goToThankYou() {
    window.location.href = "/thank-you";
  }

  function skipQuestion() {
    skipClicked = true;
    nextQuestion();
  }

  function nextQuestion() {
    if (!selectedOption && !skipClicked) {
      showModal = true;
      return;
    }

    if (selectedOption) {
      userResponses[questions[currentQuestionIndex].id] = selectedOption;
      selectedOption = null;
    }

    skipClicked = false;

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
    } else {
      saveUserTasks(); 
      goToThankYou();
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      selectedOption = null; // Reset selection for the previous question
    }
  }

  function selectOption(option) {
    selectedOption = option;
  }

  function closeModal() {
    showModal = false;
  }

  //Fetch general tasks when component is intiialized 
  fetchAllTasks();

  $: progress = ((currentQuestionIndex + 1) / questions.length) * 100;
</script>

<!-- Question Container -->
<div class="min-h-screen bg-gradient-to-r from-greenLight to-greenDeep flex justify-center items-center">
  <div class="bg-gray-900 text-customGreen p-8 rounded-lg shadow-md max-w-lg w-full">
    <h2 class="text-2xl font-bold text-center mb-4">Questions</h2>

    <!-- Progress Bar Container -->
    <div class="w-full bg-progessBar rounded-full h-1 mb-4">
      <div
        class="bg-customGreen h-1 rounded-full transition-all duration-300"
        style="width: {progress}%"
      ></div>
    </div>

    <!-- Display the current question -->
    <p class="text-lg mb-6 text-center text-white">
      {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
    </p>

    <div class="space-y-4 mb-6">
      {#each questions[currentQuestionIndex].options as option}
        <button
          class="w-full py-2 rounded font-bold text-white {selectedOption === option ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
          on:click={() => selectOption(option)}
        >
          {option}
        </button>
      {/each}
    </div>

    <!-- Navigation buttons -->
    <div class="flex justify-between items-center">
      <button
        on:click={previousQuestion}
        disabled={currentQuestionIndex === 0}
        class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded"
      >
        Back
      </button>

      <button
        on:click={nextQuestion}
        class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded"
      >
        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
      </button>

      <button
        on:click={skipQuestion}
        class="text-customGreen underline"
      >
        Skip
      </button>
    </div>
  </div>
</div>

<!-- Modal Popup -->
{#if showModal}
  <div class="fixed inset-0 flex items-center justify-center modal-bg" in:fade>
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
      <p class="text-gray-700 font-bold mb-4">Please fill the form or skip the question.</p>
      <button
        class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded"
        on:click={closeModal}
      >
        OK
      </button>
    </div>
  </div>
{/if}
