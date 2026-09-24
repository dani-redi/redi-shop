import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { localizedHtml } from './vite-plugins/localized-html.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), localizedHtml()],
  build: {
    // react-dom + react-router + i18next ≈ 450 kB; o restante é código da página.
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
