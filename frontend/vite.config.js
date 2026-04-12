import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Force Vite restart
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-axios': ['axios'],
          'vendor-seo': ['react-helmet-async']
        }
      }
    }
  }
});
