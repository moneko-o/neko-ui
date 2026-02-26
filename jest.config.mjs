const ignorePatterns = [
  '<rootDir>/test/',
  '<rootDir>/lib/',
  '<rootDir>/es/',
  '<rootDir>/docs/',
  '<rootDir>/node_modules/',
];

const config = {
  preset: '@moneko/core/solid-jest',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  roots: ['components'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['<rootDir>/components/**/__tests__/**/*.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/es/', '<rootDir>/docs/'],
  coveragePathIgnorePatterns: ignorePatterns,
  testPathIgnorePatterns: ignorePatterns,
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts',
    '<rootDir>/test/css-highlights.ts',
    '<rootDir>/test/canvas.ts',
    '<rootDir>/test/event.ts',
    '<rootDir>/test/structured-clone.ts',
    '<rootDir>/test/install.ts',
  ],
  moduleNameMapper: {
    'neko-ui': '<rootDir>/components/index.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/file.mock.ts',
    '\\.(css|less)$': '<rootDir>/test/obj-proxy.ts',
    '\\?raw$': '<rootDir>/test/file.mock.ts',
    '\\?url$': '<rootDir>/test/file.mock.ts',
  },
  transform: {
    // '^.+\\.[jt]sx?$': '<rootDir>/test/transform-solid.mjs',
    // '^.+\\.[jt]sx?$': '@moneko/core/solid-jest',
  },
};

export default config;
