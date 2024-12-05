<script>
  // Sidebar state
  let activeSection = "account"; // Default active section
</script>

<div class="min-h-screen flex bg-greenPale">
  <!-- Sidebar on the Left -->
  <aside class="bg-greenLight w-64 p-4 fixed top-0 left-0 bottom-0 shadow-lg">
    <div class="text-greenDeep font-semibold text-lg">
      <h2 class="text-xl font-bold mb-6 text-center">Settings</h2>
      <ul class="mt-4 space-y-4">
        <!-- Sidebar links with dynamic active class -->
        <li
          class="p-2 rounded"
          class:bg-greenDeep={activeSection === "account"}
          class:text-white={activeSection === "account"}
          class:font-bold={activeSection === "account"}
        >
          <!-- the # in the href is for now a stateholder so the page does not refresh itself-->
          <a href="#" on:click={() => (activeSection = "account")}>Account</a>
        </li>
        <li
          class="p-2 rounded"
          class:bg-greenDeep={activeSection === "privacy"}
          class:text-white={activeSection === "privacy"}
          class:font-bold={activeSection === "privacy"}
        >
          <!-- the # in the href is for now a stateholder so the page does not refresh itself-->
          <a href="#" on:click={() => (activeSection = "privacy")}>Privacy</a>
        </li>
        <li
          class="p-2 rounded"
          class:bg-greenDeep={activeSection === "notifications"}
          class:text-white={activeSection === "notifications"}
          class:font-bold={activeSection === "notifications"}
        >
          <!-- the # in the href is for now a stateholder so the page does not refresh itself-->
          <a href="#" on:click={() => (activeSection = "notifications")}
            >Notifications</a
          >
        </li>
        <li
          class="p-2 rounded"
          class:bg-greenDeep={activeSection === "sounds"}
          class:text-white={activeSection === "sounds"}
          class:font-bold={activeSection === "sounds"}
        >
          <!-- the # in the href is for now a stateholder so the page does not refresh itself-->
          <a href="#" on:click={() => (activeSection = "sounds")}>Sounds</a>
        </li>
        <li
          class="p-2 rounded"
          class:bg-greenDeep={activeSection === "appearance"}
          class:text-white={activeSection === "appearance"}
          class:font-bold={activeSection === "appearance"}
        >
          <!-- the # in the href is for now a stateholder so the page does not refresh itself-->
          <a href="#" on:click={() => (activeSection = "appearance")}
            >Appearance</a
          >
        </li>
        <li
          class="p-2 rounded"
          class:bg-greenDeep={activeSection === "content-preferences"}
          class:text-white={activeSection === "content-preferences"}
          class:font-bold={activeSection === "content-preferences"}
        >
          <!-- the # in the href is for now a stateholder so the page does not refresh itself-->
          <a href="#" on:click={() => (activeSection = "content-preferences")}
            >Content Preferences</a
          >
        </li>
        <li
          class="p-2 rounded"
          class:bg-greenDeep={activeSection === "about-app"}
          class:text-white={activeSection === "about-app"}
          class:font-bold={activeSection === "about-app"}
        >
          <!-- the # in the href is for now a stateholder so the page does not refresh itself-->
          <a href="#" on:click={() => (activeSection = "about-app")}
            >About App</a
          >
        </li>
      </ul>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-grow ml-64 p-8">
    <!-- Conditional rendering based on activeSection -->
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

    {#if activeSection === "privacy"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">Privacy Settings</h3>
      <p>Adjust your privacy preferences below.</p>

      <form class="space-y-6">
        <!-- Profile Visibility -->
        <div>
          <label class="block text-lg font-semibold">Profile Visibility</label>
          <div class="flex items-center">
            <label for="publicProfile" class="mr-4">Public</label>
            <input
              type="radio"
              name="profileVisibility"
              id="publicProfile"
              class="mr-2"
            />
            <label for="privateProfile" class="mr-4">Private</label>
            <input type="radio" name="profileVisibility" id="privateProfile" />
          </div>
        </div>

        <!-- Data Sharing -->
        <div>
          <label class="block text-lg font-semibold">Allow Data Sharing</label>
          <div class="flex items-center">
            <input type="checkbox" id="dataSharing" class="mr-2" />
            <label for="dataSharing"
              >Allow us to share your usage data with partners for improving the
              app</label
            >
          </div>
        </div>

        <button
          type="submit"
          class="bg-greenDeep text-white px-4 py-2 rounded-md"
          >Save Privacy Settings</button
        >
      </form>
    {/if}

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

    {#if activeSection === "appearance"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">
        Appearance Settings
      </h3>
      <p>Customize the appearance of the app to suit your preferences.</p>

      <form class="space-y-6">
        <!-- Dark Mode -->
        <div>
          <label class="block text-lg font-semibold">Enable Dark Mode</label>
          <div class="flex items-center">
            <input type="checkbox" id="darkMode" class="mr-2" />
            <label for="darkMode">Switch to dark theme</label>
          </div>
        </div>

        <!-- Font Size -->
        <div>
          <label for="fontSize" class="block text-lg font-semibold"
            >Font Size</label
          >
          <select id="fontSize" class="w-full p-3 border rounded-md">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button
          type="submit"
          class="bg-greenDeep text-white px-4 py-2 rounded-md"
          >Save Appearance Settings</button
        >
      </form>
    {/if}

    {#if activeSection === "content-preferences"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">
        Content Preferences
      </h3>
      <p>Set your content preferences here.</p>

      <form class="space-y-6">
        <!-- Content Type -->
        <div>
          <label class="block text-lg font-semibold"
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
          <label class="block text-lg font-semibold">Content Filter</label>
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

    {#if activeSection === "about-app"}
      <h3 class="text-2xl font-bold text-greenDeep mb-4">About App</h3>
      <p>Learn more about the app and access important information below.</p>

      <ul class="space-y-4">
        <li><a href="#" class="text-blue-500">Privacy Policy</a></li>
        <li><a href="#" class="text-blue-500">Terms of Service</a></li>
        <li><a href="#" class="text-blue-500">Contact Support</a></li>
        <li><a href="#" class="text-blue-500">App Version: 1.0.0</a></li>
      </ul>
    {/if}
  </main>
</div>
