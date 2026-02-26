import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import BackTop from '../index';

describe('BackTop branches', () => {
  it('dark theme style branch', () => {
    theme.setScheme('dark');
    render(() => <BackTop target={document.body} mount={document.body} />);
    theme.setScheme('light');
  });

  it('light theme style branch', () => {
    theme.setScheme('light');
    render(() => <BackTop target={document.body} mount={document.body} />);
  });

  it('target as function returning undefined', () => {
    render(() => <BackTop target={() => void 0 as unknown as HTMLElement} mount={document.body} />);
  });
});
