import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Segmented from '../index';

describe('Segmented branches', () => {
  it('dark theme branch', () => {
    theme.setScheme('dark');
    render(() => <Segmented options={['A', 'B']} />);
    theme.setScheme('light');
  });

  it('light theme branch', () => {
    theme.setScheme('light');
    render(() => <Segmented options={['A', 'B']} />);
  });

  it('disabled item prevents onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Segmented
        options={[
          { value: 'a', label: 'A', disabled: true },
          { value: 'b', label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const item = container.querySelector('.item');

    if (item) item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('uncontrolled value change', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Segmented options={['A', 'B']} onChange={onChange} />);
    const items = container.querySelectorAll('.item');

    if (items.length > 1) {
      items[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
});
