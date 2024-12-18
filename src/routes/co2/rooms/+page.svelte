<script>
  // Mock data for rooms and appliances
  const rooms = [
    {
      id: 1,
      name: 'Living Room',
      icon: 'fa-living-room', // You may want to replace this with an appropriate Font Awesome icon
      appliances: ['Television', 'Air Conditioner', 'Lamp']
    },
    {
      id: 2,
      name: 'Kitchen',
      icon: 'fa-kitchen', // You may want to replace this with an appropriate Font Awesome icon
      appliances: ['Refrigerator', 'Microwave', 'Oven']
    },
    {
      id: 3,
      name: 'Bedroom',
      icon: 'fa-bed', // You may want to replace this with an appropriate Font Awesome icon
      appliances: ['Bedside Lamp', 'Fan', 'Heater']
    }
  ];

  let selectedRoom = null;

  // Function to handle room selection
  function selectRoom(room) {
    // If the room is already selected, deselect it
    if (selectedRoom === room) {
      selectedRoom = null;
    } else {
      selectedRoom = room;
    }
  }
</script>

<div class="flex flex-wrap justify-center">
  {#each rooms as room}
    <div 
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4 m-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      on:click={() => selectRoom(room)}
      aria-role = "button"
      key={room.id}
    >
      <i class={`fa ${room.icon} fa-3x mb-4 text-gray-700`}></i>
      <h3 class="text-lg font-semibold">{room.name}</h3>
    </div>
  {/each}
</div>

{#if selectedRoom}
  <div class="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
    <h3 class="text-xl font-bold">Appliances in {selectedRoom.name}</h3>
    <ul class="mt-2 list-disc list-inside">
      {#each selectedRoom.appliances as appliance}
        <li class="text-gray-700">{appliance}</li>
      {/each}
    </ul>
  </div>
{/if}