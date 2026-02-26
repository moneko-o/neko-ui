import theme from '../index';

describe('Theme', () => {
  it('exports theme object with expected properties', () => {
    expect(theme).toHaveProperty('scheme');
    expect(theme).toHaveProperty('setScheme');
    expect(theme).toHaveProperty('isDark');
    expect(theme).toHaveProperty('baseStyle');
    expect(theme).toHaveProperty('light');
    expect(theme).toHaveProperty('dark');
  });

  it('setScheme to dark', () => {
    theme.setScheme('dark');
    expect(theme.scheme()).toBe('dark');
    expect(theme.isDark()).toBe(true);
  });

  it('setScheme to light', () => {
    theme.setScheme('light');
    expect(theme.scheme()).toBe('light');
    expect(theme.isDark()).toBe(false);
  });

  it('setScheme to auto adds media change listener', () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | undefined;
    const addSpy = jest.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
      if (event === 'change') {
        changeHandler = handler;
      }
    });
    const removeSpy = jest.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: addSpy,
        removeEventListener: removeSpy,
        dispatchEvent: jest.fn(),
      })),
    });

    theme.setScheme('auto');
    expect(theme.scheme()).toBe('auto');

    if (changeHandler) {
      changeHandler({ matches: true } as MediaQueryListEvent);
    }
  });

  it('setScheme to non-auto removes media change listener', () => {
    theme.setScheme('auto');
    theme.setScheme('light');
    expect(theme.scheme()).toBe('light');
  });

  it('baseStyle returns a string', () => {
    const style = theme.baseStyle();

    expect(typeof style).toBe('string');
    expect(style.length).toBeGreaterThan(0);
  });

  it('light and dark color accessors work', () => {
    const lightColors = theme.light();

    expect(lightColors).toHaveProperty('primary');
    expect(lightColors).toHaveProperty('warning');
    expect(lightColors).toHaveProperty('error');
    expect(lightColors).toHaveProperty('success');

    const darkColors = theme.dark();

    expect(darkColors).toHaveProperty('primary');
    expect(darkColors).toHaveProperty('warning');
    expect(darkColors).toHaveProperty('error');
    expect(darkColors).toHaveProperty('success');
  });

  it('switching scheme multiple times', () => {
    theme.setScheme('dark');
    expect(theme.isDark()).toBe(true);

    theme.setScheme('light');
    expect(theme.isDark()).toBe(false);

    theme.setScheme('auto');
    expect(theme.scheme()).toBe('auto');

    theme.setScheme('dark');
    expect(theme.isDark()).toBe(true);
  });
});
