import { render } from '@solidjs/testing-library';

import Switch from '../index';

describe('Switch css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => <Switch css="span{color:red}" />);

    expect(container).toBeInTheDocument();
  });
});
