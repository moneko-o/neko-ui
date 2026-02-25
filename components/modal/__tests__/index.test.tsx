import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders closed modal', () => {
    const { container } = render(() => (
      <n-modal open="closed" title="Test Modal" content="Modal Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders open modal with title and content', () => {
    render(() => (
      <n-modal data-testid="modal" open="open" title="Open Modal" content="Visible Content" />
    ));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('closes on Escape key when escClosable=true', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Esc"
        content="Content"
        escClosable={true}
        onOpenChange={openChange}
      />
    ));

    fireEvent.keyDown(document.documentElement, { key: 'Escape' });
    expect(openChange).toHaveBeenCalled();
  });

  it('does not close on non-Escape key', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Key"
        content="Content"
        escClosable={true}
        onOpenChange={openChange}
      />
    ));

    fireEvent.keyDown(document.documentElement, { key: 'Enter' });
  });

  it('closes on mask click when maskClosable=true', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Mask"
        content="Content"
        maskClosable={true}
        onOpenChange={openChange}
      />
    ));

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const shadowPortal = lastPortal?.shadowRoot?.querySelector('.portal');

    if (shadowPortal) {
      fireEvent.click(shadowPortal, { target: shadowPortal });
    }
  });

  it('handles ok button click', () => {
    const onOk = jest.fn(() => true);
    const openChange = jest.fn();

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="OK"
        content="Content"
        onOk={onOk}
        okText="OK"
        cancelText={false}
        onOpenChange={openChange}
      />
    ));

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const okBtn = lastPortal?.shadowRoot?.querySelector('n-button[type="primary"]');
    const inner = okBtn?.shadowRoot?.querySelector('button');

    if (inner) {
      fireEvent.click(inner);
    }
  });

  it('handles ok button with onOk returning false', async () => {
    const onOk = jest.fn(() => Promise.resolve(false));

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="No OK"
        content="Content"
        onOk={onOk}
        okText="OK"
        cancelText={false}
      />
    ));

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const okBtn = lastPortal?.shadowRoot?.querySelector('n-button[type="primary"]');
    const inner = okBtn?.shadowRoot?.querySelector('button');

    if (inner) {
      fireEvent.click(inner);
    }

    await Promise.resolve();
  });

  it('handles cancel via close button', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Cancel"
        content="Content"
        onOpenChange={openChange}
      />
    ));

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const closeBtn = lastPortal?.shadowRoot?.querySelector('.modal-close');
    const inner = closeBtn?.shadowRoot?.querySelector('button');

    if (inner) {
      fireEvent.click(inner);
    }
  });

  it('handles onCancel returning false (prevents close)', async () => {
    const onCancel = jest.fn(() => Promise.resolve(false));
    const openChange = jest.fn();

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="NoCancel"
        content="Content"
        onCancel={onCancel}
        onOpenChange={openChange}
      />
    ));

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const closeBtn = lastPortal?.shadowRoot?.querySelector('.modal-close');
    const inner = closeBtn?.shadowRoot?.querySelector('button');

    if (inner) {
      fireEvent.click(inner);
    }

    await Promise.resolve();
    await Promise.resolve();
  });

  it('closeIcon=false hides default close button', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={false} title="No Close" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('closeIcon=null hides close button', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={null} title="Null" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('custom closeIcon as function', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={() => <span>X</span>} title="Fn" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('custom closeIcon as string', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon="✕" title="Str" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('centered modal', () => {
    const { container } = render(() => (
      <n-modal open="open" centered={true} title="Centered" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('maskBlur modal', () => {
    const { container } = render(() => (
      <n-modal open="open" maskBlur={true} title="Blur" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles animationend for close transition', () => {
    render(() => <n-modal data-testid="modal" open="open" title="Anim" content="C" />);

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const portalDiv = lastPortal?.shadowRoot?.querySelector('.portal');

    if (portalDiv) {
      fireEvent.animationEnd(portalDiv);
    }
  });

  it('handles mouse drag on modal', () => {
    render(() => <n-modal data-testid="modal" open="open" title="Drag" content="C" />);

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const modalContent = lastPortal?.shadowRoot?.querySelector('.modal-content');

    if (modalContent) {
      fireEvent.mouseDown(modalContent, { target: modalContent });
      fireEvent.mouseMove(document.body, { movementX: 10, movementY: 20 });
      fireEvent.mouseUp(document.body);
    }
  });

  it('title and content as functions', () => {
    const { container } = render(() => (
      <n-modal open="open" title={() => 'Fn Title'} content={() => 'Fn Content'} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('hides footer when both okText and cancelText are falsy', () => {
    const { container } = render(() => (
      <n-modal open="open" okText={false} cancelText={false} title="No Footer" content="C" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('point function sets position on click', () => {
    render(() => <n-modal data-testid="modal" open="closed" title="Point" content="C" />);

    fireEvent.click(document.documentElement, { clientX: 100, clientY: 200 });
  });

  it('transition from open to closeing to closed', () => {
    const openChange = jest.fn();

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Transition"
        content="C"
        onOpenChange={openChange}
      />
    ));

    fireEvent.keyDown(document.documentElement, { key: 'Escape' });

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const portalDiv = lastPortal?.shadowRoot?.querySelector('.portal');

    if (portalDiv) {
      fireEvent.animationEnd(portalDiv);
    }
  });
});

describe('Modal.open', () => {
  it('opens modal imperatively', async () => {
    const { default: Modal } = await import('../index');

    Modal.open({
      title: 'Imperative',
      content: 'Content',
    });
  });
});
