<script>
  import "../../app.css";

  let selectedDate = ''; // Holds the selected date
  let note = ''; // Holds the current note being written
  let notes = {}; // Stores notes locally for display
  let username = localStorage.getItem("username");

  // Save the note by sending it to the backend
  async function saveNote() {
    if (selectedDate && note) {
      try {
        console.log('Sending note to backend:', { user: username, note, date: selectedDate });
        const response = await fetch('http://localhost:3010/auth/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: username, // Username from frontend
            note: note, // The note content
            date: selectedDate, // The selected date
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Note saved successfully:', data);
          // Update the local `notes` object with the updated notes array
          notes[selectedDate] = data.notes
            .filter((n) => n.date === selectedDate)
            .map((n) => n.note);
          alert(`Note saved for ${selectedDate}`);
          note = ''; // Clear the textarea after saving
        } else {
          const error = await response.json();
          console.error('Error response from server:', error);
          alert(`Error: ${error.message}`);
        }
      } catch (err) {
        console.error('Failed to save the note:', err);
        alert('Failed to save the note. Please try again later.');
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
          console.log('Loaded notes:', data);

          // Filter and map notes for the selected date
          notes[selectedDate] = data.notes
            .filter((n) => n.date === selectedDate)
            .map((n) => n.note);
        }
      } catch (err) {
        console.error('Failed to load notes:', err);
      }
    }
  }

  $: if (selectedDate) {
    loadNotes();
  }
</script>

<div>
  <!-- Search Bar -->
  <div class="mb-6 w-full max-w-3xl flex items-center gap-2">
    <input type="date" bind:value={selectedDate} placeholder="Search for a date" class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
    <p>Search for a date</p>
  </div>

  <!-- Notes Section -->
  <div class="flex flex-col sm:flex-row justify-center items-start gap-6 w-full max-w-5xl">
    <!-- Notes Section -->
    <div class="relative pgNote p-6 rounded-lg shadow-lg w-full sm:w-1/2">
      <!-- Notebook Spine -->
      <div class="absolute top-0 bottom-0 left-4 w-1 bg-green-500 rounded-full"></div>
      <h2 class="text-lg font-semibold mb-4 relative">Notes</h2>
      <textarea bind:value={note} placeholder="Write your notes here..."
        class="relative w-full h-40 p-4 bg-transparent border-none outline-none resize-none focus:ring focus:ring-green-300 font-mono text-sm"></textarea>
      <button class="mt-4 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" on:click={saveNote}>
        Save Note
      </button>

      <!-- Display saved notes for the selected date -->
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

    <!-- Completed Tasks Section -->
    <div class="bg-greenLight p-4 rounded-lg shadow-lg w-full sm:w-1/2">
      <h2 class="text-lg font-semibold mb-4">Completed Tasks</h2>
      <ul>
        <li class="flex items-center justify-between">
          <span class="font-serif">Task 1</span>
        </li>
        <li class="flex items-center justify-between">
          <span class="font-serif">Task 2</span>
        </li>
        <li class="flex items-center justify-between">
          <span class="font-serif">Task 3</span>
        </li>
      </ul>
    </div>
  </div>
</div>
