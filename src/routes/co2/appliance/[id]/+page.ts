import type { PageLoad } from '../$types'; // Adjust the import according to your SvelteKit version

interface RouteParams {
  id: string; // Capture the dynamic ID
}

export const load: PageLoad = async ({ params }) => {
  const { id } = params as RouteParams; // Use type assertion for better TypeScript support

  // Fetch the appliance data using the correct backend endpoint
  const res = await fetch(`http://localhost:3010/appliance/appliance/${id}`);

  if (res.ok) {
    const appliance = await res.json();
    return {
      props: {
        appliance,
      },
    };
  } else {
    // Handle error, for example returning a not found response
    return { status: res.status, error: new Error('Appliance not found') };
  }
};