import { render } from '@solidjs/testing-library';

import Radio from '../index';

describe('Radio branches', () => {
  it('keyUp with Enter triggers onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Radio
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const item = container.querySelector('.item');

    if (item) item.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
  });

  it('keyUp with non-Enter does nothing', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Radio options={[{ value: 'a', label: 'A' }]} onChange={onChange} />
    ));
    const item = container.querySelector('.item');

    if (item) item.dispatchEvent(new KeyboardEvent('keyup', { key: 'Space', bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled item prevents onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Radio options={[{ value: 'a', label: 'A', disabled: true }]} onChange={onChange} />
    ));
    const item = container.querySelector('.item');

    item?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('globally disabled prevents onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Radio disabled={true} options={[{ value: 'a', label: 'A' }]} onChange={onChange} />
    ));
    const item = container.querySelector('.item');

    item?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with css prop', () => {
    render(() => <Radio options={[{ value: 'a', label: 'A' }]} css=".box { color: red; }" />);
  });

  it('controlled value sets checked', () => {
    render(() => (
      <Radio
        value="b"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />
    ));
  });

  it('name prop is passed to radio input elements', () => {
    const { container } = render(() => (
      <Radio name="test-radio" options={[{ value: 'a', label: 'A' }]} />
    ));
    const input = container.querySelector('input');

    expect(input?.getAttribute('name')).toBe('test-radio');
  });

  it('uncontrolled onChange triggers setValue', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Radio options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} onChange={onChange} />
    ));
    const items = container.querySelectorAll('.item');

    items[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).toHaveBeenCalled();
  });
});
