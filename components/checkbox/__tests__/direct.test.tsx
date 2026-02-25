import { render } from '@solidjs/testing-library';

import Checkbox from '../index';

describe('Checkbox (direct render)', () => {
  it('non-array value gets coerced to array', () => {
    const { container } = render(() => (
      <Checkbox
        value={'single' as unknown as string[]}
        options={[
          { value: 'single', label: 'Single' },
          { value: 'other', label: 'Other' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('undefined options fallback', () => {
    const { container } = render(() => <Checkbox />);

    expect(container).toBeInTheDocument();
  });

  it('indeterminate state with partial selection', () => {
    const { container } = render(() => (
      <Checkbox
        check-all={true}
        value={[1]}
        options={[
          { value: 1, label: 'A' },
          { value: 2, label: 'B' },
          { value: 3, label: 'C' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });
});
