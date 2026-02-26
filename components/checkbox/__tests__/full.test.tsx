import { render } from '@solidjs/testing-library';

import Checkbox from '../index';

describe('Checkbox indeterminate (line 117)', () => {
  it('sets indeterminate when checkAll is true and selection is partial', () => {
    const { container } = render(() => (
      <Checkbox
        checkAll={true}
        value={[1]}
        options={[
          { value: 1, label: 'A' },
          { value: 2, label: 'B' },
          { value: 3, label: 'C' },
        ]}
      />
    ));

    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    // First checkbox is the "check all" toggle; it should be indeterminate
    // because value=[1] is a partial selection of options [1,2,3]
    expect(checkboxes.length).toBeGreaterThanOrEqual(1);
    expect(checkboxes[0].indeterminate).toBe(true);
  });
});
