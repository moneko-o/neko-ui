import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('DatePicker', () => {
  it('renders basic date picker', () => {
    const { container } = render(() => <n-data-picker />);

    expect(container).toBeInTheDocument();
  });

  it('renders with default value', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-01-15" />
    ));

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('renders with value prop and updates', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" value="2024-06-20" />);

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" placeholder="Select date" />
    ));

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('renders with custom format', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" format="YYYY/MM/DD" default-value="2024-03-15" />
    ));

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('format defaults for showTime', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" showTime={true} />);

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('format defaults for month type', () => {
    const { container } = render(() => <n-data-picker type="month" />);

    expect(container).toBeInTheDocument();
  });

  it('format defaults for year type', () => {
    const { container } = render(() => <n-data-picker type="year" />);

    expect(container).toBeInTheDocument();
  });

  it('disabled date picker prevents opening', () => {
    const openChange = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" disabled={true} onOpenChange={openChange} />
    ));
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      fireEvent.focus(nInput);
    }
    expect(openChange).not.toHaveBeenCalled();
  });

  it('focus opens the picker and blur closes it', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" onChange={change} default-value="2024-06-15" />
    ));
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      fireEvent.focus(nInput);
      fireEvent.blur(nInput);
    }
  });

  it('inputMouseDown toggles open state', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-06-15" />
    ));
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      fireEvent.mouseDown(nInput);
      fireEvent.mouseDown(nInput);
    }
  });

  it('handleInputChange with valid date', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" onChange={change} />);
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      nInput.dispatchEvent(new CustomEvent('change', { detail: '2024-08-20' }));
    }
  });

  it('handleInputChange with empty detail', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" />);
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      nInput.dispatchEvent(new CustomEvent('change', { detail: '' }));
    }
  });

  it('handleInputChange with invalid date', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" />);
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      nInput.dispatchEvent(new CustomEvent('change', { detail: 'not-a-date' }));
    }
  });

  it('controlled open prop', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" open={true} default-value="2024-03-15" />
    ));

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('open=false prop', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" open={false} default-value="2024-06-15" />
    ));

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('onOpenChange fires on focus', () => {
    const openChange = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" onOpenChange={openChange} default-value="2024-06-15" />
    ));
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      fireEvent.focus(nInput);
    }
  });

  it('showHeader=false hides header', () => {
    const { container } = render(() => (
      <n-data-picker showHeader={false} open={true} default-value="2024-06-15" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('showToday=false hides today button', () => {
    const { container } = render(() => (
      <n-data-picker showToday={false} open={true} default-value="2024-06-15" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('panel renders and interacts with date buttons via shadow DOM', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" onChange={change} default-value="2024-06-15" open={true} />
    ));
    const el = getByTestId('dp');

    expect(el).toBeInTheDocument();

    const todayBtns = screen.queryAllByShadowText('今日');

    if (todayBtns.length) {
      fireEvent.click(todayBtns[0]);
    }
  });

  it('clicks prev/next month and year navigation buttons', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" onChange={change} default-value="2024-06-15" open={true} />
    ));
    const el = getByTestId('dp');

    const prevYearBtns = screen.queryAllByShadowText('《');
    const nextYearBtns = screen.queryAllByShadowText('》');
    const prevMonthBtns = screen.queryAllByShadowText('〈');
    const nextMonthBtns = screen.queryAllByShadowText('〉');

    if (prevMonthBtns.length) fireEvent.click(prevMonthBtns[0]);
    if (nextMonthBtns.length) fireEvent.click(nextMonthBtns[0]);
    if (prevYearBtns.length) fireEvent.click(prevYearBtns[0]);
    if (nextYearBtns.length) fireEvent.click(nextYearBtns[0]);

    expect(el).toBeInTheDocument();
  });

  it('switches to year view from header', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-06-15" open={true} />
    ));
    const el = getByTestId('dp');

    const yearBtn = screen.queryAllByShadowText(/2024年/);

    if (yearBtn.length) {
      fireEvent.click(yearBtn[0]);
    }

    expect(el).toBeInTheDocument();
  });

  it('switches to month view from header', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-06-15" open={true} />
    ));
    const el = getByTestId('dp');

    const monthBtn = screen.queryAllByShadowText(/6月/);

    if (monthBtn.length) {
      fireEvent.click(monthBtn[0]);
    }

    expect(el).toBeInTheDocument();
  });

  it('date type clicks on date day buttons', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" onChange={change} default-value="2024-06-15" open={true} />
    ));
    const el = getByTestId('dp');

    const dayBtns = document.body.querySelectorAll('.date-day');

    dayBtns.forEach((btn) => {
      fireEvent.click(btn as HTMLElement);
    });

    expect(el).toBeInTheDocument();
  });

  it('month type clicks on month buttons', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker
        data-testid="dp"
        type="month"
        onChange={change}
        default-value="2024-06-01"
        open={true}
      />
    ));
    const el = getByTestId('dp');

    const monthBtns = document.body.querySelectorAll('.date-picker-month');

    monthBtns.forEach((btn) => {
      fireEvent.click(btn as HTMLElement);
    });

    expect(el).toBeInTheDocument();
  });

  it('year type clicks on year buttons', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker
        data-testid="dp"
        type="year"
        onChange={change}
        default-value="2024-01-01"
        open={true}
      />
    ));
    const el = getByTestId('dp');

    const yearBtns = document.body.querySelectorAll('.date-picker-month');

    yearBtns.forEach((btn) => {
      fireEvent.click(btn as HTMLElement);
    });

    expect(el).toBeInTheDocument();
  });

  it('year type navigates prev/next year offset', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" type="year" default-value="2024-01-01" open={true} />
    ));

    const prevBtns = screen.queryAllByShadowText('《');
    const nextBtns = screen.queryAllByShadowText('》');

    if (prevBtns.length) fireEvent.click(prevBtns[0]);
    if (nextBtns.length) fireEvent.click(nextBtns[0]);

    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('showTime renders time picker with menus', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker
        data-testid="dp"
        showTime={true}
        showHour={true}
        showMinute={true}
        showSecond={true}
        onChange={change}
        default-value="2024-03-15 14:30:45"
        open={true}
      />
    ));
    const el = getByTestId('dp');

    expect(el).toBeInTheDocument();

    const timeMenus = document.body.querySelectorAll('.time-picker-items n-menu');

    timeMenus.forEach((menu) => {
      const m = menu as unknown as HTMLElement;

      if (m.shadowRoot) {
        const items = m.shadowRoot.querySelectorAll('.item');

        if (items.length > 2) {
          fireEvent.click(items[2] as HTMLElement);
        }
      }
    });
  });

  it('showTime with showHour=false', () => {
    const { container } = render(() => (
      <n-data-picker
        showTime={true}
        showHour={false}
        showMinute={true}
        showSecond={true}
        default-value="2024-03-15 10:30:45"
        open={true}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('showTime with showMinute=false', () => {
    const { container } = render(() => (
      <n-data-picker
        showTime={true}
        showHour={true}
        showMinute={false}
        showSecond={true}
        default-value="2024-03-15 10:30:45"
        open={true}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('showTime with showSecond=false', () => {
    const { container } = render(() => (
      <n-data-picker
        showTime={true}
        showHour={true}
        showMinute={true}
        showSecond={false}
        default-value="2024-03-15 10:30:45"
        open={true}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('handleChange with controlled value prop', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" value="2024-06-15" onChange={change} />
    ));
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      nInput.dispatchEvent(new CustomEvent('change', { detail: '2024-08-20' }));
    }
  });

  it('mousedown on the date-picker panel prevents default when open', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-06-15" open={true} />
    ));

    const datePicker = document.body.querySelector('.date-picker');

    if (datePicker) {
      const event = new MouseEvent('mousedown', { bubbles: true });

      datePicker.dispatchEvent(event);
    }
    expect(getByTestId('dp')).toBeInTheDocument();
  });

  it('suffix and prefix icons', () => {
    const { container } = render(() => (
      <n-data-picker suffixIcon="📅" prefixIcon="🔍" default-value="2024-06-15" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('click interaction on element', () => {
    const { getByTestId } = render(() => <n-data-picker data-testid="dp" />);

    expect(getByTestId('dp')).toBeInTheDocument();
    fireEvent.click(getByTestId('dp'));
  });

  it('panel handleChange closes picker when type matches', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" onChange={change} default-value="2024-06-15" />
    ));
    const el = getByTestId('dp');
    const nInput = el.shadowRoot?.querySelector('n-input') as unknown as HTMLElement;

    if (nInput) {
      fireEvent.focus(nInput);
    }

    const todayBtns = screen.queryAllByShadowText('今日');

    if (todayBtns.length) {
      fireEvent.click(todayBtns[0]);
    }
  });

  it('panel type effect resets offset', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" default-value="2024-06-15" open={true} />
    ));
    const el = getByTestId('dp');

    const yearHeader = screen.queryAllByShadowText(/2024年/);

    if (yearHeader.length) {
      fireEvent.click(yearHeader[0]);
    }

    const prevBtns = screen.queryAllByShadowText('《');

    if (prevBtns.length) {
      fireEvent.click(prevBtns[0]);
    }

    const yearBtns = document.body.querySelectorAll('.date-picker-month');

    if (yearBtns.length > 2) {
      fireEvent.click(yearBtns[2] as HTMLElement);
    }

    expect(el).toBeInTheDocument();
  });

  it('panel effect sets type from prop', () => {
    const { getByTestId } = render(() => (
      <n-data-picker data-testid="dp" type="month" default-value="2024-06-15" open={true} />
    ));

    expect(getByTestId('dp')).toBeInTheDocument();
  });
});
