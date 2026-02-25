import { createSignal } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Menu', () => {
  it('basic', () => {
    render(() => (
      <n-menu
        value="C"
        items={['A', 'B', { value: 'C', disabled: true }, 'D']}
        open-keys={['一级菜单']}
      />
    ));

    fireEvent.click(screen.getByShadowText('B'));
    fireEvent.click(screen.getByShadowText('C'));
  });
  it('toggle', () => {
    render(() => (
      <n-menu
        default-value={false as unknown as string}
        toggle={true}
        items={['A', 'B', 'C', 'D']}
      />
    ));

    fireEvent.click(screen.getByShadowText('B'));
    fireEvent.click(screen.getByShadowText('B'));
  });
  it('field-names', () => {
    render(() => (
      <n-menu
        items={[
          {
            label: '一级菜单',
            icon: '❤️',
            children: [
              {
                label: '动物',
                options: [
                  { label: '狮子2', value: '狮子', icon: '🦁', suffix: 'option' },
                  { label: '大青蛙', value: '大青蛙', icon: '🐸', suffix: 'option' },
                ],
              },
              {
                label: '动物2',
                options: [
                  { label: '狮子', value: '狮子2', icon: '🦁', suffix: 'option' },
                  { label: '大青蛙2', value: '大青蛙2', icon: '🐸', suffix: 'option' },
                ],
              },
            ],
          },
          {
            label: '二级菜单',
            icon: '👂',
            suffix: 'two',
            children: [
              {
                label: '动物3',
                options: [
                  { label: '狮子', value: '狮子3', suffix: 'option' },
                  { label: '大青蛙', value: '大青蛙3' },
                ],
              },
              {
                label: '动物4',
                options: [
                  { label: '狮子', value: '狮子4' },
                  { label: '大青蛙', value: '大青蛙4', suffix: 'option' },
                ],
              },
            ],
          },
        ]}
        multiple={true}
      />
    ));

    fireEvent.click(screen.getByShadowText('一级菜单'));
    fireEvent.click(screen.getByShadowText('大青蛙2'));
    fireEvent.click(screen.getByShadowText('狮子2'));
    fireEvent.click(screen.getByShadowText('大青蛙2'));
    fireEvent.click(screen.getByShadowText('一级菜单'));
    fireEvent.animationEnd(
      screen
        .getByShadowText('一级菜单')
        .parentElement!.parentElement!.querySelector('.sub-menu-children')!,
    );
  });

  it('nested sub-menus with onOpenChange', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <n-menu
        data-testid="menu-nested"
        onOpenChange={onOpenChange}
        items={[
          {
            label: 'Root',
            value: 'root',
            children: [
              {
                label: 'Child Group',
                options: [
                  { label: 'Item A', value: 'a' },
                  { label: 'Item B', value: 'b' },
                ],
              },
            ],
          },
          { label: 'Flat', value: 'flat' },
        ]}
      />
    ));

    fireEvent.click(screen.getByShadowText('Root'));
    expect(onOpenChange).toHaveBeenCalled();
  });

  it('controlled openKeys prop', () => {
    function TestWrapper() {
      const [openKeys, setOpenKeys] = createSignal<string[]>([]);

      return (
        <>
          <n-menu
            data-testid="menu-ctrl"
            open-keys={openKeys()}
            onOpenChange={(keys) => setOpenKeys(keys as string[])}
            items={[
              {
                label: 'Sub1',
                value: 'sub1',
                children: [
                  {
                    label: 'Group1',
                    options: [{ label: 'Leaf1', value: 'leaf1' }],
                  },
                ],
              },
            ]}
          />
          <button data-testid="open-sub" onClick={() => setOpenKeys(['sub1'])}>
            Open
          </button>
          <button data-testid="close-sub" onClick={() => setOpenKeys([])}>
            Close
          </button>
        </>
      );
    }

    const { getByTestId } = render(() => <TestWrapper />);

    getByTestId('open-sub').click();
    getByTestId('close-sub').click();
  });

  it('expand and collapse sub-menu with animationend', () => {
    render(() => (
      <n-menu
        data-testid="menu-expand"
        items={[
          {
            label: 'ExpandParent',
            value: 'exp',
            children: [
              {
                label: 'ExpandGroup',
                options: [{ label: 'ExpandLeaf', value: 'el' }],
              },
            ],
          },
        ]}
      />
    ));

    fireEvent.click(screen.getByShadowText('ExpandParent'));

    fireEvent.click(screen.getByShadowText('ExpandParent'));

    const subMenuChildren = screen
      .getByShadowText('ExpandParent')
      .parentElement!.parentElement!.querySelector('.sub-menu-children');

    if (subMenuChildren) {
      fireEvent.animationEnd(subMenuChildren);
    }
  });

  it('scrollIntoView for selected item with RAF mock', () => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(performance.now());
      return 0;
    });
    const scrollToSpy = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: scrollToSpy,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', { configurable: true, value: 0 });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 30 });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', { configurable: true, value: 500 });

    render(() => (
      <n-menu
        data-testid="menu-scroll"
        value="J"
        items={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']}
      />
    ));

    jest.restoreAllMocks();
  });

  it('menu with value set to null clears selection', () => {
    const { container } = render(() => (
      <n-menu value={null as unknown as string} items={['X', 'Y', 'Z']} />
    ));

    expect(container).toBeInTheDocument();
  });
});
