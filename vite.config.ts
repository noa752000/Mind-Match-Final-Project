import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// During local development, forward AI requests to the deployed Vercel
// function (api/groq.js), which holds the shared GROQ_API_KEY. This means
// no local .env file / personal API key is needed to use the AI features.
// Update this URL if the Vercel deployment URL changes.
const AI_PROXY_TARGET = 'https://mind-match-final-project.vercel.app'

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    assetsInclude: ['**/*.svg', '**/*.csv'],
    server: {
      proxy: {
        '/api/groq': {
          target: AI_PROXY_TARGET,
          changeOrigin: true,
        },
      },
    },
  }
})
