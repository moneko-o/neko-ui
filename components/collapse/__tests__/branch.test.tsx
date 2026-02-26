import { render } from '@solidjs/testing-library';

import Collapse from '../index';

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

  it('childNodes || [] fallback via custom element with no children', () => {
    render(() => <n-collapse title="Empty" />);
  });

  it('direct render with children covers list memo', () => {
    render(() => <Collapse title="Direct">{[<div>A</div>, <div>B</div>]}</Collapse>);
  });

  it('n-collapse custom element with children covers childNodes truthy path', () => {
    render(() => (
      <n-collapse title="With Children">
        <div>Child content</div>
      </n-collapse>
    ));
  });
});
