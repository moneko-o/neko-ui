import { render } from '@solidjs/testing-library';

import AvatarGroup from '../group';
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

  it('renders with css prop to cover <Show when={local.css}>', () => {
    render(() => <Avatar css=".avatar { border: 1px solid red; }" username="AB" />);
  });

  it('renders with username (no src) to cover username Match branch', () => {
    render(() => <Avatar username="CD" />);
  });

  it('renders with src to cover src Match branch', () => {
    render(() => <Avatar src="https://example.com/avatar.png" alt="test" />);
  });

  it('group with data=undefined covers data || [] fallback', () => {
    render(() => <AvatarGroup data={undefined} />);
  });

  it('group with maxCount less than data.length covers more() branch', () => {
    const data = [
      { username: 'A' },
      { username: 'B' },
      { username: 'C' },
      { username: 'D' },
      { username: 'E' },
    ];

    render(() => <AvatarGroup data={data} maxCount={3} size="small" />);
  });

  it('group with css prop covers <Show when={local.css}>', () => {
    render(() => <AvatarGroup data={[{ username: 'X' }]} css=".group { gap: 4px; }" />);
  });
});
