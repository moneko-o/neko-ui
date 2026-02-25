import loadingIcon from '../loading';

describe('loadingIcon', () => {
  it('returns an SVG element', () => {
    const svg = loadingIcon();

    expect(svg).toBeInstanceOf(SVGSVGElement);
  });

  it('contains a g element', () => {
    const svg = loadingIcon();
    const g = svg.querySelector('g');

    expect(g).not.toBeNull();
  });

  it('sets style on the g element', () => {
    const svg = loadingIcon();
    const g = svg.querySelector('g');

    expect(g!.getAttribute('style')).toBe('transform-box:fill-box; transform-origin:center;');
  });

  it('contains a path with the correct d attribute', () => {
    const svg = loadingIcon();
    const path = svg.querySelector('path');

    expect(path).not.toBeNull();
    expect(path!.getAttribute('d')).toBe(
      'M512 64c247.2 0 448 200.8 448 448h-64c0-212-172-384-384-384V64zm0 832c-212 0-384-172-384-384H64c0 247.2 200.8 448 448 448v-64z',
    );
  });

  it('contains an animateTransform element', () => {
    const svg = loadingIcon();
    const animate = svg.querySelector('animateTransform');

    expect(animate).not.toBeNull();
    expect(animate!.getAttribute('attributeName')).toBe('transform');
    expect(animate!.getAttribute('type')).toBe('rotate');
    expect(animate!.getAttribute('dur')).toBe('1s');
    expect(animate!.getAttribute('repeatCount')).toBe('indefinite');
  });

  it('returns a new SVG on each call', () => {
    const svg1 = loadingIcon();
    const svg2 = loadingIcon();

    expect(svg1).not.toBe(svg2);
  });
});
