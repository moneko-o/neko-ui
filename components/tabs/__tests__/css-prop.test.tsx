import { render } from '@solidjs/testing-library';

import Tabs from '../index';

describe('Tabs css prop coverage', () => {
  it('renders with css prop', () => {
    const items = [
      { value: 1, label: 'Tab 1', content: 'Content 1' },
      { value: 2, label: 'Tab 2', content: 'Content 2' },
    ];
    const { container } = render(() => <Tabs css="div{color:red}" items={items} />);

    expect(container).toBeInTheDocument();
  });
});
