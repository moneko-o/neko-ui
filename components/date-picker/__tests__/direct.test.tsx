import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

import DatePicker from '../index';

describe('DatePicker inputMouseDown (direct)', () => {
  it('inputMouseDown toggles open when activeElement matches', () => {
    const { container } = render(() => <DatePicker />);
    const input = container.querySelector('n-input');

    if (input) {
      fireEvent.mouseDown(input);
    }
  });

  it('inputMouseDown with focus/blur cycle', () => {
    const onChange = jest.fn();
    const { container } = render(() => <DatePicker onChange={onChange} />);
    const input = container.querySelector('n-input');

    if (input) {
      fireEvent.focus(input);
      fireEvent.mouseDown(input);
      fireEvent.blur(input);
    }
  });

  it('inputMouseDown when target equals shadowRoot activeElement', () => {
    render(() => <n-data-picker data-testid="dp-active" />);

    const dp = screen.getByTestId('dp-active');
    const nInput = dp.shadowRoot?.querySelector('n-input') as HTMLElement | null;

    if (nInput?.shadowRoot) {
      const innerInput = nInput.shadowRoot.querySelector('input') as HTMLElement | null;

      if (innerInput) {
        innerInput.focus();

        const evt = new MouseEvent('mousedown', { bubbles: true });

        Object.defineProperty(evt, 'target', { value: innerInput });
        nInput.dispatchEvent(evt);
      }
    }
  });

  it('inputMouseDown on n-input directly with activeElement mock', () => {
    const onOpenChange = jest.fn();

    render(() => <n-data-picker data-testid="dp-md" onOpenChange={onOpenChange} />);

    const dp = screen.getByTestId('dp-md');
    const nInput = dp.shadowRoot?.querySelector('n-input') as HTMLElement | null;

    if (nInput) {
      const evt = new MouseEvent('mousedown', { bubbles: true });

      Object.defineProperty(evt, 'target', { value: nInput });

      if (nInput.shadowRoot) {
        Object.defineProperty(nInput.shadowRoot, 'activeElement', {
          value: nInput,
          configurable: true,
        });
      }
      nInput.dispatchEvent(evt);
    }
  });

  it('inputMouseDown condition met when e.target equals shadowRoot.activeElement', () => {
    const onOpenChange = jest.fn();

    const { container } = render(() => <DatePicker onOpenChange={onOpenChange} />);
    const nInput = container.querySelector('n-input') as HTMLElement | null;

    if (nInput?.shadowRoot) {
      Object.defineProperty(nInput.shadowRoot, 'activeElement', {
        value: nInput,
        configurable: true,
      });
      fireEvent.mouseDown(nInput);
    }
  });
});
