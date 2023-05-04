module.exports = {
  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    '!./src/stories/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['text', 'lcov'],
  reporters: ['default'],
  collectCoverage: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|svg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
  maxWorkers: 2,
  forceExit: true,
};
