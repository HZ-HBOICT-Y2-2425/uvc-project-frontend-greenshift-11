import { page } from '$app/stores';
import { goto, invalidate } from '$app/navigation'; // Use invalidate and goto for navigation and data refresh

interface Appliance {
  id: number;
  brand: string;
  type: string;
  description: string;
  hoursPerWeek: number;
  wattage: number;
  emoji: string;
}

export const load: PageLoad = async ({ params, fetch }) => {
  const { id } = params; // Capture appliance ID from URL

  try {
    const response = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/${id}`);
    if (response.ok) {
      const appliance: Appliance = await response.json();
      return {
        props: { appliance }, // Pass appliance data to the page
      };
    } else {
      return { status: response.status, error: new Error('Appliance not found') };
    }
  } catch (error) {
    console.error('Error fetching appliance:', error);
    return { status: 500, error: new Error('Failed to fetch appliance data') };
  }
};
