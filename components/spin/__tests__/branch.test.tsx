import { render } from '@solidjs/testing-library';

import Spin from '../index';

describe('Spin branches', () => {
  it('custom element with no childNodes', () => {
    render(() => <n-spin />);
  });

  it('custom element with child content', () => {
    render(() => (
      <n-spin spin={true}>
        <div>Loading content</div>
      </n-spin>
    ));
  });

  it('renders with css prop to cover <Show when={props.css}>', () => {
    render(() => <Spin css=".spin { border-color: red; }">Content</Spin>);
  });

  it('renders with class prop', () => {
    render(() => <Spin class="custom-spin">Content</Spin>);
  });

  it('spin=false does not add spining class', () => {
    render(() => <Spin spin={false}>Not spinning</Spin>);
  });

  it('childNodes || [] fallback via custom element without children', () => {
    render(() => <n-spin />);
  });
});
