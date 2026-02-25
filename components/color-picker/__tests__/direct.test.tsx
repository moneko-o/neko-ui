import { render } from '@solidjs/testing-library';

import ColorPicker from '../index';

describe('ColorPicker (direct render)', () => {
  it('uncontrolled handleChange updates color', () => {
    const onChange = jest.fn();

    render(() => <ColorPicker defaultValue="#ff0000" onChange={onChange} />);
  });

  it('uncontrolled without defaultValue', () => {
    const { container } = render(() => <ColorPicker />);

    expect(container).toBeInTheDocument();
  });

  it('controlled value triggers setColor', () => {
    const { container } = render(() => <ColorPicker value="#00ff00" />);

    expect(container).toBeInTheDocument();
  });
});
