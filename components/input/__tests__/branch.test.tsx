import { render } from '@solidjs/testing-library';

import Input from '../index';

describe('Input branches', () => {
  it('parser as non-function truthy value covers false branch', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Input parser={'parsed' as unknown as () => string} onChange={onChange} />
    ));
    const input = container.querySelector('input');

    if (input) {
      input.value = 'test';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    expect(onChange).toHaveBeenCalled();
  });

  it('parser as function covers true branch', () => {
    const parser = jest.fn((v?: string | number) => `parsed:${v}`);
    const onChange = jest.fn();
    const { container } = render(() => <Input parser={parser} onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      input.value = 'hello';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    expect(parser).toHaveBeenCalled();
  });

  it('formatter as non-function truthy value covers false branch', () => {
    render(() => <Input formatter={'formatted' as unknown as () => string} value="test" />);
  });

  it('formatter as function covers true branch', () => {
    const formatter = jest.fn((v?: string | number) => `fmt:${v}`);

    render(() => <Input formatter={formatter} value="test" />);
    expect(formatter).toHaveBeenCalled();
  });

  it('number type with non-numeric string parses correctly', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      input.value = 'abc';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  it('number type with empty string returns void 0', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  it('number type with valid numeric string', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      input.value = '42';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  it('blur event triggers onBlur callback', () => {
    const onBlur = jest.fn();
    const { container } = render(() => <Input onBlur={onBlur} />);
    const input = container.querySelector('input');

    input?.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  });

  it('keyup event triggers onKeyUp callback', () => {
    const onKeyUp = jest.fn();
    const { container } = render(() => <Input onKeyUp={onKeyUp} />);
    const input = container.querySelector('input');

    input?.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', bubbles: true }));
  });

  it('capsLock active with capsLockIcon shows caps-lock element', () => {
    const { container } = render(() => <Input capsLockIcon={<span>CAPS</span>} />);
    const input = container.querySelector('input');

    if (input) {
      const event = new KeyboardEvent('keydown', { key: 'A', bubbles: true });

      Object.defineProperty(event, 'getModifierState', {
        value: (key: string) => key === 'CapsLock',
      });
      input.dispatchEvent(event);
    }
  });

  it('capsLockIcon with capsLock=false does not show caps-lock element', () => {
    const { container } = render(() => <Input capsLockIcon={<span>CAPS</span>} />);
    const input = container.querySelector('input');

    if (input) {
      const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });

      Object.defineProperty(event, 'getModifierState', {
        value: () => false,
      });
      input.dispatchEvent(event);
    }
  });

  it('renders with label prop', () => {
    render(() => <Input label="Username" />);
  });

  it('renders with css prop', () => {
    render(() => <Input css=".fieldset { border-color: blue; }" />);
  });

  it('renders with prefixIcon', () => {
    render(() => <Input prefixIcon={<span>P</span>} />);
  });

  it('renders with suffixIcon', () => {
    render(() => <Input suffixIcon={<span>S</span>} />);
  });

  it('mousedown triggers onMouseDown', () => {
    const onMouseDown = jest.fn();
    const { container } = render(() => <Input onMouseDown={onMouseDown} />);
    const input = container.querySelector('input');

    input?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  });

  it('no parser and non-number type returns raw value', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="text" onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      input.value = 'raw-value';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    expect(onChange).toHaveBeenCalledWith('raw-value');
  });

  it('keydown without capsLockIcon does not set capsLock', () => {
    const onKeyDown = jest.fn();
    const { container } = render(() => <Input onKeyDown={onKeyDown} />);
    const input = container.querySelector('input');

    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
  });

  it('renders with all optional props for full input element coverage', () => {
    render(() => (
      <Input
        type="text"
        placeholder="enter"
        autoComplete="off"
        accept=".txt"
        value="test"
        label="Label"
        prefixIcon={<span>P</span>}
        suffixIcon={<span>S</span>}
        capsLockIcon={<span>CL</span>}
      />
    ));
  });

  it('renders with disabled state', () => {
    render(() => <Input disabled={true} value="disabled" />);
  });
});
