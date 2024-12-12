<script>
  import "../../app.css";
  import { quoteStore, changeQuote } from "./stores/quoteStore.js";

  let view = "default"; // Tracks the current view: "default", "current", or "previous"

  // Mock data for current articles
  const currentArticles = [
    { title: "Fast Fashion Crisis", content: "Exploring the impact of fast fashion." },
    { title: "Deforestation Woes", content: "How deforestation affects our planet." },
    { title: "Plastic Pollution", content: "Understanding the dangers of plastics." },
    { title: "Sustainable Living", content: "Tips for an eco-friendly lifestyle." }
  ];

  // Mock data for favorite articles (empty placeholder for now)
  let favorites = /** @type {Array<{title: string, content: string}>} */ ([]);

  // Add to Favorites function
  /**
   * @param {{ title: string; content: string; }} article
   */
  function addToFavorites(article) {
    if (!favorites.includes(article)) {
      favorites = [...favorites, article];
    }
  }
</script>

<div class="flex flex-col items-center py-8">
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
      <p class="text-green-600 text-center italic mb-4 text-xl">
        "{ $quoteStore }"
      </p>
      <div class="flex justify-center mb-4">
        <img
          src="Earthug.png"
          alt="Earth Hugging Illustration"
          class="w-full h-auto"
        />
      </div>
    </div>

  {:else if view === "current"}
    <!-- Current Articles View -->
    <div class="w-3/4">
      <h2 class="text-xl font-bold text-green-700 mb-4">Available Articles</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each currentArticles as article}
          <div class="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 class="font-bold text-green-700">{article.title}</h3>
            <p class="text-green-600 text-sm mb-2">{article.content}</p>
            <button
              on:click={() => addToFavorites(article)}
              class="bg-white text-white py-1 px-2 rounded hover:bg-green-100 transition-all"
            >
             ⭐ 
            </button>
          </div>
        {/each}
      </div>
      <button
        on:click={() => (view = "default")}
        class="mt-4 bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-black hover:text-white transition-all"
      >
        Back
      </button>
    </div>

  {:else if view === "previous"}
    <!-- Favorites View -->
    <div class="w-3/4">
      <h2 class="text-xl font-bold text-red-700 mb-4">Your Favorite Articles</h2>
      {#if favorites.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each favorites as favorite}
            <div class="bg-red-100 p-4 rounded-lg shadow-md">
              <h3 class="font-bold text-red-700">{favorite.title}</h3>
              <p class="text-red-600 text-sm">{favorite.content}</p>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-red-600 text-center inset-x-0 top-0">No favorites added yet.</p>
      {/if}
      <button
        on:click={() => (view = "default")}
        class="mt-4 bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-black hover:text-white transition-all"
      >
        Back
      </button>
    </div>
  {/if}
</div>
