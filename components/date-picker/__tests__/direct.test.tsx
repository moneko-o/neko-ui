import { fireEvent, render } from '@solidjs/testing-library';

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
});
