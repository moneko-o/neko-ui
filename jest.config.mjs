const config = {
  preset: '@moneko/solid',
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts',
    '<rootDir>/test/install.ts',
  ],
};

export default config;
