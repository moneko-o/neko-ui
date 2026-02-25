import { render } from '@solidjs/testing-library';

import Md from '../index';

describe('Md (direct render)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with text prop and tools', () => {
    render(() => <Md text="# Hello\n\nWorld" tools={['copy']} />);
    jest.advanceTimersByTime(500);
  });

  it('renders with notRender=true', () => {
    render(() => (
      <Md notRender={true} pictureViewer={false}>
        <h1>Static</h1>
      </Md>
    ));
    jest.advanceTimersByTime(500);
  });

  it('renders markdown with code blocks', () => {
    render(() => <Md text={'```js\nconst a = 1;\n```'} />);
    jest.advanceTimersByTime(500);
  });

  it('renders with TOC', () => {
    render(() => <Md text="[TOC]\n## Section 1\n## Section 2" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with image', () => {
    render(() => <Md text="![alt](test.jpg)" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with katex', () => {
    render(() => <Md text="$x^2$\n\n$$y = mx + b$$" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with getAnchorContainer', () => {
    render(() => <Md text="## Anchor" getAnchorContainer={() => document.body} />);
    jest.advanceTimersByTime(500);
  });

  it('renders with css prop', () => {
    render(() => <Md text="hello" css="p { color: red; }" />);
    jest.advanceTimersByTime(500);
  });

  it('renders with codeTheme and codeClassic', () => {
    render(() => (
      <Md text={'```js\nvar x;\n```'} codeTheme="dark" codeClassic={true} />
    ));
    jest.advanceTimersByTime(500);
  });

  it('renders empty text', () => {
    render(() => <Md text="" />);
    jest.advanceTimersByTime(500);
  });
});
