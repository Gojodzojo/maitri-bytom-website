import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "$netlify_cms",
        replacement: path.resolve(__dirname, "../netlify_cms")
      }
    ]
  },
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
