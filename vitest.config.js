import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Simulates a browser environment for DOM testing
    setupFiles: './setupTests.js', // Points to the JS setup file now
  },
});
