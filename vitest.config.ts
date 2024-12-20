import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
    reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions'] : ['verbose', 'html'],
  },
});
