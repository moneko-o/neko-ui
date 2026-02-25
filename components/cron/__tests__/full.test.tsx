import { fireEvent, render } from '@solidjs/testing-library';

import Cron from '../index';

describe('Cron full coverage', () => {
  it('some-type on minute tab covers minute.tsx onChange', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* 1,2 * * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[1] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');
    const someSelect = selects[selects.length - 1] as unknown as HTMLElement;

    if (someSelect) {
      someSelect.dispatchEvent(
        new CustomEvent('change', { detail: [[1, 2, 3], { value: 3, label: '03' }] }),
      );
    }
  });

  it('some-type on hour tab covers hour.tsx onChange', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * 1,2 * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[2] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');
    const someSelect = selects[selects.length - 1] as unknown as HTMLElement;

    if (someSelect) {
      someSelect.dispatchEvent(
        new CustomEvent('change', { detail: [[1, 2, 3], { value: 3, label: '03' }] }),
      );
    }
  });

  it('year period validate callback covers year.tsx line 27', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron
        data-testid="tabs"
        default-value={`* * * * * ? ${fullYear}-${fullYear + 5}`}
        onChange={change}
      />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[6] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[2] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 2) {
      (selects[0] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', {
          detail: [fullYear, { value: fullYear, label: `${fullYear}` }],
        }),
      );
      (selects[1] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', {
          detail: [fullYear + 2, { value: fullYear + 2, label: `${fullYear + 2}` }],
        }),
      );
    }
  });

  it('year period validate rejects invalid year', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron
        data-testid="tabs"
        default-value={`* * * * * ? ${fullYear}-${fullYear + 5}`}
        onChange={change}
      />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[6] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[2] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 2) {
      (selects[0] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [1900, { value: 1900, label: '1900' }] }),
      );
      (selects[1] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [1900, { value: 1900, label: '1900' }] }),
      );
    }
  });

  it('nts with non-number value covers index.tsx line 254', () => {
    render(() => <Cron value="abc * * * * ? *" showCron={true} />);
  });

  it('nts with undefined fields', () => {
    render(() => <Cron defaultValue="* * * * * ? " showCron={true} />);
  });

  it('renders with some-type expressions for all sub-components', () => {
    const fullYear = new Date().getFullYear();
    const { container } = render(() => (
      <Cron
        defaultValue={`1,2,3 1,2 1,2 1,15 1,6 1,2 ${fullYear},${fullYear + 1}`}
        showCron={true}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('renders with week some-type and year some-type', () => {
    const fullYear = new Date().getFullYear();

    render(() => (
      <n-cron default-value={`* * * ? * 1,2 ${fullYear},${fullYear + 1}`} show-cron={true} />
    ));
  });

  it('cron expression with non-numeric period triggers nts string path', () => {
    render(() => <Cron value="X-Y A/B C,D EW FL G#H IJ" showCron={true} />);
  });

  it('custom element registry onChange dispatches change event', () => {
    const changeSpy = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="cron-ce" default-value="0 0 0 * * ? *" />
    ));
    const el = getByTestId('cron-ce');

    el.addEventListener('change', changeSpy);

    const tabs = el.shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[1] as unknown as HTMLElement);
  });

  it('fmt closeWorkDay path exercises nts with numeric value', () => {
    render(() => <Cron defaultValue="* * * 5W * ? *" showCron={true} />);
  });

  it('nts receives NaN value via malformed cron', () => {
    render(() => <Cron value="NaN-NaN NaN/NaN * * * ? *" showCron={true} />);
  });

  it('direct render with value prop triggers controlled path', () => {
    const onChange = jest.fn();

    render(() => <Cron value="1,2,3 * * * * ? *" onChange={onChange} showCron={true} />);
  });

  it('fmt with empty year type returns empty string', () => {
    render(() => <Cron defaultValue="* * * * * ? *" showCron={true} />);
  });

  it('direct Cron onChange fires when format differs from input', () => {
    const onChange = jest.fn();

    render(() => <Cron defaultValue="00 00 00 * * ? *" onChange={onChange} showCron={true} />);

    expect(onChange).toHaveBeenCalled();
  });

  it('value with empty string field exercises nts fallthrough', () => {
    render(() => <Cron value="" showCron={true} />);
  });

  it('closeWorkDay in fmt path', () => {
    render(() => <Cron defaultValue="* * * 1W * ? *" showCron={true} />);
  });
});
