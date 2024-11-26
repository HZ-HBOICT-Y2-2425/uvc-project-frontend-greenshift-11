<script>
    let questions = [
      {
        question: "Bawo ni?",
        options: ["mo wa oh", "omo o dara oh", "kini", "kilode"]
      },
      {
        question: "Iru nonsense wo ni eh?",
        options: ["ma bi nu", "koshi danu jor", "e fi mi sile jare", "olorun oba"]
      },
     //
    ];
  
    // State to track the current question
    let currentQuestionIndex = 0;
  
    // Functions to navigate questions
    function nextQuestion() {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
      }
    }
  
    function previousQuestion() {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
      }
    }
  
    function skipQuestion() {
      nextQuestion();
    }

    $: progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  </script>
  
  <!-- Question Container -->
  <div class="min-h-screen bg-gradient-to-r from-greenLight to-greenDeep flex justify-center items-center">
    <div class="bg-gray-900 text-customGreen p-8 rounded-lg shadow-md max-w-lg w-full">
      <h2 class="text-2xl font-bold text-center mb-4">Questions</h2>

    <!-- Progress Bar Container -->
    <div class="w-full bg-progessBar rounded-full h-1 mb-4">
        <!-- Dynamic width based on progress -->
        <div
          class="bg-customGreen h-1 rounded-full transition-all duration-300"
          style="width: {progress}%"
        ></div>
      </div>
      
  
      <!-- Display the current question -->
      <p class="text-lg mb-6 text-center text-white">
        {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
      </p>
  
      <!-- Display answer options as buttons -->
      <div class="space-y-4 mb-6">
        {#each questions[currentQuestionIndex].options as option}
          <button class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded">
            {option}
          </button>
        {/each}
      </div>
  
      <!-- Navigation buttons -->
      <div class="flex justify-between items-center">
        <button
          on:click={previousQuestion}

          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
  
        <button
          on:click={nextQuestion}
          class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded"
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
  
        <button
          on:click={skipQuestion}
          class="text-customGreen"
        >
          Skip
        </button>
      </div>
    </div>
  </div>
  