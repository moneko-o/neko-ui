import { fireEvent, render } from '@solidjs/testing-library';
import { SelectMultipleElement } from 'neko-ui';

describe('Select', () => {
  function portal(container: HTMLElement, selector: string) {
    return container.parentElement!.lastElementChild!.shadowRoot!.querySelector(selector)!;
  }
  it('basic', () => {
    const { container, getByTestId } = render(() => (
      <n-select
        data-testid="select"
        default-value="C"
        label="最简单的配置"
        options={['A', 'B', 'C', 'D']}
      />
    ));

    expect(container).toBeInTheDocument();
    const select = getByTestId('select').shadowRoot!.querySelector('.select')!;

    fireEvent.focus(select);
    fireEvent.blur(select);
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    fireEvent.keyDown(select, { key: 'ArrowUp' });
    fireEvent.keyDown(select, { key: 'Backspace' });
    fireEvent.keyDown(select, { key: 'Enter' });
    fireEvent.keyDown(select, { key: 'Escape' });
    fireEvent.keyDown(select, { key: '' });
  });
  it('options', () => {
    const { container } = render(() => (
      <n-select
        default-value={2}
        options={[
          {
            label: '分组1',
            options: [
              { value: 1, label: '选项 1' },
              { value: 2, label: '选项 2' },
            ],
          },
          { label: '分组2', options: [{ value: 4, label: '选项 4' }] },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });
  it('multiple', () => {
    const { container, getByTestId } = render(() => (
      <n-select
        data-testid="select"
        value={['C']}
        multiple={true}
        label="multiple"
        suffix-icon="😄"
        prefix-icon="🎒"
        options={[
          {
            value: 'C',
            suffix: () => () => <a>fun</a>,
          },
          { value: 'D', suffix: '🤔' },
        ]}
        onChange={(e) => {
          (e.target! as SelectMultipleElement).value = e.detail[0];
        }}
      />
    ));

    expect(container).toBeInTheDocument();
    const select = getByTestId('select').shadowRoot!.querySelector('.select')!;

    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: 'Backspace' });
    fireEvent.focus(select);
    const items = portal(container, '.container n-menu').shadowRoot!.querySelectorAll('.item');

    items.forEach((e) => {
      fireEvent.click(e);
      fireEvent.focus(select);
    });
    fireEvent.mouseDown(select.querySelector('.tags')!);

    select.querySelectorAll('n-tag').forEach((e) => {
      fireEvent.click((e as unknown as HTMLElement).shadowRoot!.querySelector('.close')!);
    });
    fireEvent.blur(select);
  });
  it('prefix & suffix & disabled', () => {
    const { container } = render(() => (
      <n-select
        disabled={true}
        prefix-icon={() => () => <>a</>}
        suffix-icon={() => () => <>a</>}
        label={() => () => <>label</>}
        options={[
          {
            label: '分组1',
            options: [{ value: 1, label: '选项 1', disabled: true }],
          },
          {
            label: '子菜单',
            children: [{ label: '分组2', options: [{ value: 4, label: '选项 4' }] }],
          },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });
  it('empty', () => {
    const { container } = render(() => <n-select />);

    expect(container).toBeInTheDocument();
  });

  it('search/filter by opening and interacting', () => {
    const { container, getByTestId } = render(() => (
      <n-select data-testid="select-search" options={['Alpha', 'Beta', 'Gamma', 'Delta']} />
    ));

    expect(container).toBeInTheDocument();
    const select = getByTestId('select-search').shadowRoot!.querySelector('.select')!;

    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: 'Enter' });
    fireEvent.keyDown(select, { key: 'Escape' });
  });

  it('clear value with Backspace in single mode', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(() => (
      <n-select
        data-testid="select-clear"
        default-value="A"
        options={['A', 'B', 'C']}
        onChange={onChange}
      />
    ));

    const select = getByTestId('select-clear').shadowRoot!.querySelector('.select')!;

    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: 'Backspace' });
  });

  it('empty options handling', () => {
    const { container } = render(() => <n-select data-testid="select-empty" options={[]} />);

    expect(container).toBeInTheDocument();
  });

  it('placeholder shown when no value', () => {
    const { getByTestId } = render(() => (
      <n-select data-testid="select-ph" placeholder="Choose..." options={['A', 'B']} />
    ));

    expect(getByTestId('select-ph')).toBeInTheDocument();
  });

  it('multiple with placeholder when empty', () => {
    const { getByTestId } = render(() => (
      <n-select
        data-testid="select-multi-ph"
        multiple={true}
        placeholder="Select items..."
        options={['A', 'B', 'C']}
      />
    ));

    expect(getByTestId('select-multi-ph')).toBeInTheDocument();
  });
});
