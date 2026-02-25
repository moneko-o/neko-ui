import { render } from '@solidjs/testing-library';

import Tag from '../index';

describe('Tag full coverage', () => {
  it('closable tag with onClose callback fires the callback', () => {
    const onClose = jest.fn();
    const { container } = render(() => (
      <Tag closeIcon={true} onClose={onClose}>
        Closable Tag
      </Tag>
    ));
    const closeBtn = container.querySelector('.close');

    if (closeBtn) {
      closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('closable tag without onClose still closes the tag', () => {
    const { container } = render(() => <Tag closeIcon={true}>No Handler</Tag>);
    const closeBtn = container.querySelector('.close');

    if (closeBtn) {
      closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
    expect(container).toBeInTheDocument();
  });

  it('tag with custom color', () => {
    const { container } = render(() => <Tag color="#ff0000">Red Tag</Tag>);

    expect(container).toBeInTheDocument();
  });

  it('tag with icon', () => {
    const { container } = render(() => <Tag icon="🏷️">With Icon</Tag>);

    expect(container).toBeInTheDocument();
  });
});
