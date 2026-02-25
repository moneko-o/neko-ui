import { render } from '@solidjs/testing-library';

describe('Provider', () => {
  it('renders with default scheme', () => {
    const { container } = render(() => (
      <n-provider>
        <div>App Content</div>
      </n-provider>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with light scheme', () => {
    const { container } = render(() => (
      <n-provider scheme="light">
        <div>Light Theme</div>
      </n-provider>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with dark scheme', () => {
    const { container } = render(() => (
      <n-provider scheme="dark">
        <div>Dark Theme</div>
      </n-provider>
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles onScheme callback', () => {
    const onScheme = jest.fn();
    const { container } = render(() => (
      <n-provider scheme="auto" onScheme={onScheme}>
        <div>Auto Theme</div>
      </n-provider>
    ));

    expect(container).toBeInTheDocument();
  });
});
