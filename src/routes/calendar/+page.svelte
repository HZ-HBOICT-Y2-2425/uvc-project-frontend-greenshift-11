<script>
  import "../../app.css";
  import { onMount } from "svelte";

  let selectedDate = "";
  let note = "";
  let notes = {};
  let username = localStorage.getItem("username");
  let completedTasks = []; // Will now be populated from backend

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
          // @ts-ignore
          notes[selectedDate] = data.notes
            // @ts-ignore
            .filter((n) => n.date === selectedDate)
            // @ts-ignore
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

  async function loadNotes() {
    if (selectedDate) {
      try {
        const response = await fetch(`http://localhost:3010/auth/notes/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Loaded notes:", data);

          // @ts-ignore
          notes[selectedDate] = data.notes
            // @ts-ignore
            .filter((n) => n.date === selectedDate)
            // @ts-ignore
            .map((n) => n.note);
        }
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
    }
  }

  // New function to load completed tasks from backend
  async function loadCompletedTasks() {
    try {
      const response = await fetch(`http://localhost:3010/auth/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        completedTasks = data.user.completedTasks || [];
      } else {
        console.error("Failed to load completed tasks");
      }
    } catch (err) {
      console.error("Error loading completed tasks:", err);
    }
  }

  $: if (selectedDate) {
    loadNotes();
  }

  onMount(() => {
    if (!username) {
      alert("No user logged in. Redirecting to login page...");
      window.location.href = "/login";
    } else {
      loadCompletedTasks();
    }
  });
</script>

<div class="container mx-auto p-6">
  <!-- Search Bar -->
  <div class="mb-6 flex justify-center">
    <input type="date" bind:value={selectedDate} placeholder="Search for a date" class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-300"/> 
    <p>Search for a date</p>
  </div>

  <!-- Notes Section -->
  <div class="flex justify-between gap-6">
    <!-- Notes Section -->
    <div class="relative pgNote p-6 rounded-lg shadow-lg w-full max-w-lg">
      <!-- Notebook Spine -->
      <div class="absolute top-0 bottom-0 left-4 w-1 bg-green-500 rounded-full"></div>
      <h2 class="text-lg font-semibold mb-4 relative">Notes</h2>
      <textarea 
        bind:value={note} 
        placeholder="Write your notes here..."
        class="relative w-full h-40 p-4 bg-transparent border border-gray-300 rounded-lg resize-none focus:ring focus:ring-green-300 font-mono text-sm"
      ></textarea>
      <button 
        class="mt-4 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" 
        on:click={saveNote}
      >
        Save Note
      </button>

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

<!-- Center Widget -->
<div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg w-full max-w-sm text-center border border-green-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">User Summary</h2>
    <p class="text-base text-green-700 font-medium mt-2">
        <span class="font-semibold">Tasks Completed:</span> {completedTasks.length}
    </p>
    <p class="text-base text-blue-700 font-medium mt-2">
        <span class="font-semibold">Notes Today:</span> {notes[selectedDate]?.length || 0}
    </p>
    <p class="text-base text-gray-600 font-medium mt-2">
        <span class="font-semibold">Date:</span> {selectedDate || "Select a date"}
    </p>
</div>

    <!-- Completed Tasks Section -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg w-full max-w-lg border border-green-200">
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
              <span class="font-medium text-gray-700">{task}</span>
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


