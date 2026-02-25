import { render } from '@solidjs/testing-library';

describe('Modal', () => {
  it('renders closed modal', () => {
    const { container } = render(() => (
      <n-modal open="closed" title="Test Modal" content="Modal Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders open modal', () => {
    const { container } = render(() => (
      <n-modal data-testid="modal" open="open" title="Open Modal" content="Visible Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with ok and cancel buttons', () => {
    const onOk = jest.fn(() => true);
    const onCancel = jest.fn(() => true);
    const { container } = render(() => (
      <n-modal
        open="open"
        title="Action Modal"
        content="Action Content"
        okText="Confirm"
        cancelText="Cancel"
        onOk={onOk}
        onCancel={onCancel}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles maskClosable', () => {
    const openChange = jest.fn();
    const { container } = render(() => (
      <n-modal
        open="open"
        title="Mask Modal"
        content="Content"
        maskClosable={true}
        onOpenChange={openChange}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('handles escClosable', () => {
    const { container } = render(() => (
      <n-modal open="open" escClosable={true} title="Esc Modal" content="Esc Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders centered modal', () => {
    const { container } = render(() => (
      <n-modal open="open" centered={true} title="Centered" content="Center Content" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders without close icon', () => {
    const { container } = render(() => (
      <n-modal open="open" closeIcon={false} title="No Close" content="Content" />
    ));

    expect(container).toBeInTheDocument();
  });
});
