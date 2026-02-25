import { render } from '@solidjs/testing-library';

import Provider from '../index';

describe('Provider (direct)', () => {
  it('setScheme when scheme prop is provided', () => {
    render(() => <Provider scheme="dark" />);
  });

  it('setScheme to light', () => {
    render(() => <Provider scheme="light" />);
  });

  it('onScheme callback fires', () => {
    const onScheme = jest.fn();

    render(() => <Provider scheme="auto" onScheme={onScheme} />);
    expect(onScheme).toHaveBeenCalled();
  });
});
