import recommended from '@moneko/core/eslint/solid';

export default recommended.concat({
  name: 'i ignores',
  ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', 'prism.js'],
});
