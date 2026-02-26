import { render } from '@solidjs/testing-library';

import Cron from '../index';

describe('Cron branches', () => {
  it('renders with css prop', () => {
    render(() => <Cron css=".tab { color: red; }" />);
  });

  it('value with L in day position covers last + isWeek=false fmt branch', () => {
    render(() => <Cron value="0 0 0 L * ? *" />);
  });

  it('value with L in week position covers last + isWeek=true fmt branch', () => {
    render(() => <Cron value="0 0 0 ? * 1L *" />);
  });

  it('value with W covers closeWorkDay branch', () => {
    render(() => <Cron value="0 0 0 15W * ? *" />);
  });

  it('value with # in week covers week beginInterval branch', () => {
    render(() => <Cron value="0 0 0 ? * 2#1 *" />);
  });

  it('value with comma-separated covers some branch', () => {
    render(() => <Cron value="1,5,10 0 0 * * ? *" />);
  });

  it('value with range covers period branch', () => {
    render(() => <Cron value="1-30 0 0 * * ? *" />);
  });

  it('disabled prevents onChange', () => {
    const onChange = jest.fn();

    render(() => <Cron disabled={true} value="0 0 0 * * ? *" onChange={onChange} />);
  });

  it('nts with NaN returns undefined', () => {
    render(() => <Cron value="0 0 0 * * ? *" showCron={true} />);
  });
});
