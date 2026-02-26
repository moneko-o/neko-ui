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
          beginPath: jest.fn(),
          arc: jest.fn(),
          moveTo: jest.fn(),
          lineTo: jest.fn(),
          bezierCurveTo: jest.fn(),
          closePath: jest.fn(),
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

  it('renders with heart shape (svg)', () => {
    const { container } = render(() => <n-qrcode value="heart" shape="heart" type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with rect shape (default svg)', () => {
    const { container } = render(() => <n-qrcode value="rect" shape="rect" type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with icon prop (svg)', () => {
    const { container } = render(() => (
      <n-qrcode value="icon-test" icon="https://example.com/icon.png" type="svg" iconSize={10} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with icon prop (canvas)', () => {
    const drawImage = jest.fn();

    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () =>
        ({
          clearRect: jest.fn(),
          fillRect: jest.fn(),
          fillText: jest.fn(),
          drawImage,
          fill: jest.fn(),
          rect: jest.fn(),
          fillStyle: '',
          beginPath: jest.fn(),
          arc: jest.fn(),
          moveTo: jest.fn(),
          lineTo: jest.fn(),
          bezierCurveTo: jest.fn(),
          closePath: jest.fn(),
          createLinearGradient: () => ({ addColorStop: jest.fn() }),
          getImageData: (x: number, y: number, w: number, h: number) => ({
            data: [x, y, w, h],
          }),
        }) as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(() => (
      <n-qrcode value="canvas-icon" type="canvas" icon="https://example.com/icon.png" />
    ));

    expect(container).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it('renders with minVersion and maxVersion', () => {
    const { container } = render(() => (
      <n-qrcode value="version-test" minVersion={5} maxVersion={10} type="svg" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with mask prop', () => {
    const { container } = render(() => <n-qrcode value="mask-test" mask={3} type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with boostEcc true', () => {
    const { container } = render(() => <n-qrcode value="boost" boostEcc={true} type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with boostEcc false', () => {
    const { container } = render(() => <n-qrcode value="no-boost" boostEcc={false} type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('canvas with circle shape', () => {
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () =>
        ({
          clearRect: jest.fn(),
          fillRect: jest.fn(),
          fill: jest.fn(),
          rect: jest.fn(),
          fillStyle: '',
          beginPath: jest.fn(),
          arc: jest.fn(),
          moveTo: jest.fn(),
          lineTo: jest.fn(),
          bezierCurveTo: jest.fn(),
          closePath: jest.fn(),
          drawImage: jest.fn(),
          createLinearGradient: () => ({ addColorStop: jest.fn() }),
          getImageData: (x: number, y: number, w: number, h: number) => ({
            data: [x, y, w, h],
          }),
        }) as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(() => (
      <n-qrcode value="canvas-circle" type="canvas" shape="circle" />
    ));

    expect(container).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it('canvas with heart shape', () => {
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () =>
        ({
          clearRect: jest.fn(),
          fillRect: jest.fn(),
          fill: jest.fn(),
          rect: jest.fn(),
          fillStyle: '',
          beginPath: jest.fn(),
          arc: jest.fn(),
          moveTo: jest.fn(),
          lineTo: jest.fn(),
          bezierCurveTo: jest.fn(),
          closePath: jest.fn(),
          drawImage: jest.fn(),
          createLinearGradient: () => ({ addColorStop: jest.fn() }),
          getImageData: (x: number, y: number, w: number, h: number) => ({
            data: [x, y, w, h],
          }),
        }) as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(() => (
      <n-qrcode value="canvas-heart" type="canvas" shape="heart" />
    ));

    expect(container).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it('canvas with rhombus shape', () => {
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () =>
        ({
          clearRect: jest.fn(),
          fillRect: jest.fn(),
          fill: jest.fn(),
          rect: jest.fn(),
          fillStyle: '',
          beginPath: jest.fn(),
          arc: jest.fn(),
          moveTo: jest.fn(),
          lineTo: jest.fn(),
          bezierCurveTo: jest.fn(),
          closePath: jest.fn(),
          drawImage: jest.fn(),
          createLinearGradient: () => ({ addColorStop: jest.fn() }),
          getImageData: (x: number, y: number, w: number, h: number) => ({
            data: [x, y, w, h],
          }),
        }) as unknown as CanvasRenderingContext2D,
    );

    const { container } = render(() => (
      <n-qrcode value="canvas-rhombus" type="canvas" shape="rhombus" />
    ));

    expect(container).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it('renders with low ecl', () => {
    const { container } = render(() => <n-qrcode value="low-ecl" ecl="l" type="svg" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with quartile ecl', () => {
    const { container } = render(() => <n-qrcode value="q-ecl" ecl="q" type="svg" />);

    expect(container).toBeInTheDocument();
  });
});
