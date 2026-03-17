import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api/send-email': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/send-email/, '/emails'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Authorization', req.headers.authorization);
          });
        },
      },
      '/api/cloudinary-signature': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
