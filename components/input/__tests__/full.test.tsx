import { fireEvent, render } from '@solidjs/testing-library';

import Input from '../index';

describe('Input full coverage', () => {
  it('parses number type input with digits (lines 72-74, parseFloat branch)', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '123' } });
    expect(onChange).toHaveBeenCalledWith(123);
  });

  it('parses number type input without digits (line 74, void branch)', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input')!;

    Object.defineProperty(input, 'value', { value: 'abc', writable: true, configurable: true });
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith(void 0);
  });

  it('uses custom parser when provided (line 70)', () => {
    const onChange = jest.fn();
    const parser = jest.fn((v?: string | number) => `parsed:${v}`);
    const { container } = render(() => <Input parser={parser} onChange={onChange} />);
    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: 'hello' } });
    expect(parser).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('parsed:hello');
  });

  it('detects CapsLock on keydown (line 87)', () => {
    const { container } = render(() => <Input capsLockIcon={<span>CL</span>} />);
    const input = container.querySelector('input')!;

    const event = new KeyboardEvent('keydown', { bubbles: true });

    Object.defineProperty(event, 'getModifierState', { value: () => true });
    input.dispatchEvent(event);

    expect(container.querySelector('.caps-lock')).toBeTruthy();
  });
});
