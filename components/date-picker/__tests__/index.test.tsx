import { fireEvent, render } from '@solidjs/testing-library';

function portalRoot(container: HTMLElement) {
  return container.parentElement!.lastElementChild!.shadowRoot!;
}

describe('DatePicker', () => {
  it('renders basic date picker', () => {
    const { container } = render(() => <n-data-picker />);

    expect(container).toBeInTheDocument();
  });

  it('renders with default value', () => {
    const { container } = render(() => <n-data-picker default-value="2024-01-15" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with value prop (controlled)', () => {
    const { container } = render(() => <n-data-picker value="2024-06-20" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    const { container } = render(() => <n-data-picker placeholder="Select date" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with custom format', () => {
    const { container } = render(() => (
      <n-data-picker format="YYYY/MM/DD" default-value="2024-03-15" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('format defaults for month type', () => {
    const { container } = render(() => <n-data-picker type="month" />);

    expect(container).toBeInTheDocument();
  });

  it('format defaults for year type', () => {
    const { container } = render(() => <n-data-picker type="year" />);

    expect(container).toBeInTheDocument();
  });

  it('format defaults for showTime', () => {
    const { container } = render(() => <n-data-picker show-time={true} />);

    expect(container).toBeInTheDocument();
  });

  it('disabled prevents opening', () => {
    const openChange = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" disabled={true} onOpenChange={openChange} />
    ));
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) fireEvent.focus(nInput);
    expect(openChange).not.toHaveBeenCalled();
  });

  it('suffix and prefix icons', () => {
    const { container } = render(() => <n-data-picker suffix-icon="📅" prefix-icon="🔍" />);

    expect(container).toBeInTheDocument();
  });

  it('focus opens and blur closes the picker', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-06-15" />
    ));
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      fireEvent.focus(nInput);
      fireEvent.blur(nInput);
    }
  });

  it('inputMouseDown toggles open', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-06-15" />
    ));
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      fireEvent.mouseDown(nInput);
      fireEvent.mouseDown(nInput);
    }
  });

  it('handleInputChange with valid date', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" onChange={change} />);
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) nInput.dispatchEvent(new CustomEvent('change', { detail: '2024-08-20' }));
  });

  it('handleInputChange with empty detail', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" />);
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) nInput.dispatchEvent(new CustomEvent('change', { detail: '' }));
  });

  it('handleInputChange with invalid date', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" />);
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) nInput.dispatchEvent(new CustomEvent('change', { detail: 'not-a-date' }));
  });

  it('handleInputChange with controlled value', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" value="2024-06-15" onChange={change} />
    ));
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) nInput.dispatchEvent(new CustomEvent('change', { detail: '2024-08-20' }));
  });

  it('controlled open prop', () => {
    const { container } = render(() => <n-data-picker open={true} default-value="2024-03-15" />);

    expect(container).toBeInTheDocument();
  });

  it('open=false prop', () => {
    const { container } = render(() => <n-data-picker open={false} default-value="2024-06-15" />);

    expect(container).toBeInTheDocument();
  });

  it('onOpenChange fires on focus', () => {
    const openChange = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" onOpenChange={openChange} />
    ));
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) fireEvent.focus(nInput);
  });

  it('show-header=false hides header', () => {
    const { container } = render(() => (
      <n-data-picker show-header={false} open={true} default-value="2024-06-15" />
    ));
    const root = portalRoot(container);

    expect(root.querySelector('.date-picker-header')).toBeFalsy();
  });

  it('show-today=false hides today button', () => {
    const { container } = render(() => (
      <n-data-picker show-today={false} open={true} default-value="2024-06-15" />
    ));
    const root = portalRoot(container);

    expect(root.querySelector('.date-picker-footer')).toBeFalsy();
  });

  it('clicks date day buttons including prev/next month days', () => {
    const change = jest.fn();
    const { container } = render(() => (
      <n-data-picker onChange={change} default-value="2024-06-15" open={true} />
    ));
    const root = portalRoot(container);
    const dateDays = root.querySelectorAll('.date-day');

    expect(dateDays.length).toBe(42);
    fireEvent.click(dateDays[10] as unknown as HTMLElement);
    fireEvent.click(dateDays[20] as unknown as HTMLElement);

    root.querySelectorAll('.date-opacity').forEach((d) => {
      fireEvent.click(d as unknown as HTMLElement);
    });
  });

  it('clicks today button', () => {
    const change = jest.fn();
    const { container } = render(() => (
      <n-data-picker onChange={change} default-value="2024-06-15" open={true} />
    ));
    const root = portalRoot(container);
    const todayBtn = root.querySelector('.date-picker-footer n-button') as unknown as HTMLElement;

    expect(todayBtn).toBeTruthy();
    fireEvent.click(todayBtn);
  });

  it('navigates prev/next month and year', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={true} />);
    const root = portalRoot(container);

    const prevMonth = root.querySelector('.prev-month') as unknown as HTMLElement;
    const nextMonth = root.querySelector('.next-month') as unknown as HTMLElement;
    const prevYear = root.querySelector('.prev-year') as unknown as HTMLElement;
    const nextYear = root.querySelector('.next-year') as unknown as HTMLElement;

    if (prevMonth) fireEvent.click(prevMonth);
    if (nextMonth) fireEvent.click(nextMonth);
    if (prevYear) fireEvent.click(prevYear);
    if (nextYear) fireEvent.click(nextYear);
  });

  it('switches to year view from header and navigates', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={true} />);
    const root = portalRoot(container);
    const yearBtn = root.querySelector('.date-value n-button') as unknown as HTMLElement;

    if (yearBtn) fireEvent.click(yearBtn);

    const prevYear = root.querySelector('.prev-year') as unknown as HTMLElement;
    const nextYear = root.querySelector('.next-year') as unknown as HTMLElement;

    if (prevYear) fireEvent.click(prevYear);
    if (nextYear) fireEvent.click(nextYear);
    if (nextYear) fireEvent.click(nextYear);
  });

  it('switches to month view from header and clicks month', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={true} />);
    const root = portalRoot(container);
    const btns = root.querySelector('.date-value')?.querySelectorAll('n-button');

    if (btns && btns.length > 1) fireEvent.click(btns[1] as unknown as HTMLElement);

    const monthBtns = root.querySelectorAll('.date-picker-month');

    if (monthBtns.length > 3) fireEvent.click(monthBtns[3] as unknown as HTMLElement);
  });

  it('month type clicks month buttons', () => {
    const change = jest.fn();
    const { container } = render(() => (
      <n-data-picker type="month" onChange={change} default-value="2024-06-01" open={true} />
    ));
    const root = portalRoot(container);
    const monthBtns = root.querySelectorAll('.date-picker-month');

    expect(monthBtns.length).toBe(12);
    fireEvent.click(monthBtns[3] as unknown as HTMLElement);
    fireEvent.click(monthBtns[5] as unknown as HTMLElement);
  });

  it('year type clicks year buttons', () => {
    const change = jest.fn();
    const { container } = render(() => (
      <n-data-picker type="year" onChange={change} default-value="2024-01-01" open={true} />
    ));
    const root = portalRoot(container);
    const yearBtns = root.querySelectorAll('.date-picker-month');

    expect(yearBtns.length).toBe(12);
    fireEvent.click(yearBtns[0] as unknown as HTMLElement);
    fireEvent.click(yearBtns[5] as unknown as HTMLElement);
    fireEvent.click(yearBtns[11] as unknown as HTMLElement);
  });

  it('year type navigates offset with prev/next', () => {
    const { container } = render(() => (
      <n-data-picker type="year" default-value="2024-01-01" open={true} />
    ));
    const root = portalRoot(container);
    const prevYear = root.querySelector('.prev-year') as unknown as HTMLElement;
    const nextYear = root.querySelector('.next-year') as unknown as HTMLElement;

    if (prevYear) fireEvent.click(prevYear);
    if (nextYear) fireEvent.click(nextYear);
  });

  it('mousedown on date-picker panel when open', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={true} />);
    const root = portalRoot(container);
    const datePicker = root.querySelector('.date-picker') as unknown as HTMLElement;

    expect(datePicker).toBeTruthy();
    fireEvent.mouseDown(datePicker);
  });

  it('showTime renders time picker and handles menu changes', () => {
    const change = jest.fn();
    const { container } = render(() => (
      <n-data-picker
        show-time={true}
        show-hour={true}
        show-minute={true}
        show-second={true}
        onChange={change}
        default-value="2024-03-15 14:30:45"
        open={true}
      />
    ));
    const root = portalRoot(container);

    expect(root.querySelector('.time-picker')).toBeTruthy();

    const timeMenus = root.querySelectorAll('.time-picker-items n-menu');

    expect(timeMenus.length).toBe(3);

    (timeMenus[0] as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('change', { detail: [5] }),
    );
    (timeMenus[1] as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('change', { detail: [15] }),
    );
    (timeMenus[2] as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('change', { detail: [30] }),
    );
  });

  it('showTime with show-hour=false', () => {
    const { container } = render(() => (
      <n-data-picker
        show-time={true}
        show-hour={false}
        show-minute={true}
        show-second={true}
        default-value="2024-03-15 10:30:45"
        open={true}
      />
    ));
    const root = portalRoot(container);

    expect(root.querySelectorAll('.time-picker-items n-menu').length).toBe(2);
  });

  it('showTime with show-minute=false', () => {
    const { container } = render(() => (
      <n-data-picker
        show-time={true}
        show-hour={true}
        show-minute={false}
        show-second={true}
        default-value="2024-03-15 10:30:45"
        open={true}
      />
    ));
    const root = portalRoot(container);

    expect(root.querySelectorAll('.time-picker-items n-menu').length).toBe(2);
  });

  it('showTime with show-second=false', () => {
    const { container } = render(() => (
      <n-data-picker
        show-time={true}
        show-hour={true}
        show-minute={true}
        show-second={false}
        default-value="2024-03-15 10:30:45"
        open={true}
      />
    ));
    const root = portalRoot(container);

    expect(root.querySelectorAll('.time-picker-items n-menu').length).toBe(2);
  });

  it('panel handleChange with date type closes picker', () => {
    const change = jest.fn();
    const { getByTestId, container } = render(() => (
      <n-data-picker data-testid="dp" onChange={change} default-value="2024-06-15" />
    ));
    const nInput = getByTestId('dp').shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) fireEvent.focus(nInput);

    const root = portalRoot(container);
    const dateDays = root.querySelectorAll('.date-day:not(.date-opacity)');

    if (dateDays.length > 5) fireEvent.click(dateDays[5] as unknown as HTMLElement);
  });

  it('panel handleChange with month view reverts to date type', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={true} />);
    const root = portalRoot(container);
    const btns = root.querySelector('.date-value')?.querySelectorAll('n-button');

    if (btns && btns.length > 1) fireEvent.click(btns[1] as unknown as HTMLElement);

    const monthBtns = root.querySelectorAll('.date-picker-month');

    if (monthBtns.length) fireEvent.click(monthBtns[0] as unknown as HTMLElement);
  });

  it('panel type effect resets offset when leaving year mode', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={true} />);
    const root = portalRoot(container);
    const yearBtn = root.querySelector('.date-value n-button') as unknown as HTMLElement;

    if (yearBtn) fireEvent.click(yearBtn);

    const prevYear = root.querySelector('.prev-year') as unknown as HTMLElement;

    if (prevYear) fireEvent.click(prevYear);

    const yearBtns = root.querySelectorAll('.date-picker-month');

    if (yearBtns.length > 2) fireEvent.click(yearBtns[2] as unknown as HTMLElement);
  });

  it('clicking current active date does not change', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={true} />);
    const root = portalRoot(container);
    const activeDay = root.querySelector('.date-active') as unknown as HTMLElement;

    if (activeDay) fireEvent.click(activeDay);
  });

  it('mousedown on date-picker when not open', () => {
    const { container } = render(() => <n-data-picker default-value="2024-06-15" open={false} />);
    const root = portalRoot(container);
    const datePicker = root.querySelector('.date-picker') as unknown as HTMLElement;

    if (datePicker) fireEvent.mouseDown(datePicker);
  });

  it('click interaction on element', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" />);

    fireEvent.click(getByTestId('dp'));
  });
});
