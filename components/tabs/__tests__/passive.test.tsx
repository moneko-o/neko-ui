describe('Tabs passive scroll branch', () => {
  it('wheel calls stopPropagation/preventDefault when passiveSupported is false', () => {
    jest.resetModules();
    jest.doMock('@moneko/common', () => {
      const actual = jest.requireActual('@moneko/common');

      return { __esModule: true, ...actual, passiveSupported: false };
    });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { render } = require('solid-js/web');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Tabs = require('../index').default;

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      get() {
        return 2000;
      },
    });

    const items = Array.from({ length: 20 }, (_, i) => ({
      value: i,
      label: `Tab ${i}`,
      content: `Content ${i}`,
    }));

    const container = document.createElement('div');

    document.body.appendChild(container);
    const dispose = render(() => {
      const T = Tabs;

      return <T items={items} />;
    }, container);

    const tabs = container.querySelector('.tabs');

    expect(tabs).toBeTruthy();

    const wheelEvt = new WheelEvent('wheel', {
      deltaX: 10,
      deltaY: 0,
      bubbles: true,
      cancelable: true,
    });
    const stopSpy = jest.spyOn(wheelEvt, 'stopPropagation');
    const preventSpy = jest.spyOn(wheelEvt, 'preventDefault');

    tabs!.dispatchEvent(wheelEvt);

    expect(stopSpy).toHaveBeenCalled();
    expect(preventSpy).toHaveBeenCalled();

    dispose();
    document.body.removeChild(container);
  });
});
