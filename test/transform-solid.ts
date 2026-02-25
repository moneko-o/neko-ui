import {
  type TransformResult,
  transformSolidJs,
  type TransformSolidJsOption,
  transformSolidJsSync,
} from '@moneko/core';

/** 给 jest 提供的转换 solidjs 代码的函数 */
function transform(
  source: string,
  filename: string,
  transformerConfig: TransformSolidJsOption,
): TransformResult {
  return transformSolidJsSync(source, {
    refresh: false,
    presetEnvOption: {
      targets: { node: 'current' },
    },
    typescriptOption: {},
    jsxOptions: {
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
    },
    ...transformerConfig,
    filename,
  });
}
function transformAsync(
  source: string,
  filename: string,
  transformerConfig: TransformSolidJsOption,
): Promise<TransformResult> {
  return transformSolidJs(source, {
    refresh: false,
    presetEnvOption: {
      targets: { node: 'current' },
    },
    typescriptOption: {},
    jsxOptions: {
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
    },
    ...transformerConfig,
    filename,
  });
}
export const createTransformer = () => {
  return {
    canInstrument: true,
    getCacheKey(source: string, path: string, opt: unknown) {
      return JSON.stringify([path, source, opt]);
    },
    async getCacheKeyAsync(source: string, path: string, opt: unknown) {
      return Promise.resolve(JSON.stringify([path, source, opt]));
    },
    process(source: string, path: string, opt: { transformerConfig: TransformSolidJsOption }) {
      return transform(source, path, opt.transformerConfig);
    },
    async processAsync(
      source: string,
      path: string,
      opt: { transformerConfig: TransformSolidJsOption },
    ) {
      return transformAsync(source, path, opt.transformerConfig);
    },
  };
};
export default {
  createTransformer,
};
