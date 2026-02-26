import { getUtil } from '@moneko/solid/jest';

const config = {
  preset: '@moneko/solid',
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts',
    getUtil('css-highlights.js'),
    getUtil('canvas.js'),
    getUtil('event.js'),
    getUtil('structured-clone.js'),
    '<rootDir>/test/install.ts',
  ],
};

export default config;
