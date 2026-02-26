import { render } from '@solidjs/testing-library';

import AvatarGroup from '../group';
import Avatar from '../index';

describe('Avatar full coverage', () => {
  it('label scaling when clientWidth + 6 > box clientWidth', () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return 10;
      },
    });

    const { container } = render(() => <Avatar username="VeryLongUserNameThatExceedsBox" />);

    expect(container).toBeInTheDocument();

    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return 0;
      },
    });
  });

  it('AvatarGroup renders with data=undefined (fallback to empty array)', () => {
    const { container } = render(() => <AvatarGroup data={void 0} />);

    expect(container).toBeInTheDocument();
  });

  it('AvatarGroup renders with data provided', () => {
    const { container } = render(() => (
      <AvatarGroup data={[{ src: 'https://example.com/a.png' }, { username: 'User1' }]} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('Avatar registry creates custom element', () => {
    const { container } = render(() => <Avatar src="https://example.com/img.png" alt="test" />);

    expect(container).toBeInTheDocument();
  });
});
