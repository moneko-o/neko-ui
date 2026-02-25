import { fireEvent, render } from '@solidjs/testing-library';

describe('Pagination', () => {
  it('renders basic pagination', () => {
    const { container } = render(() => <n-pagination total={100} page={1} pageSize={10} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with default props', () => {
    const { container } = render(() => <n-pagination total={50} />);

    expect(container).toBeInTheDocument();
  });

  it('handles onChange callback', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pagination" total={100} pageSize={10} onChange={change} />
    ));

    expect(getByTestId('pagination')).toBeInTheDocument();
    const buttons = getByTestId('pagination').shadowRoot?.querySelectorAll('n-button');

    if (buttons && buttons.length > 1) {
      fireEvent.click(buttons[1] as unknown as HTMLElement);
    }
  });

  it('renders with custom size', () => {
    const { container } = render(() => <n-pagination total={100} size="small" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with zero total', () => {
    const { container } = render(() => <n-pagination total={0} />);

    expect(container).toBeInTheDocument();
  });
});
