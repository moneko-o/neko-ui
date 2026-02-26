import { render } from '@solidjs/testing-library';

import Spin from '../index';

describe('Spin full coverage', () => {
  it('renders Spin directly with children', () => {
    const { container } = render(() => (
      <Spin spin={true}>
        <div>Loading content here</div>
      </Spin>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders Spin directly without children', () => {
    const { container } = render(() => <Spin spin={true} />);

    expect(container).toBeInTheDocument();
  });

  it('renders Spin with spin=false', () => {
    const { container } = render(() => (
      <Spin spin={false}>
        <span>Content</span>
      </Spin>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders Spin with custom css', () => {
    const { container } = render(() => <Spin css=".spin { color: blue; }" />);

    expect(container).toBeInTheDocument();
  });
});
