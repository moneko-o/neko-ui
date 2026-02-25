import { render } from '@solidjs/testing-library';

import Segmented from '../index';

describe('Segmented css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => (
      <Segmented css="div{color:red}" options={[{ label: 'A', value: 'a' }]} />
    ));

    expect(container).toBeInTheDocument();
  });
});
