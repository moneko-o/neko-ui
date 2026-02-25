import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Skeleton from '../index';

describe('Skeleton full coverage', () => {
  it('renders in dark theme', () => {
    theme.setScheme('dark');
    const { container } = render(() => (
      <Skeleton rows={3} active={true} avatar={true} title={true} />
    ));

    expect(container).toBeInTheDocument();
    theme.setScheme('light');
  });

  it('renders in light theme', () => {
    theme.setScheme('light');
    const { container } = render(() => <Skeleton rows={2} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with custom css', () => {
    const { container } = render(() => <Skeleton css=".skeleton { color: red; }" rows={1} />);

    expect(container).toBeInTheDocument();
  });
});
