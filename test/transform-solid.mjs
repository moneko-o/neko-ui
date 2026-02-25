import { transformSolidJsSync, transformSolidJs } from '@moneko/core';

const jsxOptions = {
  moduleName: 'solid-js/web',
  builtIns: [
    'For',
    'Show',
    'Switch',
    'Match',
    'Suspense',
    'SuspenseList',
    'Portal',
    'Index',
    'Dynamic',
    'ErrorBoundary',
  ],
  contextToCustomElements: true,
  wrapConditionals: true,
  generate: 'dom',
};

function transform(source, filename, transformerConfig) {
  return transformSolidJsSync(source, {
    refresh: false,
    presetEnvOption: { targets: { node: 'current' }, modules: 'commonjs' },
    typescriptOption: {},
    jsxOptions,
    ...transformerConfig,
    filename,
  });
}

function transformAsync(source, filename, transformerConfig) {
  return transformSolidJs(source, {
    refresh: false,
    presetEnvOption: { targets: { node: 'current' }, modules: 'commonjs' },
    typescriptOption: {},
    jsxOptions,
    ...transformerConfig,
    filename,
  });
}

export const createTransformer = () => ({
  canInstrument: false,
  getCacheKey(source, path, opt) {
    return JSON.stringify([path, source, opt]);
  },
  async getCacheKeyAsync(source, path, opt) {
    return Promise.resolve(JSON.stringify([path, source, opt]));
  },
  process(source, path, opt) {
    return transform(source, path, opt.transformerConfig || {});
  },
  async processAsync(source, path, opt) {
    return transformAsync(source, path, opt.transformerConfig || {});
  },
});

export default { createTransformer };
