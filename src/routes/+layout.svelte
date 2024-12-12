<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let isAuthenticated = false;

  onMount(() => {
    const token = localStorage.getItem("authToken");
    const isLoginPage = $page.url.pathname === "/login";
    const isMainPage = $page.url.pathname === "/";
    const isSignupPage = $page.url.pathname === "/signup";
    const isQuestionPage = $page.url.pathname === "/questions";
    const isThankYouPage = $page.url.pathname === "/thank-you";

    if (!token) {
      // Redirect to login if no token exists and not already on the login page
      if (!isLoginPage && !isMainPage && !isSignupPage && !isQuestionPage && !isThankYouPage) {
        window.location.href = "/login";
      }
    } else {
      // Validate the token
      validateToken(token).then((valid) => {
        if (valid) {
          isAuthenticated = true;
        } else {
          // Token is invalid, clear it and redirect to login
          localStorage.removeItem("authToken");
          if (!isLoginPage && !isMainPage && !isSignupPage && !isQuestionPage && !isThankYouPage) {
            window.location.href = "/login";
          }
        }
      });
    }
  });

  const validateToken = async (token) => {
    try {
      const response = await fetch("http://localhost:3010/auth/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok; // Return true if status is 200
    } catch (error) {
      console.error("Token validation failed:", error);
      return false; // Return false if there is an error
    }
  };

  $: isMainPage = $page.url.pathname === "/";
  $: isSignupPage = $page.url.pathname === "/signup";
  $: isLoginPage = $page.url.pathname === "/login";
  $: isQuestionPage = $page.url.pathname === "/questions";
  $: isThankYouPage = $page.url.pathname === "/thank-you";
</script>

{#if isAuthenticated}
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
            {:else if $page.url.pathname === "/settings"}
              Setting
            {:else if $page.url.pathname === "/calendar"}
              Calendar
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
          <a href="/calendar" class="text-greenLight underline">
            <img src="calendar.png" alt="Calendar" class="w-14 h-auto" />
          </a>
          <a href="/settings" class="text-greenLight underline">
            <img src="profile.png" alt="Setting" class="w-14 h-auto" />
          </a>
        </div>
      </footer>
    </div>
  {/if}
{/if}

  {#if isMainPage || isSignupPage || isLoginPage || isQuestionPage || isThankYouPage}
    <!-- The Custom layout  -->
    <slot />
  {/if}

