import { render } from '@solidjs/testing-library';

import ColorPalette from '../index';

describe('ColorPalette parseOpacity (lines 92-97)', () => {
  it('calls parseOpacity with string and number values', () => {
    const { container } = render(() => <ColorPalette value="rgba(255,0,0,0.5)" />);

    const inputs = container.querySelectorAll('n-input-number');

    expect(inputs.length).toBeGreaterThanOrEqual(4);

    const opacityEl = inputs[3] as unknown as { parse?: (v?: string | number) => number };

    expect(typeof opacityEl.parse).toBe('function');

    // String value enters the typeof v === 'string' branch (lines 94-96)
    expect(opacityEl.parse!('50%')).toBeCloseTo(0.5);

    // Number value skips the string branch, goes directly to return (line 97)
    expect(opacityEl.parse!(75)).toBeCloseTo(0.75);
  });
});
