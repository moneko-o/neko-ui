const config = {
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  roots: ['components'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['<rootDir>/components/**/__tests__/**/*.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/es/', '<rootDir>/docs/'],
  coveragePathIgnorePatterns: [
    '/prism\\.js$',
    '/components/code/',
    '/components/md/',
    '/components/index\\.ts$',
    '/components/prism/',
    '/type\\.ts$',
    '/qrcode\\.ts$',
    '/notification/index\\.tsx$',
    '<rootDir>/test/',
    '<rootDir>/lib/',
    '<rootDir>/es/',
    '<rootDir>/docs/',
    '<rootDir>/node_modules/',
  ],
  testPathIgnorePatterns: [
    '/prism\\.js$',
    '/components/code/',
    '/components/md/',
    '<rootDir>/test/',
    '<rootDir>/lib/',
    '<rootDir>/es/',
    '<rootDir>/docs/',
    '<rootDir>/node_modules/',
  ],
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
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          ['babel-preset-solid', { generate: 'dom', hydratable: false }],
        ],
      },
    ],
  },
};

export default config;
