<script>
  import "../../app.css";
  import { quoteStore } from "./stores/quoteStore.js";
  import { onMount } from "svelte";

  let view = "default"; // Tracks the current view: "default", "current", or "previous"

  // State for dynamically loaded articles
  let currentArticles = [];
  let favorites = []; // Empty placeholder for favorite articles
  let error = null;

  // Fetch articles dynamically from the API
  async function fetchArticles() {
    try {
      const response = await fetch("http://localhost:3011/api/articles");
      if (response.ok) {
        const data = await response.json();
        const categories = data.categories;

        // Fetch articles for each category and flatten the results
        const allArticlesPromises = categories.map(async (category) => {
          const categoryResponse = await fetch(
            `http://localhost:3011/api/articles/${category}`
          );
          if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json();
            return categoryData.articles.map((article) => ({
              title: category.replace("_", " ").toUpperCase(),
              content: article,
            }));
          }
        });

        // Combine all categories into a single list
        const resolvedArticles = await Promise.all(allArticlesPromises);
        currentArticles = resolvedArticles.flat();
      } else {
        error = "Failed to fetch articles.";
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      error = "An error occurred while fetching articles.";
    }
  }

  // Add to Favorites function
  function addToFavorites(article) {
    if (!favorites.includes(article)) {
      favorites = [...favorites, article];
    }
  }

  // Fetch articles on component mount
  onMount(fetchArticles);
</script>

<div class="flex flex-col items-center py-8">
  <!-- Navigation Buttons -->
  <div class="flex justify-between items-center w-3/4 mb-8">
    <!-- Current Articles Button -->
    <button
      on:click={() => (view = "default")}
      class="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
    >
      📅 Current
    </button>

    <!-- Inspirational Quote Button -->
    <button
      on:click={() => (view = "current")}
      class="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
    >
      🌱 Quote
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
    <!-- Current Articles View -->
    <div class="w-3/4">
      <h2 class="text-xl font-bold text-green-700 mb-4">Available Articles</h2>
      {#if error}
        <p class="text-red-600">{error}</p>
      {:else if currentArticles.length === 0}
        <p class="text-greenDeep">Loading articles...</p>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each currentArticles as article}
            <div class="bg-green-100 p-4 rounded-lg shadow-md">
              <h3 class="font-bold text-green-700">{article.title}</h3>
              <a
                href="{article.content}"
                target="_blank"
                class="text-green-600 text-sm underline"
              >
                Read Article
              </a>
              <button
                on:click={() => addToFavorites(article)}
                class="mt-2 bg-green-300 text-green-700 font-semibold py-1 px-2 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
              >
                ⭐ Add to Favorites
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else if view === "current"}
    <!-- Inspirational Quote View -->
    <div class="w-3/4 bg-green-100 p-6 rounded-lg shadow-lg text-center">
      <h2 class="text-xl font-bold text-green-700 mb-4">Inspirational Quote</h2>
      <p class="text-green-600 text-center italic mb-4 text-xl">
        "{ $quoteStore }"
      </p>
      <div class="flex justify-center mb-4">
        <img
          src="Earthug.png"
          alt="Earth Hugging Illustration"
          class="w-90% h-auto"
        />
      </div>
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
              <a
                href="{favorite.content}"
                target="_blank"
                class="text-red-600 text-sm underline"
              >
                Read Article
              </a>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-red-600 text-center">No favorites added yet.</p>
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
