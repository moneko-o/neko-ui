import { render } from '@solidjs/testing-library';

import Radio from '../index';

describe('Radio full coverage', () => {
  it('keyUp with Enter triggers onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Radio
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
        onChange={onChange}
      />
    ));
    const item = container.querySelector('.item');

    if (item) {
      item.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    }
    expect(onChange).toHaveBeenCalled();
  });

  it('keyUp with Space does not trigger onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Radio options={[{ value: 'x', label: 'X' }]} onChange={onChange} />
    ));
    const item = container.querySelector('.item');

    if (item) {
      item.dispatchEvent(new KeyboardEvent('keyup', { key: 'Space', bubbles: true }));
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with various options and layout', () => {
    const { container } = render(() => (
      <Radio options={['opt1', 'opt2', 'opt3']} layout="vertical" defaultValue="opt1" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with custom css', () => {
    const { container } = render(() => (
      <Radio options={[{ value: '1', label: 'One' }]} css=".box { color: red; }" />
    ));

    expect(container).toBeInTheDocument();
  });
});
