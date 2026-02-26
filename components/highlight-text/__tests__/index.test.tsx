import { render } from '@solidjs/testing-library';

describe('HighlightText', () => {
  it('basic', () => {
    const { container } = render(() => (
      <n-highlight-text
        text="s"
        highlight="s"
        class="csca"
        style={{
          color: 'red',
        }}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('未匹配', () => {
    const { container } = render(() => <n-highlight-text text="sasc" highlight={'d'} />);

    expect(container).toBeInTheDocument();
  });

  it('无匹配内容', () => {
    const { container } = render(() => <n-highlight-text text="sasc" />);

    expect(container).toBeInTheDocument();
  });

  it('多条件', () => {
    const { container } = render(() => (
      <n-highlight-text text="sasc" highlight={['a', 'c']} extra="csa" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('多条件 with HighlightRule objects', () => {
    const { container } = render(() => (
      <n-highlight-text
        text="sasc"
        highlight={[
          'a',
          {
            highlight: 'c',
            flag: 'i',
          },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('highlight as array of HighlightRule objects with flag', () => {
    const { container } = render(() => (
      <n-highlight-text
        text="Hello World hello"
        highlight={[
          { highlight: 'hello', flag: 'g' },
          { highlight: 'world', flag: 'i' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('extra text triggers highlight on extra portion', () => {
    const { container } = render(() => (
      <n-highlight-text text="main" extra=" extra text" highlight="main" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('extra prop as empty string', () => {
    const { container } = render(() => (
      <n-highlight-text text="content" extra="" highlight="content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('highlightColor custom color', () => {
    const { container } = render(() => (
      <n-highlight-text text="color test" highlight="color" highlightColor="#ff0000" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('highlight with css prop', () => {
    const { container } = render(() => (
      <n-highlight-text text="styled" highlight="styled" css=".text { font-weight: bold; }" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('array with empty string highlight', () => {
    const { container } = render(() => <n-highlight-text text="test" highlight={['', 'te']} />);

    expect(container).toBeInTheDocument();
  });

  it('extra without highlight keyword', () => {
    const { container } = render(() => <n-highlight-text text="base" extra=" suffix" />);

    expect(container).toBeInTheDocument();
  });
});
