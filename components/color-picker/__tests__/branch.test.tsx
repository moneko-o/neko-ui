import { render } from '@solidjs/testing-library';

describe('ColorPicker branches', () => {
  it('renders with css prop', () => {
    render(() => <n-color-picker default-value="#ff0000" css=".picker { padding: 4px; }" />);
  });
});
