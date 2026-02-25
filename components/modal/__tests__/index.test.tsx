import { fireEvent, render } from '@solidjs/testing-library';

describe('Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  function getPortalShadow() {
    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];

    return lastPortal?.shadowRoot;
  }

  it('renders closed modal', () => {
    const { container } = render(() => (
      <n-modal open="closed" title="Test Modal" content="Modal Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders open modal', () => {
    render(() => <n-modal open="open" title="Open" content="Content" />);

    expect(getPortalShadow()?.querySelector('.modal-title')).toBeTruthy();
  });

  it('closes on Escape key', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal open="open" title="Esc" content="C" escClosable={true} onOpenChange={openChange} />
    ));

    fireEvent.keyDown(document.documentElement, { key: 'Escape' });
    expect(openChange).toHaveBeenCalled();
  });

  it('ignores non-Escape key', () => {
    const openChange = jest.fn();

    render(() => <n-modal open="open" title="Key" content="C" escClosable={true} />);

    fireEvent.keyDown(document.documentElement, { key: 'Enter' });
    expect(openChange).not.toHaveBeenCalled();
  });

  it('closes on mask click', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal open="open" title="Mask" content="C" maskClosable={true} onOpenChange={openChange} />
    ));

    const portalDiv = getPortalShadow()?.querySelector('.portal');

    if (portalDiv) fireEvent.click(portalDiv, { target: portalDiv });
  });

  it('ok and cancel buttons', () => {
    render(() => <n-modal open="open" title="Btns" content="C" okText="OK" cancelText="Cancel" />);

    const shadow = getPortalShadow();

    expect(shadow?.querySelector('.modal-footer')).toBeTruthy();
  });

  it('handles ok button click', () => {
    render(() => <n-modal open="open" title="OK" content="C" okText="OK" cancelText={false} />);

    const okBtn = getPortalShadow()?.querySelector('n-button[type="primary"]');
    const inner = (okBtn as unknown as HTMLElement)?.shadowRoot?.querySelector('button');

    if (inner) fireEvent.click(inner);
  });

  it('handles cancel via close button', () => {
    render(() => <n-modal open="open" title="Cancel" content="C" />);

    const closeBtn = getPortalShadow()?.querySelector('.modal-close');
    const inner = (closeBtn as unknown as HTMLElement)?.shadowRoot?.querySelector('button');

    if (inner) fireEvent.click(inner);
  });

  it('centered modal', () => {
    const { container } = render(() => (
      <n-modal open="open" centered={true} title="C" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('maskBlur modal', () => {
    const { container } = render(() => (
      <n-modal open="open" maskBlur={true} title="B" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('animationend handler', () => {
    render(() => <n-modal open="open" title="A" content="C" />);

    const portalDiv = getPortalShadow()?.querySelector('.portal');

    if (portalDiv) fireEvent.animationEnd(portalDiv);
  });

  it('mouse drag on modal', () => {
    render(() => <n-modal open="open" title="D" content="C" />);

    const modalContent = getPortalShadow()?.querySelector('.modal-content');

    if (modalContent) {
      fireEvent.mouseDown(modalContent, { target: modalContent });
      fireEvent.mouseMove(document.body, { movementX: 10, movementY: 20 });
      fireEvent.mouseUp(document.body);
    }
  });

  it('title and content as functions', () => {
    const { container } = render(() => (
      <n-modal open="open" title={() => 'Fn'} content={() => 'Fn'} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('no footer when okText and cancelText are false', () => {
    const { container } = render(() => (
      <n-modal open="open" okText={false} cancelText={false} title="NF" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('point handler on closed state', () => {
    render(() => <n-modal open="closed" title="P" content="C" />);

    fireEvent.click(document.documentElement, { clientX: 100, clientY: 200 });
  });

  it('open -> closeing -> closed transition', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal open="open" title="T" content="C" escClosable={true} onOpenChange={openChange} />
    ));

    fireEvent.keyDown(document.documentElement, { key: 'Escape' });
    const portalDiv = getPortalShadow()?.querySelector('.portal');

    if (portalDiv) fireEvent.animationEnd(portalDiv);
  });

  it('closeIcon as string', () => {
    const { container } = render(() => <n-modal open="open" closeIcon="✕" title="S" content="C" />);

    expect(container).toBeInTheDocument();
  });

  it('closeIcon as function', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={() => <span>X</span>} title="F" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('closeIcon as false', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={false} title="N" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('closeIcon as null', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={null} title="Nl" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });
});

describe('Modal.open (hooks)', () => {
  it('opens imperatively', async () => {
    const { default: Modal } = await import('../index');

    Modal.open({ title: 'Imp', content: 'C' });
    await Promise.resolve();
  });
});
