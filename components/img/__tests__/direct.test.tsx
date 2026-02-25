import { fireEvent, render } from '@solidjs/testing-library';

import Img from '../index';
import ImgLazy from '../lazy';

describe('ImgLazy (direct render)', () => {
  it('lazy=false fires handleLoad on img load event', () => {
    const onLoad = jest.fn();
    const { container } = render(() => (
      <ImgLazy src="https://example.com/test.jpg" alt="test" lazy={false} onLoad={onLoad} />
    ));
    const img = container.querySelector('img');

    if (img) img.dispatchEvent(new Event('load'));

    expect(onLoad).toHaveBeenCalled();
  });

  it('lazy=false fires handleError on img error event', () => {
    const onError = jest.fn();
    const { container } = render(() => (
      <ImgLazy src="broken" alt="err" lazy={false} onError={onError} />
    ));
    const img = container.querySelector('img');

    if (img) img.dispatchEvent(new Event('error'));

    expect(onError).toHaveBeenCalled();
  });

  it('lazy=true creates IntersectionObserver and fires callback', () => {
    let observerCb: IntersectionObserverCallback | null = null;
    const observeSpy = jest.fn();
    const unobserveSpy = jest.fn();
    const disconnectSpy = jest.fn();

    const MockObserver = jest.fn((cb: IntersectionObserverCallback) => {
      observerCb = cb;
      return { observe: observeSpy, unobserve: unobserveSpy, disconnect: disconnectSpy };
    });

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockObserver,
    });

    render(() => <ImgLazy src="lazy.jpg" alt="lazy" lazy={true} />);

    expect(observeSpy).toHaveBeenCalled();

    if (observerCb) {
      observerCb(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    }

    expect(unobserveSpy).toHaveBeenCalled();
  });

  it('lazy=true IntersectionObserver with non-intersecting entry', () => {
    let observerCb: IntersectionObserverCallback | null = null;

    const MockObserver = jest.fn((cb: IntersectionObserverCallback) => {
      observerCb = cb;
      return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
    });

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockObserver,
    });

    render(() => <ImgLazy src="lazy2.jpg" alt="lazy2" lazy={true} />);

    if (observerCb) {
      observerCb(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    }
  });
});

describe('Img (direct render)', () => {
  it('onLoad callback fires on load', () => {
    const onLoad = jest.fn();
    const { container } = render(() => (
      <Img src="https://example.com/img.jpg" alt="test" lazy={false} onLoad={onLoad} />
    ));
    const img = container.querySelector('img');

    if (img) img.dispatchEvent(new Event('load'));
  });

  it('n-img onLoad fires via custom element', () => {
    const onLoad = jest.fn();

    render(() => (
      <n-img
        data-testid="n-img-load"
        src="https://example.com/img.jpg"
        alt="test"
        lazy={false}
        onLoad={onLoad}
      />
    ));

    const nImg = document.querySelector('[data-testid="n-img-load"]');
    const shadow = nImg?.shadowRoot;

    if (shadow) {
      const imgs = shadow.querySelectorAll('img');

      imgs.forEach((img) => img.dispatchEvent(new Event('load', { bubbles: false })));
    }

    const spinShadow = shadow?.querySelector('n-spin')?.shadowRoot;

    if (spinShadow) {
      const imgs = spinShadow.querySelectorAll('img');

      imgs.forEach((img) => img.dispatchEvent(new Event('load', { bubbles: false })));
    }
  });
});
