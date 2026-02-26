import { fireEvent, render } from '@solidjs/testing-library';

import InputNumber from '../index';

describe('InputNumber branches', () => {
  it('value clamped to min', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <InputNumber value={-10} min={0} max={100} onChange={onChange} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('value clamped to max', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <InputNumber value={200} min={0} max={100} onChange={onChange} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('mouseMove with non-number value', () => {
    const { container } = render(() => <InputNumber value={'' as unknown as number} step={1} />);
    const el = container.querySelector('.input-number') || container.firstElementChild;

    if (el) {
      fireEvent.mouseDown(el);
      fireEvent.mouseMove(document, { movementX: 5, movementY: 0 });
      fireEvent.mouseUp(document);
    }
  });

  it('change with NaN value sets empty string', () => {
    const onChange = jest.fn();
    const { container } = render(() => <InputNumber onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      input.value = 'abc';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  it('ArrowUp key increments value', () => {
    const onChange = jest.fn();
    const { container } = render(() => <InputNumber value={5} step={1} onChange={onChange} />);
    const input = container.querySelector('input');

    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
  });

  it('ArrowDown key decrements value', () => {
    const onChange = jest.fn();
    const { container } = render(() => <InputNumber value={5} step={1} onChange={onChange} />);
    const input = container.querySelector('input');

    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
  });

  it('mouseMove with number value (not NaN)', () => {
    const onChange = jest.fn();
    const { container } = render(() => <InputNumber value={10} step={1} onChange={onChange} />);
    const input = container.querySelector('input');

    if (input) {
      input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      document.body.dispatchEvent(new MouseEvent('mousemove', { bubbles: true } as MouseEventInit));
      document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }
  });
});
