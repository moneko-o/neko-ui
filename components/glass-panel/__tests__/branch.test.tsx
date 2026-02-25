import { render } from '@solidjs/testing-library';

import GlassPanel from '../index';

describe('GlassPanel branches', () => {
  it('renders with all filter properties to cover truthy branches', () => {
    render(() => (
      <GlassPanel
        blur="10"
        brightness="1.2"
        contrast="1.1"
        dropShadow="5px 5px 10px black"
        grayscale="0.5"
        hueRotate="90deg"
        invert="0.3"
        opacity="0.8"
        saturate="1.5"
        sepia="0.2"
      >
        Content
      </GlassPanel>
    ));
  });
});
