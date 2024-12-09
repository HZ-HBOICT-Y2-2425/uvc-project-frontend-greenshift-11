<script>
  import "../../app.css";
  import { onMount } from "svelte";

  let isAuthenticated = false;

  onMount(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login if no token exists
      window.location.href = "/login";
    } else {
      // Optional: Validate the token with the backend
      validateToken(token).then((valid) => {
        if (!valid) {
          localStorage.removeItem("authToken"); // Remove invalid token
          window.location.href = "/login"; // Redirect to login
        } else {
          isAuthenticated = true;
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

</script>

{#if isAuthenticated}
  <!-- Page-Specific Content -->
  <!-- Image Section -->
  <section class="flex flex-col sm:flex-row justify-center items-center bg-blue-100 py-8 rounded-md shadow-md mx-4 sm:mx-0">
    <!-- <img src="something.png" alt="Garden Image" class="h-full max-h-40 object-contain"/> -->
  </section>

  <!-- Daily Tasks Section -->
  <section class="text-center px-4 py-6">
    <p class="text-base sm:text-lg font-medium">Do your Daily tasks,</p>
    <p class="text-greenDeep font-bold text-lg sm:text-xl">to keep your garden nice! 👀</p>
  </section>
{:else}
  <!-- Redirecting Spinner or Message -->
  <div class="text-center py-10">
    <p class="text-lg text-greenDeep">Redirecting to login...</p>
  </div>
{/if}


