import { render } from '@solidjs/testing-library';

import Input from '../index';

describe('Input (direct render)', () => {
  it('renders with number type', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);

    expect(container.querySelector('input')).toBeTruthy();
  });

  it('renders with capsLockIcon', () => {
    const { container } = render(() => <Input capsLockIcon={true} />);

    expect(container.querySelector('input')).toBeTruthy();
  });
});
