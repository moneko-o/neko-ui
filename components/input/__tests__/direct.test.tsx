import { render } from '@solidjs/testing-library';

import Input from '../index';

describe('Input (direct render)', () => {
  it('number type parserValue with digits', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      Object.defineProperty(input, 'value', { writable: true, value: '123abc' });
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  it('number type parserValue with empty string', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      Object.defineProperty(input, 'value', { writable: true, value: '' });
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  it('capsLockIcon detects CapsLock state on keydown', () => {
    const { container } = render(() => <Input capsLockIcon={true} />);
    const input = container.querySelector('input');

    if (input) {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'A',
          bubbles: true,
        }),
      );
    }
  });
});
