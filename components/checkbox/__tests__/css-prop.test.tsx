import { render } from '@solidjs/testing-library';

import Checkbox from '../index';

describe('Checkbox css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => (
      <Checkbox css="div{color:red}" options={[{ label: 'A', value: 'a' }]} />
    ));

    expect(container).toBeInTheDocument();
  });
});
