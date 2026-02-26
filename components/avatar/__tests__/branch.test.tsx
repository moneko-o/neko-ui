import { render } from '@solidjs/testing-library';

import Avatar from '../index';

describe('Avatar branches', () => {
  it('label scaling when clientWidth is small', () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return 20;
      },
    });

    render(() => <Avatar>VeryLongUserName</Avatar>);
  });

  it('group with no data via custom element', () => {
    const { container } = render(() => <n-avatar-group />);

    expect(container).toBeInTheDocument();
  });
});
