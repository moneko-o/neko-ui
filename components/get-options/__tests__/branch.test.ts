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
});
