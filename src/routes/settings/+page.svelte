<script>
  import { onMount } from 'svelte';
    import { on } from 'svelte/events';

  // Sidebar state
  let activeSection = "account"; // Default active section

  // Content type dropdown state
  let contentType = "all";
  $: taskSelected = contentType === "tasks";

  // get all task gategories
   // Task categories
  let taskCategories = [];
  async function getTaskCategories() {
    try {
      const response = await fetch("http://localhost:3011/api/tasks");
      if (response.ok) {
        const data = await response.json();
        return data.categories;
      } else {
        console.error("Failed to fetch task categories.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching task categories:", error);
      return [];
    }
  }
  onMount(async () => {
    taskCategories = await getTaskCategories();
  });

</script>


  <div class="flex-grow flex">

    <!-- Sidebar -->
    <aside class="w-1/4 bg-sideBarGreen p-3 shadow-lg bg-greenLight h-full flex-grow-0">
      <div class="h-full px-3 py-4 overflow-y-auto">
        <h2 class="text-xl font-bold mb-6 text-center">Settings</h2>
        <ul class="space-y-4">
          <li
            class="p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "account"}
            class:text-white={activeSection === "account"}
            class:font-bold={activeSection === "account"}
          >
            <a href="#" on:click={() => (activeSection = "account")}>Account</a>
          </li>
          <li
            class="p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "notifications"}
            class:text-white={activeSection === "notifications"}
            class:font-bold={activeSection === "notifications"}
          >
            <a href="#" on:click={() => (activeSection = "notifications")}>Notifications</a>
          </li>
          <li
            class="p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "sounds"}
            class:text-white={activeSection === "sounds"}
            class:font-bold={activeSection === "sounds"}
          >
            <a href="#" on:click={() => (activeSection = "sounds")}>Sounds</a>
          </li>
          <li
            class="p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "content-preferences"}
            class:text-white={activeSection === "content-preferences"}
            class:font-bold={activeSection === "content-preferences"}
          >
            <a href="#" on:click={() => (activeSection = "content-preferences")}>Content Preferences</a>
          </li>
          <li
            class="p-2 rounded hover:bg-greenDeep hover:text-white"
            class:bg-greenDeep={activeSection === "about-app"}
            class:text-white={activeSection === "about-app"}
            class:font-bold={activeSection === "about-app"}
          >
            <a href="#" on:click={() => (activeSection = "about-app")}>About App</a>
          </li>
        </ul>
      </div>
    </aside>

  
  <!-- Main Content -->
  <main class="flex-grow ml-64 p-8">
    <!-- Conditional rendering based on activeSection -->
    <!--Account settings-->
    {#if activeSection === "account"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">Account Settings</h3>
      <p>Manage your account details below.</p>

      <form class="space-y-6">
        <!-- Full Name -->
        <div>
          <label for="fullName" class="block text-lg font-semibold"
            >Full Name</label
          >
          <input
            type="text"
            id="fullName"
            class="w-full p-3 border rounded-md"
            placeholder="Enter your full name"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-lg font-semibold"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            class="w-full p-3 border rounded-md"
            placeholder="Enter your email address"
          />
        </div>

        <!-- Change Password -->
        <div>
          <label for="currentPassword" class="block text-lg font-semibold"
            >Current Password</label
          >
          <input
            type="password"
            id="currentPassword"
            class="w-full p-3 border rounded-md"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label for="newPassword" class="block text-lg font-semibold"
            >New Password</label
          >
          <input
            type="password"
            id="newPassword"
            class="w-full p-3 border rounded-md"
            placeholder="Enter a new password"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-lg font-semibold"
            >Confirm New Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            class="w-full p-3 border rounded-md"
            placeholder="Re-enter new password"
          />
        </div>

        <button
          type="submit"
          class="bg-greenDeep text-white px-4 py-2 rounded-md"
          >Save Changes</button
        >
      </form>
    {/if}
    
    <!--Notification settings-->
    {#if activeSection === "notifications"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">
        Notification Settings
      </h3>
      <p>Manage your notifications preferences here.</p>

      <form class="space-y-6">
        <!-- Email Notifications -->
        <div>
          <label class="block text-lg font-semibold">Email Notifications</label>
          <div class="flex items-center">
            <input type="checkbox" id="emailNotifications" class="mr-2" />
            <label for="emailNotifications"
              >Receive notifications via email</label
            >
          </div>
        </div>

        <!-- Push Notifications -->
        <div>
          <label class="block text-lg font-semibold">Push Notifications</label>
          <div class="flex items-center">
            <input type="checkbox" id="pushNotifications" class="mr-2" />
            <label for="pushNotifications"
              >Receive notifications on your device</label
            >
          </div>
        </div>

        <!-- Sounds -->
        <div>
          <label class="block text-lg font-semibold">Sound Alerts</label>
          <div class="flex items-center">
            <input type="checkbox" id="soundNotifications" class="mr-2" />
            <label for="soundNotifications"
              >Play sound when a new notification arrives</label
            >
          </div>
        </div>

        <button
          type="submit"
          class="bg-greenDeep text-white px-4 py-2 rounded-md"
          >Save Notification Settings</button
        >
      </form>
    {/if}

    <!--Sound settings-->
    {#if activeSection === "sounds"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">Sound Settings</h3>
      <p>Manage your sound preferences here.</p>

      <form class="space-y-6">
        <!-- Sound Volume -->
        <div>
          <label for="soundVolume" class="block text-lg font-semibold"
            >Sound Volume</label
          >
          <input
            type="range"
            id="soundVolume"
            min="0"
            max="100"
            class="w-full"
          />
          <div class="flex justify-between">
            <span>Low</span><span>High</span>
          </div>
        </div>

        <!-- Notification Sounds -->
        <div>
          <label class="block text-lg font-semibold">Notification Sounds</label>
          <select id="notificationSounds" class="w-full p-3 border rounded-md">
            <option value="default">Default</option>
            <option value="chime">Chime</option>
            <option value="beep">Beep</option>
          </select>
        </div>

        <button
          type="submit"
          class="bg-greenDeep text-white px-4 py-2 rounded-md"
          >Save Sound Settings</button
        >
      </form>
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
          <label for="contentType" class="block text-lg font-semibold">Preferred Content Type</label>
          <select id="contentType" bind:value={contentType} class="w-full p-3 border rounded-md">
            <option value="all">All</option>
            <option value="articles">Articles</option>
            <option value="videos">Videos</option>
            <option value="news">News</option>
            <option value="tasks">Tasks</option>
          </select>
        </div>

         <!-- Render tasks if "tasks" is selected -->
        {#if taskSelected}
          <h3 class="text-2xl font-bold text-greenDeep mb-4">Tasks</h3>
          <p>Choose a different task category <img id="question-mark" src="questionmark.png" alt="question mark" /></p>
  
          {#if taskCategories.length > 0}
            <ul class="space-y-4">
            {#each taskCategories as category}
              <li> <input type="checkbox" class="h-5 w-5 mt-1 text-green-600" /> {category}</li> 
            {/each}
            </ul>
          {:else}
            <p>Loading categories...</p>
         {/if}
        {/if}

        <!-- Content Filter -->
        <div>
          <label for="contentFilter" class="block text-lg font-semibold">Content Filter</label>
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
        <li><a href="https://github.com/HZ-HBOICT-Y2-2425/uvc-project-frontend-greenshift-11/wiki/ToS" target="_blank" class="text-blue-500 font-bold">Terms of Service</a>
        <p> Check our ToS. </p></li>
        <li><a href="https://github.com/HZ-HBOICT-Y2-2425/uvc-project-frontend-greenshift-11/discussions/19" target="_blank" class="text-blue-500 font-bold">Contact Support </a>
        <p> Post your questions on our GitHub discussions! </p> </li>
        <li><a href="https://github.com/HZ-HBOICT-Y2-2425/uvc-project-frontend-greenshift-11/releases" target="_blank" class="text-blue-500 font-bold">App Version: 1.0.0</a>
        <p> Our Releases and App versions. </p></li>
      </ul>
    {/if}
  </main>
</div>


