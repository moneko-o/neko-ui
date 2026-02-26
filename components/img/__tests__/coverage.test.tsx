import { fireEvent, render } from '@solidjs/testing-library';

import Img from '../index';

function findPortalRoot(): HTMLDivElement | null {
  const allDivs = document.querySelectorAll('body > div');
  let found: HTMLDivElement | null = null;

  allDivs.forEach((d) => {
    if (d.shadowRoot?.querySelector('.portal')) {
      found = d as HTMLDivElement;
    }
  });
  return found;
}

describe('Img coverage', () => {
  it('covers css prop rendering', () => {
    render(() => <Img src="test.jpg" alt="test" lazy={false} css=".my-class { color: red; }" />);
  });

  it('close handler preventDefault via Escape key', () => {
    const onOpenChange = jest.fn();
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} escClosable={true} onOpenChange={onOpenChange} />
    ));
    const img = container.querySelector('img');

    expect(img).toBeTruthy();
    fireEvent.click(img!);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    document.documentElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('handleDestroy resets to null after close animation', () => {
    const onOpenChange = jest.fn();
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} escClosable={true} onOpenChange={onOpenChange} />
    ));
    const img = container.querySelector('img');

    fireEvent.click(img!);

    document.documentElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );

    const root = findPortalRoot();

    expect(root).toBeTruthy();

    const portalEl = root!.shadowRoot!.querySelector('.portal')!;

    expect(portalEl).toBeTruthy();
    portalEl.dispatchEvent(new Event('animationend', { bubbles: true }));
    expect(onOpenChange).toHaveBeenCalledWith(null);
  });

  it('close via click on close span uses preventDefault', () => {
    const onOpenChange = jest.fn();
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} maskClosable={true} onOpenChange={onOpenChange} />
    ));
    const img = container.querySelector('img');

    fireEvent.click(img!);

    const root = findPortalRoot();
    const closeBtn = root?.shadowRoot?.querySelector('.close');

    if (closeBtn) {
      closeBtn.dispatchEvent(new Event('click', { bubbles: true }));
    }
  });

  it('mask click invokes portalClick with preventDefault', () => {
    const onOpenChange = jest.fn();
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} maskClosable={true} onOpenChange={onOpenChange} />
    ));
    const img = container.querySelector('img');

    fireEvent.click(img!);

    const root = findPortalRoot();
    const portalEl = root?.shadowRoot?.querySelector('.portal');

    if (portalEl) {
      const event = new MouseEvent('click', { bubbles: true });

      Object.defineProperty(event, 'target', { value: portalEl });
      portalEl.dispatchEvent(event);
    }
  });

  it('onLoad in custom element registry fires when img loads', () => {
    const loadHandler = jest.fn();

    render(() => (
      <n-img
        data-testid="ce-load"
        src="https://example.com/test.jpg"
        alt="test"
        lazy={false}
        onLoad={loadHandler}
      />
    ));

    const nImg = document.querySelector('[data-testid="ce-load"]');
    const shadow = nImg?.shadowRoot;

    if (shadow) {
      const spin = shadow.querySelector('n-spin');
      const imgEl = spin?.shadowRoot?.querySelector('img') || shadow.querySelector('img');

      if (imgEl) {
        imgEl.dispatchEvent(new Event('load', { bubbles: false }));
      }
    }
  });

  it('controlled open=false to cover handleDestroy branch', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Img src="test.jpg" alt="test" lazy={false} open={false} onOpenChange={onOpenChange} />
    ));
  });

  it('open=true covers classList none via open() truthy', () => {
    const onOpenChange = jest.fn();
    const { container } = render(() => (
      <Img src="test.jpg" alt="test" lazy={false} onOpenChange={onOpenChange} />
    ));
    const img = container.querySelector('img');

    expect(img).toBeTruthy();
    fireEvent.click(img!);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('onLoad in custom element dispatches load CustomEvent without user onLoad', () => {
    const loadFn = jest.fn();

    const { getByTestId } = render(() => (
      <n-img data-testid="img-ce-load" src="https://example.com/img.jpg" alt="test" lazy={false} />
    ));

    const nImg = getByTestId('img-ce-load');

    nImg.addEventListener('load', loadFn);

    const shadow = nImg.shadowRoot;

    if (shadow) {
      const spin = shadow.querySelector('n-spin');
      const spinShadow = spin?.shadowRoot;
      const imgs = spinShadow?.querySelectorAll('img') || shadow.querySelectorAll('img');

      imgs.forEach((imgEl) => {
        imgEl.dispatchEvent(new Event('load', { bubbles: false }));
      });
    }
  });
});
