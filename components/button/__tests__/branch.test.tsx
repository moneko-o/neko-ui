import { render } from '@solidjs/testing-library';

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
});
