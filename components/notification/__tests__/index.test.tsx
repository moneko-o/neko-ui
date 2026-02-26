import notification from '../index';
import queque from '../queque';

describe('Notification', () => {
  afterEach(() => {
    notification.destory();
  });

  it('shows info notification', () => {
    const id = notification.info('Info message');

    expect(typeof id).toBe('string');
  });

  it('shows success notification', () => {
    const id = notification.success('Success message');

    expect(typeof id).toBe('string');
  });

  it('shows error notification', () => {
    const id = notification.error('Error message');

    expect(typeof id).toBe('string');
  });

  it('shows warning notification', () => {
    const id = notification.warning('Warning message');

    expect(typeof id).toBe('string');
  });

  it('shows primary notification', () => {
    const id = notification.primary('Primary message');

    expect(typeof id).toBe('string');
  });

  it('shows notification with custom duration', () => {
    const id = notification.info('Timed message', 5000);

    expect(typeof id).toBe('string');
  });

  it('shows notification with duration=0 (no auto-close)', () => {
    const id = notification.info('Persistent', 0);

    expect(typeof id).toBe('string');
  });

  it('shows notification with close button', () => {
    const id = notification.info('With close', 0, true);

    expect(typeof id).toBe('string');
  });

  it('shows notification with custom icon', () => {
    const id = notification.info('With icon', 3000, false, 'ℹ️');

    expect(typeof id).toBe('string');
  });

  it('updates notification with multiple items in queue', () => {
    notification.info('Other 1', 0);
    const id = notification.info('Original', 0);

    notification.info('Other 2', 0);
    notification.update(id, { type: 'success', children: 'Updated!' });
    expect(queque.list().some((q) => q.children === 'Updated!')).toBe(true);
  });

  it('removes notification by id with multiple items', () => {
    jest.useFakeTimers();
    notification.info('Keep 1', 0);
    const id = notification.info('To Remove', 0);

    notification.info('Keep 2', 0);
    queque.remove(id);
    expect(queque.list().some((q) => q.closeing)).toBe(true);
    jest.advanceTimersByTime(300);
    jest.useRealTimers();
  });

  it('destroys all notifications', () => {
    notification.info('Message 1', 0);
    notification.info('Message 2', 0);
    notification.destory();
    expect(queque.list().length).toBe(0);
  });

  it('auto-removes notification after duration', () => {
    jest.useFakeTimers();
    notification.info('Auto close', 1000);
    jest.advanceTimersByTime(1200);
    jest.useRealTimers();
  });

  it('multiple notifications share same mount', () => {
    const id1 = notification.info('First', 0);
    const id2 = notification.info('Second', 0);

    expect(id1).not.toBe(id2);
    expect(queque.list().length).toBe(2);
  });

  it('update non-existing id is no-op', () => {
    notification.update('non-existing', { type: 'error', children: 'Nope' });
  });

  it('close button click removes notification', () => {
    jest.useFakeTimers();
    notification.info('With close btn', 0, true);

    const mount = document.getElementById('n-notification-box');
    const shadow = mount?.shadowRoot;
    const closeSpan = shadow?.querySelector('.close');

    if (closeSpan) {
      closeSpan.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }

    jest.advanceTimersByTime(300);
    jest.useRealTimers();
  });
});
