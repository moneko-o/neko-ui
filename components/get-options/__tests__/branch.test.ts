import getOptions from '../index';

describe('getOptions branches', () => {
  it('object item with undefined value falls back to label', () => {
    const result = getOptions([{ label: 'Only Label' }]);

    expect(result[0].value).toBe('Only Label');
  });

  it('object with undefined label falls back to value', () => {
    const result = getOptions([{ value: 42 }]);

    expect(result[0].label).toBe(42);
  });

  it('object with both undefined falls back to index', () => {
    const result = getOptions([{ disabled: true }]);

    expect(result[0].label).toBe(0);
    expect(result[0].value).toBe(0);
  });

  it('object with null value triggers ?? i fallback', () => {
    const result = getOptions([{ value: null, label: 'Lbl' }]);

    expect(result[0].value).toBe(0);
    expect(result[0].label).toBe('Lbl');
  });

  it('object with null label and null value triggers both ?? fallbacks', () => {
    const result = getOptions([{ value: null, label: null }]);

    expect(result[0].value).toBe(0);
    expect(result[0].label).toBe(0);
  });

  it('returns empty array when list is undefined', () => {
    const result = getOptions(void 0);

    expect(result).toEqual([]);
  });

  it('string items in list', () => {
    const result = getOptions(['apple', 'banana']);

    expect(result[0].label).toBe('apple');
    expect(result[0].value).toBe('apple');
  });

  it('object with children array recurses', () => {
    const result = getOptions([
      { value: 'parent', label: 'Parent', children: [{ value: 'child', label: 'Child' }] },
    ]);

    expect(result[0].children).toHaveLength(1);
    expect(result[0].children[0].value).toBe('child');
  });

  it('object with options array recurses', () => {
    const result = getOptions([
      { value: 'group', label: 'Group', options: [{ value: 'opt', label: 'Opt' }] },
    ]);

    expect(result[0].options).toHaveLength(1);
    expect(result[0].options[0].value).toBe('opt');
  });
});
