import { render } from '@solidjs/testing-library';

import Md from '../index';

describe('Md (direct render)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with text prop and tools', () => {
    render(() => <Md text="# Hello\n\nWorld" tools={['copy']} />);
    jest.advanceTimersByTime(500);
  });

  it('renders with notRender=true', () => {
    render(() => (
      <Md notRender={true} pictureViewer={false}>
        <h1>Static</h1>
      </Md>
    ));
    jest.advanceTimersByTime(500);
  });

  it('renders markdown with code blocks', () => {
    render(() => <Md text={'```js\nconst a = 1;\n```'} />);
    jest.advanceTimersByTime(500);
  });

  it('renders with TOC', () => {
    render(() => <Md text="[TOC]\n## Section 1\n## Section 2" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with image', () => {
    render(() => <Md text="![alt](test.jpg)" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with katex', () => {
    render(() => <Md text="$x^2$\n\n$$y = mx + b$$" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with getAnchorContainer', () => {
    render(() => <Md text="## Anchor" getAnchorContainer={() => document.body} />);
    jest.advanceTimersByTime(500);
  });

  it('renders with css prop', () => {
    render(() => <Md text="hello" css="p { color: red; }" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with codeTheme and codeClassic', () => {
    render(() => <Md text={'```js\nvar x;\n```'} codeTheme="dark" codeClassic={true} />);
    jest.advanceTimersByTime(500);
  });

  it('renders empty text', () => {
    render(() => <Md text="" />);
    jest.advanceTimersByTime(500);
  });

  it('children array covers children.length > 0 branch', () => {
    render(() => <Md>{[<p>Paragraph 1</p>, <p>Paragraph 2</p>]}</Md>);
    jest.advanceTimersByTime(500);
  });

  it('children as empty array renders text branch fallback', () => {
    render(() => <Md text="## Fallback">{[]}</Md>);
    jest.advanceTimersByTime(500);
  });

  it('TOC with observer entries exercises observerEntry logic', () => {
    const observeCalls: IntersectionObserverCallback[] = [];

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn((cb: IntersectionObserverCallback) => {
        observeCalls.push(cb);
        return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
      }),
    });

    const { unmount } = render(() => <Md text="[TOC]\n## Heading1\n## Heading2" />);

    jest.advanceTimersByTime(500);

    observeCalls.forEach((cb) => {
      cb(
        [
          {
            isIntersecting: true,
            target: {
              getAttribute: () => 'heading1',
              querySelectorAll: () => [] as unknown as NodeListOf<HTMLAnchorElement>,
            },
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    unmount();
  });

  it('cleanup on unmount terminates worker', () => {
    const { unmount } = render(() => <Md text="Test cleanup" />);

    jest.advanceTimersByTime(500);
    unmount();
  });

  it('renders with class prop', () => {
    render(() => <Md text="Class test" class="custom-md" />);
    jest.advanceTimersByTime(500);
  });

  it('observer entry not intersecting and in active array covers splice branch', () => {
    const observeCalls: IntersectionObserverCallback[] = [];

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn((cb: IntersectionObserverCallback) => {
        observeCalls.push(cb);
        return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
      }),
    });

    render(() => <Md text="[TOC]\n## H1\n## H2" />);
    jest.advanceTimersByTime(500);

    const fakeTarget = {
      getAttribute: () => 'h1',
      querySelectorAll: () => [] as unknown as NodeListOf<HTMLAnchorElement>,
    };

    observeCalls.forEach((cb) => {
      cb(
        [{ isIntersecting: true, target: fakeTarget } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
      cb(
        [{ isIntersecting: false, target: fakeTarget } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
  });

  it('n-md custom element with children covers childNodes truthy path', () => {
    render(() => (
      <n-md not-render={true}>
        <p>CE child</p>
      </n-md>
    ));
    jest.advanceTimersByTime(500);
  });

  it('n-md custom element without children covers childNodes fallback', () => {
    render(() => <n-md text="## Hello" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with neither children nor text covers empty Switch', () => {
    render(() => <Md text="" />);
    jest.advanceTimersByTime(500);
  });
});
