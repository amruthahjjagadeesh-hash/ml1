import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createServerHandler } from './server/index.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ai-tutor-api-middleware',
      configureServer(server) {
        server.middlewares.use(createServerHandler())
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
})
