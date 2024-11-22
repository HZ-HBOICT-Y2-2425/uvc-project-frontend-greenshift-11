<script>
  import "../app.css";
  function gotoSignup() {
      window.location.href = '/signup';
  }
  function gotoLogin() {
      window.location.href = '/login';
  }
</script>

<div class="flex min-h-screen bg-gray-100">
<!-- Left Side: Content/Illustration -->
<div class="w-1/2 bg-gradient-to-r from-greenLight to-greenDeep text-white p-12 flex flex-col justify-center">
  <div class="max-w-md mx-auto text-center">
    <h1 class="text-4xl font-bold leading-tight mb-4 font-serif hover:italic">
     Welcome to GreenShift
    </h1>
    <p class="text-lg mb-8 font-mono">
      The app that makes you aware of your energy useage and CO2 footprint
    </p>
  </div>
</div>

<!-- Right Side: Signup Form -->
<div class="w-1/2 bg-gradient-to-r from-greenDeep to-greenLight  p-12 flex flex-col justify-center">
  <button on:click={gotoLogin} type="submit" class="bg-white hover:bg-gray-200 text-slate-950 font-bold py-2 px-20 rounded">Login</button> <br>
  <button on:click={gotoSignup} type="submit" class="bg-black hover:bg-blue-900 text-white font-bold py-2 px-20 rounded">Sign up</button>
</div>
</div>
