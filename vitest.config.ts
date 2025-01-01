import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    root: '.',
    globals: true,
    css: true,
    coverage: {
      all: true,
      enabled: true,
      include: ['src/**/*'],
      cleanOnRerun: false,
      reportOnFailure: true,
    },
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
    reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions'] : ['html'],
    include: ['src/**/*.test.{ts,tsx}'],
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
