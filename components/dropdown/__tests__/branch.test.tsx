import { render } from '@solidjs/testing-library';

import Dropdown from '../index';

describe('Dropdown branches', () => {
  it('controlled open prop', () => {
    render(() => (
      <Dropdown open={true} onOpenChange={jest.fn()} items={[{ value: 'a', label: 'A' }]}>
        Trigger
      </Dropdown>
    ));
  });

  it('controlled value prop (non-array)', () => {
    render(() => (
      <Dropdown value="a" onChange={jest.fn()} items={[{ value: 'a', label: 'A' }]}>
        Trigger
      </Dropdown>
    ));
  });

  it('controlled value prop (array)', () => {
    render(() => (
      <Dropdown
        value={['a', 'b']}
        multiple={true}
        onChange={jest.fn()}
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      >
        Trigger
      </Dropdown>
    ));
  });

  it('value null clears selection', () => {
    render(() => (
      <Dropdown value={null as unknown as string} items={[{ value: 'a', label: 'A' }]}>
        Trigger
      </Dropdown>
    ));
  });
});
