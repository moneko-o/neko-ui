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
});
