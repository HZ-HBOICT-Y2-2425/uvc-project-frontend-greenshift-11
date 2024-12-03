<script>
  import "../app.css"; // Ensure your styles are imported
  import { page } from "$app/stores";
  $: isMainPage = $page.url.pathname === '/';
  $: isSignupPage = $page.url.pathname === '/signup';
  $: isLoginPage = $page.url.pathname === '/login';
</script>

{#if !isMainPage && !isSignupPage && !isLoginPage}
<div class="flex flex-col h-screen bg-greenPale"> <!-- Keep your background color -->
  <!-- Header -->
  <header class="bg-greenLight text-greenDeep py-4 shadow-md w-100%s mx-0 h-15vh">
    <div class="container mx-auto text-center px-4">
      <h1 class="text-2xl font-bold sm:text-3xl">
        {#if $page.url.pathname === "/home"}
          Your Garden 🍌
        {:else if $page.url.pathname === "/articles"}
          Articles
        {:else if $page.url.pathname === "/co2"}
          CO2
        {:else if $page.url.pathname === "/shop"}
          Shop
        {:else if $page.url.pathname === "/setting"}
          Setting
        {:else}
          GreenShift
        {/if}
      </h1>
    </div>
  </header>

  <!-- Page Content -->
  <main class="mt-15vh h-70vh flex-grow container mx-0 px-0 py-0 text-center sm:text-left">
    <slot></slot>
  </main>

  <!-- Footer -->
  <footer class="bg-greenDeep text-greenPale h-15vh flex justify-center items-center">
    <div class="flex justify-center items-center gap-6">
      <a href="/home" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
        <img src="home.png" alt="Home" class="w-14 h-auto mb-1" />
        <span>Home</span>
      </a>
      <a href="/articles" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
        <img src="articles.png" alt="Articles" class="w-14 h-auto mb-1" />
        <span>Articles</span>
      </a>
      <a href="/co2" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
        <img src="CO2.png" alt="CO2 Info" class="w-14 h-auto mb-1" />
        <span>CO2</span>
      </a>
      <a href="/shop" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
        <img src="shop.png" alt="Shop" class="w-14 h-auto mb-1" />
        <span>Shop</span>
      </a>
      <a href="/setting" class="flex flex-col items-center text-greenLight hover:text-green-400 transition duration-300">
        <img src="setting.png" alt="Setting" class="w-14 h-auto mb-1" />
        <span>Settings</span>
      </a>
    </div>
  </footer>
</div>
{/if}

{#if isMainPage || isSignupPage || isLoginPage}
<!-- The Custom layout  -->
<slot />
{/if}