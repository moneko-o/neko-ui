import { render } from '@solidjs/testing-library';

import CaptureScreen from '../index';

describe('CaptureScreen css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => <CaptureScreen css="div{color:red}" />);

    expect(container).toBeInTheDocument();
  });
});
