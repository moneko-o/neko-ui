import { render } from '@solidjs/testing-library';

describe('Collapse branches', () => {
  it('renders with css prop', () => {
    render(() => (
      <n-collapse title="Title" css="details { color: red; }">
        <div>Content</div>
      </n-collapse>
    ));
  });

  it('renders without css prop', () => {
    render(() => (
      <n-collapse title="Title">
        <div>Content</div>
      </n-collapse>
    ));
  });
});
