import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default {
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['svelte-apexcharts'] // Force Vite to optimize svelte-apexcharts
  },
  ssr: {
    noExternal: ['svelte-apexcharts'] // Prevents SSR issues with svelte-apexcharts
  }
};