module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
  moduleNameMapper: {
    "^@lib/(.*)$": "<rootDir>/lib/$1",
  },
  transform: { "^.+\\.jsx?$": "babel-jest", "^.+\\.(ts|tsx)$": "ts-jest" },
  testMatch: ["**/*.test.+(ts|tsx|js|jsx)"],
  // setupTestFrameworkScriptFile: '<rootDir>/src/test/setup.ts'
};
