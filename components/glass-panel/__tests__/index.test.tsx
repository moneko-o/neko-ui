import { render } from '@solidjs/testing-library';

describe('GlassPanel', () => {
  it('renders basic glass panel', () => {
    const { container } = render(() => (
      <n-glass-panel>
        <div>Glass Content</div>
      </n-glass-panel>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with blur property', () => {
    const { container } = render(() => (
      <n-glass-panel blur="20">
        <div>Blurred Content</div>
      </n-glass-panel>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with multiple filter properties', () => {
    const { container } = render(() => (
      <n-glass-panel blur="10" brightness="1.2" contrast="1.1" opacity="0.8" saturate="1.5">
        <div>Filtered Content</div>
      </n-glass-panel>
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with custom class', () => {
    const { container } = render(() => (
      <n-glass-panel class="custom-glass" grayscale="0.5" sepia="0.2">
        <div>Custom Glass</div>
      </n-glass-panel>
    ));

    expect(container).toBeInTheDocument();
  });
});
