/**
 * @param {import('@sveltejs/kit').LoadEvent} serverLoadEvent
 */
export const load = async (serverLoadEvent) => {
  try {
    const { fetch } = serverLoadEvent; // Fetch function from SvelteKit's server context
    const res = await fetch(`http://localhost:3010/appliances`);

    // Check if the response is ok (status code in the range 200-299)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const items = await res.json(); // Parse the JSON response
    return { items }; // Return the items to the Svelte component
  } catch (error) {
    return {
      error: error.message || 'An unknown error occurred', // Return the error message
    };
  }
};