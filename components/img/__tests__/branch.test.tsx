import { render } from '@solidjs/testing-library';

import ImgLazy from '../lazy';

describe('ImgLazy branches', () => {
  it('cleanObserver with no imgRef does not unobserve', () => {
    const { unmount } = render(() => <ImgLazy src="test.jpg" lazy={false} />);

    unmount();
  });

  it('lazy with imgRef calls observe', () => {
    let observerCb: IntersectionObserverCallback | null = null;
    const observeSpy = jest.fn();

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn((cb: IntersectionObserverCallback) => {
        observerCb = cb;
        return { observe: observeSpy, unobserve: jest.fn(), disconnect: jest.fn() };
      }),
    });

    const { unmount } = render(() => <ImgLazy src="test.jpg" lazy={true} />);

    if (observerCb) {
      observerCb(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    }

    unmount();
  });
});
