<script>
  import "../../app.css";
</script>

<!-- Page-Specific Content -->
<div class="bg-greenPale min-h-screen">
  <!-- Articles Section -->
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 gap-8">
      <!-- Top Row of 4 Articles -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each [1, 2, 3, 4] as i}
          <div class="bg-greenLight rounded-lg shadow-md overflow-hidden">
            <!-- <img
              src={/path-to-image-placeholder-${i}.png}
              class="w-full h-40 object-cover"
            /> -->
            <div class="p-4">
              <h2 class="text-greenDeep font-bold text-lg mb-2">
                {i % 2 === 0 ? "Fast fashion" : "Deforestation"}
              </h2>
              <p class="text-greenDeep text-sm mb-4">
                {i % 2 === 0
                  ? "Fast fashion is the business model of replicating recent catwalk trends and high-fashion designs, mass-producing them at a low cost, and bringing them to retail quickly while demand is at its highest."
                  : "Deforestation or forest clearance is the removal and destruction of a forest or stand of trees from land that is then converted to non-forest use. Deforestation can involve conversion of forest land to farms, ranches, or urban use."}
              </p>
              <a
                href="#"
                class="text-greenDeep bg-greenPale px-4 py-2 text-sm rounded hover:bg-greenDeep hover:text-greenPale transition-all"
              >
                📖 Click here to find out more
              </a>
            </div>
          </div>
        {/each}
      </div>

      <!-- Bottom Row of 4 Articles -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each [5, 6, 7, 8] as i}
          <div class="bg-greenLight rounded-lg shadow-md overflow-hidden">
            <!-- <img
              src={/path-to-image-placeholder-${i}.png}
              alt="Article Image"
              class="w-full h-40 object-cover"
            /> -->
            <div class="p-4">
              <h2 class="text-greenDeep font-bold text-lg mb-2">
                {i % 2 === 0 ? "Fast fashion" : "Deforestation"}
              </h2>
              <p class="text-greenDeep text-sm mb-4">
                {i % 2 === 0
                  ? "Fast fashion is the business model of replicating recent catwalk trends and high-fashion designs, mass-producing them at a low cost, and bringing them to retail quickly while demand is at its highest."
                  : "Deforestation or forest clearance is the removal and destruction of a forest or stand of trees from land that is then converted to non-forest use. Deforestation can involve conversion of forest land to farms, ranches, or urban use."}
              </p>
              <a
                href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwirps2D1YyKAxWuqIMHHcTLOaUYABAAGgJlZg&ae=2&aspm=1&co=1&ase=2&gclid=CjwKCAiA9bq6BhAKEiwAH6bqoD1LH98ddTJ91ylah804TVaBb_3tljEI6ciNvN7rA6xXdRKG2wPAdxoCVysQAvD_BwE&ohost=www.google.com&cid=CAESVeD2JCcjLsqxLhghD3MYGU0fhIVKYb9mBjlw8XWwCB5aIsoaCzoGAW3XZdEAywSTNikasFYMQ9f0XtvIxSMK2uIl1cXPMMuX4eQ2B4ECaopVVzQgiDQ&sig=AOD64_03YqKMuuiOkXDdW89FUjxmcqx6Rg&q&nis=4&adurl&ved=2ahUKEwjGiMWD1YyKAxVY9bsIHV8LJu8Q0Qx6BAgNEAE"
                class="text-greenDeep bg-greenPale px-4 py-2 text-sm rounded hover:bg-greenDeep hover:text-greenPale transition-all"
              >
                📖 Click here to find out more
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
