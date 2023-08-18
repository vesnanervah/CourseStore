/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

require('dotenv').config();

const config = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|png|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.cjs',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.cjs',
  },
};

module.exports = config;
