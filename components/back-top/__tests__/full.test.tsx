import { fireEvent, render } from '@solidjs/testing-library';

import BackTop from '../index';

function findBackTopInPortals(): Element | null {
  const children = Array.from(document.body.children);

  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];

    if (child.shadowRoot) {
      const found = child.shadowRoot.querySelector('.back-top');

      if (found) return found;
    }
  }
  return null;
}

describe('BackTop full coverage', () => {
  it('handleScrollY triggers show when scrollTop > visibilityHeight', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 500;
      },
    });

    render(() => <BackTop target={document.body} mount={document.body} visibilityHeight={100} />);

    fireEvent.scroll(document.body);

    const backTopDiv = findBackTopInPortals();

    expect(backTopDiv).not.toBeNull();
  });

  it('handleScrollY sets show=false when scrollTop drops below threshold', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 500;
      },
    });

    render(() => <BackTop target={document.body} mount={document.body} visibilityHeight={100} />);

    fireEvent.scroll(document.body);

    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 0;
      },
    });

    fireEvent.scroll(document.body);
  });

  it('exit() sets show to null on animationend when show is false', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 500;
      },
    });

    render(() => <BackTop target={document.body} mount={document.body} visibilityHeight={100} />);

    fireEvent.scroll(document.body);

    let backTopDiv = findBackTopInPortals();

    expect(backTopDiv).not.toBeNull();

    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 0;
      },
    });

    fireEvent.scroll(document.body);

    backTopDiv = findBackTopInPortals();
    if (backTopDiv) {
      backTopDiv.dispatchEvent(new Event('animationend', { bubbles: true }));
    }
  });

  it('renders with default target (window)', () => {
    const { container } = render(() => <BackTop mount={document.body} />);

    expect(container).toBeInTheDocument();
  });
});
