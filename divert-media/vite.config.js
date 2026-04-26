import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/Divert-media/',
  server: {
    host: true,
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, '../assests'),
    },
  },
  assetsInclude: ['**/*.gif'],
})
