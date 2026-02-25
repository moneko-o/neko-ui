import { render } from '@solidjs/testing-library';

import AvatarGroup from '../group';
import Avatar from '../index';

describe('Avatar css prop coverage', () => {
  it('renders Avatar with css prop', () => {
    const { container } = render(() => <Avatar css="div{color:red}" username="Test" />);

    expect(container).toBeInTheDocument();
  });

  it('renders AvatarGroup with css prop', () => {
    const { container } = render(() => (
      <AvatarGroup css="div{color:red}" data={[{ username: 'A' }, { username: 'B' }]} />
    ));

    expect(container).toBeInTheDocument();
  });
});
