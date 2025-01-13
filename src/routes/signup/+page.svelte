
<script>
  import "../../app.css";
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let showPassword = false;
  let isPasswordMatching = false; 
  let errorMessage = '';
  let successMessage = '';

  //base URL of the backend
  const BASE_URL = "http://localhost:3010/";
  

  // Function to handle the form submission
  const handleSubmit = async () => {
    // Send POST request to the backend
    try {
      const response = await fetch(`${BASE_URL}auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Send form data
      });

      if (response.ok) {
        const data = await response.json();
        successMessage = "User registered successfully!";
        console.log("Response from server:", data);

         // Save the username to localStorage
        localStorage.setItem("username", name);

        // Redirect the user to the questions page
        window.location.href = "/questions";
      } else {
        // Handle errors
        const errorText = await response.text(); 
        errorMessage = `Error: ${errorText}`;
        console.error(errorMessage);
      }
    } catch (error) {
      errorMessage = "Could not connect to the server.";
      console.error("Network error:", error);
    }
  };

 
  // Function to check if passwords match
  const validatePasswords = () => {
    isPasswordMatching = password === confirmPassword;
  };

  const togglePasswordVisibility = () => {
    showPassword = !showPassword; 
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-greenLight to-greenDeep">
  <div class="w-full max-w-lg p-8 rounded-md bg-black shadow-md">
    <h1 class="text-center font-bold text-3xl mb-8 text-greenDeep">Create Account</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-5">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Your email</label>
        <input type="email" id="email" bind:value={email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="hellothere25@gmail.com" required />
      </div>
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Username</label>
        <input type="text" id="username" bind:value={name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="trythisinnit" required />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Your password</label>
        <input type={showPassword ? 'text' : 'password'} id="password" bind:value={password} on:input={validatePasswords} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div>
        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Confirm password</label>
        <input type={showPassword ? 'text' : 'password'} id="confirm-password" bind:value={confirmPassword} on:input={validatePasswords} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="flex items-center space-x-2">
        <input id="show-password" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" on:change={togglePasswordVisibility} />
        <label for="show-password" class="text-sm font-medium text-gray-900 dark:text-greenDeep">Show password</label>
      </div>
      <div>
        {#if !isPasswordMatching && password.length > 0 && confirmPassword.length > 0}
          <p class="text-red-500 text-sm">Passwords do not match.</p>
        {/if}
      </div>
      <div>
        {#if errorMessage}
          <p class="text-red-500 text-sm">{errorMessage}</p>
        {/if}
        {#if successMessage}
          <p class="text-green-500 text-sm">{successMessage}</p>
        {/if}
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-20 rounded-full" disabled={!isPasswordMatching}>
        Sign up
      </button>
    </form>
  </div>
</div>
