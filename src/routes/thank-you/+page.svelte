<script>
  const navigateHome = () => {
    const pageContainer = document.querySelector('.page-container');
    // Add a Tailwind animation class to trigger the fade-out effect
    if (pageContainer) {
      pageContainer.classList.add('animate-fadeOut');
    }
    
    // Wait for the animation to complete before navigating
    setTimeout(() => {
      window.location.href = '/home';
    }, 500); // Match the animation duration
  };
</script>

<div class="page-container min-h-screen bg-gradient-to-r from-greenLight to-greenDeep flex justify-center items-center">
  <div class="text-customGreen p-8 rounded-lg max-w-lg w-full text-center">
    <h1 class="text-4xl font-inter mb-4">Thank you</h1>
    <p class="text-lg font-inter text-customGreen mb-6">for joining us to create a better </p>
    <p>future</p>
    <img src="thankyou.png" alt="Thank You" class="mb-6" />
    <button
      on:click={navigateHome}
      class="bg-customerWhite hover:bg-customerWhiteContrast text-white font-bold py-2 px-6 rounded-full"
    >
      Discover the app
    </button>
  </div>
</div>
