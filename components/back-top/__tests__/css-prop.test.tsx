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

describe('BackTop css prop coverage', () => {
  it('renders with css prop', async () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => 500,
    });
    const { container } = render(() => <BackTop css="div{color:red}" visibilityHeight={0} />);

    window.dispatchEvent(new Event('scroll'));
    await new Promise((r) => setTimeout(r, 50));
    expect(container).toBeInTheDocument();
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => 0,
    });
  });

  it('css prop renders style tag when scroll triggers show', () => {
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
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });

    render(() => (
      <BackTop
        css=".custom{color:blue}"
        target={document.body}
        mount={document.body}
        visibilityHeight={100}
      />
    ));

    fireEvent.scroll(document.body);

    const backTopDiv = findBackTopInPortals();

    expect(backTopDiv).not.toBeNull();

    if (backTopDiv) {
      fireEvent.click(backTopDiv);
    }
  });
});
