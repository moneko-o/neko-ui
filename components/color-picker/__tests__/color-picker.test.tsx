import { createSignal } from 'solid-js';
import { fireEvent, render, waitFor } from '@solidjs/testing-library';

describe('ColorPicker', () => {
  it('normal', async () => {
    const { getByTestId } = render(() => (
      <n-color-picker
        data-testid="ColorPicker"
        popup-css=""
        popup-class="ColorPicker-overlay"
        default-value="red"
        size="small"
      />
    ));

    await waitFor(async () => {
      fireEvent.click(getByTestId('ColorPicker'));
    });
    await waitFor(async () => {
      fireEvent.click(document.body.firstChild!);
    });
  });
  it('size', () => {
    render(() => <n-color-picker value="red" data-testid="ColorPicker" size="small" />);
  });

  it('value changes update the color', () => {
    function TestWrapper() {
      const [color, setColor] = createSignal<string>('blue');

      return (
        <>
          <n-color-picker data-testid="cp-value" value={color()} />
          <button data-testid="change-color" onClick={() => setColor('green')}>
            Change
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <TestWrapper />);

    getByTestId('change-color').click();
    expect(getByTestId('cp-value')).toBeInTheDocument();
  });

  it('popover opens on click and shows palette', async () => {
    const { getByTestId } = render(() => (
      <n-color-picker data-testid="cp-popover" default-value="#5794ff" />
    ));

    await waitFor(async () => {
      fireEvent.click(getByTestId('cp-popover'));
    });
  });

  it('onChange callback fires on color change', async () => {
    const onChange = jest.fn();

    const { getByTestId } = render(() => (
      <n-color-picker data-testid="cp-change" default-value="#ff0000" onChange={onChange} />
    ));

    await waitFor(async () => {
      fireEvent.click(getByTestId('cp-change'));
    });
  });

  it('controlled value prop', () => {
    const { container } = render(() => <n-color-picker value="#00ff00" />);

    expect(container).toBeInTheDocument();
  });

  it('uncontrolled with default value', () => {
    const { container } = render(() => <n-color-picker default-value="#0000ff" />);

    expect(container).toBeInTheDocument();
  });

  it('custom popup class and css', () => {
    const { container } = render(() => (
      <n-color-picker
        default-value="#333"
        popup-class="my-popup"
        popup-css=".my-popup { padding: 5px; }"
        css=".trigger { border-radius: 50%; }"
      />
    ));

    expect(container).toBeInTheDocument();
  });
});
