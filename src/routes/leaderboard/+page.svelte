<script lang="ts">
    import { onMount } from 'svelte';
  
    let leaderboard = [];
    let isLoading = true;
    let error = null;
  
    // Fetch the leaderboard data
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("https://uvc-project-backend-greenshift-11.onrender.com/auth/leaderboard"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
        }
        leaderboard = await response.json();
      } catch (err) {
        error = `Error fetching leaderboard: ${err.message}`;
      } finally {
        isLoading = false;
      }
    };
  
    onMount(fetchLeaderboard); // Fetch data when the component mounts
  </script>
  
  <div class="p-6">
  
    {#if isLoading}
      <p class="text-gray-500">Loading leaderboard...</p>
    {:else if error}
      <p class="text-red-500">{error}</p>
    {:else if leaderboard.length === 0}
      <p class="text-gray-500">No data available for the leaderboard.</p>
    {:else}
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">Rank</th>
            <th class="border border-gray-300 px-4 py-2">Username</th>
            <th class="border border-gray-300 px-4 py-2">Completed Tasks</th>
          </tr>
        </thead>
        <tbody>
          {#each leaderboard as user, index}
            <tr>
              <td class="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td class="border border-gray-300 px-4 py-2">{user.user}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{user.completedTasks}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
  </style>
  