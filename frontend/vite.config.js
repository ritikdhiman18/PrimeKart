import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tanstack/react-query'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   port: 3000,
  //   proxy: {
  //     '/api': {
  //       target: 'https://primekart.onrender.com',
  //       changeOrigin: true
  //     }
  //   }
  // }
})
