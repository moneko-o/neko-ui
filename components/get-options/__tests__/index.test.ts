import getOptions from '../index';

describe('getOptions', () => {
  it('returns empty array for undefined list', () => {
    expect(getOptions()).toEqual([]);
  });

  it('returns empty array for null list', () => {
    expect(getOptions(void 0)).toEqual([]);
  });

  it('handles string items', () => {
    const result = getOptions(['a', 'b', 'c']);

    expect(result.length).toBe(3);
    expect(result[0]).toHaveProperty('label', 'a');
    expect(result[0]).toHaveProperty('value', 'a');
  });

  it('handles number items', () => {
    const result = getOptions([1, 2, 3]);

    expect(result.length).toBe(3);
    expect(result[0]).toHaveProperty('label', 1);
    expect(result[0]).toHaveProperty('value', 1);
  });

  it('handles object items with label and value', () => {
    const result = getOptions([
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
    ]);

    expect(result[0].label).toBe('A');
    expect(result[0].value).toBe(1);
  });

  it('handles object items with only value (label defaults to value)', () => {
    const result = getOptions([{ value: 'x' }]);

    expect(result[0].label).toBe('x');
  });

  it('handles object with nested options', () => {
    const result = getOptions([{ label: 'Group', options: [{ label: 'Sub', value: 1 }] }]);

    expect(result[0]).toHaveProperty('options');
  });

  it('handles object with nested children', () => {
    const result = getOptions([{ label: 'Parent', children: [{ label: 'Child', value: 1 }] }]);

    expect(result[0]).toHaveProperty('children');
  });

  it('handles custom fieldNames', () => {
    const result = getOptions([{ name: 'Custom', id: 42 }], {
      label: 'name',
      value: 'id',
    });

    expect(result[0].name).toBe('Custom');
    expect(result[0].id).toBe(42);
  });

  it('handles items with undefined label and value (fallback to index)', () => {
    const result = getOptions([{}]);

    expect(result[0].label).toBe(0);
    expect(result[0].value).toBe(0);
  });
});
