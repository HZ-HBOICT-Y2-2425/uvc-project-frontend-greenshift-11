<script>
  import "../../app.css";
  import { onMount } from "svelte";

  let categories = [];
  let articlesByCategory = {};
  let error = null;

  // Fetch all categories
  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:3011/api/articles");
      if (response.ok) {
        const data = await response.json();
        categories = data.categories;
        fetchArticles();
      } else {
        error = "Failed to fetch categories";
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      error = "An error occurred while fetching categories.";
    }
  }

  // Fetch articles for each category
  async function fetchArticles() {
    for (const category of categories) {
      try {
        const response = await fetch(`http://localhost:3011/api/articles/${category}`);
        if (response.ok) {
          const data = await response.json();
          articlesByCategory[category] = data.articles;
        } else {
          console.error(`Failed to fetch articles for category ${category}`);
        }
      } catch (err) {
        console.error(`Error fetching articles for category ${category}:`, err);
      }
    }
  }

  // Fetch data on mount
  onMount(fetchCategories);
</script>

<!-- Page Content -->
<div class="bg-greenPale min-h-screen">
  <!-- Articles Section -->
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-greenDeep mb-6">Articles</h1>

    {#if error}
      <p class="text-red-600">{error}</p>
    {:else if Object.keys(articlesByCategory).length === 0}
      <p class="text-greenDeep">Loading articles...</p>
    {:else}
      {#each Object.entries(articlesByCategory) as [category, articles]}
        <div class="mb-8">
          <h2 class="text-xl font-bold text-green-700 mb-4">{category.replace("_", " ").toUpperCase()}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each articles as article}
              <div class="bg-greenLight rounded-lg shadow-md overflow-hidden">
                <div class="p-4">
                  <h3 class="text-greenDeep font-bold text-lg mb-2">Article</h3>
                  <a
                    href="{article}"
                    target="_blank"
                    class="text-greenDeep bg-greenPale px-4 py-2 text-sm rounded hover:bg-greenDeep hover:text-greenPale transition-all"
                  >
                    📖 {article}
                  </a>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
