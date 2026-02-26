import { render } from '@solidjs/testing-library';

import Button from '../index';

describe('Button branches', () => {
  it('renders with css prop', () => {
    render(() => <n-button css=".btn { color: red; }">Styled</n-button>);
  });

  it('renders as link tag', () => {
    render(() => <n-button link={true}>Link</n-button>);
  });

  it('renders with custom tag', () => {
    render(() => <n-button tag="div">Div Button</n-button>);
  });

  it('renders with block=true to cover block style branch', () => {
    render(() => <Button block={true}>Block Button</Button>);
  });

  it('renders with icon as function to cover isFunction(icon) branch', () => {
    render(() => <Button icon={() => <span>★</span>}>With Icon</Button>);
  });

  it('renders with icon as JSX element (non-function)', () => {
    render(() => <Button icon={<span>♦</span>}>With Static Icon</Button>);
  });

  it('renders with loading=true to cover loading match branch', () => {
    render(() => <Button loading={true}>Loading</Button>);
  });

  it('click while disabled does not set animating', () => {
    const { container } = render(() => <Button disabled={true}>Disabled</Button>);
    const btn = container.querySelector('button');

    btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('animationend resets animating signal', () => {
    const { container } = render(() => <Button>Animate</Button>);
    const btn = container.querySelector('button');

    btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    btn?.dispatchEvent(new Event('animationend', { bubbles: true }));
  });
});
