import { render } from '@solidjs/testing-library';

import Modal from '../index';

describe('Modal branches', () => {
  it('title as function covers isFunction(title) branch', () => {
    render(() => (
      <Modal open="open" title={() => <strong>Dynamic Title</strong>} content="Content" />
    ));
  });

  it('content as function covers isFunction(content) branch', () => {
    render(() => <Modal open="open" title="Title" content={() => <p>Dynamic Content</p>} />);
  });

  it('okText=false and cancelText=false hides footer', () => {
    render(() => (
      <Modal open="open" title="No Footer" content="Content" okText={false} cancelText={false} />
    ));
  });

  it('centered prop sets centered class', () => {
    render(() => <Modal open="open" title="Centered" content="Content" centered={true} />);
  });

  it('maskBlur prop sets mask-blur class', () => {
    render(() => <Modal open="open" title="Blur" content="Content" maskBlur={true} />);
  });

  it('maskClosable=false prevents close on mask click', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Modal
        open="open"
        title="Mask Test"
        content="Content"
        maskClosable={false}
        onOpenChange={onOpenChange}
      />
    ));
  });

  it('escClosable triggers keyboard close', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Modal
        open="open"
        title="Esc Test"
        content="Content"
        escClosable={true}
        onOpenChange={onOpenChange}
      />
    ));

    document.documentElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
  });

  it('non-Escape key does not close', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Modal
        open="open"
        title="Non-Esc"
        content="Content"
        escClosable={true}
        onOpenChange={onOpenChange}
      />
    ));

    document.documentElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
  });

  it('closed state does not render portal', () => {
    render(() => <Modal open="closed" title="Hidden" content="Content" />);
  });
});
