module.exports = {
  moduleNameMapper: {
    "^@screen(.*)$": "<rootDir>/src/screen$1",
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "regenerator-runtime/runtime",
  ],
  testEnvironment: "jsdom",
};
