import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../dist/web_components",
    rollupOptions: {
      input: ['./src/ZoomableImg.svelte'],
      output: { entryFileNames: "[name].js" }
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
