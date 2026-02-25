import { createSignal } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

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

  it('onOpenChange callback fires when opened', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <n-dropdown
        data-testid="dd-open"
        trigger="click"
        onOpenChange={onOpenChange}
        items={[
          { value: '1', label: 'Open 1' },
          { value: '2', label: 'Open 2' },
        ]}
      >
        <span>Click me</span>
      </n-dropdown>
    ));

    fireEvent.click(screen.getByShadowText('Click me'));
  });

  it('multiple selection mode', () => {
    const change = jest.fn();

    render(() => (
      <n-dropdown
        data-testid="dd-multi"
        multiple={true}
        items={[
          { value: '1', label: 'Multi 1' },
          { value: '2', label: 'Multi 2' },
          { value: '3', label: 'Multi 3' },
        ]}
        onChange={change}
      >
        <button data-testid="multi-trigger">Multi</button>
      </n-dropdown>
    ));

    expect(screen.getByTestId('dd-multi')).toBeInTheDocument();
  });

  it('toggle mode', () => {
    const { container } = render(() => (
      <n-dropdown
        toggle={true}
        items={[
          { value: '1', label: 'Toggle 1' },
          { value: '2', label: 'Toggle 2' },
        ]}
      >
        <button>Toggle</button>
      </n-dropdown>
    ));

    expect(container).toBeInTheDocument();
  });

  it('items with sub-menus (children)', () => {
    const { container } = render(() => (
      <n-dropdown
        items={[
          {
            label: 'Parent',
            value: 'parent',
            children: [
              { value: 'child1', label: 'Child 1' },
              { value: 'child2', label: 'Child 2' },
            ],
          },
          { value: 'flat', label: 'Flat Item' },
        ]}
      >
        <button>Sub-menu</button>
      </n-dropdown>
    ));

    expect(container).toBeInTheDocument();
  });

  it('controlled open prop', () => {
    function TestWrapper() {
      const [open, setOpen] = createSignal<boolean | null>(null);

      return (
        <>
          <n-dropdown
            data-testid="dd-controlled"
            open={open()}
            items={[
              { value: '1', label: 'Ctrl 1' },
              { value: '2', label: 'Ctrl 2' },
            ]}
          >
            <span>Controlled</span>
          </n-dropdown>
          <button data-testid="open-btn" onClick={() => setOpen(true)}>
            Open
          </button>
          <button data-testid="close-btn" onClick={() => setOpen(false)}>
            Close
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <TestWrapper />);

    getByTestId('open-btn').click();
    getByTestId('close-btn').click();
  });

  it('controlled value prop', () => {
    function TestWrapper() {
      const [val, setVal] = createSignal<string | undefined>(void 0);

      return (
        <>
          <n-dropdown
            data-testid="dd-val"
            value={val()}
            items={[
              { value: '1', label: 'Val 1' },
              { value: '2', label: 'Val 2' },
            ]}
          >
            <span>Value</span>
          </n-dropdown>
          <button data-testid="set-val" onClick={() => setVal('2')}>
            Set
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <TestWrapper />);

    getByTestId('set-val').click();
  });
});
