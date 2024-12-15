import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allows the use of global test functions like `describe`, `it`, etc.
    environment: 'jsdom', // simulates a browser environment for DOM testing
    setupFiles: './setupTests.js', // Ensure this points to the correct JS file
  },
});
