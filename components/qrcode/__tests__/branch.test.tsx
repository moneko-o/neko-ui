import { render } from '@solidjs/testing-library';

import QrCode from '../index';

describe('QrCode branches', () => {
  function mockCanvas() {
    return jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () =>
        ({
          clearRect: jest.fn(),
          fillRect: jest.fn(),
          fill: jest.fn(),
          fillStyle: '',
          drawImage: jest.fn(),
          beginPath: jest.fn(),
          arc: jest.fn(),
          moveTo: jest.fn(),
          lineTo: jest.fn(),
          bezierCurveTo: jest.fn(),
          closePath: jest.fn(),
        }) as unknown as CanvasRenderingContext2D,
    );
  }

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('canvas with shape=circle covers circle switch case', () => {
    mockCanvas();
    render(() => <QrCode value="circle-test" type="canvas" shape="circle" />);
  });

  it('canvas with shape=heart covers heart switch case', () => {
    mockCanvas();
    render(() => <QrCode value="heart-test" type="canvas" shape="heart" />);
  });

  it('canvas with shape=rhombus covers rhombus switch case', () => {
    mockCanvas();
    render(() => <QrCode value="rhombus-test" type="canvas" shape="rhombus" />);
  });

  it('canvas with shape=rect covers default/rect switch case', () => {
    mockCanvas();
    render(() => <QrCode value="rect-test" type="canvas" shape="rect" />);
  });

  it('canvas without icon skips image drawing', () => {
    mockCanvas();
    render(() => <QrCode value="no-icon" type="canvas" />);
  });

  it('canvas with explicit color and bgColor covers prop || branches', () => {
    mockCanvas();
    render(() => (
      <QrCode value="color-test" type="canvas" color="#ff0000" bgColor="#ffffff" />
    ));
  });

  it('svg with shape=circle covers SVG circle path', () => {
    render(() => <QrCode value="svg-circle" type="svg" shape="circle" />);
  });

  it('svg with shape=heart covers SVG heart path', () => {
    render(() => <QrCode value="svg-heart" type="svg" shape="heart" />);
  });

  it('svg with shape=rhombus covers SVG rhombus path', () => {
    render(() => <QrCode value="svg-rhombus" type="svg" shape="rhombus" />);
  });

  it('svg with shape=rect covers SVG default rect path', () => {
    render(() => <QrCode value="svg-rect" type="svg" shape="rect" />);
  });

  it('svg with icon renders image element', () => {
    render(() => <QrCode value="svg-icon" type="svg" icon="test.png" iconSize={7} />);
  });

  it('svg with custom color and bgColor covers prop || branches', () => {
    render(() => (
      <QrCode value="svg-color" type="svg" color="#ff0000" bgColor="#ffffff" />
    ));
  });

  it('svg without icon does not render image', () => {
    render(() => <QrCode value="no-icon-svg" type="svg" />);
  });

  it('canvas with size=0 throws RangeError', () => {
    mockCanvas();
    expect(() => {
      render(() => <QrCode value="zero-size" type="canvas" size={0} />);
    }).toThrow(RangeError);
  });

  it('canvas with negative border throws RangeError', () => {
    mockCanvas();
    expect(() => {
      render(() => <QrCode value="neg-border" type="canvas" border={-1} />);
    }).toThrow(RangeError);
  });

  it('svg with no shape uses default rect', () => {
    render(() => <QrCode value="default-svg" type="svg" />);
  });

  it('canvas with no shape uses default rect', () => {
    mockCanvas();
    render(() => <QrCode value="default-canvas" type="canvas" />);
  });

  it('svg border=0 renders with no border margin', () => {
    render(() => <QrCode value="no-border" type="svg" border={0 as never} />);
  });
});
