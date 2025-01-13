import { error } from '@sveltejs/kit';
//@ts-ignore
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  try {
    // Fetch room data from correct endpoint
    const roomRes = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/room/${params.id}`);
    
    if (!roomRes.ok) {
      throw error(404, 'Room not found');
    }
    
    const room = await roomRes.json();
    
    // Fetch appliance details for each appliance ID
    const appliancePromises = room.appliances.map(async (applianceId: number) => {
      const appRes = await fetch(`https://uvc-project-backend-greenshift-11-5q6c.onrender.com/appliance/${applianceId}`);
      if (!appRes.ok) {
        console.warn(`Failed to fetch appliance ${applianceId}`);
        return null;
      }
      return appRes.json();
    });
    
    const appliances = await Promise.all(appliancePromises);
    
    return {
      room: {
        ...room,
        applianceDetails: appliances.filter(a => a !== null), // Filter out null responses
      },
    };
  } catch (err) {
    console.error('Error loading room:', err);
    throw error(500, 'Error loading room data');
  }
}) satisfies PageLoad;