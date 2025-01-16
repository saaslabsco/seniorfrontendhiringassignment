import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ['src/**/*.test.jsx', 'test/**/*.test.jsx'],
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
  },
});
