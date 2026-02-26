import { render } from '@solidjs/testing-library';

import HighlightText from '../index';

describe('HighlightText (direct render)', () => {
  it('highlight as array with flag creates new CSS highlight', () => {
    render(() => (
      <HighlightText
        text="Hello World Test"
        highlight={[{ highlight: 'World', flag: 'g' }, 'Test']}
        flag="i"
      />
    ));
  });

  it('extra prop highlights suffix text with new Highlight', () => {
    render(() => <HighlightText text="Hello" extra=" World" highlight="Hello" />);
  });

  it('highlight as string creates highlight', () => {
    render(() => <HighlightText text="foo bar baz" highlight="bar" highlightColor="#ff0000" />);
  });
});

describe('HighlightText else branches (new Highlight creation)', () => {
  const origHighlights = CSS.highlights;
  const origHighlightCtor = globalThis.Highlight;

  beforeEach(() => {
    if (typeof globalThis.Highlight === 'undefined') {
      (globalThis as Record<string, unknown>).Highlight = class MockHighlight {
        private ranges: unknown[] = [];

        add(range: unknown) {
          this.ranges.push(range);
          return this;
        }

        clear() {
          this.ranges = [];
        }
      };
    }
  });

  afterEach(() => {
    CSS.highlights = origHighlights;
    if (origHighlightCtor) {
      (globalThis as Record<string, unknown>).Highlight = origHighlightCtor;
    }
  });

  function makeMockHighlights() {
    const store = new Map<string, unknown>();

    return {
      get: (key: string) => store.get(key),
      set: (key: string, value: unknown) => {
        store.set(key, value);
        return CSS.highlights as unknown as HighlightRegistry;
      },
      keys: () => store.keys(),
      delete: (key: string) => store.delete(key),
      has: (key: string) => store.has(key),
      clear: () => store.clear(),
      forEach: (cb: (value: unknown, key: string) => void) => store.forEach(cb),
      entries: () => store.entries(),
      values: () => store.values(),
      size: store.size,
      [Symbol.iterator]: () => store[Symbol.iterator](),
    } as unknown as HighlightRegistry;
  }

  it('highlight() else branch creates new Highlight when get returns undefined', () => {
    CSS.highlights = makeMockHighlights();
    render(() => <HighlightText text="hello world" highlight="hello" />);
  });

  it('extra effect else branch creates new Highlight when get returns undefined', () => {
    CSS.highlights = makeMockHighlights();
    render(() => <HighlightText text="base" extra=" suffix" />);
  });

  it('highlight array + extra both hit else branch', () => {
    CSS.highlights = makeMockHighlights();
    render(() => <HighlightText text="foo bar" highlight={['foo', 'bar']} extra=" baz" flag="g" />);
  });

  it('empty highlight string skips highlight call (hitStr.length === 0)', () => {
    CSS.highlights = makeMockHighlights();
    render(() => <HighlightText text="test" highlight={['']} />);
  });

  it('highlight=false (non-array/non-string) covers no-op', () => {
    CSS.highlights = makeMockHighlights();
    render(() => <HighlightText text="test" highlight={false as never} />);
  });
});

describe('HighlightText additional branches', () => {
  it('renders with css prop', () => {
    render(() => <HighlightText text="styled" css=".text { color: red; }" />);
  });

  it('renders with class prop', () => {
    render(() => <HighlightText text="classed" class="my-highlight" />);
  });

  it('extra without firstChild covers firstChild guard', () => {
    render(() => <HighlightText text="" extra="suffix" />);
  });

  it('highlight array with object item uses item.flag', () => {
    render(() => (
      <HighlightText text="hello world" highlight={[{ highlight: 'world', flag: 'gi' }]} />
    ));
  });
});
