<script>
  import "../app.css";
  // @ts-ignore
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  /** @type {{ id: number; brand: string; type: string; description: string; hoursPerWeek: number }[]} */
  let appliances = [];
  let isAuthenticated = false;
  let activeSection = '';

  onMount(() => {
    const token = localStorage.getItem("authToken");
    const currentPath = $page.url.pathname;
    const publicPages = ["/", "/login", "/signup", "/questions", "/thank-you"];

    if (!token) {
      // Redirect to login if no token exists and not on a public page
      if (!publicPages.includes(currentPath)) {
        window.location.href = "/login";
      }
    } else {
      // Validate the token
      validateToken(token).then((valid) => {
        if (valid) {
          isAuthenticated = true;
          // Set active section based on current path
          setActiveSection(currentPath);
        } else {
          // Token is invalid, clear it and redirect to login
          localStorage.removeItem("authToken");
          if (!publicPages.includes(currentPath)) {
            window.location.href = "/login";
          }
        }}
      )}
      
    });
  const fetchAppliances = async () => {
    try {
        const response = await fetch("http://localhost:3010/appliances");
        if (response.ok) {
          appliances = await response.json();
        } else {
          console.error("Failed to fetch appliances");
        }
      } catch (error) {
        console.error("Error fetching appliances:", error);
      }
    };

  // @ts-ignore
  const validateToken = async (token) => {
    try {
      const response = await fetch("http://localhost:3010/auth/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  };

  // @ts-ignore
  const setActiveSection = (path) => {
    switch(path) {
      case '/home':
        activeSection = 'Your Garden';
        break;
      case '/articles':
        activeSection = 'Articles';
        break;
      case '/co2':
        activeSection = 'CO2';
        break;
      case '/shop':
        activeSection = 'Shop';
        break;
      case '/settings':
        activeSection = 'Settings';
        break;
      case '/calendar':
        activeSection = 'Calendar';
        break;
      default:
        activeSection = 'GreenShift';
    }
  };

 // @ts-ignore
   $: setActiveSection($page.url.pathname);

  $: isMainPage = $page.url.pathname === "/";
  $: isSignupPage = $page.url.pathname === "/signup";
  $: isLoginPage = $page.url.pathname === "/login";
  $: isQuestionPage = $page.url.pathname === "/questions";
  $: isThankYouPage = $page.url.pathname === "/thank-you";
</script>

{#if isAuthenticated}
  {#if !isMainPage && !isSignupPage && !isLoginPage && !isQuestionPage && !isThankYouPage}
    <div class="fixed inset-0 flex flex-col bg-greenDeep">
      <!-- Header (Sticky) -->
      <header class="bg-greenDeep text-white py-4 shadow-lg z-50">
        <div class="container mx-auto text-center px-4">
          <h1 class="text-2xl font-bold sm:text-3xl transition-all duration-300 ease-in-out">
            {activeSection}
          </h1>
        </div>
      </header>

      <!-- Page Content (Full Screen) -->
      <main class="flex-grow overflow-auto bg-greenPale">
        <div class="h-full w-full">
          <slot></slot>
        </div>
      </main>

      <!-- Footer (Sticky) -->
      <footer class="bg-greenDeep text-white py-4 z-50">
        <div class="flex justify-center items-center gap-4 sm:gap-6">
          {#each [
            { href: "/home", src: "home.png", alt: "Home" },
            { href: "/articles", src: "articles.png", alt: "Articles" },
            { href: "/co2", src: "CO2.png", alt: "CO2 Info" },
            { href: "/shop", src: "shop.png", alt: "Shop" },
            { href: "/calendar", src: "calendar.png", alt: "Calendar" },
            { href: "/settings", src: "profile.png", alt: "Settings" }
          ] as item}
            <a 
              href={item.href} 
              class="text-white opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                class="w-10 sm:w-14 h-auto"
              />
            </a>
          {/each}
        </div>
      </footer>
    </div>
  {/if}
{/if}

{#if isMainPage || isSignupPage || isLoginPage || isQuestionPage || isThankYouPage}
  <!-- The Custom layout  -->
  <slot />
{/if}

{#if $page.url.pathname.startsWith('/co2')}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div class="flex h-screen mx-0 my-0 p-0">
    <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg transition-all h-100%">
      <nav class="text-xl">
        <h1 class="text-white text-lg font-bold mb-2">Manage appliances</h1>
        <h2 class="block text-white text-base font-bold mt-4 hover:underline">All appliances</h2>
        
        <!-- Show appliance links if there are appliances available -->
        {#if appliances.length > 0}
          
          {#each appliances as appliance}
            <p>
              <a 
                class="block text-white text-sm hover:underline" 
                href={`/co2/appliance`}
              >
                {appliance.brand} {appliance.type}
              </a>
            </p>
          {/each}
        {:else}
          <p><a class="block text-white text-sm hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance first</a></p>
        {/if}

        <h1><a class="block text-white text-base font-bold mt-4 hover:underline" id="addapp" href="/co2/addAppliance">Add an appliance</a></h1>
      </nav>
    </aside>
  </div>
{/if}