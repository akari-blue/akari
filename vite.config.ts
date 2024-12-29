import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routeFileIgnorePattern: 'components',
    }),
    react({}),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['src/assets/images/**/*'],
      manifest: {
        id: 'com.imlunahey.bsky-client',
        name: 'Bsky Client',
        short_name: 'BSkyClient' + (process.env.NODE_ENV === 'development' ? ' (Dev)' : ''),
        description: 'BSky Client',
        theme_color: '#000000',
        icons: [
          {
            src: 'src/assets/images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'src/assets/images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            sizes: '1920x1080',
            src: 'src/assets/images/screenshot-wide.webp',
            form_factor: 'wide',
          },
          {
            sizes: '1080x1920',
            src: 'src/assets/images/screenshot-narrow.webp',
            form_factor: 'narrow',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('graphemer')) return 'graphemer';
          if (id.includes('@tiptap')) return '@tiptap';
          if (id.includes('@stdlib')) return '@stdlib';
          if (id.includes('@tanstack/query-devtools')) return '@tanstack/query-devtools';
          if (id.includes('@tanstack')) return '@tanstack';
          if (id.includes('prosemirror')) return 'prosemirror';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
