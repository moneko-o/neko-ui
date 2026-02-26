import { render } from '@solidjs/testing-library';

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
});
