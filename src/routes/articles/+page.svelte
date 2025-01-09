<script>
  import "../../app.css";
  import { quoteStore } from "./stores/quoteStore.js";
  import { onMount } from "svelte";

  let view = "default";
  let currentArticles = [];
  let favorites = [];
  let notification = {visible: false, message: ""};
  let error = null;

  // Initialize readArticles from localStorage or as empty set if none exists
  let readArticles = new Set(JSON.parse(localStorage.getItem('readArticles') || '[]'));

  // Save read articles to localStorage whenever it changes
  function saveReadArticles() {
    localStorage.setItem('readArticles', JSON.stringify([...readArticles]));
  }

  // Mark an article as read and save the state
  function markAsRead(articleId) {
    readArticles.add(articleId);
    readArticles = readArticles; // Trigger Svelte reactivity
    saveReadArticles();
    showNotification("Article marked as read!");
  }

  // Check if an article has been read
  function isArticleRead(articleId) {
    return readArticles.has(articleId);
  }

  async function fetchArticles() {
    try {
      const response = await fetch("http://localhost:3011/api/articles");
      if (response.ok) {
        const data = await response.json();
        const categories = data.categories;

        const allArticlesPromises = categories.map(async (category) => {
          try {
            const categoryResponse = await fetch(
              `http://localhost:3011/api/articles/${category}`
            );
            if (categoryResponse.ok) {
              const categoryData = await categoryResponse.json();
              return categoryData.articles.map((article) => ({
                ...article,
                id: Math.random().toString(36).substr(2, 9),
                title: article.title.replace("_", " ").toUpperCase(),
                snippet: article.snippet,
                link: article.link,
                image: article.image
              }));
            } else {
              console.error(`Failed to fetch articles for category ${category}`);
              return [];
            }
          } catch (err) {
            console.error(`Error fetching articles for category ${category}:`, err);
            return [];
          }
        });

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

  function isInFavorites(article) {
    return favorites.some(fav => fav.id === article.id);
  }

  function addToFavorites(article) {
    if (!isInFavorites(article)) {
      favorites = [...favorites, article];
      showNotification("Article added to favorites!");
    } else {
      showNotification("Article is already in favorites!");
    }
  }

  function removeFromFavorites(index) {
    favorites = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
    showNotification("Article removed from favorites!");
  }

  function showNotification(message) {
    notification = { visible: true, message };
    setTimeout(() => {
      notification = { visible: false, message: "" };
    }, 3000);
  }

  onMount(fetchArticles);
</script>

<div class="flex flex-col items-center py-8">
  <!-- Navigation Buttons -->
  <div class="flex justify-between items-center w-3/4 mb-8">
    <button
      on:click={() => (view = "default")}
      class="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
    >
      📅 Current
    </button>

    <button
      on:click={() => (view = "current")}
      class="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
    >
      🌱 Quote
    </button>

    <button
      on:click={() => (view = "previous")}
      class="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
    >
      ❤️ Favorites ({favorites.length})
    </button>
  </div>

  {#if notification.visible}
    <div
      class="fixed top-5 right-5 bg-[#3ce1d0] text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition duration-500 ease-in-out scale-100 animate-bounce"
    >
      {notification.message}
    </div>
  {/if}

  {#if view === "default"}
    <div class="w-3/4">
      <h2 class="text-xl font-bold text-green-700 mb-4">Available Articles</h2>
      {#if error}
        <p class="text-red-600">{error}</p>
      {:else if currentArticles.length === 0}
        <p class="text-greenDeep">Loading articles...</p>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each currentArticles as article}
            <div class="bg-green-100 p-4 rounded-lg shadow-md {isArticleRead(article.id) ? 'bg-gray-100' : ''}">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold {isArticleRead(article.id) ? 'text-gray-600' : 'text-green-700'}">{article.title}</h3>
                {#if isArticleRead(article.id)}
                  <span class="text-gray-500 text-sm">✓ Read</span>
                {/if}
              </div>
              <p class="text-green-600 text-sm mb-2">{article.snippet}</p>
              <div class="flex flex-col gap-2">
                
                <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                class="bg-green-500 text-white font-semibold py-1 px-2 rounded shadow-md hover:bg-green-700 transition-all flex items-center justify-center no-underline"
                on:click={() => markAsRead(article.id)}
              >
                Read Full Article
              </a>
                <button
                  on:click={() => addToFavorites(article)}
                  class="bg-[#3eb6a2] text-green-700 font-semibold py-1 px-2 rounded shadow-md hover:bg-green-700 hover:text-white transition-all"
                  disabled={isInFavorites(article)}
                >
                  {#if isInFavorites(article)}
                    ⭐ In Favorites
                  {:else}
                    ⭐ Add to Favorites
                  {/if}
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else if view === "current"}
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
    <div class="w-3/4">
      <h2 class="text-xl font-bold text-black mb-4">Your Favorite Articles ({favorites.length})</h2>
      {#if favorites.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each favorites as favorite, index}
            <div class="bg-[#dff5f2] p-4 rounded-lg shadow-md {isArticleRead(favorite.id) ? 'bg-gray-100' : ''}">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold {isArticleRead(favorite.id) ? 'text-gray-600' : 'text-black'}">{favorite.title}</h3>
                {#if isArticleRead(favorite.id)}
                  <span class="text-gray-500 text-sm">✓ Read</span>
                {/if}
              </div>
              <div class="flex flex-col gap-2">
                <a
                  href={favorite.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-green-500 text-white font-semibold py-1 px-2 rounded shadow-md hover:bg-green-700 transition-all flex items-center justify-center no-underline"
                  on:click={() => markAsRead(favorite.id)}
                >
                  Read Article
                </a>
                <button
                  on:click={() => removeFromFavorites(index)}
                  class="mt-2 bg-red-600 text-white font-semibold py-1 px-3 rounded shadow-md hover:bg-black hover:text-white transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-black-600 text-center h-dvh">No favorites added yet.</p>
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