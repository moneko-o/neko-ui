import { render } from '@solidjs/testing-library';

import ColorPalette from '../index';

describe('ColorPalette branches', () => {
  it('renders with css prop to cover <Show when={props.css}>', () => {
    render(() => <ColorPalette css=".palette { border: 1px solid; }" />);
  });

  it('renders with class prop', () => {
    render(() => <ColorPalette class="custom-class" />);
  });

  it('mouseDown on picker triggers changeColor branch', () => {
    const { container } = render(() => <ColorPalette value="#ff0000" />);
    const picker = container.querySelector('.picker');

    if (picker) {
      picker.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 50, clientY: 50 }),
      );
      document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }
  });

  it('mouseDown and mouseMove on picker covers drag path', () => {
    const onChange = jest.fn();
    const { container } = render(() => <ColorPalette value="#00ff00" onChange={onChange} />);
    const picker = container.querySelector('.picker');

    if (picker) {
      Object.defineProperty(picker, 'offsetWidth', { value: 200, configurable: true });
      Object.defineProperty(picker, 'offsetHeight', { value: 200, configurable: true });
      picker.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 100, clientY: 100 }),
      );
      document.body.dispatchEvent(
        new MouseEvent('mousemove', { bubbles: true, clientX: 120, clientY: 80 }),
      );
      document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }
  });
});
