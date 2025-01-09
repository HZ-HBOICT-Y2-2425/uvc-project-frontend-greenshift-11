<script>
  import { onMount } from "svelte";
  import { isMusicEnabled, volumeLevel } from "$lib/stores/musicStore.js";
  import { notifications } from "$lib/stores/notificationStore.js";
  let emailNotifications = false;
  let pushNotifications = false;
  let activeSection = "account";
  let userName = "";
  let userEmail = "";
  let showConfirmDialog = false;
  let showSuccessDialog = false;
  // Local volume state that syncs with the store
  let volume;
  // Subscribe to the volume store to keep local state in sync
  volumeLevel.subscribe((value) => {
    volume = value;
  });

  
  // Volume Change Handler
  const handleVolumeChange = (event) => {
    volume = parseInt(event.target.value);
    volumeLevel.set(volume);
  };

  // Music Toggle Handler
  const handleMusicToggle = (event) => {
    const newValue = event.target.checked;
    console.log("Toggling music to:", newValue);
    isMusicEnabled.set(newValue);
  };
  // Function to confirm account changes
  const confirmChanges = async () => {
    // Save the updated user details
    try {
      const response = await fetch(
        `${BASE_URL}auth/users/${localStorage.getItem("username")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            name: userName,
            email: userEmail,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.user.user !== localStorage.getItem("username")) {
          localStorage.setItem("username", result.user.user);
        }
        showConfirmDialog = false;
        showSuccessDialog = true;
        setTimeout(() => {
          showSuccessDialog = false;
        }, 3000);
      } else {
        console.error("Error updating user data:", await response.json());
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  // Cancel the confirmation dialog
  const cancelChanges = () => {
    showConfirmDialog = false;
  };
  const BASE_URL = "http://localhost:3010/";
  const fetchUserData = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await fetch(`${BASE_URL}auth/users/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        userName = userData.user.user;
        userEmail = userData.user.email;
      } else {
        console.error("Failed to fetch user data:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  onMount(() => {
    fetchUserData();
  });
  function handleSubmit(event) {
    event.preventDefault();
    // Show the confirmation dialog instead of notification
    showConfirmDialog = true;
    // Save the settings (add your API call here)
    notifications.add("Settings saved successfully!", "success");
    if (pushNotifications) {
      // Demo notifications
      setTimeout(() => {
        notifications.add("Time to water your plants! 🌱", "info");
      }, 2000);
      setTimeout(() => {
        notifications.add(
          "Check out new eco-friendly products in the shop! 🛍️",
          "info"
        );
      }, 5000);
    }
  }
  // Example function to trigger demo notifications
  function triggerDemoNotification() {
    const types = ["success", "error", "warning", "info"];
    const messages = [
      "🌱 Remember to water your plants!",
      "🌍 You reduced your CO2 emissions by 5kg today!",
      "🛍️ New sustainable products in the shop!",
      "📅 Garden maintenance scheduled for tomorrow",
      "🌿 Your tomato plants need attention",
    ];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    notifications.add(randomMessage, randomType);
  }
  // Logout handler
  const handleLogout = () => {
    // Clear the session data
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    // Redirect to the login page
    window.location.href = "/"; // Redirect to the login page
  };
</script>

<div class="flex h-full">
  <!-- Sidebar -->
  <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg bg-greenLight h-full">
    <div class="h-full px-3 py-4 overflow-y-auto">
      <h2 class="text-xl font-bold mb-6 text-center">Settings</h2>
      <ul class="space-y-4">
        <li>
          <a
            href="#"
            class="block p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "account"}
            class:text-white={activeSection === "account"}
            class:font-bold={activeSection === "account"}
            on:click={() => (activeSection = "account")}
          >
            Account
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "notifications"}
            class:text-white={activeSection === "notifications"}
            class:font-bold={activeSection === "notifications"}
            on:click={() => (activeSection = "notifications")}
          >
            Notifications
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "sounds"}
            class:text-white={activeSection === "sounds"}
            class:font-bold={activeSection === "sounds"}
            on:click={() => (activeSection = "sounds")}
          >
            Sounds
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "content-preferences"}
            class:text-white={activeSection === "content-preferences"}
            class:font-bold={activeSection === "content-preferences"}
            on:click={() => (activeSection = "content-preferences")}
          >
            Content Preferences
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "about-app"}
            class:text-white={activeSection === "about-app"}
            class:font-bold={activeSection === "about-app"}
            on:click={() => (activeSection = "about-app")}
          >
            About App
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-grow ml-64 p-8">
    <!-- Account Settings -->
    {#if activeSection === "account"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">Account Settings</h3>
      <p>Manage your account details below.</p>
      <form class="space-y-6" on:submit={handleSubmit}>
        <div>
          <label for="fullName" class="block text-lg font-semibold">Name</label>
          <input
            type="text"
            id="fullName"
            class="w-full p-3 border rounded-md"
            placeholder="Enter your full name"
            bind:value={userName}
          />
        </div>
        <div>
          <label for="email" class="block text-lg font-semibold"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            class="w-full p-3 border rounded-md"
            placeholder="Enter your email address"
            bind:value={userEmail}
          />
        </div>
        <button
          type="submit"
          class="bg-greenDeep text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>

      {#if showConfirmDialog}
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-8 max-w-md w-11/12 mx-4">
            <h3 class="text-xl font-bold mb-4">Confirm Changes</h3>
            <div class="space-y-4 mb-6">
              <p>Are you sure you want to update your account information?</p>
              <div class="bg-gray-50 p-4 rounded-md">
                <p class="mb-2">
                  <span class="font-semibold">New Name:</span>
                  {userName}
                </p>
                <p>
                  <span class="font-semibold">New Email:</span>
                  {userEmail}
                </p>
              </div>
            </div>
            <div class="flex justify-end space-x-4">
              <button on:click={cancelChanges} class="text-gray-500"
                >Cancel</button
              >
              <button on:click={confirmChanges} class="bg-greenDeep rounded-md p-4 text-white"
                >Confirm</button
                >
            </div>
          </div>
        </div>
      {/if}

      {#if showSuccessDialog}
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg p-8 max-w-md w-11/12 mx-4">
            <h3 class="text-xl font-bold mb-4">Success!</h3>
            <p>Your changes have been saved successfully.</p>
            <div class="flex justify-end mt-6">
              <button
                on:click={() => (showSuccessDialog = false)}
                class="text-gray-500">Close</button
              >
            </div>
          </div>
        </div>
      {/if}
      <!-- Logout Button inside the Account Section -->
      <div class="fixed bottom-8 right-4 pb-16">
        <button
          on:click={handleLogout}
          class="bg-red-500 text-white px-6 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    {/if}

    <!--Notifications-->
    {#if activeSection === "notifications"}
      <div class="p-6">
        <h3 class="text-2xl font-bold text-greenDeep mb-4">
          Notification Settings
        </h3>
        <p class="mb-6">Manage your notification settings below.</p>
        <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
          <div class="flex items-center space-x-2">
            <label for="push-notifications" class="text-lg font-semibold">
              Push Notifications
            </label>
            <input
              type="checkbox"
              id="push-notifications"
              bind:checked={pushNotifications}
              class="form-checkbox h-5 w-5 text-greenDeep rounded border-gray-300"
            />
          </div>
          <div class="space-y-4">
            <button
              type="submit"
              class="bg-greenDeep text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Save Settings
            </button>
            <!-- Demo button - remove in production -->
            <button
              type="button"
              on:click={triggerDemoNotification}
              class="ml-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Test Notification
            </button>
          </div>
        </form>
      </div>
    {/if}

    <!--Sound settings-->
    {#if activeSection === "sounds"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">Sound Settings</h3>
      <div class="space-y-6">
        <div>
          <label for="volume" class="block text-lg font-semibold mb-2"
            >Volume</label
          >
          <input
            type="range"
            id="volume"
            min="0"
            max="100"
            step="1"
            bind:value={volume}
            on:input={handleVolumeChange}
            class="w-full"
          />
          <p class="mt-2">Volume: {volume}%</p>
        </div>
        <div class="flex items-center space-x-2">
          <label for="music-toggle" class="text-lg font-semibold"
            >Enable Music</label
          >
          <input
            type="checkbox"
            id="music-toggle"
            checked={$isMusicEnabled}
            on:change={(e) => {
              isMusicEnabled.set(e.target.checked);
              console.log("Checkbox changed:", e.target.checked);
            }}
            class="form-checkbox h-5 w-5"
          />
        </div>
        <p class="text-sm text-gray-600">
          Current music state: {$isMusicEnabled ? "Enabled" : "Disabled"}
        </p>
      </div>
    {/if}

    <!--Content preferences-->
    {#if activeSection === "content-preferences"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">
        Content Preferences
      </h3>
      <p>Set your content preferences here.</p>

      <form class="space-y-6">
        <!-- Content Type -->
        <div>
          <label for="contentType" class="block text-lg font-semibold"
            >Preferred Content Type</label
          >
          <select id="contentType" class="w-full p-3 border rounded-md">
            <option value="all">All</option>
            <option value="articles">Articles</option>
            <option value="videos">Videos</option>
            <option value="news">News</option>
          </select>
        </div>

        <!-- Content Filter -->
        <div>
          <label for="contentFilter" class="block text-lg font-semibold"
            >Content Filter</label
          >
          <input
            type="text"
            id="contentFilter"
            class="w-full p-3 border rounded-md"
            placeholder="Search content..."
          />
        </div>

        <button
          type="submit"
          class="bg-greenDeep text-white px-4 py-2 rounded-md"
          >Save Content Preferences</button
        >
      </form>
    {/if}

    <!--About app-->
    {#if activeSection === "about-app"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">About App</h3>

      <ul class="space-y-4">
        <li>
          <a
            href="https://github.com/HZ-HBOICT-Y2-2425/uvc-project-frontend-greenshift-11/wiki/ToS"
            target="_blank"
            class="text-blue-500 font-bold">Terms of Service</a
          >
          <p>Check our ToS.</p>
        </li>
        <li>
          <a
            href="https://github.com/HZ-HBOICT-Y2-2425/uvc-project-frontend-greenshift-11/discussions/19"
            target="_blank"
            class="text-blue-500 font-bold"
            >Contact Support
          </a>
          <p>Post your questions on our GitHub discussions!</p>
        </li>
        <li>
          <a
            href="https://github.com/HZ-HBOICT-Y2-2425/uvc-project-frontend-greenshift-11/releases"
            target="_blank"
            class="text-blue-500 font-bold">App Version: 1.0.0</a
          >
          <p>Our Releases and App versions.</p>
        </li>
      </ul>
    {/if}
  </main>
</div>