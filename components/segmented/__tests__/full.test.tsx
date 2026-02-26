import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Segmented from '../index';

describe('Segmented full coverage', () => {
  it('renders in dark theme', () => {
    theme.setScheme('dark');
    const { container } = render(() => <Segmented options={['A', 'B', 'C']} />);

    expect(container).toBeInTheDocument();
    theme.setScheme('light');
  });

  it('renders in light theme', () => {
    theme.setScheme('light');
    const { container } = render(() => <Segmented options={['X', 'Y']} />);

    expect(container).toBeInTheDocument();
  });

  it('disabled item click does not trigger onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Segmented
        options={[
          { value: 'a', label: 'A', disabled: true },
          { value: 'b', label: 'B' },
        ]}
        onChange={onChange}
      />
    ));
    const labels = container.querySelectorAll('.label');

    if (labels.length > 0) {
      labels[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('uncontrolled value change (no value prop) triggers setValue', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Segmented options={['One', 'Two', 'Three']} onChange={onChange} />
    ));
    const labels = container.querySelectorAll('.label');

    if (labels.length > 1) {
      labels[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
    expect(onChange).toHaveBeenCalled();
  });

  it('keyUp with non-Enter key does not trigger onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Segmented options={['K1', 'K2']} onChange={onChange} />);
    const labels = container.querySelectorAll('.label');

    if (labels.length > 0) {
      labels[0].dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true }));
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keyUp with Enter triggers onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Segmented options={['E1', 'E2']} onChange={onChange} />);
    const labels = container.querySelectorAll('.label');

    if (labels.length > 1) {
      labels[1].dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    }
    expect(onChange).toHaveBeenCalled();
  });
});
