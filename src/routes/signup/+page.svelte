<script>
  import "../../app.css";
  let name = '';
  let email = '';
  let password = '';

  const handleSubmit = () => {
    window.location.href = '/home';
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-greenLight to-greenDeep">
  <div class="w-full max-w-lg p-8 rounded-md bg-black shadow-md">
    <h1 class="text-center font-bold text-3xl mb-8 text-greenDeep">Create Account </h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-5">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Your email</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="hellothere25@gmail.com" required />
      </div>
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Username</label>
        <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="trythisinnit" required />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Your password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
        </div>
        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-greenDeep">Remember me</label>
      </div>
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-20 rounded-full">Sign up</button>
    </form>
  </div>
</div>
