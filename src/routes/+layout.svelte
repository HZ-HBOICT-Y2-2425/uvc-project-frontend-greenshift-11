<script>
    import "../app.css";
    import { page } from "$app/stores";
    $: isMainPage = $page.url.pathname === '/';
     $: isSignupPage = $page.url.pathname === '/signup';
     $: isLoginPage = $page.url.pathname === '/login';
     $: isQuestionPage = $page.url.pathname === '/questions';
     $: isThankYouPage = $page.url.pathname === '/thank-you'
  </script>
  
  {#if !isMainPage && !isSignupPage && !isLoginPage && !isQuestionPage && !isThankYouPage}
  <div class="min-h-screen flex flex-col bg-greenPale">
    <!-- Header -->
    <header class="bg-greenLight text-greenDeep py-4 shadow-md">
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
    <main class="flex-grow container mx-auto px-4 py-8 text-center sm:text-left">
      <slot></slot>
    </main>
  
    <!-- Footer -->
    <footer class="bg-greenDeep text-greenPale py-4">
      <div class="flex justify-center items-center gap-6 mt-4">
        <a href="/home" class="text-greenLight underline">
            <img src="home.png" alt="Home" class="w-14 h-auto" />
          </a>
        <a href="/articles" class="text-greenLight underline">
          <img src="articles.png" alt="Articles" class="w-14 h-auto" />
        </a>
        <a href="/co2" class="text-greenLight underline">
          <img src="CO2.png" alt="CO2 Info" class="w-14 h-auto" />
        </a>
        <a href="/shop" class="text-greenLight underline">
          <img src="shop.png" alt="Shop" class="w-14 h-auto" />
        </a>
        <a href="/setting" class="text-greenLight underline">
          <img src="profile.png" alt="Setting" class="w-14 h-auto" />
        </a>
      </div>
    </footer>
  </div>
  {/if}
  
  {#if isMainPage ||  isSignupPage || isLoginPage || isQuestionPage || isThankYouPage }
  <!-- The Custom layout  -->
  <slot />
{/if}