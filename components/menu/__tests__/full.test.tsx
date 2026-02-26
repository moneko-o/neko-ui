import { render } from '@solidjs/testing-library';

import Menu from '../index';

describe('Menu scroll-to-selected direct render', () => {
  let rafCallbacks: FrameRequestCallback[] = [];

  beforeEach(() => {
    rafCallbacks = [];
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function flushRaf() {
    const now = performance.now() + 20;

    while (rafCallbacks.length) {
      const cb = rafCallbacks.shift()!;

      cb(now);
    }
  }

  it('scroll up when selected item is above scroll viewport', () => {
    const scrollToSpy = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: scrollToSpy,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        if (this.getAttribute?.('aria-selected') === 'true') return 20;
        return 100;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        return 30;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 500;
      },
    });

    render(() => <Menu value="J" items={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']} />);

    flushRaf();

    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('scroll down when selected item is below scroll viewport', () => {
    const scrollToSpy = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: scrollToSpy,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        if (this.getAttribute?.('aria-selected') === 'true') return 600;
        return 10;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        return 30;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 0;
      },
    });

    render(() => <Menu value="J" items={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']} />);

    flushRaf();

    expect(scrollToSpy).toHaveBeenCalled();
  });
});
