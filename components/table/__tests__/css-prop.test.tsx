import { render } from '@solidjs/testing-library';

import Table from '../index';

describe('Table css prop coverage', () => {
  it('renders with css prop', () => {
    const { container } = render(() => (
      <Table
        css="table{color:red}"
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        dataSource={[{ name: 'Test' }]}
      />
    ));

    expect(container).toBeInTheDocument();
  });
});
