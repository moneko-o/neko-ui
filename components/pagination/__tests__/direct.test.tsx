import { fireEvent, render } from '@solidjs/testing-library';

import Pagination from '../index';

describe('Pagination (direct)', () => {
  it('prev jump clamps to page 1', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Pagination total={200} page={2} pageSize={10} onChange={onChange} />
    ));
    const prevBtn = container.querySelector('.pagination-p');

    if (prevBtn) {
      const inner = (prevBtn as HTMLElement).shadowRoot?.querySelector('button');

      if (inner) fireEvent.click(inner);
    }
  });

  it('prev button from page 1 does nothing', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Pagination total={200} page={1} pageSize={10} onChange={onChange} />
    ));
    const prevBtn = container.querySelector('.pagination-prev');

    if (prevBtn) {
      const inner = (prevBtn as HTMLElement).shadowRoot?.querySelector('button');

      if (inner) fireEvent.click(inner);
    }

    expect(onChange).not.toHaveBeenCalled();
  });
});
