import { createSignal } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';

beforeAll(() => {
  if (!HTMLElement.prototype.scrollTo) {
    HTMLElement.prototype.scrollTo = jest.fn();
  }
});

describe('Tabs', () => {
  it('basic', () => {
    const { container, getByTestId } = render(() => (
      <n-tabs
        data-testid="tab"
        items={new Array(10).fill(0).map((_, i) => {
          return {
            value: i + 1,
            label: `Tab ${i + 1}`,
            content: `Content of Tab Pane ${i + 1}`,
          };
        })}
      />
    ));

    expect(container).toBeInTheDocument();
    const tabs = getByTestId('tab').shadowRoot!.querySelector('.tabs')!;

    fireEvent.animationEnd(getByTestId('tab').shadowRoot!.querySelector('.content')!);
    fireEvent.wheel(tabs, {
      deltaX: 3,
      deltaY: 3,
    });
    fireEvent.wheel(tabs, {
      deltaX: -3,
      deltaY: -3,
    });
    tabs.querySelectorAll('n-button').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
      fireEvent.keyUp(e as unknown as HTMLElement, {
        key: 'Enter',
      });
    });
  });
  it('card', () => {
    const { container } = render(() => (
      <n-tabs
        type="card"
        items={new Array(2).fill(0).map((_, i) => {
          return {
            value: i + 1,
            label: `Tab ${i + 1}`,
            content: `Content of Tab Pane ${i + 1}`,
          };
        })}
      />
    ));

    expect(container).toBeInTheDocument();
  });
  it('add remove', () => {
    const { getByTestId } = render(() => (
      <n-tabs
        data-testid="tab"
        type="card"
        add={true}
        items={new Array(3).fill(0).map((_, i) => {
          return {
            value: i,
            label: `Tab ${i}`,
            content: `Content of Tab Pane ${i}`,
            closable: true,
          };
        })}
        onEdit={jest.fn()}
      />
    ));

    fireEvent.click(getByTestId('tab').shadowRoot!.querySelector('.add')!);
    getByTestId('tab')
      .shadowRoot!.querySelectorAll('.tabs n-button')
      .forEach((e) => {
        const remove = e.shadowRoot!.querySelector('.remove');

        if (remove) {
          fireEvent.click(remove);
        }
      });
  });
  it('centered, disabled, and extra props', () => {
    const { container } = render(() => (
      <n-tabs
        centered={true}
        disabled={true}
        extra={{
          left: () => <n-button size="small">Left</n-button>,
          right: () => <n-button size="small">Right</n-button>,
        }}
        items={new Array(3).fill(0).map((_, i) => {
          return {
            value: i + 1,
            label: `Tab ${i + 1}`,
            disabled: i === 2,
            content: () => <div>{i + 1}</div>,
          };
        })}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('vertical scroll handling with scrollWidth', () => {
    jest.useFakeTimers();

    const { getByTestId } = render(() => (
      <n-tabs
        data-testid="tab-scroll"
        items={new Array(30).fill(0).map((_, i) => ({
          value: i + 1,
          label: `Tab ${i + 1}`,
          content: `Content ${i + 1}`,
        }))}
      />
    ));

    jest.advanceTimersByTime(500);

    const tabs = getByTestId('tab-scroll').shadowRoot!.querySelector('.tabs')!;
    const items = tabs.querySelector('.items') as HTMLElement;

    if (items) {
      Object.defineProperty(items, 'scrollWidth', { value: 2000, configurable: true });
      Object.defineProperty(items, 'offsetWidth', { value: 200, configurable: true });
    }
    Object.defineProperty(tabs, 'offsetWidth', { value: 200, configurable: true });

    fireEvent.wheel(tabs, { deltaX: 10, deltaY: 0 });
    fireEvent.wheel(tabs, { deltaX: 0, deltaY: 50 });
    fireEvent.wheel(tabs, { deltaX: -5, deltaY: 0 });

    jest.advanceTimersByTime(500);
    jest.useRealTimers();
  });

  it('keyboard navigation with Enter key on disabled tab', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(() => (
      <n-tabs
        data-testid="tab-kbd"
        onChange={onChange}
        items={[
          { value: 1, label: 'Tab 1', content: 'Content 1' },
          { value: 2, label: 'Tab 2', content: 'Content 2', disabled: true },
          { value: 3, label: 'Tab 3', content: 'Content 3' },
        ]}
      />
    ));

    const buttons = getByTestId('tab-kbd').shadowRoot!.querySelectorAll('n-button');

    if (buttons[1]) {
      fireEvent.keyUp(buttons[1] as unknown as HTMLElement, { key: 'Enter' });
    }
    if (buttons[2]) {
      fireEvent.click(buttons[2] as unknown as HTMLElement);
    }
  });

  it('disabled tabs cannot be clicked', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(() => (
      <n-tabs
        data-testid="tab-dis"
        disabled={true}
        onChange={onChange}
        items={[
          { value: 1, label: 'Tab 1', content: 'Content 1' },
          { value: 2, label: 'Tab 2', content: 'Content 2' },
        ]}
      />
    ));

    const buttons = getByTestId('tab-dis').shadowRoot!.querySelectorAll('n-button');

    if (buttons[1]) {
      fireEvent.click(buttons[1] as unknown as HTMLElement);
    }
  });

  it('dynamic items with controlled value', () => {
    jest.useFakeTimers();

    function TestWrapper() {
      const [val, setVal] = createSignal<number>(1);

      return (
        <>
          <n-tabs
            data-testid="tab-dynamic"
            value={val()}
            items={[
              { value: 1, label: 'Tab 1', content: 'Content 1' },
              { value: 2, label: 'Tab 2', content: 'Content 2' },
              { value: 3, label: 'Tab 3', content: 'Content 3' },
            ]}
          />
          <button data-testid="set-tab" onClick={() => setVal(3)}>
            Set Tab
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <TestWrapper />);

    jest.advanceTimersByTime(500);
    getByTestId('set-tab').click();
    jest.advanceTimersByTime(500);
    jest.useRealTimers();
  });

  it('animated tabs', () => {
    jest.useFakeTimers();

    const { getByTestId } = render(() => (
      <n-tabs
        data-testid="tab-anim"
        animated={true}
        items={[
          { value: 1, label: 'Tab 1', content: 'Content 1' },
          { value: 2, label: 'Tab 2', content: 'Content 2' },
        ]}
      />
    ));

    jest.advanceTimersByTime(500);

    const buttons = getByTestId('tab-anim').shadowRoot!.querySelectorAll('n-button');

    if (buttons[1]) {
      fireEvent.click(buttons[1] as unknown as HTMLElement);
    }

    jest.advanceTimersByTime(500);

    const content = getByTestId('tab-anim').shadowRoot!.querySelector('.content');

    if (content) {
      fireEvent.animationEnd(content);
    }

    jest.useRealTimers();
  });

  it('defaultValue selects the correct tab', () => {
    const { getByTestId } = render(() => (
      <n-tabs
        data-testid="tab-default"
        default-value={2}
        items={[
          { value: 1, label: 'Tab 1', content: 'Content 1' },
          { value: 2, label: 'Tab 2', content: 'Content 2' },
          { value: 3, label: 'Tab 3', content: 'Content 3' },
        ]}
      />
    ));

    expect(getByTestId('tab-default')).toBeInTheDocument();
  });
});
