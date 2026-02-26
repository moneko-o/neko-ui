import { render } from '@solidjs/testing-library';

describe('Marquee', () => {
  it('renders basic marquee', () => {
    const { container } = render(() => (
      <n-marquee>
        <span>Scrolling Text</span>
      </n-marquee>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with custom speed', () => {
    const { container } = render(() => (
      <n-marquee speed={10}>
        <span>Fast Scroll</span>
      </n-marquee>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with hover pause disabled', () => {
    const { container } = render(() => (
      <n-marquee hoverPause={false}>
        <span>No Pause</span>
      </n-marquee>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with mask disabled', () => {
    const { container } = render(() => (
      <n-marquee mask={false}>
        <span>No Mask</span>
      </n-marquee>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with custom class', () => {
    const { container } = render(() => (
      <n-marquee class="custom-marquee" speed={20}>
        <span>Styled Marquee</span>
      </n-marquee>
    ));

    expect(container).toBeInTheDocument();
  });
});
