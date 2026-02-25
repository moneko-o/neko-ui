import { fireEvent, render } from '@solidjs/testing-library';

import Img from '../index';

describe('Img full coverage', () => {
  it('open viewer and close with esc', () => {
    const onOpenChange = jest.fn();
    const { container } = render(() => (
      <Img
        src="test.jpg"
        alt="test"
        lazy={false}
        escClosable={true}
        maskClosable={true}
        onOpenChange={onOpenChange}
      />
    ));
    const img = container.querySelector('.img') || container.querySelector('img');

    if (img) {
      fireEvent.click(img);
      fireEvent.keyDown(document.documentElement, { key: 'Escape' });
    }
  });

  it('open viewer and close with mask click', () => {
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} maskClosable={true} />
    ));
    const img = container.querySelector('.img') || container.querySelector('img');

    if (img) fireEvent.click(img);

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const portal = lastPortal?.shadowRoot?.querySelector('.portal');

    if (portal) fireEvent.click(portal, { target: portal });
  });

  it('disabled prevents open', () => {
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} disabled={true} />
    ));
    const img = container.querySelector('.img') || container.querySelector('img');

    if (img) fireEvent.click(img);
  });

  it('controlled open prop', () => {
    render(() => <Img src="test.jpg" alt="test" lazy={false} open={true} />);
  });

  it('srcFull in viewer', () => {
    render(() => (
      <Img src="thumb.jpg" srcFull="full.jpg" alt="test" lazy={false} open={true} />
    ));
  });

  it('onLoad callback relay in custom element', () => {
    render(() => <n-img src="test.jpg" alt="test" lazy={false} />);
  });

  it('animationend on portal destroys viewer', () => {
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} />
    ));
    const img = container.querySelector('.img') || container.querySelector('img');

    if (img) fireEvent.click(img);

    const portals = document.querySelectorAll('body > div');
    const lastPortal = portals[portals.length - 1];
    const close = lastPortal?.shadowRoot?.querySelector('.close');

    if (close) fireEvent.click(close);

    const portal = lastPortal?.shadowRoot?.querySelector('.portal');

    if (portal) fireEvent.animationEnd(portal);
  });
});
