/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        
      },
    ],
  },
  "collectCoverage": true,
  "collectCoverageFrom": ["./src/**"],
  "coverageThreshold": {
    "global": {
      "lines": 100
    }
  }
};