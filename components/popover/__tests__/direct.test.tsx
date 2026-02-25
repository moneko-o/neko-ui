import { render } from '@solidjs/testing-library';

import Popover from '../index';

describe('Popover (direct)', () => {
  it('getPopupContainer returns custom container', () => {
    const mountEl = document.createElement('div');

    document.body.appendChild(mountEl);
    render(() => (
      <Popover content="Test" open={true} getPopupContainer={() => mountEl}>
        Child
      </Popover>
    ));
    document.body.removeChild(mountEl);
  });
});
