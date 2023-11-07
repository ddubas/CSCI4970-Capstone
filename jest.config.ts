module.exports = {
    // Specify the test environment (e.g., jsdom for browser-like environment)
    testEnvironment: 'jsdom',
  
    // Define the test match patterns (which test files to run)
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  
    // Define the directories to search for tests
    roots: ['<rootDir>/src', '<rootDir>/tests'],
  
    // Transform files before running tests (e.g., Babel for JavaScript)
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
  
    // Coverage settings
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  
    // Setup files before running tests (e.g., for setting up test environment)
    setupFiles: ['<rootDir>/tests/setup.js'],
  
    // Module file extensions
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };
  