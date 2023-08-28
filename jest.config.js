/**
 * @type {import("jest").Config}
 */
module.exports = {
  testRegex: ".*__tests__/.+(\\.test\\.(ts|js|tsx|jsx))$",
  transform: {
    ".*(strip-ansi|ansi-regex)|(\\.(ts|tsx|jsx)$)": "@swc/jest",
  },
  transformIgnorePatterns: [],
  testEnvironment: "node",
  roots: ["<rootDir>"],
};
