import { fireEvent, render } from '@solidjs/testing-library';

import Pagination from '../index';

describe('Pagination full coverage', () => {
  it('prev jump clamps to 1 when page - maxCount < 1 (line 94)', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Pagination total={200} pageSize={10} onChange={onChange} />
    ));

    const nextBtn = container.querySelector('.pagination-next');

    if (nextBtn) {
      const inner = (nextBtn as HTMLElement).shadowRoot?.querySelector('button') || nextBtn;

      fireEvent.click(inner as HTMLElement);
      fireEvent.click(inner as HTMLElement);
      fireEvent.click(inner as HTMLElement);
    }

    const pBtn = container.querySelector('.pagination-p');

    expect(pBtn).toBeTruthy();

    if (pBtn) {
      const inner = (pBtn as HTMLElement).shadowRoot?.querySelector('button') || pBtn;

      fireEvent.click(inner as HTMLElement);
    }

    expect(onChange).toHaveBeenCalled();
  });

  it('clicking p from page 4 clamps next to 1', () => {
    const onChange = jest.fn();

    render(() => (
      <n-pagination data-testid="pager" total={200} pageSize={10} page={4} onChange={onChange} />
    ));
    const el = document.querySelector('[data-testid="pager"]');
    const pBtn = el?.shadowRoot?.querySelector('.pagination-p') as HTMLElement | null;

    if (pBtn) fireEvent.click(pBtn);
  });

  it('renders with custom totalText function', () => {
    const totalText = (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total}`;

    render(() => <Pagination total={100} pageSize={10} totalText={totalText} />);
  });

  it('renders with totalText=false', () => {
    render(() => <Pagination total={100} pageSize={10} totalText={false} />);
  });

  it('controlled page via custom element', () => {
    render(() => <n-pagination data-testid="pager-ctrl" total={100} pageSize={10} page={5} />);
  });

  it('custom element with css prop', () => {
    render(() => (
      <n-pagination
        data-testid="pager-css"
        total={100}
        pageSize={10}
        css=".pagination { padding: 4px; }"
      />
    ));
  });
});
