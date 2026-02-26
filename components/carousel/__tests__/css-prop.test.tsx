import { render } from '@solidjs/testing-library';

import Carousel from '../index';

describe('Carousel css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => (
      <Carousel css="div{color:red}" items={['Slide 1', 'Slide 2', 'Slide 3']} />
    ));

    expect(container).toBeInTheDocument();
  });
});
