<script>
  import "../app.css";
  function gotoSignup() {
    window.location.href = '/signup';
  }
  function gotoLogin() {
    window.location.href = '/login';
  }
</script>

<div class="flex flex-col sm:flex-row min-h-screen bg-gray-100">
  <!-- Left Side: Content/Illustration -->
  <div class="sm:w-1/2 w-full bg-gradient-to-r from-greenLight to-greenDeep text-white p-8 sm:p-12 flex flex-col justify-center">
    <div class="max-w-md mx-auto text-center sm:text-left">
      <h1 class="text-3xl sm:text-4xl font-bold leading-tight mb-4 font-serif hover:italic">
        Welcome to GreenShift
      </h1>
      <p class="text-base sm:text-lg mb-8 font-mono">
        The place where you are made aware of your energy usage and CO2 footprint
      </p>
    </div>
  </div>

  <!-- Right Side: Signup and Login Buttons -->
  <div class="sm:w-1/2 w-full bg-gradient-to-r from-greenDeep to-greenLight p-8 sm:p-12 flex flex-col justify-center space-y-4">
    <button
      on:click={gotoLogin}
      type="submit"
      class="bg-white hover:bg-gray-200 text-slate-950 font-bold py-2 px-10 sm:px-20 rounded flex items-center justify-center space-x-2"
    >
      <img src="login-removebg-preview.png" alt="login" class="h-5 sm:h-6 w-5 sm:w-6">
      <span>Login</span>
    </button>

    <button
      on:click={gotoSignup}
      type="submit"
      class="bg-black hover:bg-blue-900 text-white font-bold py-2 px-10 sm:px-20 rounded flex items-center justify-center space-x-2"
    >
      <img src="really-removebg-preview.png" alt="signup" class="h-5 sm:h-6 w-5 sm:w-6">
      <span>Sign up</span>
    </button>
  </div>
</div>