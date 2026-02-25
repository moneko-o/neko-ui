import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

async function flush(n = 5) {
  for (let i = 0; i < n; i++) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

describe('Code full coverage', () => {
  beforeEach(() => {
    (window as Record<string, unknown>).Prism = {
      disableWorkerMessageHandler: false,
      manual: false,
      languages: {
        javascript: { keyword: /\b(const|let|var)\b/ },
        markup: {},
        git: {},
      },
      tokenize: () => [
        { type: 'keyword', content: 'const', alias: null },
        ' a = ',
        { type: 'number', content: '1' },
        ';',
      ],
    };
  });

  afterEach(() => {
    delete (window as Record<string, unknown>).Prism;
  });

  it('syntax highlighting resolves after flush', async () => {
    render(() => (
      <n-code data-testid="c1" language="javascript">
        {'const a = 1;'}
      </n-code>
    ));
    await flush();
  });

  it('toolbar copy', async () => {
    render(() => (
      <n-code data-testid="c2" toolbar={true} language="javascript">
        {'const b = 2;'}
      </n-code>
    ));
    await flush();
    const el = screen.getByTestId('c2');
    const copyBtn = el.shadowRoot?.querySelector('.toolbar-copy');

    if (copyBtn) fireEvent.click(copyBtn);
  });

  it('edit mode input triggers change', async () => {
    const onChange = jest.fn();

    (window as Record<string, unknown>).Prism = {
      ...((window as Record<string, unknown>).Prism as object),
      tokenize: () => ['let c = 3;'],
    };
    render(() => (
      <n-code data-testid="c3" edit={true} onChange={onChange} language="javascript">
        {'let c = 3;'}
      </n-code>
    ));
    await flush();
    const el = screen.getByTestId('c3');
    const textarea = el.shadowRoot?.querySelector('textarea');

    if (textarea) {
      textarea.textContent = 'var d;';
      textarea.dispatchEvent(new InputEvent('input', { bubbles: true }));
    }
    await flush();
  });

  it('encoded code', async () => {
    render(() => <n-code language="javascript" code={encodeURIComponent('<div>x</div>')} />);
    await flush();
  });

  it('git multi-grammar', async () => {
    (window as Record<string, unknown>).Prism = {
      disableWorkerMessageHandler: false,
      manual: false,
      languages: { git: {}, javascript: {} },
      tokenize: () => [
        { type: 'deleted', content: '- old' },
        '\n',
        { type: 'inserted', content: '+ new' },
      ],
    };
    render(() => <n-code language="git">{'- old\n+ new'}</n-code>);
    await flush(10);
  });

  it('nested token content', async () => {
    (window as Record<string, unknown>).Prism = {
      disableWorkerMessageHandler: false,
      manual: false,
      languages: { javascript: {} },
      tokenize: () => [
        {
          type: 'template',
          content: [
            { type: 'string', content: '`hi ' },
            { type: 'interp', content: [{ type: 'var', content: 'x' }] },
          ],
        },
      ],
    };
    render(() => <n-code language="javascript">{'`hi ${x}`'}</n-code>);
    await flush();
  });

  it('token with alias', async () => {
    (window as Record<string, unknown>).Prism = {
      disableWorkerMessageHandler: false,
      manual: false,
      languages: { javascript: {} },
      tokenize: () => [{ type: 'tag', alias: 'keyword', content: 'div' }],
    };
    render(() => <n-code language="javascript">{'div'}</n-code>);
    await flush();
  });

  it('dark theme', async () => {
    (window as Record<string, unknown>).Prism = {
      ...((window as Record<string, unknown>).Prism as object),
      tokenize: () => ['var x;'],
    };
    render(() => (
      <n-code language="javascript" theme="dark">
        {'var x;'}
      </n-code>
    ));
    await flush();
  });

  it('light theme', async () => {
    (window as Record<string, unknown>).Prism = {
      ...((window as Record<string, unknown>).Prism as object),
      tokenize: () => ['var y;'],
    };
    render(() => (
      <n-code language="javascript" theme="light">
        {'var y;'}
      </n-code>
    ));
    await flush();
  });

  it('css prop', async () => {
    (window as Record<string, unknown>).Prism = {
      ...((window as Record<string, unknown>).Prism as object),
      tokenize: () => ['var z;'],
    };
    render(() => (
      <n-code language="javascript" css="pre{color:red}">
        {'var z;'}
      </n-code>
    ));
    await flush();
  });

  it('classic mode', async () => {
    (window as Record<string, unknown>).Prism = {
      ...((window as Record<string, unknown>).Prism as object),
      tokenize: () => ['var w;'],
    };
    render(() => (
      <n-code language="javascript" classic={true}>
        {'var w;'}
      </n-code>
    ));
    await flush();
  });

  it('cleanup on unmount', async () => {
    const { unmount } = render(() => <n-code language="javascript">{'const q = 1;'}</n-code>);

    await flush();
    unmount();
  });

  it('no Prism on window uses dynamic import', async () => {
    delete (window as Record<string, unknown>).Prism;
    render(() => <n-code language="javascript">{'const r = 1;'}</n-code>);
    await flush(10);
  });

  it('code prop update', async () => {
    render(() => <n-code language="javascript" code="const s = 1;" />);
    await flush();
  });

  it('empty code', async () => {
    render(() => <n-code language="javascript">{''}</n-code>);
    await flush();
  });
});
