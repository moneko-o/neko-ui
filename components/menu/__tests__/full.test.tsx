import { render } from '@solidjs/testing-library';

import Menu from '../index';

describe('Menu scroll-to-selected direct render', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(performance.now());
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('scroll up when selected item is above viewport', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        return 0;
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

    render(() => <Menu value={['J']} items={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']} />);
  });

  it('scroll down when selected item is below viewport', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        return 300;
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

    render(() => <Menu value={['J']} items={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']} />);
  });

  it('no scroll when selected item is in viewport', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        return 50;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        return 200;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 0;
      },
    });

    render(() => <Menu value="C" items={['A', 'B', 'C', 'D', 'E']} />);
  });

  it('scroll up with single value (not array)', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
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
        return 200;
      },
    });

    render(() => <Menu value="B" items={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']} />);
  });
});
