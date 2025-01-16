<script>
  import "../../app.css";
  import { onMount } from "svelte";

  // State management for articles
  let allArticles = [];
  let error = null;
  let loading = true;

  // Fetch all categories and their articles, then flatten into a single array
  async function fetchAllArticles() {
  try {
    // Fetch all articles from the backend
    const response = await fetch("https://uvc-project-backend-greenshift-11-s4m3.onrender.com/api/articles");
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    const categoriesData = await response.json();
    const categories = categoriesData.categories || [];

    // Fetch and combine all articles into a single array
    const articlesPromises = categories.map(async (category) => {
      const categoryResponse = await fetch(`https://uvc-project-backend-greenshift-11-s4m3.onrender.com/api/articles/${category}`);
      if (categoryResponse.ok) {
        const data = await categoryResponse.json();
        return data.articles.map((article) => ({
          ...article,
          category,
        }));
      }
      return [];
    });

    const articlesByCategory = await Promise.all(articlesPromises);

    // Flatten and sort articles by title
    allArticles = articlesByCategory
      .flat()
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (err) {
    console.error("Error fetching articles:", err);
    error = "An error occurred while fetching articles.";
  } finally {
    loading = false;
  }
}
  // Format category name for display (used as a tag)
  function formatCategoryName(category) {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  // Initialize data on component mount
  onMount(fetchAllArticles);
</script>

<div class="bg-greenPale min-h-screen">
  <!-- Header Section -->
  <div class="bg-greenDeep text-greenPale py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold">Sustainable Living Articles</h1>
      <p class="mt-2 text-lg">Explore our comprehensive collection of sustainability resources</p>
    </div>
  </div>

  <!-- Articles Section -->
  <div class="container mx-auto px-4 py-8">
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <p class="font-bold">Error</p>
        <p>{error}</p>
      </div>
    {:else if loading}
      <div class="flex justify-center items-center h-32">
        <p class="text-greenDeep text-lg">Loading articles...</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each allArticles as article}
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="h-48 bg-greenLight">
            <img
              src={article.image}
              alt={article.title}
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-greenDeep font-bold text-xl mb-3">{article.title}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{article.snippet}</p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block bg-greenLight text-greenDeep px-6 py-2 rounded-full 
                     hover:bg-greenDeep hover:text-greenPale transition-colors duration-300
                     font-semibold text-sm"
            >
              Read Article →
            </a>
          </div>
        </div>
      {/each}
      </div>
    {/if}
  </div>
</div>