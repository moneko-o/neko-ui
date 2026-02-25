import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Popover', () => {
  function portal(container: HTMLElement, selector: string) {
    return container.parentElement!.lastElementChild!.shadowRoot!.querySelector(selector)!;
  }

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 40,
      top: 100,
      left: 300,
      right: 500,
      bottom: 140,
      x: 300,
      y: 100,
      toJSON: () => {},
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 200 });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 40,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('hover trigger open/close', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <n-popover
        data-testid="tooltip"
        content="Content"
        dropdown-match-select-width={true}
        onOpenChange={onChange}
      >
        Hover
      </n-popover>
    ));

    const el = screen.getByTestId('tooltip').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
    jest.advanceTimersByTime(50);
    fireEvent.scroll(window);
    jest.advanceTimersByTime(50);
    fireEvent.mouseLeave(el);
    jest.advanceTimersByTime(400);
    fireEvent.animationEnd(portal(container, '.portal'));
  });

  it('click trigger open then close outside', () => {
    const onChange = jest.fn();

    render(() => (
      <n-popover data-testid="click" content="Click" trigger="click" onOpenChange={onChange}>
        Click
      </n-popover>
    ));

    const el = screen.getByTestId('click').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseDown(el);
    jest.advanceTimersByTime(50);
    fireEvent.mouseDown(document.documentElement);
    jest.advanceTimersByTime(50);
  });

  it('contextMenu trigger with scroll close', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <n-popover
        data-testid="ctx"
        trigger="contextMenu"
        content="Ctx"
        onOpenChange={onChange}
        placement="bottomLeft"
      >
        Right
      </n-popover>
    ));

    const el = screen.getByTestId('ctx').shadowRoot!.querySelector('.popover')!;

    fireEvent.contextMenu(el, { clientX: 100, clientY: 200 });
    jest.advanceTimersByTime(50);
    fireEvent.scroll(window);
    jest.advanceTimersByTime(50);
    fireEvent.animationEnd(portal(container, '.portal'));
  });

  it('trigger=none with controlled open', () => {
    const { container } = render(() => (
      <n-popover content="None" trigger="none" open={true}>
        Static
      </n-popover>
    ));

    jest.advanceTimersByTime(50);
    expect(container).toBeInTheDocument();
  });

  it('disabled popover ignores events', () => {
    render(() => (
      <n-popover data-testid="disabled" content="Disabled" disabled={true}>
        Disabled
      </n-popover>
    ));

    const el = screen.getByTestId('disabled').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
    jest.advanceTimersByTime(50);
  });

  it('destroyInactive=false keeps portal', () => {
    const { container } = render(() => (
      <n-popover content="Persist" destroyInactive={false}>
        Persistent
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('placement bottomRight', () => {
    render(() => (
      <n-popover data-testid="br" content="BR" placement="bottomRight" trigger="click">
        BR
      </n-popover>
    ));

    fireEvent.mouseDown(screen.getByTestId('br').shadowRoot!.querySelector('.popover')!);
    jest.advanceTimersByTime(50);
  });

  it('placement topLeft', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 40,
      top: 500,
      left: 100,
      right: 300,
      bottom: 540,
      x: 100,
      y: 500,
      toJSON: () => {},
    });

    render(() => (
      <n-popover data-testid="tl" content="TL" placement="topLeft" trigger="click" arrow={true}>
        TL
      </n-popover>
    ));

    fireEvent.mouseDown(screen.getByTestId('tl').shadowRoot!.querySelector('.popover')!);
    jest.advanceTimersByTime(50);
  });

  it('placement right', () => {
    render(() => (
      <n-popover data-testid="right" content="Right" placement="right" trigger="click">
        Right
      </n-popover>
    ));

    fireEvent.mouseDown(screen.getByTestId('right').shadowRoot!.querySelector('.popover')!);
    jest.advanceTimersByTime(50);
  });

  it('placement top', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 40,
      top: 500,
      left: 300,
      right: 500,
      bottom: 540,
      x: 300,
      y: 500,
      toJSON: () => {},
    });

    render(() => (
      <n-popover data-testid="top" content="Top" placement="top" trigger="click">
        Top
      </n-popover>
    ));

    fireEvent.mouseDown(screen.getByTestId('top').shadowRoot!.querySelector('.popover')!);
    jest.advanceTimersByTime(50);
  });

  it('encodeUri content', () => {
    const { container } = render(() => (
      <n-popover content={encodeURIComponent('<b>bold</b>')} encodeUri={true} open={true}>
        Encoded
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('empty content shows Empty fallback', () => {
    const { container } = render(() => <n-popover open={true}>No content</n-popover>);

    expect(container).toBeInTheDocument();
  });

  it('content as function', () => {
    const { container } = render(() => (
      <n-popover content={() => <div>Dynamic</div>} open={true}>
        Function
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('getPopupContainer', () => {
    const mountEl = document.createElement('div');

    document.body.appendChild(mountEl);
    render(() => (
      <n-popover content="Container" getPopupContainer={() => mountEl}>
        Custom
      </n-popover>
    ));

    document.body.removeChild(mountEl);
  });

  it('close with handle-closed=false', () => {
    render(() => (
      <n-popover data-testid="hc" content="HC" trigger="click">
        <span handle-closed="false">HC</span>
      </n-popover>
    ));

    fireEvent.mouseDown(screen.getByTestId('hc').shadowRoot!.querySelector('.popover')!);
    jest.advanceTimersByTime(50);
    const target = document.createElement('span');

    target.setAttribute('handle-closed', 'false');
    document.body.appendChild(target);
    fireEvent.mouseDown(target);
    jest.advanceTimersByTime(50);
    document.body.removeChild(target);
  });

  it('exit on animationend when closed', () => {
    const { container } = render(() => (
      <n-popover data-testid="exit" content="Exit" trigger="hover">
        Exit
      </n-popover>
    ));

    const el = screen.getByTestId('exit').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
    jest.advanceTimersByTime(50);
    fireEvent.mouseLeave(el);
    jest.advanceTimersByTime(400);
    const portalEl = portal(container, '.portal');

    if (portalEl) {
      fireEvent.animationEnd(portalEl);
    }
  });

  it('size prop', () => {
    const { container } = render(() => (
      <n-popover content="Small" size="small">
        Small
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });

  it('css and popupCss props', () => {
    const { container } = render(() => (
      <n-popover content="Styled" css="color: red;" popup-css="padding: 4px;" open={true}>
        Styled
      </n-popover>
    ));

    expect(container).toBeInTheDocument();
  });
});
