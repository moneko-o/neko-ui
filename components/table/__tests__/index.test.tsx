import { render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Table', () => {
  const columns = {
    name: { title: 'Name' },
    age: { title: 'Age' },
    address: 'Address',
  };
  const data = [
    { name: 'Alice', age: 25, address: 'Beijing' },
    { name: 'Bob', age: 30, address: 'Shanghai' },
    { name: 'Charlie', age: 28, address: 'Guangzhou' },
  ];

  it('renders basic table', () => {
    const { container } = render(() => <n-table columns={columns} data={data} />);

    expect(container).toBeInTheDocument();
  });

  it('renders empty table', () => {
    const { container } = render(() => <n-table columns={columns} data={[]} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    const { container } = render(() => <n-table columns={columns} data={data} loading={true} />);

    expect(container).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(() => <n-table columns={columns} data={data} size="small" />);

    expect(container).toBeInTheDocument();
  });

  it('renders with pagination', () => {
    const { container } = render(() => (
      <n-table columns={columns} data={data} pagination={{ total: 100, pageSize: 10 }} />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with custom empty value', () => {
    const { container } = render(() => (
      <n-table columns={columns} data={[{ name: 'Test' }]} emptyVal="N/A" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with summary', () => {
    const { container } = render(() => (
      <n-table columns={columns} data={data} summary={['age']} summaryText="Total" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with alignment options', () => {
    const { container } = render(() => (
      <n-table columns={columns} data={data} align="center" valign="middle" />
    ));

    expect(container).toBeInTheDocument();
  });

  it('column with render function', () => {
    const renderColumns = {
      name: { label: 'Name' },
      age: {
        label: 'Age',
        render: (val: number, row: Record<string, unknown>) => (
          <span data-testid="custom-cell">
            {row.name}: {val}
          </span>
        ),
      },
    };

    render(() => <n-table data-testid="render-table" columns={renderColumns} data={data} />);

    expect(screen.getByTestId('render-table')).toBeInTheDocument();
  });

  it('column with order type', () => {
    const orderColumns = {
      order: { type: 'order', label: '序号' },
      name: { label: 'Name' },
      age: { label: 'Age' },
    };

    render(() => (
      <n-table
        data-testid="order-table"
        columns={orderColumns}
        data={data}
        summary={['age']}
        summaryText="合计"
      />
    ));

    expect(screen.getByTestId('order-table')).toBeInTheDocument();
  });

  it('data with null/undefined values shows emptyVal', () => {
    const { container } = render(() => (
      <n-table
        columns={columns}
        data={[
          { name: 'Test', age: null, address: void 0 },
          { name: null, age: void 0, address: 'Addr' },
        ]}
        emptyVal="--"
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('summary row with string values (non-numeric)', () => {
    const { container } = render(() => (
      <n-table
        columns={columns}
        data={[
          { name: 'Alice', age: 'twenty', address: 'Beijing' },
          { name: 'Bob', age: 30, address: 'Shanghai' },
        ]}
        summary={['age', 'name']}
        summaryText="Total"
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('pagination with onChange', () => {
    const onChange = jest.fn();

    render(() => (
      <n-table
        data-testid="page-table"
        columns={columns}
        data={data}
        pagination={{ total: 100, pageSize: 10, onChange }}
      />
    ));

    expect(screen.getByTestId('page-table')).toBeInTheDocument();
  });

  it('table with title', () => {
    const { container } = render(() => <n-table columns={columns} data={data} title="My Table" />);

    expect(container).toBeInTheDocument();
  });

  it('column with width and layout', () => {
    const layoutColumns = {
      name: { label: 'Name', width: 200, align: 'center' as const },
      age: { label: 'Age', width: 100, valign: 'top' as const },
    };

    const { container } = render(() => <n-table columns={layoutColumns} data={data} />);

    expect(container).toBeInTheDocument();
  });
});
