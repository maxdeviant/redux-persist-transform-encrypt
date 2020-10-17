module.exports = {
  preset: 'ts-jest',
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testRegex: '/__tests__/.*\\.(ts|tsx)$',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/'],
};
