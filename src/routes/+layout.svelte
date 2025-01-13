<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { isMusicEnabled, volumeLevel, selectedTrack } from '../lib/stores/musicStore.js'; // Changed selectedMusic to selectedTrack
  import ToastContainer from '../components/ToastContainer.svelte';
  import BackgroundMusic from "../components/BackgroundMusic.svelte";

  let isAuthenticated = false;
  let activeSection = '';
  let streakCount = 0;
  let showStreakTooltip = false;
  let quotes = [];
  let currentQuote = ""; // Displayed quote
  
  // Audio-related variables
  let audio;
  let currentTime = 0;

  // Store the current time whenever it changes
  function handleTimeUpdate() {
    currentTime = audio?.currentTime || 0;
  }

  const fetchQuotes = async () => {
  try {
    const response = await fetch("https://uvc-project-backend-greenshift-11-quote.onrender.com/api/quotes");
    if (response.ok) {
      quotes = await response.json();
      startQuoteLoop();
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
};

      // Displays quotes on a 5-second interval
      function startQuoteLoop() {
    if (quotes.length > 0) {
      let index = 0;
      currentQuote = quotes[index] || "Loading...";

      setInterval(() => {
        index = (index + 1) % quotes.length; // Loop through the quotes
        currentQuote = quotes[index];
      }, 10000);
    }
  }

const fetchStreakCount = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await fetch(`https://uvc-project-backend-greenshift-11.onrender.com/auth/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        streakCount = data.user.streakCount; // Update the streakCount
      } else {
        console.error("Failed to fetch streak count");
      }
    } catch (error) {
      console.error("Error fetching streak count:", error);
    }
  };

  onMount(() => {
    const token = localStorage.getItem("authToken");
    const currentPath = $page.url.pathname;
    const publicPages = ["/", "/login", "/signup", "/questions", "/thank-you"];

    fetchQuotes();

    // Audio initialization
    if (audio) {
      audio.currentTime = currentTime;
      audio.volume = $volumeLevel / 100;

      if ($isMusicEnabled && $selectedTrack) {
        audio.src = $selectedTrack;  // Update the audio source based on selected track
        audio.play().catch(err => {
          console.log('Auto-play prevented:', err);
          isMusicEnabled.set(false);
        });
      }
    }

    if (!token) {
      if (!publicPages.includes(currentPath)) {
        window.location.href = "/login";
      }
    } else {
      validateToken(token).then(async (valid) => {
        if (valid) {
          isAuthenticated = true;
          setActiveSection(currentPath);
          fetchStreakCount();
        } else {
          localStorage.removeItem("authToken");
          if (!publicPages.includes(currentPath)) {
            window.location.href = "/login";
          }
        }
      });
    }



    // Cleanup on unmount
    return () => {
      if (audio) {
        currentTime = audio.currentTime;
        audio.pause();
      }
    };
  });

  const validateToken = async (token) => {
    try {
      const response = await fetch("https://uvc-project-backend-greenshift-11.onrender.com/auth/validate-token", {
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
      case '/leaderboard':
        activeSection = 'Leaderboard';
        break;
      default:
        activeSection = 'GreenShift';
    }
  };

  // Audio reactive statements
  $: if (audio && $isMusicEnabled && $selectedTrack) {
    audio.src = $selectedTrack;  // Dynamically set the music source from settings
    audio.play().catch(err => {
      console.log('Play prevented:', err);
      isMusicEnabled.set(false);
    });
  }

  $: if (audio && !$isMusicEnabled) {
    audio.pause();
  }

  $: if (audio) {
    audio.volume = $volumeLevel / 100;
  }

  $: setActiveSection($page.url.pathname);

  $: isMainPage = $page.url.pathname === "/";
  $: isSignupPage = $page.url.pathname === "/signup";
  $: isLoginPage = $page.url.pathname === "/login";
  $: isQuestionPage = $page.url.pathname === "/questions";
  $: isThankYouPage = $page.url.pathname === "/thank-you";
</script>

<BackgroundMusic />

<!-- Audio element -->
<audio
  bind:this={audio}
  preload="auto"
  loop
  on:timeupdate={handleTimeUpdate}
></audio>

<ToastContainer />

{#if isAuthenticated}
  {#if !isMainPage && !isSignupPage && !isLoginPage && !isQuestionPage && !isThankYouPage}
    <div class="fixed inset-0 flex flex-col bg-greenDeep">
      <!-- Header (Sticky) -->
      <header class="bg-greenDeep text-white py-4 shadow-lg z-50">
        <div class="container mx-auto text-center px-4">
          <h1 class="text-2xl font-bold sm:text-3xl transition-all duration-300 ease-in-out">
            {activeSection}
          </h1>
          <div class="mt-2 text-sm text-green-100 italic">
            <p>"{currentQuote}"</p>
          </div>
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
            { href: "/home", src: "/home.png", alt: "Home" },
            { href: "/articles", src: "/articles.png", alt: "Articles" },
            { href: "/co2", src: "/CO2.png", alt: "CO2 Info" },
            { href: "/shop", src: "/shop.png", alt: "Shop" },
            { href: "/calendar", src: "/calendar.png", alt: "Calendar" },
            { href: "/settings", src: "/profile.png", alt: "Settings", showStreak: true }, 
            { href: "/leaderboard", src: "/leaderboard.png", alt: "Leaderboard" }
          ] as item}
            <div class="relative">
              <a href={item.href} class="text-white opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out transform hover:scale-110">
                <img src={item.src} alt={item.alt} class="w-10 sm:w-14 h-auto"/>
              </a>
              <!-- Streak Badge -->
              {#if item.showStreak && streakCount > 0}
              <div class="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center" role="tooltip" on:mouseenter={() => (showStreakTooltip = true)} on:mouseleave={() => (showStreakTooltip = false)}>
                {streakCount}
              </div>
              {/if}
            </div>
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


    <!-- Tooltip -->
{#if showStreakTooltip}
<div class="absolute bottom-20 left-[50%] transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-2 z-50">
  Complete all your tasks daily to maintain your streak!
</div>
{/if}

<style>
  audio {
    display: none;
  }
</style>
