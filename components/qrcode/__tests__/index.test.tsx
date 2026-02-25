import { render } from '@solidjs/testing-library';

describe('QrCode', () => {
  it('renders basic qrcode (svg)', () => {
    const { container } = render(() => <n-qrcode value="https://example.com" type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(() => <n-qrcode value="test" size={200} type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with custom colors', () => {
    const { container } = render(() => (
      <n-qrcode value="colored" color="#ff0000" bgColor="#ffffff" type="svg" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with different error correction levels', () => {
    const { container } = render(() => <n-qrcode value="ecl-test" ecl="h" type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with custom border', () => {
    const { container } = render(() => <n-qrcode value="border" border={4} type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with circle shape', () => {
    const { container } = render(() => <n-qrcode value="circle" shape="circle" type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with rhombus shape', () => {
    const { container } = render(() => <n-qrcode value="rhombus" shape="rhombus" type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with canvas type', () => {
    const clearRect = jest.fn();
    const fillRect = jest.fn();
    const fillText = jest.fn();
    const drawImage = jest.fn();

    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () =>
        ({
          clearRect,
          fillRect,
          fillText,
          drawImage,
          fill: jest.fn(),
          rect: jest.fn(),
          fillStyle: '',
          createLinearGradient: () => ({ addColorStop: jest.fn() }),
          getImageData: (x: number, y: number, w: number, h: number) => ({
            data: [x, y, w, h],
          }),
        }) as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(() => <n-qrcode value="canvas-test" type="canvas" />);

    expect(container).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
