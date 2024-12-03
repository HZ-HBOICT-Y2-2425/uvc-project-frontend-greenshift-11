<script>
  import "../../app.css";
  
let questions = [
{
 question: "How many high energy consumption appliances do you have in your house (e.g., washing machine)?",
 options: ["1-4", "5-7", "7 or more"]
},
{
 question: "How often do you use your listed appliances?",
 options: ["Daily", "Weekly", "Monthly", "Rarely"]
},
{
 question: "Would you be willing to switch to energy-efficient appliances if they are more affordable?",
 options: ["Yes", "No"]
},
{
 question: "What kind of heating system do you use at home?",
 options: ["Gas", "Solar", "Electric", "Heat Pump", "None"]
},
{
 question: "What is the primary energy source for your appliances?",
 options: ["Electricity", "Gas", "Solar", "Other"]
},
{
 question: "Do you regularly monitor your energy consumption?",
 options: ["Yes", "No"]
},
{
 question: "What do you use to monitor your energy consumption?",
 options: ["An application", "A website", "I do not monitor it", "Some other method"]
},
{
 question: "Do you use electric fans or air conditioner during hot days?",
 options: ["Yes", "No"]
},
{
 question: "Do you forget to unplug electric devices?",
 options: ["Yes", "No"]
},
{
 question: "Do you use a microwave to save time while cooking?",
 options: ["Yes", "No"]
},
{
 question: "Are you part of a green energy program?",
 options: ["Yes", "No", "I'd like to join one"]
}
];
    /**
     * @type {string | null}
     */
let selectedOption = null;

function goToThankYou() {
   window.location.href = '/thank-you';
}

 // State to track the current question
 let currentQuestionIndex = 0;

 // Function to go the next question/preferences/homepage
 function nextQuestion() {
     if (currentQuestionIndex < questions.length - 1) {
         currentQuestionIndex++;
     }else if (currentQuestionIndex === questions.length - 1){
         goToThankYou();
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

 /**
     * @param {string | null} option
     */
 function selectOption(option) {
 selectedOption = option;
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

   <div class="space-y-4 mb-6">
     {#each questions[currentQuestionIndex].options as option}
       <button
         class="w-full py-2 rounded font-bold text-white {selectedOption === option ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
         on:click={() => selectOption(option)}
       >
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
   >
     {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
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
