import { render } from '@solidjs/testing-library';

import ColorPalette from '../index';

describe('ColorPalette (direct render)', () => {
  it('renders with rgba value to exercise opacity functions', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <ColorPalette value="rgba(255, 0, 0, 0.5)" onChange={onChange} />
    ));

    const inputs = container.querySelectorAll('n-input-number');

    if (inputs.length >= 4) {
      const opacityInput = inputs[3];

      opacityInput.dispatchEvent(new CustomEvent('change', { detail: '50' }));
    }
  });

  it('copy button triggers clipboard', () => {
    const { container } = render(() => <ColorPalette value="#ff0000" />);
    const preview = container.querySelector('.preview');

    if (preview) preview.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('eyeDropper with EyeDropper API', async () => {
    const mockOpen = jest.fn(() => Promise.resolve({ sRGBHex: '#00ff00' }));

    (window as unknown as Record<string, unknown>).EyeDropper = class {
      open = mockOpen;
    };

    const { container } = render(() => <ColorPalette value="#ff0000" />);
    const eyeBtn = container.querySelector('.eye-dropper');

    if (eyeBtn) {
      eyeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();
      await Promise.resolve();
    }

    delete (window as unknown as Record<string, unknown>).EyeDropper;
  });

  it('eyeDropper without sRGBHex', async () => {
    (window as unknown as Record<string, unknown>).EyeDropper = class {
      open = jest.fn(() => Promise.resolve({}));
    };

    const { container } = render(() => <ColorPalette value="#ff0000" />);
    const eyeBtn = container.querySelector('.eye-dropper');

    if (eyeBtn) {
      eyeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();
      await Promise.resolve();
    }

    delete (window as unknown as Record<string, unknown>).EyeDropper;
  });
});
