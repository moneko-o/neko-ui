import '@testing-library/jest-dom';

export const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  };

window.HTMLElement.prototype.scrollIntoView =
  window.HTMLElement.prototype.scrollIntoView || jest.fn();

const mockObserveFn = () => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver =
  window.IntersectionObserver || jest.fn().mockImplementation(mockObserveFn);

if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = jest.fn(() => 'blob:mock');
  URL.revokeObjectURL = jest.fn();
}

if (typeof Worker === 'undefined') {
  (globalThis as Record<string, unknown>).Worker = class MockWorker {
    private listeners: Record<string, Function[]> = {};

    constructor() {}
    postMessage(data: unknown) {
      const d = data as Record<string, unknown>;

      setTimeout(() => {
        const html = `<div>${d?.text || ''}</div>`;

        this.listeners['message']?.forEach((fn) => fn({ data: html }));
      }, 0);
    }
    terminate() {}
    addEventListener(event: string, fn: Function) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(fn);
    }
    removeEventListener(event: string, fn: Function) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter((f) => f !== fn);
      }
    }
    dispatchEvent() {
      return true;
    }
  };
}
