import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '0.0.0.0',  // Allow connections from outside the Docker container
    port: 5173,       // Correct port for Vite
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
});