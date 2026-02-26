import { render } from '@solidjs/testing-library';

import DatePicker from '../index';

describe('DatePicker Panel branches', () => {
  it('renders with showHeader=true to cover header Show branch', () => {
    render(() => <DatePicker showHeader={true} showToday={true} />);
  });

  it('renders with showTime to cover TimePicker section', () => {
    render(() => <DatePicker showTime={true} showHeader={true} showToday={true} />);
  });

  it('renders with type=month', () => {
    render(() => <DatePicker type="month" showHeader={true} />);
  });

  it('renders with type=year', () => {
    render(() => <DatePicker type="year" showHeader={true} />);
  });

  it('renders with open=true triggers handleMouseDown', () => {
    render(() => <DatePicker open={true} showHeader={true} />);
  });

  it('renders with format prop', () => {
    render(() => <DatePicker format="DD/MM/YYYY" />);
  });

  it('renders without showHeader to cover fallback', () => {
    render(() => <DatePicker showHeader={false} />);
  });
});
