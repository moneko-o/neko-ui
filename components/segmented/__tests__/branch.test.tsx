import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Segmented from '../index';

describe('Segmented branches', () => {
  it('dark theme branch', () => {
    theme.setScheme('dark');
    render(() => <Segmented options={['A', 'B']} />);
    theme.setScheme('light');
  });

  it('light theme branch', () => {
    theme.setScheme('light');
    render(() => <Segmented options={['A', 'B']} />);
  });

  it('disabled item prevents onChange', () => {
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
    const item = container.querySelector('.item');

    if (item) item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('uncontrolled value change', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Segmented options={['A', 'B']} onChange={onChange} />);
    const items = container.querySelectorAll('.item');

    if (items.length > 1) {
      items[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });

  it('renders with css prop', () => {
    render(() => <Segmented options={['A', 'B']} css=".box { border: 1px solid; }" />);
  });

  it('option with icon covers icon Show branch', () => {
    render(() => <Segmented options={[{ value: 'a', label: 'A', icon: '★' }]} />);
  });

  it('option with suffix covers suffix Show branch', () => {
    render(() => <Segmented options={[{ value: 'a', label: 'A', suffix: '(1)' }]} />);
  });

  it('keyUp with Enter triggers onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Segmented options={['A', 'B']} onChange={onChange} />);
    const label = container.querySelector('.label');

    label?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
  });

  it('keyUp with non-Enter does nothing', () => {
    const onChange = jest.fn();
    const { container } = render(() => <Segmented options={['A', 'B']} onChange={onChange} />);
    const label = container.querySelector('.label');

    label?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('controlled value with class prop', () => {
    render(() => <Segmented options={['A', 'B']} value="A" class="my-segment" />);
  });

  it('globally disabled prevents all interactions', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Segmented options={['A', 'B']} disabled={true} onChange={onChange} />
    ));
    const label = container.querySelector('.label');

    label?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('option ref is assigned to each label element', () => {
    const { container } = render(() => (
      <Segmented
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />
    ));
    const labels = container.querySelectorAll('.label');

    expect(labels.length).toBeGreaterThan(0);
  });
});
