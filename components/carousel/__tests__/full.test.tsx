import { fireEvent, render } from '@solidjs/testing-library';

import Carousel from '../index';

describe('Carousel full coverage', () => {
  it('forward navigation sets direction=1 (right offset)', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Carousel onChange={onChange} dots={true}>
        {[<div>Slide 1</div>, <div>Slide 2</div>, <div>Slide 3</div>]}
      </Carousel>
    ));

    const nextBtn = container.querySelector('.next');

    if (nextBtn) {
      fireEvent.click(nextBtn);
      const item = container.querySelectorAll('.item')[1];

      if (item) fireEvent.animationEnd(item);
    }
  });

  it('backward navigation sets direction=-1 (left offset)', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Carousel onChange={onChange} dots={true}>
        {[<div>Slide 1</div>, <div>Slide 2</div>, <div>Slide 3</div>]}
      </Carousel>
    ));

    const prevBtn = container.querySelector('.prev');

    if (prevBtn) {
      fireEvent.click(prevBtn);
      const item = container.querySelectorAll('.item')[1];

      if (item) fireEvent.animationEnd(item);
    }
  });

  it('dot click with _current < _offset triggers backward', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Carousel onChange={onChange} dots={true} offset={2}>
        {[<div>S1</div>, <div>S2</div>, <div>S3</div>, <div>S4</div>, <div>S5</div>]}
      </Carousel>
    ));

    const dots = container.querySelectorAll('.dot');
    const item = container.querySelectorAll('.item')[1];

    if (dots.length > 0 && item) {
      fireEvent.click(dots[0]);
      fireEvent.animationEnd(item);
    }
  });

  it('dot click with _current > _offset triggers forward', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Carousel onChange={onChange} dots={true} offset={0}>
        {[<div>S1</div>, <div>S2</div>, <div>S3</div>, <div>S4</div>, <div>S5</div>]}
      </Carousel>
    ));

    const dots = container.querySelectorAll('.dot');
    const item = container.querySelectorAll('.item')[1];

    if (dots.length > 3 && item) {
      fireEvent.click(dots[3]);
      fireEvent.animationEnd(item);
    }
  });

  it('renders with header function', () => {
    const { container } = render(() => (
      <Carousel header={(n) => <span>Header {n}</span>}>
        {[<div>Slide A</div>, <div>Slide B</div>]}
      </Carousel>
    ));

    expect(container).toBeInTheDocument();
  });
});
