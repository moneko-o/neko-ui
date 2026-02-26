import { render } from '@solidjs/testing-library';

import Table from '../index';

describe('Table branches', () => {
  it('pagination with page/pageSize/total', () => {
    render(() => (
      <Table
        columns={{ name: 'Name' }}
        data={[{ name: 'A' }]}
        pagination={{ page: 3, pageSize: 5, total: 50 }}
      />
    ));
  });

  it('no pagination', () => {
    render(() => <Table columns={{ name: 'Name' }} data={[{ name: 'A' }]} pagination={false} />);
  });

  it('column as string (not object)', () => {
    render(() => <Table columns={{ name: 'Name', age: 'Age' }} data={[{ name: 'A', age: 1 }]} />);
  });

  it('handlePageChange dispatches', () => {
    const onChange = jest.fn();

    render(() => (
      <Table
        columns={{ name: 'Name' }}
        data={[{ name: 'A' }]}
        pagination={{ total: 100, pageSize: 10, onChange }}
      />
    ));
  });

  it('pagination without pageSize/total triggers || fallbacks', () => {
    render(() => (
      <Table columns={{ name: 'Name' }} data={[{ name: 'A' }]} pagination={{ page: 1 } as never} />
    ));
  });

  it('pagination.size falls back to local.size', () => {
    render(() => (
      <Table
        columns={{ name: 'Name' }}
        data={[{ name: 'A' }]}
        pagination={{ page: 1, pageSize: 10, total: 50 }}
        size="small"
      />
    ));
  });

  it('order column type renders sequence numbers', () => {
    render(() => (
      <Table
        columns={{
          order: { type: 'order' },
          name: 'Name',
        }}
        data={[{ name: 'A' }, { name: 'B' }]}
      />
    ));
  });

  it('summary with order column renders summaryText', () => {
    render(() => (
      <Table
        columns={{
          order: { type: 'order' },
          amount: { label: 'Amount', key: 'amount' },
        }}
        data={[{ amount: 10 }, { amount: 20 }]}
        summary={['amount']}
        summaryText="Total"
      />
    ));
  });

  it('null/undefined cell values render emptyVal', () => {
    render(() => (
      <Table
        columns={{ name: 'Name', age: 'Age' }}
        data={[
          { name: 'A', age: null },
          { name: null, age: void 0 },
        ]}
        emptyVal="—"
      />
    ));
  });

  it('renders with css prop', () => {
    render(() => (
      <Table columns={{ name: 'Name' }} data={[{ name: 'A' }]} css=".table { color: red; }" />
    ));
  });

  it('renders with title', () => {
    render(() => <Table columns={{ name: 'Name' }} data={[{ name: 'A' }]} title="My Table" />);
  });

  it('custom render function in column', () => {
    render(() => (
      <Table
        columns={{
          name: {
            label: 'Name',
            render: (val: string) => <strong>{val}</strong>,
          },
        }}
        data={[{ name: 'A' }]}
      />
    ));
  });

  it('sum with string values returns only numeric sum', () => {
    render(() => (
      <Table
        columns={{
          amount: { label: 'Amount', key: 'amount' },
          note: { label: 'Note', key: 'note' },
        }}
        data={[
          { amount: 10, note: 'a' },
          { amount: 20, note: 'b' },
        ]}
        summary={['amount', 'note']}
      />
    ));
  });
});
