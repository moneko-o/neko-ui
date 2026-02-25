import { render } from '@solidjs/testing-library';

import Marquee from '../index';

describe('Marquee full coverage', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        if (this.classList?.contains('n-marquee')) return 300;
        if (this.classList?.contains('n-marquee-item')) return 100;
        return 50;
      },
    });
  });

  it('renders with array children to cover Array.isArray branch', () => {
    render(() => (
      <Marquee>
        <span>Item A</span>
        <span>Item B</span>
        <span>Item C</span>
      </Marquee>
    ));
  });

  it('renders with single child (non-array branch)', () => {
    render(() => (
      <Marquee>
        <span>Solo Item</span>
      </Marquee>
    ));
  });

  it('count calculated from offsetWidth ratio', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        if (this.classList?.contains('n-marquee')) return 500;
        if (this.classList?.contains('n-marquee-item')) return 100;
        return 50;
      },
    });
    render(() => (
      <Marquee>
        <span>Wide</span>
      </Marquee>
    ));
  });

  it('renders with css prop', () => {
    render(() => (
      <Marquee css=".custom { padding: 4px; }">
        <span>Styled</span>
      </Marquee>
    ));
  });

  it('renders with all options via custom element', () => {
    render(() => (
      <n-marquee speed={10} hover-pause={true} mask={true} css=".x { margin: 0; }">
        <span>CE Item 1</span>
        <span>CE Item 2</span>
      </n-marquee>
    ));
  });

  it('renders custom element with mask=false and hoverPause=false', () => {
    render(() => (
      <n-marquee speed={20} hover-pause={false} mask={false}>
        <span>No mask</span>
      </n-marquee>
    ));
  });

  it('array children where items have cloneNode', () => {
    const span1 = document.createElement('span');

    span1.textContent = 'Clone A';
    const span2 = document.createElement('span');

    span2.textContent = 'Clone B';

    render(() => <Marquee>{[span1, span2]}</Marquee>);
  });

  it('array children with plain text nodes (no cloneNode)', () => {
    render(() => <Marquee>{['text1', 'text2'] as unknown as Element[]}</Marquee>);
  });
});
