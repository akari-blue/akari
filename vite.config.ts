import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { VitePWA } from 'vite-plugin-pwa';
import ogPlugin from 'vite-plugin-open-graph';
import { name, version, description } from './package.json';
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
const buildDate = new Date().toISOString();

const define = JSON.parse(
  JSON.stringify({
    __APP_NAME__: `"${name}"`,
    __APP_VERSION__: `"${version}"`,
    __COMMIT_HASH__: `"${commitHash}"`,
    __BUILD_DATE__: `"${buildDate}"`,
  }),
);

// https://vitejs.dev/config/
export default defineConfig({
  define,
  plugins: [
    TanStackRouterVite({
      routeFileIgnorePattern: 'components',
    }),
    react({}),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: process.env.NODE_ENV !== 'test',
      },
      workbox: {
        runtimeCaching: [
          {
            // do not cache any requests
            urlPattern: () => true,
            handler: 'NetworkFirst',
          },
          {
            // cache images
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100, // limit the number of cached images
              },
            },
          },
        ],
      },
      includeAssets: ['src/assets/images/**/*'],
      manifest: {
        id: 'blue.akari',
        name,
        short_name: name + (process.env.NODE_ENV === 'development' ? ' (Dev)' : ''),
        description,
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
    ogPlugin({
      basic: {
        siteName: name,
        description,
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
