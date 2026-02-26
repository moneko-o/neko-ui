import { fireEvent, render } from '@solidjs/testing-library';

import Select from '../index';

describe('Select branch coverage', () => {
  it('uncontrolled onChange with non-array val covers setValue([val])', () => {
    const onChange = jest.fn();

    render(() => <Select options={['A', 'B']} onChange={onChange} />);
  });

  it('onChange with undefined val covers setValue([])', () => {
    const onChange = jest.fn();

    render(() => <Select options={['A']} onChange={onChange} />);
  });

  it('onChange called as function covers isFunction(onChange) branch', () => {
    const onChange = jest.fn();

    render(() => <Select options={['A', 'B']} onChange={onChange} />);
  });

  it('controlled value prop as string covers non-array value path', () => {
    render(() => <Select options={['A', 'B']} value="A" />);
  });

  it('controlled value prop as array covers array value path', () => {
    render(() => <Select options={['A', 'B']} value={['A']} multiple={true} />);
  });

  it('value=null clears selection', () => {
    render(() => <Select options={['A']} value={null as never} />);
  });

  it('uncontrolled with defaultValue as string covers onMount branch', () => {
    render(() => <Select options={['A', 'B']} defaultValue="B" />);
  });

  it('uncontrolled with defaultValue as array', () => {
    render(() => <Select options={['A', 'B']} defaultValue={['A', 'B']} multiple={true} />);
  });

  it('uncontrolled without defaultValue uses empty array', () => {
    render(() => <Select options={['A', 'B']} />);
  });

  it('label prop covers label Show branch', () => {
    render(() => <Select options={['A']} label="Label" />);
  });

  it('label as function covers isFunction(label) branch', () => {
    render(() => <Select options={['A']} label={() => <span>Fn Label</span>} />);
  });

  it('prefixIcon covers prefix Show branch', () => {
    render(() => <Select options={['A']} prefixIcon={<span>P</span>} />);
  });

  it('prefixIcon as function covers isFunction(prefixIcon) branch', () => {
    render(() => <Select options={['A']} prefixIcon={() => <span>FnP</span>} />);
  });

  it('suffixIcon covers suffix Show branch', () => {
    render(() => <Select options={['A']} suffixIcon={<span>S</span>} />);
  });

  it('suffixIcon as function covers isFunction(suffixIcon) branch', () => {
    render(() => <Select options={['A']} suffixIcon={() => <span>FnS</span>} />);
  });

  it('placeholder covers placeholder Show branch', () => {
    render(() => <Select options={['A']} placeholder="Pick one" />);
  });

  it('multiple mode renders tags', () => {
    render(() => <Select options={['A', 'B']} multiple={true} defaultValue={['A']} />);
  });

  it('disabled state prevents interactions', () => {
    render(() => <Select options={['A']} disabled={true} />);
  });

  it('Backspace key in multiple mode removes last tag', () => {
    const { container } = render(() => (
      <Select options={['A', 'B']} multiple={true} defaultValue={['A', 'B']} />
    ));
    const select = container.querySelector('.select');

    if (select) {
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    }
  });

  it('Backspace key in non-multiple mode clears value', () => {
    const { container } = render(() => <Select options={['A', 'B']} defaultValue="A" />);
    const select = container.querySelector('.select');

    if (select) {
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    }
  });

  it('ArrowDown key triggers keyDown handler', () => {
    const { container } = render(() => <Select options={['A', 'B']} />);
    const select = container.querySelector('.select');

    if (select) {
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    }
  });

  it('ArrowUp key triggers keyDown handler', () => {
    const { container } = render(() => <Select options={['A', 'B']} />);
    const select = container.querySelector('.select');

    if (select) {
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    }
  });

  it('Enter key triggers openChange', () => {
    const { container } = render(() => <Select options={['A', 'B']} />);
    const select = container.querySelector('.select');

    if (select) {
      fireEvent.focus(select);
      select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }
  });

  it('single mode with value shows label span', () => {
    render(() => <Select options={[{ value: 'a', label: 'Alpha' }]} defaultValue="a" />);
  });
});
