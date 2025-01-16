<script>
  import "../../app.css";
  import { onMount } from "svelte";

  let name = '';
  let password = '';
  let showPassword = false;
  let errorMessage = '';

  const BASE_URL = "https://uvc-project-backend-greenshift-11.onrender.com/auth";

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("authToken", data.accessToken); // Store token
            localStorage.setItem("username", data.username); // Store username
            window.location.href = "/home"; // Redirect to app's home page
        } else {
            const errorData = await response.json();
            errorMessage = errorData.message || "Login failed!";
        }
    } catch (error) {
        errorMessage = "Could not connect to the server.";
        console.error("Error:", error);
    }
};


  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-greenLight to-greenDeep">
  <div class="w-full max-w-lg p-8 rounded-md bg-black shadow-md">
    <h1 class="text-center font-bold text-3xl mb-8 text-greenDeep">Login</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-5">
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">
          Username
        </label>
        <input
          type="text"
          id="username"
          bind:value={name}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your username"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          bind:value={password}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="flex items-center space-x-2">
        <input
          id="show-password"
          type="checkbox"
          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          on:change={togglePasswordVisibility}
        />
        <label for="show-password" class="text-sm font-medium text-gray-900 dark:text-greenDeep">
          Show Password
        </label>
      </div>
      {#if errorMessage}
        <p class="text-red-500 text-sm">{errorMessage}</p>
      {/if}
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-20 rounded-full"
      >
        Login
      </button>
    </form>
  </div>
</div>
