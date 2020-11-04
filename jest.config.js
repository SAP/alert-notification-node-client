module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
      global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
      }
  },
  roots: [
    "<rootDir>"
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
        tsConfig: './__tests__/tsconfig.test.json'
    }
  },
  testEnvironment: "node",
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/node_modules/"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};
