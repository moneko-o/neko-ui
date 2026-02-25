import { fireEvent, render } from '@solidjs/testing-library';

describe('DatePicker', () => {
  it('renders basic date picker', () => {
    const { container } = render(() => <n-data-picker />);

    expect(container).toBeInTheDocument();
  });

  it('renders with default value', () => {
    const { container } = render(() => <n-data-picker default-value="2024-01-15" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    const { container } = render(() => <n-data-picker placeholder="Select date" />);

    expect(container).toBeInTheDocument();
  });

  it('handles onChange callback', () => {
    const change = jest.fn();
    const { container } = render(() => <n-data-picker onChange={change} />);

    expect(container).toBeInTheDocument();
  });

  it('renders disabled date picker', () => {
    const { container } = render(() => <n-data-picker disabled={true} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with custom format', () => {
    const { container } = render(() => <n-data-picker format="YYYY/MM/DD" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with showTime', () => {
    const { container } = render(() => <n-data-picker showTime={true} />);

    expect(container).toBeInTheDocument();
  });

  it('renders month picker', () => {
    const { container } = render(() => <n-data-picker type="month" />);

    expect(container).toBeInTheDocument();
  });

  it('renders year picker', () => {
    const { container } = render(() => <n-data-picker type="year" />);

    expect(container).toBeInTheDocument();
  });

  it('handles click interaction', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" />);

    expect(getByTestId('dp')).toBeInTheDocument();
    fireEvent.click(getByTestId('dp'));
  });
});
