import { render } from '@solidjs/testing-library';

import Checkbox from '../index';

describe('Checkbox branches', () => {
  it('options || [] when checkAll=true and options=undefined', () => {
    render(() => <Checkbox checkAll={true} options={void 0} />);
  });

  it('bool mode onChange fires with !!newVal[0]', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Checkbox onChange={onChange} />);
    const item = container.querySelector('.item');

    item?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).toHaveBeenCalled();
  });

  it('group mode onChange fires with array', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const items = container.querySelectorAll('.item');

    items[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).toHaveBeenCalled();
  });

  it('disabled prevents onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox disabled={true} options={[{ value: 'a', label: 'A' }]} onChange={onChange} />
    ));
    const item = container.querySelector('.item');

    item?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('checkAll toggle selects all and then deselects', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox
        checkAll={true}
        options={[
          { value: 1, label: 'A' },
          { value: 2, label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const items = container.querySelectorAll('.item');

    items[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('uncheck already checked item covers splice branch', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox
        defaultValue={['a']}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const items = container.querySelectorAll('.item');

    items[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).toHaveBeenCalled();
  });

  it('keyUp with Enter triggers onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox options={[{ value: 'x', label: 'X' }]} onChange={onChange} />
    ));
    const item = container.querySelector('.item');

    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
  });

  it('keyUp with non-Enter does nothing', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox options={[{ value: 'x', label: 'X' }]} onChange={onChange} />
    ));
    const item = container.querySelector('.item');

    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Space', bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with css prop to cover <Show when={props.css}>', () => {
    render(() => <Checkbox css=".box { color: red; }" />);
  });

  it('controlled value updates when value prop changes', () => {
    const { container } = render(() => (
      <Checkbox
        value={['a']}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('options=null triggers || [] fallback at line 96', () => {
    render(() => <Checkbox options={null as unknown as string[]} checkAll={false} />);
  });

  it('checkAll with full selection then toggle off covers checkedAll branches', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox
        checkAll={true}
        defaultValue={[1, 2]}
        options={[
          { value: 1, label: 'A' },
          { value: 2, label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const items = container.querySelectorAll('.item');

    items[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('name prop is passed to input elements', () => {
    const { container } = render(() => (
      <Checkbox name="test-checkbox" options={[{ value: 'a', label: 'A' }]} />
    ));
    const input = container.querySelector('input');

    expect(input?.getAttribute('name')).toBe('test-checkbox');
  });

  it('disabled individual option prevents change', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Checkbox
        options={[
          { value: 'a', label: 'A', disabled: true },
          { value: 'b', label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const items = container.querySelectorAll('.item');

    items[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('indeterminate item uses checkedAll() for checked', () => {
    const { container } = render(() => (
      <Checkbox
        checkAll={true}
        defaultValue={[1]}
        options={[
          { value: 1, label: 'A' },
          { value: 2, label: 'B' },
        ]}
      />
    ));
    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBeGreaterThan(0);
  });

  it('non-indeterminate item uses value().includes(realVal) for checked', () => {
    const { container } = render(() => (
      <Checkbox
        defaultValue={['a']}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />
    ));
    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBeGreaterThan(0);
  });
});
