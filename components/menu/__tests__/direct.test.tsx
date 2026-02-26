import { render } from '@solidjs/testing-library';

import Menu from '../index';

describe('Menu (direct render)', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(performance.now());
      return 0;
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('scroll-to-selected when value is set and element has offsetTop', () => {
    const scrollToSpy = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: scrollToSpy,
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

  it('scroll-to-selected when element is below viewport', () => {
    const scrollToSpy = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: scrollToSpy,
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
});
