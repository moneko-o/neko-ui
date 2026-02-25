import { render } from '@solidjs/testing-library';

import Tree from '../index';

describe('Tree css prop coverage', () => {
  it('renders with css prop', () => {
    const data = [
      {
        title: 'Root',
        key: '0',
        children: [
          { title: 'Child 1', key: '0-0' },
          { title: 'Child 2', key: '0-1' },
        ],
      },
    ];
    const { container } = render(() => <Tree css="ul{color:red}" data={data} />);

    expect(container).toBeInTheDocument();
  });
});
