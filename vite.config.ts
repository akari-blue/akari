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

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_NAME__: JSON.stringify(name),
    __APP_VERSION__: JSON.stringify(version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
  plugins: [
    TanStackRouterVite({
      routeFileIgnorePattern: 'components',
    }),
    react({}),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: process.env.NODE_ENV !== 'test',
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache frequently accessed images
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50, // Store only the 50 most frequently accessed images
                maxAgeSeconds: 7 * 24 * 60 * 60, // Keep images for 7 days
                purgeOnQuotaError: true, // Automatically remove cached images if storage quota is exceeded
              },
            },
          },
          {
            // Don't cache other requests - always use network
            urlPattern: () => true,
            handler: 'NetworkOnly', // Changed from NetworkFirst to NetworkOnly
          },
        ],
      },
      includeAssets: ['public/images/**/*'],
      manifest: {
        id: 'blue.akari',
        name,
        short_name: name + (process.env.NODE_ENV === 'development' ? ' (Dev)' : ''),
        description,
        theme_color: '#000000',
        orientation: 'portrait',
        icons: [
          {
            src: 'images/windows11/SmallTile.scale-100.png',
            sizes: '71x71',
          },
          {
            src: 'images/windows11/SmallTile.scale-125.png',
            sizes: '89x89',
          },
          {
            src: 'images/windows11/SmallTile.scale-150.png',
            sizes: '107x107',
          },
          {
            src: 'images/windows11/SmallTile.scale-200.png',
            sizes: '142x142',
          },
          {
            src: 'images/windows11/SmallTile.scale-400.png',
            sizes: '284x284',
          },
          {
            src: 'images/windows11/Square150x150Logo.scale-100.png',
            sizes: '150x150',
          },
          {
            src: 'images/windows11/Square150x150Logo.scale-125.png',
            sizes: '188x188',
          },
          {
            src: 'images/windows11/Square150x150Logo.scale-150.png',
            sizes: '225x225',
          },
          {
            src: 'images/windows11/Square150x150Logo.scale-200.png',
            sizes: '300x300',
          },
          {
            src: 'images/windows11/Square150x150Logo.scale-400.png',
            sizes: '600x600',
          },
          {
            src: 'images/windows11/Wide310x150Logo.scale-100.png',
            sizes: '310x150',
          },
          {
            src: 'images/windows11/Wide310x150Logo.scale-125.png',
            sizes: '388x188',
          },
          {
            src: 'images/windows11/Wide310x150Logo.scale-150.png',
            sizes: '465x225',
          },
          {
            src: 'images/windows11/Wide310x150Logo.scale-200.png',
            sizes: '620x300',
          },
          {
            src: 'images/windows11/Wide310x150Logo.scale-400.png',
            sizes: '1240x600',
          },
          {
            src: 'images/windows11/LargeTile.scale-100.png',
            sizes: '310x310',
          },
          {
            src: 'images/windows11/LargeTile.scale-125.png',
            sizes: '388x388',
          },
          {
            src: 'images/windows11/LargeTile.scale-150.png',
            sizes: '465x465',
          },
          {
            src: 'images/windows11/LargeTile.scale-200.png',
            sizes: '620x620',
          },
          {
            src: 'images/windows11/LargeTile.scale-400.png',
            sizes: '1240x1240',
          },
          {
            src: 'images/windows11/Square44x44Logo.scale-100.png',
            sizes: '44x44',
          },
          {
            src: 'images/windows11/Square44x44Logo.scale-125.png',
            sizes: '55x55',
          },
          {
            src: 'images/windows11/Square44x44Logo.scale-150.png',
            sizes: '66x66',
          },
          {
            src: 'images/windows11/Square44x44Logo.scale-200.png',
            sizes: '88x88',
          },
          {
            src: 'images/windows11/Square44x44Logo.scale-400.png',
            sizes: '176x176',
          },
          {
            src: 'images/windows11/StoreLogo.scale-100.png',
            sizes: '50x50',
          },
          {
            src: 'images/windows11/StoreLogo.scale-125.png',
            sizes: '63x63',
          },
          {
            src: 'images/windows11/StoreLogo.scale-150.png',
            sizes: '75x75',
          },
          {
            src: 'images/windows11/StoreLogo.scale-200.png',
            sizes: '100x100',
          },
          {
            src: 'images/windows11/StoreLogo.scale-400.png',
            sizes: '200x200',
          },
          {
            src: 'images/windows11/SplashScreen.scale-100.png',
            sizes: '620x300',
          },
          {
            src: 'images/windows11/SplashScreen.scale-125.png',
            sizes: '775x375',
          },
          {
            src: 'images/windows11/SplashScreen.scale-150.png',
            sizes: '930x450',
          },
          {
            src: 'images/windows11/SplashScreen.scale-200.png',
            sizes: '1240x600',
          },
          {
            src: 'images/windows11/SplashScreen.scale-400.png',
            sizes: '2480x1200',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-16.png',
            sizes: '16x16',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-20.png',
            sizes: '20x20',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-24.png',
            sizes: '24x24',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-30.png',
            sizes: '30x30',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-32.png',
            sizes: '32x32',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-36.png',
            sizes: '36x36',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-40.png',
            sizes: '40x40',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-44.png',
            sizes: '44x44',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-48.png',
            sizes: '48x48',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-60.png',
            sizes: '60x60',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-64.png',
            sizes: '64x64',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-72.png',
            sizes: '72x72',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-80.png',
            sizes: '80x80',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-96.png',
            sizes: '96x96',
          },
          {
            src: 'images/windows11/Square44x44Logo.targetsize-256.png',
            sizes: '256x256',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
            sizes: '16x16',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
            sizes: '20x20',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
            sizes: '24x24',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
            sizes: '30x30',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
            sizes: '32x32',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
            sizes: '36x36',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
            sizes: '40x40',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
            sizes: '44x44',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
            sizes: '48x48',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
            sizes: '60x60',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
            sizes: '64x64',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
            sizes: '72x72',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
            sizes: '80x80',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
            sizes: '96x96',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
            sizes: '256x256',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
            sizes: '16x16',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
            sizes: '20x20',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
            sizes: '24x24',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
            sizes: '30x30',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
            sizes: '32x32',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
            sizes: '36x36',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
            sizes: '40x40',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
            sizes: '44x44',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
            sizes: '48x48',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
            sizes: '60x60',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
            sizes: '64x64',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
            sizes: '72x72',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
            sizes: '80x80',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
            sizes: '96x96',
          },
          {
            src: 'images/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
            sizes: '256x256',
          },
          {
            src: 'images/android/android-launchericon-512-512.png',
            sizes: '512x512',
          },
          {
            src: 'images/android/android-launchericon-192-192.png',
            sizes: '192x192',
          },
          {
            src: 'images/android/android-launchericon-144-144.png',
            sizes: '144x144',
          },
          {
            src: 'images/android/android-launchericon-96-96.png',
            sizes: '96x96',
          },
          {
            src: 'images/android/android-launchericon-72-72.png',
            sizes: '72x72',
          },
          {
            src: 'images/android/android-launchericon-48-48.png',
            sizes: '48x48',
          },
          {
            src: 'images/ios/16.png',
            sizes: '16x16',
          },
          {
            src: 'images/ios/20.png',
            sizes: '20x20',
          },
          {
            src: 'images/ios/29.png',
            sizes: '29x29',
          },
          {
            src: 'images/ios/32.png',
            sizes: '32x32',
          },
          {
            src: 'images/ios/40.png',
            sizes: '40x40',
          },
          {
            src: 'images/ios/50.png',
            sizes: '50x50',
          },
          {
            src: 'images/ios/57.png',
            sizes: '57x57',
          },
          {
            src: 'images/ios/58.png',
            sizes: '58x58',
          },
          {
            src: 'images/ios/60.png',
            sizes: '60x60',
          },
          {
            src: 'images/ios/64.png',
            sizes: '64x64',
          },
          {
            src: 'images/ios/72.png',
            sizes: '72x72',
          },
          {
            src: 'images/ios/76.png',
            sizes: '76x76',
          },
          {
            src: 'images/ios/80.png',
            sizes: '80x80',
          },
          {
            src: 'images/ios/87.png',
            sizes: '87x87',
          },
          {
            src: 'images/ios/100.png',
            sizes: '100x100',
          },
          {
            src: 'images/ios/114.png',
            sizes: '114x114',
          },
          {
            src: 'images/ios/120.png',
            sizes: '120x120',
          },
          {
            src: 'images/ios/128.png',
            sizes: '128x128',
          },
          {
            src: 'images/ios/144.png',
            sizes: '144x144',
          },
          {
            src: 'images/ios/152.png',
            sizes: '152x152',
          },
          {
            src: 'images/ios/167.png',
            sizes: '167x167',
          },
          {
            src: 'images/ios/180.png',
            sizes: '180x180',
          },
          {
            src: 'images/ios/192.png',
            sizes: '192x192',
          },
          {
            src: 'images/ios/256.png',
            sizes: '256x256',
          },
          {
            src: 'images/ios/512.png',
            sizes: '512x512',
          },
          {
            src: 'images/ios/1024.png',
            sizes: '1024x1024',
          },
        ],
        screenshots: [
          {
            sizes: '1920x1080',
            src: 'images/screenshot-wide.webp',
            form_factor: 'wide',
          },
          {
            sizes: '1080x1920',
            src: 'images/screenshot-narrow.webp',
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
