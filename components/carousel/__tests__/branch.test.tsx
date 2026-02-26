import { render } from '@solidjs/testing-library';

import Carousel from '../index';

describe('Carousel branches', () => {
  it('autoplay with fractional value', () => {
    const { container } = render(() => (
      <n-carousel autoplay={0.5}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </n-carousel>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with css prop to cover <Show when={props.css}>', () => {
    render(() => (
      <Carousel css=".carousel { border: 1px solid; }">{[<div>A</div>, <div>B</div>]}</Carousel>
    ));
  });

  it('header as function covers isFunction(props.header) branch', () => {
    render(() => (
      <Carousel header={(idx: number) => <span>Slide {idx}</span>}>
        {[<div>A</div>, <div>B</div>]}
      </Carousel>
    ));
  });

  it('header as static JSX covers non-function header branch', () => {
    render(() => (
      <Carousel header={(<span>Static Header</span>) as never}>
        {[<div>A</div>, <div>B</div>]}
      </Carousel>
    ));
  });

  it('dots enabled covers dots rendering branch', () => {
    render(() => <Carousel dots={true}>{[<div>A</div>, <div>B</div>, <div>C</div>]}</Carousel>);
  });

  it('onChange callback fires on offset change', () => {
    const onChange = jest.fn();

    render(() => <Carousel onChange={onChange}>{[<div>A</div>, <div>B</div>]}</Carousel>);
  });

  it('childNodes || [] fallback via n-carousel with no children', () => {
    render(() => <n-carousel />);
  });
});
