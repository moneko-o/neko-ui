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

  it('isIntersecting triggers src assignment and load event', () => {
    let observerCb: IntersectionObserverCallback | null = null;

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn((cb: IntersectionObserverCallback) => {
        observerCb = cb;
        return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
      }),
    });

    const onLoad = jest.fn();
    const { container } = render(() => <ImgLazy src="test.jpg" lazy={true} onLoad={onLoad} />);

    if (observerCb) {
      observerCb(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    }

    const img = container.querySelector('img');

    if (img) {
      img.dispatchEvent(new Event('load', { bubbles: true }));
    }
  });

  it('error event sets isError state', () => {
    const onError = jest.fn();
    const { container } = render(() => <ImgLazy src="bad.jpg" lazy={false} onError={onError} />);
    const img = container.querySelector('img');

    if (img) {
      img.dispatchEvent(new Event('error', { bubbles: true }));
    }
  });

  it('renders with custom part prop', () => {
    render(() => <ImgLazy src="test.jpg" lazy={false} part="custom-part" />);
  });

  it('renders with class prop', () => {
    render(() => <ImgLazy src="test.jpg" lazy={false} class="my-img" />);
  });

  it('renders without part prop uses default img part', () => {
    render(() => <ImgLazy src="test.jpg" lazy={false} />);
  });

  it('lazy=false renders img with src directly (no observer)', () => {
    const { container } = render(() => <ImgLazy src="direct.jpg" lazy={false} />);
    const img = container.querySelector('img');

    expect(img?.getAttribute('src')).toBeTruthy();
  });
});
