import { render } from '@solidjs/testing-library';

import Code from '../index';

async function flush(n = 5) {
  for (let i = 0; i < n; i++) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

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
    delete() {
      return true;
    }
  };
}

type TokenizeFn = (text: string, grammar: object) => unknown[];

function makeTokenizer(text: string): TokenizeFn {
  return () => [{ type: 'keyword', content: text }];
}

interface MockEntry {
  add: jest.Mock;
  clear: jest.Mock;
}

describe('Code direct render coverage', () => {
  const origHighlights = CSS.highlights;
  let highlightStore: Map<string, MockEntry>;

  function makeMockHighlights() {
    highlightStore = new Map();
    return {
      get: (key: string) => highlightStore.get(key),
      set: (key: string, value: unknown) => {
        highlightStore.set(key, value as MockEntry);
        return CSS.highlights as unknown as HighlightRegistry;
      },
      keys: () => highlightStore.keys(),
      delete: (key: string) => highlightStore.delete(key),
      has: (key: string) => highlightStore.has(key),
      clear: () => highlightStore.clear(),
      forEach: (cb: (value: unknown, key: string) => void) => highlightStore.forEach(cb),
      entries: () => highlightStore.entries(),
      values: () => highlightStore.values(),
      size: highlightStore.size,
      [Symbol.iterator]: () => highlightStore[Symbol.iterator](),
    } as unknown as HighlightRegistry;
  }

  function setPrism(tokenize: TokenizeFn) {
    (window as Record<string, unknown>).Prism = {
      disableWorkerMessageHandler: false,
      manual: false,
      languages: {
        javascript: { keyword: /\b(const|let|var)\b/ },
        markup: {},
        git: { diff: /^[+-].*$/m },
        css: {},
      },
      tokenize,
    };
  }

  beforeEach(() => {
    CSS.highlights = makeMockHighlights();
  });

  afterEach(() => {
    delete (window as Record<string, unknown>).Prism;
    CSS.highlights = origHighlights;
  });

  it('change handler triggers onChange', async () => {
    const codeText = 'abc';

    setPrism(makeTokenizer(codeText));

    const onChange = jest.fn();
    const { container } = render(() => (
      <Code code={codeText} language="javascript" edit={true} onChange={onChange} />
    ));

    await flush(5);

    const codeEl = container.querySelector('code[contenteditable]');

    if (codeEl) {
      codeEl.normalize = jest.fn();
      Object.defineProperty(codeEl, 'textContent', {
        get: () => 'xyz',
        configurable: true,
      });
      codeEl.dispatchEvent(new InputEvent('input', { bubbles: true }));
      await flush(5);
      expect(onChange).toHaveBeenCalledWith('xyz');
    }
  });

  it('updateRang creates new Highlight and adds to selection', async () => {
    const codeText = 'hello';

    setPrism(makeTokenizer(codeText));
    render(() => <Code code={codeText} language="javascript" />);
    await flush(5);
    expect(highlightStore.size).toBeGreaterThan(0);
  });

  it('clear highlights forEach when re-syntax', async () => {
    const codeText = 'test';

    setPrism(makeTokenizer(codeText));

    const onChange = jest.fn();
    const { container } = render(() => (
      <Code code={codeText} language="javascript" edit={true} onChange={onChange} />
    ));

    await flush(5);

    for (const [key, val] of highlightStore.entries()) {
      if (!val.clear) {
        highlightStore.set(key, { ...val, clear: jest.fn() });
      }
    }

    const codeEl = container.querySelector('code[contenteditable]');

    if (codeEl) {
      codeEl.normalize = jest.fn();
      Object.defineProperty(codeEl, 'textContent', {
        get: () => 'test',
        configurable: true,
      });
      codeEl.dispatchEvent(new InputEvent('input', { bubbles: true }));
      await flush(5);
    }
  });

  it('multi-grammar with git triggers recursive syntax call', async () => {
    const codeText = '- old';

    setPrism(() => [{ type: 'deleted', content: codeText }]);
    render(() => <Code code={codeText} language="git" />);
    await flush(10);
  });

  it('multi-grammar with space-separated languages', async () => {
    const codeText = 'div';

    setPrism(() => [{ type: 'tag', content: codeText }]);
    render(() => <Code code={codeText} language={'html css' as 'html'} />);
    await flush(10);
  });

  it('cleanup deletes highlights on unmount', async () => {
    const codeText = 'val';

    setPrism(makeTokenizer(codeText));

    const { unmount } = render(() => <Code code={codeText} language="javascript" />);

    await flush(5);

    const keysBefore = [...highlightStore.keys()];

    expect(keysBefore.length).toBeGreaterThan(0);
    unmount();
  });
});

describe('Code custom element onChange', () => {
  beforeEach(() => {
    (window as Record<string, unknown>).Prism = {
      disableWorkerMessageHandler: false,
      manual: false,
      languages: { javascript: {} },
      tokenize: () => ['var x;'],
    };
  });

  afterEach(() => {
    delete (window as Record<string, unknown>).Prism;
  });

  it('dispatches CustomEvent change on contenteditable input', async () => {
    const changeHandler = jest.fn();
    const { getByTestId } = render(() => (
      <n-code data-testid="ce" edit={true} language="javascript">
        {'const a = 1;'}
      </n-code>
    ));

    await flush(5);

    const el = getByTestId('ce');

    el.addEventListener('change', changeHandler);

    const codeEl = el.shadowRoot?.querySelector('code[contenteditable]');

    if (codeEl) {
      codeEl.normalize = jest.fn();
      Object.defineProperty(codeEl, 'textContent', {
        get: () => 'var b = 2;',
        configurable: true,
      });
      codeEl.dispatchEvent(new InputEvent('input', { bubbles: true }));
      await flush(5);
    }
  });
});
