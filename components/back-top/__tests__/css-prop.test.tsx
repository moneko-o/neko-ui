import { render } from '@solidjs/testing-library';

import BackTop from '../index';

describe('BackTop css prop coverage', () => {
  it('renders with css prop', async () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => 500,
    });
    const { container } = render(() => <BackTop css="div{color:red}" visibilityHeight={0} />);

    window.dispatchEvent(new Event('scroll'));
    await new Promise((r) => setTimeout(r, 50));
    expect(container).toBeInTheDocument();
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => 0,
    });
  });
});
