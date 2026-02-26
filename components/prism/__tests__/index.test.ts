import Prism from '../index';

describe('Prism', () => {
  it('exports Prism instance', () => {
    expect(Prism).toBeDefined();
    expect(Prism.highlight).toBeDefined();
    expect(typeof Prism.highlight).toBe('function');
  });

  it('has loaded language definitions', () => {
    expect(Prism.languages.javascript).toBeDefined();
    expect(Prism.languages.typescript).toBeDefined();
    expect(Prism.languages.css).toBeDefined();
    expect(Prism.languages.json).toBeDefined();
    expect(Prism.languages.bash).toBeDefined();
    expect(Prism.languages.yaml).toBeDefined();
    expect(Prism.languages.rust).toBeDefined();
    expect(Prism.languages.sql).toBeDefined();
  });

  it('can highlight JavaScript code', () => {
    const code = 'const x = 1;';
    const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

    expect(html).toContain('const');
    expect(typeof html).toBe('string');
  });
});
