import { render } from '@solidjs/testing-library';

import Menu from '../index';

describe('Menu css prop coverage', () => {
  it('renders with css prop', () => {
    const items = [
      { label: 'Item 1', key: '1' },
      { label: 'Item 2', key: '2' },
    ];
    const { container } = render(() => <Menu css="section{color:red}" items={items} />);

    expect(container).toBeInTheDocument();
  });
});
