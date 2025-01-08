<script>
  import "../../app.css";
  import flatpickr from "flatpickr"; // Import Flatpickr
  import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr CSS
  import { onMount } from "svelte";

  let selectedDate = ""; // Holds the selected date
  let note = ""; // Holds the current note being written
  let notes = {}; // Stores notes locally for display
  let username = localStorage.getItem("username");
  let dateInput; // Reference for the Flatpickr calendar

  // Initialize Flatpickr
  onMount(() => {
    flatpickr(dateInput, {
      inline: true, // Always visible calendar
      dateFormat: "Y-m-d", // Date format Year-Month-Day
      onChange: (selectedDates) => {
        selectedDate = selectedDates[0].toISOString().split("T")[0]; // Update selectedDate
      },
    });
  });

  // Save the note by sending it to the backend
  async function saveNote() {
    if (selectedDate && note) {
      try {
        console.log("Sending note to backend:", { user: username, note, date: selectedDate });
        const response = await fetch("http://localhost:3010/auth/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: username,
            note: note,
            date: selectedDate,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Note saved successfully:", data);
          notes[selectedDate] = data.notes
            .filter((n) => n.date === selectedDate)
            .map((n) => n.note);
          alert(`Note saved for ${selectedDate}`);
          note = ""; // Clear note input
        } else {
          const error = await response.json();
          console.error("Error response from server:", error);
          alert(`Error: ${error.message}`);
        }
      } catch (err) {
        console.error("Failed to save the note:", err);
        alert("Failed to save the note. Please try again later.");
      }
    } else {
      alert("Please select a date and write a note before saving.");
    }
  }

  // Load notes when the date changes
  async function loadNotes() {
    if (selectedDate) {
      try {
        const response = await fetch(`http://localhost:3010/auth/notes/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Loaded notes:", data);

          notes[selectedDate] = data.notes
            .filter((n) => n.date === selectedDate)
            .map((n) => n.note);
        }
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
    }
  }

  //fucntion to load completed tasks a user has completed
  function loadCompletedTasks() {
  const username = localStorage.getItem("username"); // Get the current username
  if (!username) return;

  // Load completed tasks for the current user
  const allCompletedTasks = JSON.parse(localStorage.getItem("completedTasksByUser")) || {};
  completedTasks = allCompletedTasks[username] || [];
}


  $: if (selectedDate) {
    loadNotes();
  }

  onMount(() => {
    loadCompletedTasks();
  });
</script>

<div class="flex flex-col md:flex-row gap-6 p-4 w-full">
  <!-- Calendar Section (Full Left Side) -->
  <div class="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-lg">
    <label for="calendar" class="block mb-2 text-gray-700 font-semibold text-center">Select a Date</label>
    <div id="calendar" bind:this={dateInput} class="w-full"></div>
  </div>

  <!-- Notes Section (Right Side) -->
  <div class="w-full md:w-2/3 flex flex-col gap-4">
    <!-- Notes -->
    <div class="bg-green-300 p-6 rounded-lg shadow-lg w-full">
      <h2 class="text-lg font-semibold mb-4">Notes</h2>
      <textarea
        bind:value={note}
        placeholder="Write your notes here..."
        class="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
      ></textarea>
      <button
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        on:click={saveNote}
      >
        Save Note
      </button>
      <!-- Display saved notes -->
      {#if selectedDate && notes[selectedDate]?.length > 0}
        <ul class="mt-4">
          {#each notes[selectedDate] as savedNote, index}
            <li class="mb-2 p-2 bg-gray-200 rounded shadow">
              {index + 1}. {savedNote}
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Completed Tasks Section with improved styling -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg w-full sm:w-1/2 border border-green-200">
      <div class="flex items-center gap-2 mb-6">
        <h2 class="text-xl font-semibold text-green-800">Completed Tasks</h2>
        <span class="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
          {completedTasks.length}
        </span>
      </div>
      
      {#if completedTasks.length > 0}
        <ul class="space-y-3">
          {#each completedTasks as task, index}
            <li class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow">
              <span class="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </span>
              <span class="font-medium text-gray-700">{task.text}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="text-center py-8 text-gray-500">
          <p class="text-lg mb-2">No tasks completed yet</p>
          <p class="text-sm">Complete tasks in the home page to see them here!</p>
        </div>
      {/if}
    </div>
  </div>
</div>

