import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // Adapter configuration
        adapter: adapter(),
        
        // Define your path aliases here
        alias: {
            $components: path.resolve('src/lib/components'), // Example alias
            $utils: path.resolve('src/lib/utils'),           // Another example alias
            $src: path.resolve('src'),                        // Alias for the src folder
        },
    },
    preprocess: vitePreprocess(),


export default config;