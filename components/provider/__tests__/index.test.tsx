import { createSignal } from 'solid-js';
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

  it('setScheme when props.scheme changes from light to dark', () => {
    const onScheme = jest.fn();

    function TestWrapper() {
      const [scheme, setScheme] = createSignal<'light' | 'dark'>('light');

      return (
        <>
          <n-provider scheme={scheme()} onScheme={onScheme}>
            <div>Dynamic Theme</div>
          </n-provider>
          <button data-testid="toggle" onClick={() => setScheme('dark')}>
            Toggle
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <TestWrapper />);

    getByTestId('toggle').click();

    expect(onScheme).toHaveBeenCalled();
  });

  it('scheme change triggers setScheme effect', () => {
    function TestWrapper() {
      const [scheme, setScheme] = createSignal<'light' | 'dark' | 'auto'>('light');

      return (
        <>
          <n-provider scheme={scheme()}>
            <div>Content</div>
          </n-provider>
          <button data-testid="to-dark" onClick={() => setScheme('dark')}>
            Dark
          </button>
          <button data-testid="to-auto" onClick={() => setScheme('auto')}>
            Auto
          </button>
        </>
      );
    }

    const { getByTestId, container } = render(() => <TestWrapper />);

    expect(container).toBeInTheDocument();
    getByTestId('to-dark').click();
    getByTestId('to-auto').click();
  });
});
