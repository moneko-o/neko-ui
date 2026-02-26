const config = {
  preset: '@moneko/solid',
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts',
    '<rootDir>/test/css-highlights.ts',
    '<rootDir>/test/canvas.ts',
    '<rootDir>/test/event.ts',
    '<rootDir>/test/structured-clone.ts',
    '<rootDir>/test/install.ts',
  ],
};

export default config;
