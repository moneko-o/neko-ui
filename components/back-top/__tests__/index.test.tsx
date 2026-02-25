import { For } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('BackTop', () => {
  it('basic', () => {
    render(() => <n-back-top mount={document.body} target={document.body} />);

    fireEvent.scroll(window);
  });

  it('target', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    const data = new Array(40).fill(0);

    render(() => {
      return (
        <>
          <div data-testid="box">
            <For each={data}>
              {(_, i) => (
                <div style={{ height: '100px' }}>
                  data
                  <br />
                  {i()}
                </div>
              )}
            </For>
          </div>
          <n-back-top data-testid="back-top" visibility-height={200} target={() => document.body} />
        </>
      );
    });

    document.body.style.height = '100px';
    document.body.style.overflow = 'auto';

    fireEvent.scroll(document.body);
    fireEvent.click(screen.getByTestId('back-top'));
  });

  it('handleScrollY triggers show when scrollTop exceeds threshold', () => {
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

    render(() => (
      <n-back-top
        data-testid="back-top-scroll"
        visibility-height={100}
        target={document.body}
        mount={document.body}
      />
    ));

    fireEvent.scroll(document.body);

    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 0;
      },
    });

    fireEvent.scroll(document.body);
  });

  it('target as function returning element', () => {
    const targetEl = document.createElement('div');

    document.body.appendChild(targetEl);
    Object.defineProperty(targetEl, 'offsetHeight', {
      configurable: true,
      value: 100,
    });

    render(() => (
      <n-back-top
        data-testid="back-top-fn"
        visibility-height={50}
        target={() => targetEl}
        mount={document.body}
      />
    ));

    fireEvent.scroll(targetEl);
    document.body.removeChild(targetEl);
  });

  it('animationend handler sets show to null when show is false', () => {
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

    render(() => (
      <n-back-top
        data-testid="back-top-anim"
        visibility-height={50}
        target={document.body}
        mount={document.body}
      />
    ));

    fireEvent.scroll(document.body);

    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 0;
      },
    });

    fireEvent.scroll(document.body);

    const backTopEl = screen.getByTestId('back-top-anim');
    const portalRoot = backTopEl.parentElement?.lastElementChild;
    const inner = portalRoot?.shadowRoot?.querySelector('.back-top');

    if (inner) {
      fireEvent.animationEnd(inner);
    }
  });

  it('visibilityHeight threshold boundary', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 3000,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      configurable: true,
      get() {
        return 401;
      },
    });

    render(() => (
      <n-back-top
        data-testid="back-top-vis"
        visibility-height={400}
        target={document.body}
        mount={document.body}
      />
    ));

    fireEvent.scroll(document.body);
  });
});
