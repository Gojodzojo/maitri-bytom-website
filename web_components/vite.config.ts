import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "../dist/web_components",
    rollupOptions: {
      input: ['./src/main.ts'],
      output: { entryFileNames: "web_components.js" }
    }
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    })
  ]
})
