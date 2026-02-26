import { render } from '@solidjs/testing-library';

import Tabs from '../index';

describe('Tabs scroll direct render', () => {
  it('wheel scroll on wide tabs container', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      get() {
        return 2000;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return 400;
      },
    });

    const items = Array.from({ length: 20 }, (_, i) => ({
      value: i,
      label: `Tab ${i}`,
      content: `Content ${i}`,
    }));
    const { container } = render(() => <Tabs items={items} />);
    const tabs = container.querySelector('.tabs');

    if (tabs) {
      tabs.dispatchEvent(new WheelEvent('wheel', { deltaX: 10, deltaY: 0, bubbles: true }));
      tabs.dispatchEvent(new WheelEvent('wheel', { deltaX: 0, deltaY: 5, bubbles: true }));
    }
  });
});
