import icon from '../index';

describe('Icon branches', () => {
  it('children without qualifiedName skips createElement', () => {
    const svg = icon({
      children: [
        {
          d: 'M0 0h24v24H0z',
        },
      ],
    });

    expect(svg.tagName).toBe('svg');
  });

  it('empty children array', () => {
    const svg = icon({ children: [] });

    expect(svg.tagName).toBe('svg');
  });
});
