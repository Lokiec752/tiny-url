import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4444,
    proxy: {
      '/api': 'http://localhost:3333'
    }
  },
  plugins: [react()],
})
