import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    open: true,
    proxy: '/api',
    target: 'http://222.239.249.197:9090',
    changeOrigin:true,
  },
  test:{
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
})
