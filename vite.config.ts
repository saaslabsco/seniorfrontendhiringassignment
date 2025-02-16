import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",  // Ensures DOM APIs work in tests
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.test.{ts,tsx}"],  // Ensure Vitest runs only test files
    exclude: [...configDefaults.exclude, "node_modules"],
  },
});
