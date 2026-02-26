import { render } from '@solidjs/testing-library';

import Cron from '../index';

describe('Cron nts passthrough (direct)', () => {
  it('nts with non-number string returns string', () => {
    render(() => <Cron value="* * * * * ? *" />);
  });

  it('nts with undefined returns undefined', () => {
    render(() => <Cron defaultValue="* * * * * ? *" />);
  });
});
