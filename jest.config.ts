import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',  // <-- Add this line
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(zod|lucide-react|react-hook-form)/)',
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  roots: ["<rootDir>/__tests__"],
  testMatch: ["**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}"],
};

export default createJestConfig(customJestConfig);
