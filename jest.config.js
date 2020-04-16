module.exports = {
  preset: "ts-jest",
  watchPathIgnorePatterns: ["/node_modules/", "/dist/", "/.git/"],
  rootDir: __dirname,
  testMatch: ["<rootDir>/test/unit/specs/**/*spec.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "^packages/(.*)$": "<rootDir>/packages/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts$": "<rootDir>/node_modules/ts-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/test/unit/vue-jest",
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'packages/**/*.{ts,vue}',
    '!packages/theme-chalk/**',
    '!packages/icon/**',
    '!packages/button-group/**',
    '!packages/button/**/button-group.vue',
  ],
};
