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
});
