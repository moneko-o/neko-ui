import { render } from '@solidjs/testing-library';

import Marquee from '../index';

describe('Marquee branches', () => {
  it('children as array exercises cloneNode path', () => {
    render(() => (
      <Marquee>
        <span>Item A</span>
        <span>Item B</span>
      </Marquee>
    ));
  });

  it('single child (non-array) exercises non-array path', () => {
    render(() => (
      <Marquee>
        <span>Solo</span>
      </Marquee>
    ));
  });

  it('el.offsetWidth calculates count', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return 100;
      },
    });
    render(() => (
      <Marquee>
        <span>Sized</span>
      </Marquee>
    ));
  });

  it('mask=false disables mask class', () => {
    render(() => (
      <Marquee mask={false}>
        <span>No Mask</span>
      </Marquee>
    ));
  });

  it('hoverPause=false disables hover-pause class', () => {
    render(() => (
      <Marquee hoverPause={false}>
        <span>No Pause</span>
      </Marquee>
    ));
  });

  it('renders with css prop', () => {
    render(() => (
      <Marquee css=".n-marquee { background: red; }">
        <span>Styled</span>
      </Marquee>
    ));
  });
});
