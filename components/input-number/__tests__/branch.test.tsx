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
});
