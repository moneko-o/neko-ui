import { render } from '@solidjs/testing-library';

import Md from '../index';

async function flush(n = 10) {
  for (let i = 0; i < n; i++) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

describe('Md direct render', () => {
  it('renders markdown text via worker', async () => {
    render(() => <Md text="# Hello World" />);
    await flush();
  });

  it('renders with children (notRender mode)', async () => {
    render(() => (
      <Md notRender={true} pictureViewer={false}>
        <h1>Title</h1>
        <p>Content</p>
      </Md>
    ));
    await flush();
  });

  it('renders with TOC text', async () => {
    render(() => (
      <Md
        text="[TOC]\n## Section A\n## Section B\nContent"
        getAnchorContainer={() => document.body}
      />
    ));
    await flush();
  });

  it('renders with tools', async () => {
    render(() => <Md text="# Tools" tools={['copy']} />);
    await flush();
  });

  it('renders with empty tools', async () => {
    render(() => <Md text="# No Tools" tools={[]} />);
    await flush();
  });

  it('renders with css prop', async () => {
    render(() => <Md text="styled" css="p { color: red; }" />);
    await flush();
  });

  it('renders with codeTheme and codeClassic', async () => {
    render(() => <Md text="```js\nvar x;\n```" codeTheme="dark" codeClassic={true} />);
    await flush();
  });

  it('renders with image markdown', async () => {
    render(() => <Md text="![alt](img.jpg)" pictureViewer={true} lazyPicture={true} />);
    await flush();
  });

  it('renders with katex', async () => {
    render(() => <Md text="$x^2$ and $$y=mx+b$$" />);
    await flush();
  });

  it('renders empty text', async () => {
    render(() => <Md text="" />);
    await flush();
  });

  it('cleanup on unmount', async () => {
    const { unmount } = render(() => <Md text="# Cleanup" />);

    await flush();
    unmount();
  });

  it('custom getAnchorContainer', async () => {
    const container = document.createElement('div');

    document.body.appendChild(container);
    render(() => <Md text="# Anchor" getAnchorContainer={() => container} />);
    await flush();
    document.body.removeChild(container);
  });
});
