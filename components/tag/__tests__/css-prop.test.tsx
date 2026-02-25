import { render } from '@solidjs/testing-library';

import Tag from '../index';

describe('Tag css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => <Tag css="span{color:red}">Tag</Tag>);

    expect(container).toBeInTheDocument();
  });
});
