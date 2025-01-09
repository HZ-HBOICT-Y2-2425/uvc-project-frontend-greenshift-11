import type { PageLoad } from './$types'; // Ensure the import matches your SvelteKit setup

interface RouteParams {
  id: string; // Capture the dynamic ID
}

export const load: PageLoad = async ({ params }) => {
  const { id } = params as RouteParams; // Extract the `id` parameter from the URL

  try {
    // Fetch the appliance data from the correct backend endpoint
    const res = await fetch(`http://localhost:3012/appliance/${id}`); // Updated endpoint to port 3012

    if (res.ok) {
      const appliance = await res.json();
      return {
        props: {
          appliance, // Pass the fetched appliance data to the page
        },
      };
    } else {
      // If the appliance is not found or there is an error, return an appropriate error
      return { status: res.status, error: new Error('Appliance not found') };
    }
  } catch (err) {
    console.error('Error fetching appliance:', err);
    return { status: 500, error: new Error('Failed to fetch appliance data') };
  }
};