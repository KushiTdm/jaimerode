import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
  proxy: {
    '/api': {
      target: 'https://n8n-hx5y.onrender.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/webhook'),
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          proxyReq.setHeader('X-Forwarded-Host', 'jaimerode.onrender.com');
        });
        proxy.on('proxyRes', (proxyRes) => {
          // Force le Content-Type si vide
          if (!proxyRes.headers['content-type']) {
            proxyRes.headers['content-type'] = 'application/json';
          }
        });
      }
    }
  }
}
 
});