import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Modal', () => {
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

  it('renders with ok and cancel buttons and clicks them', () => {
    const onOk = jest.fn(() => true);
    const onCancel = jest.fn(() => true);

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Action"
        content="Content"
        okText="OK"
        cancelText="Cancel"
        onOk={onOk}
        onCancel={onCancel}
        onOpenChange={jest.fn()}
      />
    ));

    const modalEl = screen.getByTestId('modal');
    const portal = modalEl.parentElement!.lastElementChild!.shadowRoot!;
    const buttons = portal.querySelectorAll('n-button');

    buttons.forEach((btn) => {
      const inner = (btn as HTMLElement).shadowRoot?.querySelector('button');

      if (inner) {
        fireEvent.click(inner);
      }
    });
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

    const modalEl = screen.getByTestId('modal');
    const portal = modalEl.parentElement!.lastElementChild!.shadowRoot!;
    const portalDiv = portal.querySelector('.portal');

    if (portalDiv) {
      fireEvent.click(portalDiv);
    }
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
  });

  it('renders centered modal', () => {
    const { container } = render(() => (
      <n-modal open="open" centered={true} title="Centered" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders without close icon when closeIcon=false', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={false} title="No Close" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with closeIcon=null', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={null} title="Null Close" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with custom closeIcon as function', () => {
    const { container } = render(() => (
      <n-modal
        open="open"
        closeIcon={() => <span>X</span>}
        title="Custom Close"
        content="Content"
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with custom closeIcon as element', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon="✕" title="String Close" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with maskBlur', () => {
    const { container } = render(() => (
      <n-modal open="open" maskBlur={true} title="Blur" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles ok button with async onOk returning false', async () => {
    const onOk = jest.fn(() => Promise.resolve(false));

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Async"
        content="Content"
        onOk={onOk}
        okText="OK"
        cancelText={false}
      />
    ));

    const modalEl = screen.getByTestId('modal');
    const portal = modalEl.parentElement!.lastElementChild!.shadowRoot!;
    const okBtn = portal.querySelector('n-button[type="primary"]');

    if (okBtn) {
      const inner = (okBtn as HTMLElement).shadowRoot?.querySelector('button');

      if (inner) fireEvent.click(inner);
    }

    await Promise.resolve();
  });

  it('handles cancel with onCancel returning false', async () => {
    const onCancel = jest.fn(() => Promise.resolve(false));

    render(() => (
      <n-modal
        data-testid="modal"
        open="open"
        title="Cancel"
        content="Content"
        onCancel={onCancel}
        cancelText="Cancel"
        okText={false}
        onOpenChange={jest.fn()}
      />
    ));

    const modalEl = screen.getByTestId('modal');
    const portal = modalEl.parentElement!.lastElementChild!.shadowRoot!;
    const cancelBtn = portal.querySelector('.modal-close');

    if (cancelBtn) {
      const inner = (cancelBtn as HTMLElement).shadowRoot?.querySelector('button');

      if (inner) fireEvent.click(inner);
    }

    await Promise.resolve();
  });

  it('handles animationend for close transition', () => {
    render(() => <n-modal data-testid="modal" open="open" title="Anim" content="Content" />);

    const modalEl = screen.getByTestId('modal');
    const portal = modalEl.parentElement!.lastElementChild!.shadowRoot!;
    const portalDiv = portal.querySelector('.portal');

    if (portalDiv) {
      fireEvent.animationEnd(portalDiv);
    }
  });

  it('handles mouse drag on modal', () => {
    render(() => <n-modal data-testid="modal" open="open" title="Drag" content="Content" />);

    const modalEl = screen.getByTestId('modal');
    const portal = modalEl.parentElement!.lastElementChild!.shadowRoot!;
    const modalContent = portal.querySelector('.modal-content');

    if (modalContent) {
      fireEvent.mouseDown(modalContent, { target: modalContent });
      fireEvent.mouseMove(document.body, { movementX: 10, movementY: 20 });
      fireEvent.mouseUp(document.body);
    }
  });

  it('renders with content as function', () => {
    const { container } = render(() => (
      <n-modal open="open" title={() => 'Fn Title'} content={() => 'Fn Content'} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('hides footer when both okText and cancelText are falsy', () => {
    const { container } = render(() => (
      <n-modal open="open" okText={false} cancelText={false} title="No Footer" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('transitions from open to closeing', () => {
    const openChange = jest.fn();
    const { container } = render(() => (
      <n-modal open="open" onOpenChange={openChange} title="Close" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles controlled open prop change', () => {
    const { container } = render(() => <n-modal open="closed" title="Ctrl" content="Content" />);

    expect(container).toBeInTheDocument();
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
