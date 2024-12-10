<script>
  import "../../app.css";
  import { quoteStore, changeQuote } from "../stores/quoteStore.js";
  import { get } from "svelte/store";

  let view = "default"; // Tracks the current view: "default", "current", or "previous"

  // Mock data for current articles
  const currentArticles = [
      { title: "Fast Fashion Crisis", content: "Exploring the impact of fast fashion." },
      { title: "Deforestation Woes", content: "How deforestation affects our planet." },
      { title: "Plastic Pollution", content: "Understanding the dangers of plastics." },
      { title: "Sustainable Living", content: "Tips for an eco-friendly lifestyle." }
  ];
</script>

<div class="bg-white min-h-screen flex flex-col items-center py-8">
<!-- Navigation Buttons -->
<div class="flex justify-between items-center w-3/4 mb-8">
  <!-- Current Articles Button -->
  <button
    on:click={() => (view = "current")}
    class="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
  >
    📅 Current
  </button>

  <!-- Previous Articles Button -->
  <button
    on:click={() => (view = "previous")}
    class="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
  >
    ❤️ Favorites
  </button>
</div>

<!-- Conditional Rendering of Content -->
{#if view === "default"}
  <!-- Default View -->
  <div class="w-3/4 bg-green-100 p-6 rounded-lg shadow-lg text-center">
    <h2 class="text-xl font-bold text-green-700 mb-4">Inspirational Quote</h2>
    <p class="text-green-600 text-center italic mb-4 h-lvh text-xl ">
      "{ $quoteStore }"
    </p>
  </div>
{:else if view === "current"}
  <!-- Current Articles View -->
  <div class="w-3/4">
    <h2 class="text-xl font-bold text-green-700 mb-4">Available Articles</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each currentArticles as article}
        <div class="bg-green-100 p-4 rounded-lg shadow-md">
          <h3 class="font-bold text-green-700">{article.title}</h3>
          <p class="text-green-600 text-sm">{article.content}</p>
        </div>
      {/each}
      <button
        on:click={() => (view = "default")}
        class="bg-red-700 text-white-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-black hover:text-white transition-all shrink w-20 h-14"
        >Back</button>
    </div>
  </div>
{:else if view === "previous"}
  <!-- Placeholder for Previous Articles -->
  <div class="w-3/4 bg-red-100 p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold text-red-700 mb-4">Previous Articles</h2>
    <p class="text-red-600 text-center">
      Content for previous articles will go here.
    </p>
  </div>
  <button
        on:click={() => (view = "default")}
        class="bg-red-700 text-white-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-black hover:text-white transition-all"
        >Back</button>
{/if}
</div>
