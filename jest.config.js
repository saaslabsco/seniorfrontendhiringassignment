export default {
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS imports
      '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    },
    transform: {
      "^.+\\.jsx?$": "babel-jest" // Transform JSX/JS files using Babel
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  };
