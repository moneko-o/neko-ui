import { registry } from '..';

describe('registry', () => {
  it('calls registry on each component', () => {
    const a = { registry: jest.fn() };
    const b = { registry: jest.fn() };

    registry(a, b);

    expect(a.registry).toHaveBeenCalled();
    expect(b.registry).toHaveBeenCalled();
  });

  it('calls registry exactly once per component', () => {
    const a = { registry: jest.fn() };

    registry(a);

    expect(a.registry).toHaveBeenCalledTimes(1);
  });

  it('handles no arguments', () => {
    expect(() => registry()).not.toThrow();
  });

  it('calls components in order', () => {
    const order: number[] = [];
    const a = { registry: jest.fn(() => order.push(1)) };
    const b = { registry: jest.fn(() => order.push(2)) };
    const c = { registry: jest.fn(() => order.push(3)) };

    registry(a, b, c);

    expect(order).toEqual([1, 2, 3]);
  });
});
