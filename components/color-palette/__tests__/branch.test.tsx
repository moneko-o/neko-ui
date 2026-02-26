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
});
