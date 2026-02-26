import { render } from '@solidjs/testing-library';

import QrCode from '../index';

describe('QrCode (direct render)', () => {
  it('canvas with icon triggers Image load', () => {
    const clearRect = jest.fn();
    const fillRect = jest.fn();
    const drawImage = jest.fn();

    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () =>
        ({
          clearRect,
          fillRect,
          fill: jest.fn(),
          rect: jest.fn(),
          fillStyle: '',
          drawImage,
          createLinearGradient: () => ({ addColorStop: jest.fn() }),
          getImageData: (x: number, y: number, w: number, h: number) => ({
            data: [x, y, w, h],
          }),
        }) as unknown as CanvasRenderingContext2D,
    );

    const origImage = window.Image;
    let onloadHandler: (() => void) | null = null;

    (window as unknown as Record<string, unknown>).Image = class MockImage {
      width = 0;
      height = 0;
      src = '';

      constructor(w?: number, h?: number) {
        this.width = w || 0;
        this.height = h || 0;
      }

      set onload(fn: () => void) {
        onloadHandler = fn;
      }
    };

    render(() => <QrCode value="icon-test" type="canvas" icon="test.png" iconSize={7} />);

    if (onloadHandler) onloadHandler();

    expect(drawImage).toHaveBeenCalled();

    window.Image = origImage;
    jest.restoreAllMocks();
  });

  it('svg with negative border throws RangeError', () => {
    expect(() => {
      render(() => <QrCode value="negative" type="svg" border={-1} />);
    }).toThrow(RangeError);
  });

  it('svg default renders correctly', () => {
    const { container } = render(() => <QrCode value="svg-test" type="svg" />);

    expect(container).toBeInTheDocument();
  });
});
