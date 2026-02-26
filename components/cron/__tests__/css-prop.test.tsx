import { render } from '@solidjs/testing-library';

import Cron from '../index';

describe('Cron css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => <Cron css="div{color:red}" />);

    expect(container).toBeInTheDocument();
  });
});
