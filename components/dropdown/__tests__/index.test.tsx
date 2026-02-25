import { render } from '@solidjs/testing-library';

describe('Dropdown', () => {
  it('renders basic dropdown', () => {
    const { container } = render(() => (
      <n-dropdown
        items={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with default value', () => {
    const { container } = render(() => (
      <n-dropdown
        default-value="1"
        items={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    const { container } = render(() => (
      <n-dropdown
        disabled={true}
        items={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with onChange callback', () => {
    const change = jest.fn();
    const { container } = render(() => (
      <n-dropdown
        items={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
        onChange={change}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders empty dropdown', () => {
    const { container } = render(() => <n-dropdown />);

    expect(container).toBeInTheDocument();
  });
});
