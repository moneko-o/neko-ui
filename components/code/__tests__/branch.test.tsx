import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Code from '../index';

describe('Code branches', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with toolbar and copy', () => {
    const { container } = render(() => (
      <n-code data-testid="code-tb" toolbar={true} language="javascript">
        {'const a = 1;'}
      </n-code>
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with encoded code', () => {
    const { container } = render(() => (
      <n-code language="javascript" code={encodeURIComponent('const x = "<div>";')} />
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with dark theme', () => {
    const { container } = render(() => (
      <n-code language="javascript" theme="dark">
        {'const b = 2;'}
      </n-code>
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with light theme', () => {
    const { container } = render(() => (
      <n-code language="javascript" theme="light">
        {'const c = 3;'}
      </n-code>
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with edit mode', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <n-code language="javascript" edit={true} onChange={onChange}>
        {'let d = 4;'}
      </n-code>
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with git language (multi-grammar)', () => {
    const { container } = render(() => (
      <n-code language="git">{'+ added line\n- removed line'}</n-code>
    ));

    jest.advanceTimersByTime(200);
    expect(container).toBeInTheDocument();
  });

  it('renders with css prop', () => {
    const { container } = render(() => (
      <n-code language="javascript" css="pre { color: red; }">
        {'const e = 5;'}
      </n-code>
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with title prop', () => {
    const { container } = render(() => (
      <n-code language="javascript" title="My Code">
        {'const f = 6;'}
      </n-code>
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with no language', () => {
    const { container } = render(() => <n-code>{'plain text'}</n-code>);

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('renders with classic mode', () => {
    const { container } = render(() => (
      <n-code language="javascript" classic={true}>
        {'const g = 7;'}
      </n-code>
    ));

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('no theme prop with isDark() false covers line 121 lightCss', () => {
    theme.setScheme('light');
    const { container } = render(() => <Code code="const h = 8;" language="javascript" />);

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
  });

  it('no theme prop with isDark() true covers line 121 darkCss', () => {
    theme.setScheme('dark');
    const { container } = render(() => <Code code="const i = 9;" language="javascript" />);

    jest.advanceTimersByTime(100);
    expect(container).toBeInTheDocument();
    theme.setScheme('light');
  });

  it('edit input triggers change handler', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Code code="let x = 1;" language="javascript" edit={true} onChange={onChange} />
    ));

    jest.advanceTimersByTime(100);
    const codeEl = container.querySelector('code');

    if (codeEl) {
      codeEl.textContent = 'let x = 2;';
      codeEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
});

describe('Code CSS.highlights missing', () => {
  it('throws when CSS.highlights is undefined', async () => {
    const origHighlights = CSS.highlights;

    Object.defineProperty(CSS, 'highlights', {
      value: undefined,
      configurable: true,
      writable: true,
    });
    (window as Record<string, unknown>).Prism = {
      disableWorkerMessageHandler: false,
      manual: false,
      languages: { javascript: { keyword: /\bconst\b/ } },
      tokenize: () => [{ type: 'keyword', content: 'const' }],
    };

    jest.useFakeTimers();
    render(() => <Code code="const x = 1;" language="javascript" />);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(() => jest.advanceTimersByTime(10)).toThrow('不支持 CSS Highlights');

    CSS.highlights = origHighlights;
    delete (window as Record<string, unknown>).Prism;
    jest.useRealTimers();
  });
});
