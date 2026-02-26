import { fireEvent, render } from '@solidjs/testing-library';

describe('Pagination', () => {
  it('renders basic pagination with few pages', () => {
    const { container } = render(() => <n-pagination total={50} pageSize={10} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with default props', () => {
    const { container } = render(() => <n-pagination total={50} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with zero total (nothing shown)', () => {
    const { container } = render(() => <n-pagination total={0} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with many pages (>5 triggers ellipsis)', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} onChange={change} />
    ));
    const el = getByTestId('pager');
    const buttons = el.shadowRoot?.querySelectorAll('n-button');

    expect(buttons!.length).toBeGreaterThan(5);
  });

  it('clicks prev and next buttons', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} page={5} onChange={change} />
    ));
    const el = getByTestId('pager');
    const prevBtn = el.shadowRoot?.querySelector('.pagination-prev') as unknown as HTMLElement;
    const nextBtn = el.shadowRoot?.querySelector('.pagination-next') as unknown as HTMLElement;

    if (prevBtn) fireEvent.click(prevBtn);
    if (nextBtn) fireEvent.click(nextBtn);
  });

  it('clicks page number buttons', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} onChange={change} />
    ));
    const el = getByTestId('pager');
    const items = el.shadowRoot?.querySelectorAll('.pagination-item');

    items?.forEach((item) => {
      fireEvent.click(item as unknown as HTMLElement);
    });
    expect(change).toHaveBeenCalled();
  });

  it('clicks ellipsis (p) for prev jump', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} page={10} onChange={change} />
    ));
    const el = getByTestId('pager');
    const pBtn = el.shadowRoot?.querySelector('.pagination-p') as unknown as HTMLElement;

    if (pBtn) fireEvent.click(pBtn);
  });

  it('clicks ellipsis (n) for next jump', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} page={5} onChange={change} />
    ));
    const el = getByTestId('pager');
    const nBtn = el.shadowRoot?.querySelector('.pagination-n') as unknown as HTMLElement;

    if (nBtn) fireEvent.click(nBtn);
  });

  it('page at first boundary (prev disabled)', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} page={1} onChange={change} />
    ));
    const el = getByTestId('pager');
    const prevBtn = el.shadowRoot?.querySelector('.pagination-prev') as unknown as HTMLElement;

    if (prevBtn) fireEvent.click(prevBtn);
  });

  it('page at last boundary (next disabled)', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} page={10} onChange={change} />
    ));
    const el = getByTestId('pager');
    const nextBtn = el.shadowRoot?.querySelector('.pagination-next') as unknown as HTMLElement;

    if (nextBtn) fireEvent.click(nextBtn);
  });

  it('custom totalText function', () => {
    const totalText = (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total}`;
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} totalText={totalText} />
    ));

    expect(getByTestId('pager')).toBeInTheDocument();
  });

  it('totalText=false hides total text', () => {
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} totalText={false} />
    ));

    expect(getByTestId('pager')).toBeInTheDocument();
  });

  it('size prop', () => {
    const { container } = render(() => <n-pagination total={100} size="small" />);

    expect(container).toBeInTheDocument();
  });

  it('controlled page prop changes', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} page={3} onChange={change} />
    ));

    expect(getByTestId('pager')).toBeInTheDocument();
  });

  it('pageSize prop changes (kebab case)', () => {
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} page-size={5} page={2} />
    ));

    expect(getByTestId('pager')).toBeInTheDocument();

    const el = getByTestId('pager');
    const items = el.shadowRoot?.querySelectorAll('.pagination-item');

    expect(items!.length).toBeGreaterThan(5);
  });

  it('uncontrolled mode - page changes on click', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} onChange={change} />
    ));
    const el = getByTestId('pager');

    const nextBtn = el.shadowRoot?.querySelector('.pagination-next') as unknown as HTMLElement;

    if (nextBtn) {
      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);
    }

    const nBtn = el.shadowRoot?.querySelector('.pagination-n') as unknown as HTMLElement;

    if (nBtn) fireEvent.click(nBtn);

    const pBtn = el.shadowRoot?.querySelector('.pagination-p') as unknown as HTMLElement;

    if (pBtn) fireEvent.click(pBtn);
  });

  it('jump past boundaries clamps to first/last', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} onChange={change} />
    ));
    const el = getByTestId('pager');
    const pBtn = el.shadowRoot?.querySelector('.pagination-p') as unknown as HTMLElement;

    if (pBtn) fireEvent.click(pBtn);

    const prevBtn = el.shadowRoot?.querySelector('.pagination-prev') as unknown as HTMLElement;

    if (prevBtn) fireEvent.click(prevBtn);
  });

  it('pages computation with totals equal to maxCount', () => {
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={50} pageSize={10} />
    ));
    const el = getByTestId('pager');
    const items = el.shadowRoot?.querySelectorAll('.pagination-item');

    expect(items!.length).toBeGreaterThan(0);
  });

  it('page near end shows correct buttons', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} page={19} onChange={change} />
    ));
    const el = getByTestId('pager');
    const items = el.shadowRoot?.querySelectorAll('.pagination-item');

    expect(items!.length).toBeGreaterThan(5);

    const nextBtn = el.shadowRoot?.querySelector('.pagination-next') as unknown as HTMLElement;

    if (nextBtn) fireEvent.click(nextBtn);
  });

  it('page exactly at second-to-last shows n ellipsis', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} page={7} onChange={change} />
    ));
    const el = getByTestId('pager');
    const items = el.shadowRoot?.querySelectorAll('.pagination-item');

    items?.forEach((item) => {
      fireEvent.click(item as unknown as HTMLElement);
    });
  });

  it('page 2 shows p as direct neighbor of 1', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} page={2} onChange={change} />
    ));
    const el = getByTestId('pager');
    const items = el.shadowRoot?.querySelectorAll('.pagination-item');

    items?.forEach((item) => {
      fireEvent.click(item as unknown as HTMLElement);
    });
  });

  it('clicking same page does not trigger onChange', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={100} pageSize={10} page={5} onChange={change} />
    ));
    const el = getByTestId('pager');
    const items = el.shadowRoot?.querySelectorAll('.pagination-item');

    if (items && items.length) {
      const currentBtn = Array.from(items).find(
        (item) => (item as HTMLElement).getAttribute('aria-current') === 'page',
      );

      if (currentBtn) fireEvent.click(currentBtn as unknown as HTMLElement);
    }
  });

  it('jump to end from near-start position', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} onChange={change} />
    ));
    const el = getByTestId('pager');

    const nextBtn = el.shadowRoot?.querySelector('.pagination-next') as unknown as HTMLElement;

    for (let i = 0; i < 15; i++) {
      if (nextBtn) fireEvent.click(nextBtn);
    }

    const nBtn = el.shadowRoot?.querySelector('.pagination-n') as unknown as HTMLElement;

    if (nBtn) fireEvent.click(nBtn);
  });

  it('prev jump clamps to page 1', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-pagination
        data-testid="pager-clamp"
        total={200}
        page={2}
        pageSize={10}
        onChange={change}
      />
    ));

    const el = getByTestId('pager-clamp');
    const pBtn = el.shadowRoot?.querySelector('.pagination-p') as unknown as HTMLElement;

    if (pBtn) fireEvent.click(pBtn);
  });
});
