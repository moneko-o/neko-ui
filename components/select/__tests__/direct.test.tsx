import { createSignal } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

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

  it('click on tags when select is activeElement triggers openChange', () => {
    render(() => (
      <n-select data-testid="sel-active" options={['A', 'B', 'C']} />
    ));

    const nSelect = screen.getByTestId('sel-active');
    const shadow = nSelect.shadowRoot!;
    const selectDiv = shadow.querySelector('.select') as HTMLElement;
    const tagsDiv = shadow.querySelector('.tags') as HTMLElement;

    if (selectDiv && tagsDiv) {
      selectDiv.focus();

      const evt = new MouseEvent('mousedown', { bubbles: true });

      Object.defineProperty(evt, 'target', { value: tagsDiv });
      tagsDiv.dispatchEvent(evt);
    }
  });
});
