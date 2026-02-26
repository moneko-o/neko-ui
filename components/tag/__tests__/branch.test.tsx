import { render } from '@solidjs/testing-library';

import Tag from '../index';

describe('Tag branches', () => {
  it('closable tag with onClose', () => {
    const onClose = jest.fn();
    const { container } = render(() => (
      <Tag closable={true} onClose={onClose}>
        Closable
      </Tag>
    ));
    const closeBtn = container.querySelector('.close');

    if (closeBtn) closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('closable tag without onClose', () => {
    const { container } = render(() => <Tag closable={true}>No handler</Tag>);
    const closeBtn = container.querySelector('.close');

    if (closeBtn) closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
});
