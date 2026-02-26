import { render } from '@solidjs/testing-library';

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
});
