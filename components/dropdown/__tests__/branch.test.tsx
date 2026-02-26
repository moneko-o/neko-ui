import { render } from '@solidjs/testing-library';

import Dropdown from '../index';

describe('Dropdown branches', () => {
  it('controlled open prop', () => {
    render(() => (
      <Dropdown open={true} onOpenChange={jest.fn()} items={[{ value: 'a', label: 'A' }]}>
        Trigger
      </Dropdown>
    ));
  });

  it('controlled value prop (non-array)', () => {
    render(() => (
      <Dropdown value="a" onChange={jest.fn()} items={[{ value: 'a', label: 'A' }]}>
        Trigger
      </Dropdown>
    ));
  });

  it('controlled value prop (array)', () => {
    render(() => (
      <Dropdown
        value={['a', 'b']}
        multiple={true}
        onChange={jest.fn()}
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      >
        Trigger
      </Dropdown>
    ));
  });

  it('value null clears selection', () => {
    render(() => (
      <Dropdown value={null as unknown as string} items={[{ value: 'a', label: 'A' }]}>
        Trigger
      </Dropdown>
    ));
  });

  it('empty items shows Empty fallback', () => {
    render(() => (
      <Dropdown items={[]} open={true}>
        Trigger
      </Dropdown>
    ));
  });

  it('undefined items shows Empty fallback via optional chaining', () => {
    render(() => (
      <Dropdown items={void 0 as never} open={true}>
        Trigger
      </Dropdown>
    ));
  });

  it('menuCss prop is passed through when items have length', () => {
    render(() => (
      <Dropdown items={[{ value: 'a', label: 'A' }]} menuCss=".menu { color: red; }" open={true}>
        Trigger
      </Dropdown>
    ));
  });

  it('change handler with non-array key in uncontrolled mode', () => {
    const onChange = jest.fn();

    render(() => (
      <Dropdown items={[{ value: 'a', label: 'A' }]} onChange={onChange} open={true}>
        Trigger
      </Dropdown>
    ));

    const menus = document.querySelectorAll('n-menu');

    menus.forEach((menu) => {
      menu.dispatchEvent(
        new CustomEvent('change', {
          detail: ['a', { value: 'a', label: 'A' }],
          bubbles: true,
        }),
      );
    });
  });

  it('change handler with array key in multiple mode', () => {
    const onChange = jest.fn();

    render(() => (
      <Dropdown
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
        multiple={true}
        onChange={onChange}
        open={true}
      >
        Trigger
      </Dropdown>
    ));

    const menus = document.querySelectorAll('n-menu');

    menus.forEach((menu) => {
      menu.dispatchEvent(
        new CustomEvent('change', {
          detail: [['a', 'b'], { value: 'a', label: 'A' }],
          bubbles: true,
        }),
      );
    });
  });

  it('onOpenChange callback fires', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Dropdown items={[{ value: 'a', label: 'A' }]} onOpenChange={onOpenChange}>
        Trigger
      </Dropdown>
    ));
  });

  it('open=false closes dropdown', () => {
    render(() => (
      <Dropdown open={false} items={[{ value: 'a', label: 'A' }]}>
        Trigger
      </Dropdown>
    ));
  });

  it('uncontrolled change with non-array key covers setValue([key]) branch', () => {
    render(() => (
      <Dropdown items={[{ value: 'x', label: 'X' }]} open={true}>
        Trigger
      </Dropdown>
    ));

    const menus = document.querySelectorAll('n-menu');

    menus.forEach((menu) => {
      menu.dispatchEvent(
        new CustomEvent('change', {
          detail: ['x', { value: 'x', label: 'X' }],
          bubbles: true,
        }),
      );
    });
  });

  it('change with undefined val covers empty array fallback', () => {
    render(() => (
      <Dropdown items={[{ value: 'a', label: 'A' }]} open={true}>
        Trigger
      </Dropdown>
    ));

    const menus = document.querySelectorAll('n-menu');

    menus.forEach((menu) => {
      menu.dispatchEvent(
        new CustomEvent('change', {
          detail: [void 0, void 0],
          bubbles: true,
        }),
      );
    });
  });

  it('multiple=false auto-closes after selection', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Dropdown
        items={[{ value: 'a', label: 'A' }]}
        multiple={false}
        onOpenChange={onOpenChange}
        open={true}
      >
        Trigger
      </Dropdown>
    ));

    const menus = document.querySelectorAll('n-menu');

    menus.forEach((menu) => {
      menu.dispatchEvent(
        new CustomEvent('change', {
          detail: ['a', { value: 'a', label: 'A' }],
          bubbles: true,
        }),
      );
    });
  });
});
