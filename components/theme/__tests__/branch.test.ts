import { generateColor } from '../index';

describe('Theme branches', () => {
  it('generateColor exercises getHostCss with all token keys', () => {
    const result = generateColor('#5794ff', { name: 'test' });

    expect(result).toHaveProperty('--test-color');
  });

  it('generateColor with dark mode', () => {
    const result = generateColor('#333', { name: 'dark-test', dark: true });

    expect(result).toHaveProperty('--dark-test-color');
  });
});
