import icon from '..';

describe('icon', () => {
  it('creates an SVG element with defaults', () => {
    const svg = icon({});

    expect(svg).toBeInstanceOf(SVGSVGElement);
    expect(svg.getAttribute('viewBox')).toBe('0 0 1024 1024');
    expect(svg.getAttribute('width')).toBe('1em');
    expect(svg.getAttribute('height')).toBe('1em');
    expect(svg.getAttribute('fill')).toBe('currentcolor');
  });

  it('applies custom viewBox, width, height, fill', () => {
    const svg = icon({
      viewBox: '0 0 512 512',
      width: '2em',
      height: '2em',
      fill: 'red',
    });

    expect(svg.getAttribute('viewBox')).toBe('0 0 512 512');
    expect(svg.getAttribute('width')).toBe('2em');
    expect(svg.getAttribute('height')).toBe('2em');
    expect(svg.getAttribute('fill')).toBe('red');
  });

  it('creates children with qualifiedName', () => {
    const svg = icon({
      children: [
        {
          qualifiedName: 'path',
          d: 'M0 0L10 10',
        },
      ],
    });

    const path = svg.querySelector('path');

    expect(path).not.toBeNull();
    expect(path!.getAttribute('d')).toBe('M0 0L10 10');
  });

  it('handles nested children', () => {
    const svg = icon({
      children: [
        {
          qualifiedName: 'g',
          children: [
            {
              qualifiedName: 'circle',
              cx: '50',
              cy: '50',
              r: '25',
            },
          ],
        },
      ],
    });

    const g = svg.querySelector('g');
    const circle = svg.querySelector('circle');

    expect(g).not.toBeNull();
    expect(circle).not.toBeNull();
    expect(circle!.getAttribute('cx')).toBe('50');
    expect(circle!.getAttribute('cy')).toBe('50');
    expect(circle!.getAttribute('r')).toBe('25');
  });

  it('sets arbitrary attributes on SVG elements', () => {
    const svg = icon({
      id: 'my-icon',
      opacity: '0.5',
    });

    expect(svg.getAttribute('id')).toBe('my-icon');
    expect(svg.getAttribute('opacity')).toBe('0.5');
  });

  it('handles children without qualifiedName', () => {
    const svg = icon({
      children: [
        {
          d: 'M0 0',
        },
      ],
    });

    expect(svg.getAttribute('d')).toBe('M0 0');
    expect(svg.children.length).toBe(0);
  });

  it('handles empty children array', () => {
    const svg = icon({ children: [] });

    expect(svg).toBeInstanceOf(SVGSVGElement);
    expect(svg.children.length).toBe(0);
  });
});
