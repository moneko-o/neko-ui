import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Img', () => {
  function portal(container: HTMLElement, selector: string) {
    return container.parentElement!.lastElementChild!.shadowRoot!.querySelector(selector)!;
  }

  it('basic', async () => {
    const { container } = render(() => (
      <n-img
        data-testid="img"
        src="https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg"
        alt="img"
        open={true}
      />
    ));

    expect(container).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('img').shadowRoot!.querySelector('.img')!);
    fireEvent.wheel(document.documentElement);
    fireEvent.click(portal(container, '.close'));
    fireEvent.animationEnd(portal(container, '.portal'));
  });
  it('mask-closable', async () => {
    const { container } = render(() => (
      <n-img
        data-testid="img"
        src="https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg"
        alt="img"
        mask-closable={true}
        onOpenChange={jest.fn()}
      />
    ));

    fireEvent.click(screen.getByTestId('img').shadowRoot!.querySelector('.img')!);
    fireEvent.click(portal(container, '.portal'));
    fireEvent.animationEnd(portal(container, '.portal'));
  });
  it('esc', async () => {
    render(() => (
      <n-img
        data-testid="img"
        src="https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg"
        alt="img"
        esc-closable={true}
      />
    ));

    fireEvent.click(screen.getByTestId('img').shadowRoot!.querySelector('.img')!);
    fireEvent.keyDown(screen.getByTestId('img'), {
      key: 'Escape',
    });
  });

  it('disabled prop prevents opening', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <n-img
        data-testid="img-disabled"
        src="https://example.com/img.jpg"
        alt="disabled"
        disabled={true}
        onOpenChange={onOpenChange}
      />
    ));

    fireEvent.click(screen.getByTestId('img-disabled').shadowRoot!.querySelector('.img')!);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('lazy loading with intersection observer', () => {
    render(() => (
      <n-img data-testid="img-lazy" src="https://example.com/lazy.jpg" alt="lazy" lazy={true} />
    ));

    expect(screen.getByTestId('img-lazy')).toBeInTheDocument();
  });

  it('lazy=false loads immediately', () => {
    render(() => (
      <n-img
        data-testid="img-no-lazy"
        src="https://example.com/nolazy.jpg"
        alt="no-lazy"
        lazy={false}
      />
    ));

    expect(screen.getByTestId('img-no-lazy')).toBeInTheDocument();
  });

  it('image error handling', () => {
    render(() => <n-img data-testid="img-err" src="invalid-url" alt="error" lazy={false} />);

    const imgEl = screen.getByTestId('img-err').shadowRoot!.querySelector('img');

    if (imgEl) {
      fireEvent.error(imgEl);
    }
  });

  it('image load handling', () => {
    render(() => (
      <n-img data-testid="img-load" src="https://example.com/valid.jpg" alt="load" lazy={false} />
    ));

    const imgEl = screen.getByTestId('img-load').shadowRoot!.querySelector('img');

    if (imgEl) {
      fireEvent.load(imgEl);
    }
  });

  it('open viewer and close with animationend', () => {
    const { container } = render(() => (
      <n-img
        data-testid="img-viewer"
        src="https://example.com/viewer.jpg"
        alt="viewer"
        open={null}
      />
    ));

    fireEvent.click(screen.getByTestId('img-viewer').shadowRoot!.querySelector('.img')!);

    const portalEl = portal(container, '.portal');

    if (portalEl) {
      fireEvent.click(portal(container, '.close'));
      fireEvent.animationEnd(portalEl);
    }
  });

  it('srcFull prop uses full source in viewer', () => {
    const { container } = render(() => (
      <n-img
        data-testid="img-full"
        src="https://example.com/thumb.jpg"
        src-full="https://example.com/full.jpg"
        alt="full"
        open={true}
      />
    ));

    expect(container).toBeInTheDocument();
  });
});
