import { render } from '@solidjs/testing-library';

import Tabs from '../index';

describe('Tabs (direct)', () => {
  it('wheel scroll with wide content', () => {
    const scrollToSpy = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: scrollToSpy,
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

  it('wheel handler calls stopPropagation/preventDefault when passiveSupported is false', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const common = require('@moneko/common');
    const origDesc = Object.getOwnPropertyDescriptor(common, 'passiveSupported');

    Object.defineProperty(common, 'passiveSupported', {
      value: false,
      configurable: true,
      writable: true,
    });

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

    const items = Array.from({ length: 20 }, (_, i) => ({
      value: i,
      label: `Tab ${i}`,
      content: `Content ${i}`,
    }));
    const { container } = render(() => <Tabs items={items} />);
    const tabs = container.querySelector('.tabs');

    if (tabs) {
      const wheelEvt = new WheelEvent('wheel', {
        deltaX: 10,
        deltaY: 0,
        bubbles: true,
        cancelable: true,
      });
      const stopSpy = jest.spyOn(wheelEvt, 'stopPropagation');
      const preventSpy = jest.spyOn(wheelEvt, 'preventDefault');

      tabs.dispatchEvent(wheelEvt);

      expect(stopSpy).toHaveBeenCalled();
      expect(preventSpy).toHaveBeenCalled();
    }

    if (origDesc) {
      Object.defineProperty(common, 'passiveSupported', origDesc);
    }
  });
});
