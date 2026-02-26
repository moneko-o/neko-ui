import { render } from '@solidjs/testing-library';

import GlassPanel from '../index';

describe('GlassPanel full coverage', () => {
  it('renders with all filter properties', () => {
    const { container } = render(() => (
      <GlassPanel
        filterBlur="16px"
        brightness="1.2"
        contrast="1.1"
        dropShadow="5px 5px 10px black"
        grayscale="0.5"
        hueRotate="90deg"
        invert="0.3"
        opacity="0.8"
        saturate="1.5"
        sepia="0.2"
        css=".custom { color: red; }"
        class="my-glass"
      >
        <div>Content</div>
      </GlassPanel>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with SVG filter props', () => {
    render(() => (
      <GlassPanel
        filterBlur="8px"
        filter={{ x: '-10%', y: '-10%', width: '120%', height: '120%' }}
        feTurbulence={{ baseFrequency: '0.03', numOctaves: '3', type: 'fractalNoise' }}
        feDisplacementMap={{ in: 'SourceGraphic', scale: '30' }}
      >
        <div>SVG Filtered</div>
      </GlassPanel>
    ));
  });

  it('renders with no filter properties (defaults only)', () => {
    render(() => (
      <GlassPanel>
        <div>Default</div>
      </GlassPanel>
    ));
  });

  it('renders with subset of filter properties', () => {
    render(() => (
      <GlassPanel brightness="0.9" sepia="0.5">
        <div>Partial</div>
      </GlassPanel>
    ));
  });

  it('custom element renders with all props to cover registry callback', () => {
    const { container } = render(() => (
      <n-glass-panel
        filter-blur="20px"
        brightness="1.5"
        contrast="1.3"
        drop-shadow="2px 2px 5px red"
        grayscale="0.8"
        hue-rotate="45deg"
        invert="0.6"
        opacity="0.9"
        saturate="2.0"
        sepia="0.4"
        css=".test { margin: 0; }"
        class="ce-glass"
      >
        <div>CE Content</div>
      </n-glass-panel>
    ));

    expect(container).toBeInTheDocument();
  });
});
