import { render } from '@solidjs/testing-library';

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
});
