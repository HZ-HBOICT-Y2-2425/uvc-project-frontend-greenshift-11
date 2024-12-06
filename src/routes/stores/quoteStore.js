// src/stores/quoteStore.js
import { writable } from "svelte/store";

// Array of quotes
const quotes = [
  "We cannot solve our problems with the same thinking we used when we created them. ~ Albert Einstein",
  "The Earth is what we all have in common, and it's up to us to protect it. ~ Wendell Berry",
  "A small change in our habits can lead to a big drop in carbon emissions. ~ Unknown",
  "Reducing CO₂ is not just about saving the planet; its about creating a future worth living in. ~ Anonymous",
  "Carbon dioxide doesnt stop at borders—its a global issue that needs global solutions. ~ Unknown",
  "The best way to predict the future is to create it—reduce your carbon footprint today. ~ Peter Drucker",
  "Plant trees, not excuses—they eat CO₂ for breakfast! ~ Anonymous",
  "Turn off the lights, not the planet. Every switch helps reduce CO₂. ~ Unknown"
];

// Writable store for the current quote
export const quoteStore = writable(quotes[Math.floor(Math.random() * quotes.length)]);

// Function to change the quote
export function changeQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteStore.set(randomQuote);
}

// Change the quote every 10 seconds
setInterval(changeQuote, 10000);
