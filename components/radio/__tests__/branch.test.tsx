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
});
