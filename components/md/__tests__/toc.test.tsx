import { render } from '@solidjs/testing-library';

import Md from '../index';

type ObserverCb = (entries: Partial<IntersectionObserverEntry>[]) => void;
let observerCallback: ObserverCb | null;

async function flush(n = 10) {
  for (let i = 0; i < n; i++) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

const tocHtml = `<div class="n-md-toc"><a href="#-section-a">Section A</a><a href="#-section-b">Section B</a><a href="https://external.com">External</a></div><h2 id="-section-a"><a href="https://external.com">link</a>Section A</h2><p>Content A</p><h2 id="-section-b">Section B</h2><p>Content B</p>`;

describe('Md TOC coverage', () => {
  const OrigWorker = globalThis.Worker;
  const OrigIntersectionObserver = window.IntersectionObserver;

  beforeEach(() => {
    observerCallback = null;

    window.IntersectionObserver = jest.fn((cb: IntersectionObserverCallback) => {
      observerCallback = cb as unknown as ObserverCb;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: jest.fn(() => []),
      };
    }) as unknown as typeof IntersectionObserver;

    type Listener = (...args: unknown[]) => void;

    (globalThis as Record<string, unknown>).Worker = class TocWorker {
      private listeners: Record<string, Listener[]> = {};

      postMessage(data: unknown) {
        const d = data as Record<string, unknown>;
        const text = (d?.text as string) || '';
        const html = text.startsWith('[TOC]') ? tocHtml : `<div>${text}</div>`;

        this.listeners.message?.forEach((fn) => fn({ data: html }));
      }
      terminate() {}
      addEventListener(event: string, fn: Listener) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(fn);
      }
      removeEventListener(event: string, fn: Listener) {
        if (this.listeners[event]) {
          this.listeners[event] = this.listeners[event].filter((f) => f !== fn);
        }
      }
      dispatchEvent() {
        return true;
      }
    };
  });

  afterEach(() => {
    globalThis.Worker = OrigWorker;
    window.IntersectionObserver = OrigIntersectionObserver;
  });

  it('handles handleAnchor with hash and without hash, and observerEntry', async () => {
    const windowOpen = jest.spyOn(window, 'open').mockImplementation(() => null);

    const { unmount, container } = render(() => (
      <Md text="[TOC]\n## Section A\n## Section B" getAnchorContainer={() => document.body} />
    ));

    await flush(5);

    const article = container.querySelector('article');

    if (article) {
      const anchors = article.querySelectorAll<HTMLAnchorElement>('.n-md-toc a[href]');
      const headings = article.querySelectorAll<HTMLHeadingElement>('h2');

      expect(anchors.length).toBeGreaterThan(0);
      expect(headings.length).toBeGreaterThan(0);

      anchors[0].dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

      if (anchors.length > 2) {
        anchors[2].dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
      }

      if (observerCallback) {
        observerCallback([
          {
            target: headings[0],
            isIntersecting: true,
            intersectionRatio: 0.6,
          },
        ]);

        observerCallback([
          {
            target: headings[0],
            isIntersecting: false,
            intersectionRatio: 0,
          },
        ]);

        if (headings.length > 1) {
          observerCallback([
            {
              target: headings[1],
              isIntersecting: true,
              intersectionRatio: 0.6,
            },
          ]);
        }
      }
    }

    unmount();
    windowOpen.mockRestore();
  });

  it('observer entry with no matching anchor', async () => {
    const { unmount, container } = render(() => <Md text="[TOC]\n## Section A\n## Section B" />);

    await flush(5);

    const article = container.querySelector('article');

    if (article && observerCallback) {
      const fakeHeading = document.createElement('h2');

      fakeHeading.id = 'nonexistent';
      observerCallback([
        {
          target: fakeHeading,
          isIntersecting: true,
          intersectionRatio: 0.5,
        },
      ]);
    }

    unmount();
  });

  it('handles non-TOC text', async () => {
    const { unmount } = render(() => <Md text="# Just a heading" />);

    await flush(5);
    unmount();
  });
});
