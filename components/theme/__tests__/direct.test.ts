describe('Theme media listener', () => {
  it('exercises update function via matchMedia change event', () => {
    const handlers: Record<string, ((...args: unknown[]) => void)[]> = {};

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn((event: string, handler: (...args: unknown[]) => void) => {
          if (!handlers[event]) handlers[event] = [];
          handlers[event].push(handler);
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const themeModule = require('../index');
      const theme = themeModule.default;

      theme.setScheme('auto');

      if (handlers.change) {
        handlers.change.forEach((h: (...args: unknown[]) => void) => h({ matches: true }));
      }

      expect(theme.isDark()).toBe(true);

      if (handlers.change) {
        handlers.change.forEach((h: (...args: unknown[]) => void) => h({ matches: false }));
      }

      expect(theme.isDark()).toBe(false);

      theme.setScheme('light');
    });
  });
});
