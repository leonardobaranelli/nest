module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
  };