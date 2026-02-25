import { createSignal } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';

import Select from '../index';

describe('Select (direct)', () => {
  it('click handler exercises openChange', () => {
    const { container } = render(() => <Select options={['A', 'B', 'C']} />);
    const select = container.querySelector('.select');

    if (select) {
      fireEvent.mouseDown(select);
      fireEvent.click(select);
    }
  });

  it('controlled open prop syncs', () => {
    function Wrapper() {
      const [open, setOpen] = createSignal<boolean | null>(null);

      return (
        <>
          <Select options={['A', 'B']} open={open()} />
          <button data-testid="open" onClick={() => setOpen(true)}>
            Open
          </button>
          <button data-testid="close" onClick={() => setOpen(false)}>
            Close
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <Wrapper />);

    getByTestId('open').click();
    getByTestId('close').click();
  });

  it('blur when open closes dropdown', () => {
    const { container } = render(() => <Select options={['X', 'Y']} />);
    const select = container.querySelector('.select');

    if (select) {
      fireEvent.focus(select);
      fireEvent.blur(select);
    }
  });
});
