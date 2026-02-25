import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Skeleton from '../index';

describe('Skeleton branches', () => {
  it('dark theme branch', () => {
    theme.setScheme('dark');
    render(() => <Skeleton />);
    theme.setScheme('light');
  });

  it('light theme branch', () => {
    theme.setScheme('light');
    render(() => <Skeleton />);
  });
});
