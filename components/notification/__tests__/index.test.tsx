import notification from '../index';

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

  it('updates notification', () => {
    const id = notification.info('Original');

    notification.update(id, { content: 'Updated' });
  });

  it('destroys all notifications', () => {
    notification.info('Message 1');
    notification.info('Message 2');
    notification.destory();
  });
});
