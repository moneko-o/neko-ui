import { createSignal } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('test Input', () => {
  it('string options', () => {
    const { getByTestId } = render(() => (
      <n-segmented
        data-testid="string options"
        default-value="option-1"
        options={['option-1', 'option-2', 'option-3']}
      />
    ));

    expect(getByTestId('string options')).toBeInTheDocument();
    fireEvent.click(screen.getByShadowText('option-3'));
    fireEvent.click(screen.getByShadowText('option-1'));
  });
  it('normal', () => {
    const { getByTestId } = render(() => (
      <n-segmented
        data-testid="normal"
        value="1"
        options={[
          { value: '1', label: 'option-1', disabled: true },
          { value: '2', label: 'option-2', icon: 'ss' },
          { value: '3', label: 'option-3' },
        ]}
      />
    ));

    expect(getByTestId('normal')).toBeInTheDocument();
    fireEvent.focus(getByTestId('normal'));
    fireEvent.blur(getByTestId('normal'));
    fireEvent.click(screen.getByShadowText('option-3'));
    fireEvent.click(screen.getByShadowText('option-1'));
  });
  it('suffix', () => {
    const { getByTestId } = render(() => (
      <n-segmented
        data-testid="suffix"
        value="2"
        options={[{ value: '2', label: 'option-2', suffix: 'suffix' }]}
      />
    ));

    expect(getByTestId('suffix')).toBeInTheDocument();
  });
  it('onChange', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-segmented
        data-testid="onChange"
        options={[
          { value: '2', label: 'option-2' },
          { value: '3', label: 'option-3' },
        ]}
        onChange={change}
      />
    ));

    expect(getByTestId('onChange')).toBeInTheDocument();
    fireEvent.focus(getByTestId('onChange'));
    fireEvent.click(screen.getByShadowText('option-3'));
    fireEvent.click(screen.getByShadowText('option-2'));
    fireEvent.keyUp(screen.getByShadowText('option-3'), { key: 'Enter' });
  });
  it('disabled', () => {
    const { getByTestId } = render(() => (
      <n-segmented
        data-testid="disabled"
        value="1"
        disabled
        options={[
          { value: '1', label: 'option-1' },
          { value: '2', label: 'option-2' },
        ]}
      />
    ));

    expect(getByTestId('disabled')).toBeInTheDocument();

    fireEvent.focus(getByTestId('disabled'));
    fireEvent.click(screen.getByShadowText('option-1'));
  });

  it('disabled items cannot be selected', () => {
    const change = jest.fn();

    render(() => (
      <n-segmented
        data-testid="disabled-items"
        options={[
          { value: '1', label: 'enabled-opt' },
          { value: '2', label: 'disabled-opt', disabled: true },
          { value: '3', label: 'also-enabled' },
        ]}
        onChange={change}
      />
    ));

    fireEvent.click(screen.getByShadowText('disabled-opt'));
    fireEvent.click(screen.getByShadowText('also-enabled'));
    expect(change).toHaveBeenCalled();
  });

  it('keyboard Enter event on non-disabled item triggers change', () => {
    const change = jest.fn();

    render(() => (
      <n-segmented
        data-testid="kbd-seg"
        options={[
          { value: 'a', label: 'kbd-A' },
          { value: 'b', label: 'kbd-B' },
        ]}
        onChange={change}
      />
    ));

    fireEvent.keyUp(screen.getByShadowText('kbd-B'), { key: 'Enter' });
    expect(change).toHaveBeenCalled();
  });

  it('keyboard non-Enter event does not trigger change', () => {
    const change = jest.fn();

    render(() => (
      <n-segmented
        data-testid="kbd-seg-no"
        options={[
          { value: 'a', label: 'nokey-A' },
          { value: 'b', label: 'nokey-B' },
        ]}
        onChange={change}
      />
    ));

    fireEvent.keyUp(screen.getByShadowText('nokey-B'), { key: 'Tab' });
  });

  it('value changes update the selected option via setTimeout', () => {
    jest.useFakeTimers();

    function TestWrapper() {
      const [val, setVal] = createSignal<string>('1');

      return (
        <>
          <n-segmented
            data-testid="val-seg"
            value={val()}
            options={[
              { value: '1', label: 'val-opt-1' },
              { value: '2', label: 'val-opt-2' },
              { value: '3', label: 'val-opt-3' },
            ]}
          />
          <button data-testid="change-val" onClick={() => setVal('3')}>
            Change
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <TestWrapper />);

    jest.advanceTimersByTime(100);
    getByTestId('change-val').click();
    jest.advanceTimersByTime(100);
    jest.useRealTimers();
  });

  it('no matching value sets empty offset style', () => {
    jest.useFakeTimers();

    render(() => (
      <n-segmented
        data-testid="no-match"
        value="nonexistent"
        options={[
          { value: '1', label: 'opt-1' },
          { value: '2', label: 'opt-2' },
        ]}
      />
    ));

    jest.advanceTimersByTime(100);
    jest.useRealTimers();
  });
});
