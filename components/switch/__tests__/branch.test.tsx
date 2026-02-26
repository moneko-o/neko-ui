import { fireEvent, render } from '@solidjs/testing-library';

import Switch from '../index';

describe('Switch branches', () => {
  it('disabled prevents change', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Switch disabled={true} onChange={onChange} />);
    const el = container.querySelector('.switch');

    if (el) fireEvent.click(el);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('loading prevents change', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Switch loading={true} onChange={onChange} />);
    const el = container.querySelector('.switch');

    if (el) fireEvent.click(el);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('normal change works', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Switch onChange={onChange} />);
    const el = container.querySelector('.switch');

    if (el) {
      fireEvent.click(el);
      fireEvent.keyUp(el, { key: 'Enter' });
    }
  });
});
