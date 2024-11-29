<!-- src/lib/AnimalItem.svelte -->
<script lang="ts">
  export let name: string;
  export let emoji: string;
  export let price: number;
  export let maxOwned: number = 5;
  export let owned: number = 0;

  const increaseOwned = () => {
    if (owned < maxOwned) {
      owned++;
    }
  };
</script>

<div class="flex flex-col items-center bg-gray-50 rounded-lg shadow-md p-4">
  <span class="text-6xl">{emoji}</span>
  <p class="mt-2 text-lg font-semibold text-gray-800">{name}</p>
  <p class="text-gray-600">Price: {price} coins</p>
  <p class="mt-2 text-gray-800">Owned: {owned}/{maxOwned}</p>
  <button
    class="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
    on:click={increaseOwned}
    disabled={owned >= maxOwned}
  >
    {owned >= maxOwned ? 'Max Owned' : 'Buy'}
  </button>
</div>
