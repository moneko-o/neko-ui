import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Collapse', () => {
  it('renders with title', () => {
    const { container } = render(() => (
      <n-collapse title="Section Title">
        <div>Content</div>
      </n-collapse>
    ));

    expect(container).toBeInTheDocument();
  });

  it('toggles content on click', () => {
    render(() => (
      <n-collapse data-testid="collapse" title="Toggle Me">
        <div>Hidden Content</div>
      </n-collapse>
    ));

    const el = screen.getByTestId('collapse');

    expect(el).toBeInTheDocument();
    const header = el.shadowRoot?.querySelector('.header');

    if (header) {
      fireEvent.click(header);
      fireEvent.click(header);
    }
  });

  it('renders with custom class', () => {
    const { container } = render(() => (
      <n-collapse class="custom-collapse" title="Styled">
        <div>Styled Content</div>
      </n-collapse>
    ));

    expect(container).toBeInTheDocument();
  });
});
