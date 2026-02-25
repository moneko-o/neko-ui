import { render } from '@solidjs/testing-library';

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
});
