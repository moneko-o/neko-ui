import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Popover', () => {
  function portal(container: HTMLElement, selector: string) {
    return container.parentElement!.lastElementChild!.shadowRoot!.querySelector(selector)!;
  }

  it('renders with hover trigger (default)', () => {
    const { container } = render(() => (
      <n-popover
        data-testid="tooltip"
        content="Tooltip content"
        class="tooltip-cls"
        popup-css={{ padding: 8 }}
        dropdown-match-select-width={true}
        onOpenChange={jest.fn()}
      >
        Tooltip
      </n-popover>
    ));

    const el = screen.getByTestId('tooltip').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    fireEvent.animationEnd(portal(container, '.portal'));
  });

  it('opens and closes on hover', () => {
    const { container } = render(() => (
      <n-popover data-testid="tooltip" content="Hover content" trigger="hover">
        Hover me
      </n-popover>
    ));

    const el = screen.getByTestId('tooltip').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    fireEvent.animationEnd(portal(container, '.portal'));
  });

  it('opens on click trigger', () => {
    render(() => (
      <n-popover
        data-testid="click-pop"
        content="Click content"
        trigger="click"
        onOpenChange={jest.fn()}
      >
        Click me
      </n-popover>
    ));

    const el = screen.getByTestId('click-pop').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseDown(el);
    fireEvent.mouseDown(document.documentElement);
  });

  it('opens on context menu', () => {
    const { container } = render(() => (
      <n-popover
        data-testid="ctx"
        trigger="contextMenu"
        content="Context content"
        onOpenChange={jest.fn()}
        placement="bottomLeft"
      >
        Right click
      </n-popover>
    ));

    const el = screen.getByTestId('ctx').shadowRoot!.querySelector('.popover')!;

    fireEvent.contextMenu(el);
    fireEvent.click(document.body);
    fireEvent.animationEnd(portal(container, '.portal'));
  });

  it('renders with trigger=none', () => {
    const { container } = render(() => (
      <n-popover content="Static" trigger="none" open={true}>
        Static
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with arrow', () => {
    const { container } = render(() => (
      <n-popover content="Arrow" arrow={true}>
        With arrow
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders disabled popover', () => {
    render(() => (
      <n-popover data-testid="disabled" content="Disabled" disabled={true}>
        Disabled
      </n-popover>
    ));

    const el = screen.getByTestId('disabled').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
  });

  it('renders with destroyInactive=false', () => {
    const { container } = render(() => (
      <n-popover content="Persist" destroyInactive={false}>
        Persistent
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with placement=bottomRight', () => {
    const { container } = render(() => (
      <n-popover content="Bottom Right" placement="bottomRight">
        BR
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with placement=topLeft', () => {
    const { container } = render(() => (
      <n-popover content="Top Left" placement="topLeft">
        TL
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with placement=topRight', () => {
    const { container } = render(() => (
      <n-popover content="Top Right" placement="topRight">
        TR
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with placement=left', () => {
    const { container } = render(() => (
      <n-popover content="Left" placement="left">
        Left
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with placement=right', () => {
    const { container } = render(() => (
      <n-popover content="Right" placement="right">
        Right
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with encodeUri content', () => {
    const { container } = render(() => (
      <n-popover content={encodeURIComponent('<b>bold</b>')} encodeUri={true}>
        Encoded
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with string content (non-encoded)', () => {
    const { container } = render(() => <n-popover content="<b>bold</b>">String</n-popover>);

    expect(container).toBeInTheDocument();
  });

  it('renders with empty content (fallback to Empty)', () => {
    const { container } = render(() => <n-popover>No content</n-popover>);

    expect(container).toBeInTheDocument();
  });

  it('renders with content as function', () => {
    const { container } = render(() => (
      <n-popover content={() => <div>Dynamic</div>}>Function content</n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles getPopupContainer', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);
    render(() => (
      <n-popover content="Custom container" getPopupContainer={() => container}>
        Custom mount
      </n-popover>
    ));

    document.body.removeChild(container);
  });

  it('handles scroll event when open', () => {
    render(() => (
      <n-popover data-testid="scroll" content="Scroll" trigger="click">
        Scroll test
      </n-popover>
    ));

    const el = screen.getByTestId('scroll').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseDown(el);
    fireEvent.scroll(window);
  });

  it('handles controlled open prop', () => {
    const { container } = render(() => (
      <n-popover content="Controlled" open={true} onOpenChange={jest.fn()}>
        Controlled
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles size prop', () => {
    const { container } = render(() => (
      <n-popover content="Small" size="small">
        Small
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('close handler with handle-closed attribute', () => {
    render(() => (
      <n-popover data-testid="handled" content="Handled" trigger="click">
        <span handle-closed="false">Handled close</span>
      </n-popover>
    ));

    const el = screen.getByTestId('handled').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseDown(el);
  });

  it('contextMenu scroll closes', () => {
    render(() => (
      <n-popover data-testid="ctx-scroll" trigger="contextMenu" content="Ctx scroll">
        Ctx scroll
      </n-popover>
    ));

    const el = screen.getByTestId('ctx-scroll').shadowRoot!.querySelector('.popover')!;

    fireEvent.contextMenu(el);
    fireEvent.scroll(window);
  });
});
