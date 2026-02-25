import { fireEvent, render } from '@solidjs/testing-library';

import Switch from '../index';

describe('Switch full coverage', () => {
  it('onKeyUp with non-Enter key does not trigger change', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Switch onChange={onChange} />);
    const el = container.querySelector('.switch');

    if (el) {
      fireEvent.keyUp(el, { key: 'Space' });
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onKeyUp with Enter key triggers change', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Switch onChange={onChange} />);
    const el = container.querySelector('.switch');

    if (el) {
      fireEvent.keyUp(el, { key: 'Enter' });
    }
    expect(onChange).toHaveBeenCalled();
  });

  it('renders with checked state', () => {
    const { container } = render(() => <Switch checked={true} />);
    const el = container.querySelector('.switch');

    expect(el).toBeInTheDocument();
  });

  it('renders with checkedText and unCheckedText', () => {
    const { container } = render(() => <Switch checkedText="ON" unCheckedText="OFF" />);

    expect(container).toBeInTheDocument();
  });
});
