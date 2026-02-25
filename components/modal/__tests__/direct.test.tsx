import { fireEvent, render } from '@solidjs/testing-library';

import Modal from '../index';

describe('Modal (direct render)', () => {
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

  it('onCancel returning false prevents close', async () => {
    const onCancel = jest.fn(() => Promise.resolve(false));
    const onOpenChange = jest.fn();

    render(() => (
      <Modal
        open="open"
        title="Cancel Test"
        content="Content"
        onCancel={onCancel}
        onOpenChange={onOpenChange}
        escClosable={true}
        maskClosable={true}
      />
    ));

    const shadow = getPortalShadow();
    const closeBtn = shadow?.querySelector('.modal-close');
    const inner = (closeBtn as unknown as HTMLElement)?.shadowRoot?.querySelector('button');

    if (inner) fireEvent.click(inner);

    await Promise.resolve();
    await Promise.resolve();
    expect(onCancel).toHaveBeenCalled();
  });

  it('onCancel returning true allows close', async () => {
    const onCancel = jest.fn(() => Promise.resolve(true));
    const onOpenChange = jest.fn();

    render(() => (
      <Modal
        open="open"
        title="Cancel OK"
        content="Content"
        onCancel={onCancel}
        onOpenChange={onOpenChange}
      />
    ));

    const shadow = getPortalShadow();
    const closeBtn = shadow?.querySelector('.modal-close');
    const inner = (closeBtn as unknown as HTMLElement)?.shadowRoot?.querySelector('button');

    if (inner) fireEvent.click(inner);

    await Promise.resolve();
    await Promise.resolve();
    expect(onCancel).toHaveBeenCalled();
  });

  it('onOk returning false prevents close', async () => {
    const onOk = jest.fn(() => Promise.resolve(false));

    render(() => (
      <Modal
        open="open"
        title="OK Reject"
        content="Content"
        onOk={onOk}
        okText="OK"
        cancelText={false}
      />
    ));

    const shadow = getPortalShadow();
    const okBtn = shadow?.querySelector('n-button[type="primary"]');
    const inner = (okBtn as unknown as HTMLElement)?.shadowRoot?.querySelector('button');

    if (inner) fireEvent.click(inner);

    await Promise.resolve();
    await Promise.resolve();
    expect(onOk).toHaveBeenCalled();
  });

  it('onOk returning true closes modal', async () => {
    const onOk = jest.fn(() => Promise.resolve(true));
    const onOpenChange = jest.fn();

    render(() => (
      <Modal
        open="open"
        title="OK Accept"
        content="Content"
        onOk={onOk}
        okText="OK"
        onOpenChange={onOpenChange}
      />
    ));

    const shadow = getPortalShadow();
    const okBtn = shadow?.querySelector('n-button[type="primary"]');
    const inner = (okBtn as unknown as HTMLElement)?.shadowRoot?.querySelector('button');

    if (inner) fireEvent.click(inner);

    await Promise.resolve();
    await Promise.resolve();
    expect(onOk).toHaveBeenCalled();
  });

  it('closeIcon=null hides close button', () => {
    render(() => <Modal open="open" closeIcon={null} title="No Close" content="Content" />);

    const shadow = getPortalShadow();

    expect(shadow?.querySelector('.modal-close')).toBeNull();
  });

  it('closeIcon=false hides close button', () => {
    render(() => <Modal open="open" closeIcon={false} title="No Close" content="Content" />);

    const shadow = getPortalShadow();

    expect(shadow?.querySelector('.modal-close')).toBeNull();
  });

  it('closeIcon as function renders custom close', () => {
    render(() => (
      <Modal
        open="open"
        closeIcon={() => <span class="custom-x">X</span>}
        title="Fn Close"
        content="Content"
      />
    ));

    const shadow = getPortalShadow();

    expect(shadow?.querySelector('.modal-close')).toBeTruthy();
  });

  it('closeIcon as JSX element renders custom close', () => {
    render(() => (
      <Modal open="open" closeIcon={<span>OBJ</span>} title="Obj Close" content="Content" />
    ));

    const shadow = getPortalShadow();

    expect(shadow?.querySelector('.modal-close')).toBeTruthy();
  });

  it('closeIcon as string renders button with text', () => {
    render(() => <Modal open="open" closeIcon="✕" title="Str Close" content="Content" />);

    const shadow = getPortalShadow();
    const closeBtn = shadow?.querySelector('.modal-close');

    expect(closeBtn?.tagName.toLowerCase()).toBe('n-button');
  });
});

describe('Modal.open (hooks)', () => {
  it('disposes on close', async () => {
    Modal.open({ title: 'Hook', content: 'Content' });

    await Promise.resolve();
    await Promise.resolve();

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const shadow = lastPortal?.shadowRoot;

    fireEvent.keyDown(document.documentElement, { key: 'Escape' });

    const portalDiv = shadow?.querySelector('.portal');

    if (portalDiv) fireEvent.animationEnd(portalDiv);

    await Promise.resolve();
    await Promise.resolve();
  });
});
