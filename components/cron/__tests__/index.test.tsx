import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Cron', () => {
  it('basic render with default value and tab switching', () => {
    const change = jest.fn();
    const defaultValue = '0,1 * 0#1 * * ? 2023/1';
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value={defaultValue} onChange={change} />
    ));

    expect(screen.getByShadowText(defaultValue)).toBeInTheDocument();
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    expect(tabs?.querySelector('.tabs.line')).toBeInTheDocument();

    tabs!.querySelectorAll('.tab').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
      tabs!
        .querySelector('n-radio')!
        .shadowRoot!.querySelectorAll('.item')
        .forEach((r) => {
          fireEvent.click(r as unknown as HTMLElement);
        });
    });

    expect(change).toHaveBeenCalled();
  });

  it('card type', () => {
    const { getByTestId } = render(() => <n-cron data-testid="tabs" type="card" />);
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs') as unknown as HTMLElement;

    expect(tabs.shadowRoot?.querySelector('.tabs.card')).toBeInTheDocument();
  });

  it('show-cron=false hides cron expression', () => {
    render(() => <n-cron value="0-1 * 0-1 * * ? 2023/1" show-cron={false} />);

    expect(() => {
      screen.getByShadowText('0-1 * 0-1 * * ? 2023/1');
    }).toThrow('');
  });

  it('value with space', () => {
    render(() => <n-cron value=" " show-cron={false} />);
  });

  it('parses period expression', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0-5 1-30 2-10 1-15 1-6 ? *" />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    tabs!.querySelectorAll('.tab').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
    });
    expect(getByTestId('tabs')).toBeInTheDocument();
  });

  it('parses beginInterval expression', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0/5 0/10 0/2 1/5 1/3 ? 2024/1" />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    tabs!.querySelectorAll('.tab').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
    });
    expect(getByTestId('tabs')).toBeInTheDocument();
  });

  it('parses some expression', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0,1,2 5,10 1,2,3 1,15 1,6 ? 2024,2025" />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    tabs!.querySelectorAll('.tab').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
    });
    expect(getByTestId('tabs')).toBeInTheDocument();
  });

  it('parses week with hash (beginInterval)', () => {
    const { container } = render(() => <n-cron default-value="* * * ? * 1#2 *" />);

    expect(container).toBeInTheDocument();
  });

  it('parses day with closeWorkDay (W)', () => {
    const { container } = render(() => <n-cron default-value="* * * 15W * ? *" />);

    expect(container).toBeInTheDocument();
  });

  it('parses day with last (L)', () => {
    const { container } = render(() => <n-cron default-value="* * * L * ? *" />);

    expect(container).toBeInTheDocument();
  });

  it('parses week with last (L)', () => {
    const { container } = render(() => <n-cron default-value="* * * ? * 1L *" />);

    expect(container).toBeInTheDocument();
  });

  it('parses single number as some', () => {
    const { container } = render(() => <n-cron default-value="5 10 3 1 6 ? 2024" />);

    expect(container).toBeInTheDocument();
  });

  it('disabled state prevents changes', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" disabled={true} default-value="0 0 0 * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    tabs!.querySelectorAll('.tab').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
      tabs!
        .querySelector('n-radio')!
        .shadowRoot!.querySelectorAll('.item')
        .forEach((r) => {
          fireEvent.click(r as unknown as HTMLElement);
        });
    });
  });

  it('excludes certain tabs', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" exclude={['second', 'year']} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;
    const tabBtns = tabs!.querySelectorAll('.tab');

    expect(tabBtns.length).toBe(5);
  });

  it('value update from outside (controlled)', () => {
    const { container } = render(() => <n-cron value="0-5 0/10 1,2 15W 1-6 1#2 2024/1" />);

    expect(container).toBeInTheDocument();
  });

  it('all cron types formatting', () => {
    const { container } = render(() => <n-cron default-value="0-5 0/10 1,2 L 1-6 1#2 2024" />);

    expect(container).toBeInTheDocument();

    render(() => <n-cron default-value="* * * 1W * 1L *" />);
  });

  it('interacts with period selects on second tab', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0-5 * * * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[1] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 2) {
      (selects[0] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [3, { value: 3, label: '03' }] }),
      );
      (selects[1] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [10, { value: 10, label: '10' }] }),
      );
    }
  });

  it('interacts with beginInterval selects on second tab', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0/5 * * * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[2] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 4) {
      (selects[2] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [2, { value: 2, label: '02' }] }),
      );
      (selects[3] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [10, { value: 10, label: '10' }] }),
      );
    }
  });

  it('interacts with some select on second tab', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0,1,2 * * * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');
    const someSelect = selects[selects.length - 1] as unknown as HTMLElement;

    if (someSelect) {
      someSelect.dispatchEvent(
        new CustomEvent('change', { detail: [[0, 1, 2, 3], { value: 3, label: '03' }] }),
      );
    }
  });

  it('some select ignores empty value array', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0,1 * * * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');
    const someSelect = selects[selects.length - 1] as unknown as HTMLElement;

    if (someSelect) {
      someSelect.dispatchEvent(
        new CustomEvent('change', { detail: [[], { value: 0, label: '00' }] }),
      );
    }
  });

  it('interacts with day tab closeWorkDay select', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * 15W * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[3] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[5] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 5) {
      (selects[4] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [10, { value: 10, label: '10' }] }),
      );
    }
  });

  it('day closeWorkDay select with invalid value', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * 15W * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[3] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[5] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 5) {
      (selects[4] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [100, { value: 100, label: '100' }] }),
      );
    }
  });

  it('interacts with day tab radio options and period', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * 1-15 * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[3] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;
    const items = radioRoot.querySelectorAll('.item');

    fireEvent.click(items[0] as unknown as HTMLElement);
    fireEvent.click(items[1] as unknown as HTMLElement);
    fireEvent.click(items[2] as unknown as HTMLElement);
    fireEvent.click(items[3] as unknown as HTMLElement);
    fireEvent.click(items[4] as unknown as HTMLElement);
    fireEvent.click(items[5] as unknown as HTMLElement);
    fireEvent.click(items[6] as unknown as HTMLElement);
  });

  it('interacts with week tab radio options', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * ? * 1#2 *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[4] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;
    const items = radioRoot.querySelectorAll('.item');

    fireEvent.click(items[0] as unknown as HTMLElement);
    fireEvent.click(items[1] as unknown as HTMLElement);
    fireEvent.click(items[2] as unknown as HTMLElement);
    fireEvent.click(items[3] as unknown as HTMLElement);
    fireEvent.click(items[4] as unknown as HTMLElement);
    fireEvent.click(items[5] as unknown as HTMLElement);
  });

  it('week last select change', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * ? * 1L *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[4] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[4] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 5) {
      (selects[4] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [3, { value: 3, label: '星期二' }] }),
      );
    }
  });

  it('interacts with month tab options', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * * 1-6 ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[5] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;
    const items = radioRoot.querySelectorAll('.item');

    fireEvent.click(items[0] as unknown as HTMLElement);
    fireEvent.click(items[1] as unknown as HTMLElement);
    fireEvent.click(items[2] as unknown as HTMLElement);
    fireEvent.click(items[3] as unknown as HTMLElement);
  });

  it('interacts with year tab options', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value={`* * * * * ? ${fullYear}/${1}`} onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[6] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;
    const items = radioRoot.querySelectorAll('.item');

    fireEvent.click(items[0] as unknown as HTMLElement);
    fireEvent.click(items[1] as unknown as HTMLElement);
    fireEvent.click(items[2] as unknown as HTMLElement);
    fireEvent.click(items[3] as unknown as HTMLElement);
    fireEvent.click(items[4] as unknown as HTMLElement);
  });

  it('year select and input-number interactions', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value={`* * * * * ? ${fullYear}/1`} onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[6] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 3) {
      (selects[2] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', {
          detail: [fullYear + 1, { value: fullYear + 1, label: `${fullYear + 1}` }],
        }),
      );
    }

    const inputNumbers = radioRoot.querySelectorAll('n-input-number');

    inputNumbers.forEach((inp) => {
      (inp as unknown as HTMLElement).dispatchEvent(new CustomEvent('change', { detail: 2 }));
    });
  });

  it('year input-number with zero value (invalid)', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value={`* * * * * ? ${fullYear}/1`} onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[6] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const inputNumbers = radioRoot.querySelectorAll('n-input-number');

    inputNumbers.forEach((inp) => {
      (inp as unknown as HTMLElement).dispatchEvent(new CustomEvent('change', { detail: 0 }));
    });
  });

  it('year select with invalid year', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value={`* * * * * ? ${fullYear}/1`} onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[6] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length) {
      (selects[0] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [1900, { value: 1900, label: '1900' }] }),
      );
    }
  });

  it('interacts with hour tab', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * 2-10 * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[2] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;
    const items = radioRoot.querySelectorAll('.item');

    fireEvent.click(items[0] as unknown as HTMLElement);
    fireEvent.click(items[1] as unknown as HTMLElement);
    fireEvent.click(items[2] as unknown as HTMLElement);
    fireEvent.click(items[3] as unknown as HTMLElement);
  });

  it('interacts with minute tab', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* 1-30 * * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[1] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;
    const items = radioRoot.querySelectorAll('.item');

    fireEvent.click(items[0] as unknown as HTMLElement);
    fireEvent.click(items[1] as unknown as HTMLElement);
    fireEvent.click(items[2] as unknown as HTMLElement);
    fireEvent.click(items[3] as unknown as HTMLElement);
  });

  it('day and week mutual exclusion (prefixWeekDay)', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * ? * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;
    const tabBtns = tabs!.querySelectorAll('.tab');

    fireEvent.click(tabBtns[3] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[0] as unknown as HTMLElement);

    fireEvent.click(tabBtns[4] as unknown as HTMLElement);

    const weekRadio = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(weekRadio.querySelectorAll('.item')[0] as unknown as HTMLElement);
  });

  it('onChange start/end constraint adjusts values', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0-1 * * * * ? *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[1] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 2) {
      (selects[1] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [1, { value: 1, label: '01' }] }),
      );
      (selects[0] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [5, { value: 5, label: '05' }] }),
      );
    }
  });

  it('period validation rejects out-of-range values', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0-5 * * * * ? *" />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[1] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 2) {
      (selects[0] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [100, { value: 100, label: '100' }] }),
      );
    }
  });

  it('beginInterval validation rejects invalid values', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0/5 * * * * ? *" />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[0] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[2] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 4) {
      (selects[2] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [100, { value: 100, label: '100' }] }),
      );
    }
  });

  it('week beginInterval validation', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * ? * 1#2 *" />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[4] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[3] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 4) {
      (selects[2] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [5, { value: 5, label: '5周' }] }),
      );
      (selects[3] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [3, { value: 3, label: '星期二' }] }),
      );
    }
  });

  it('dispatches period select changes on all tabs to cover validate callbacks', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="0-5 1-30 2-10 1-15 1-6 1-5 *" onChange={change} />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;
    const tabBtns = tabs!.querySelectorAll('.tab');

    [0, 1, 2, 3, 4, 5].forEach((tabIdx) => {
      fireEvent.click(tabBtns[tabIdx] as unknown as HTMLElement);

      const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

      fireEvent.click(radioRoot.querySelectorAll('.item')[1] as unknown as HTMLElement);

      const selects = radioRoot.querySelectorAll('n-select');

      if (selects.length >= 2) {
        (selects[0] as unknown as HTMLElement).dispatchEvent(
          new CustomEvent('change', { detail: [2, { value: 2, label: '02' }] }),
        );
        (selects[1] as unknown as HTMLElement).dispatchEvent(
          new CustomEvent('change', { detail: [5, { value: 5, label: '05' }] }),
        );
      }
    });
  });

  it('dispatches beginInterval select changes on all tabs', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron
        data-testid="tabs"
        default-value={`0/5 0/10 0/2 1/5 1/3 1#2 ${fullYear}/1`}
        onChange={change}
      />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;
    const tabBtns = tabs!.querySelectorAll('.tab');

    [0, 1, 2, 3, 5].forEach((tabIdx) => {
      fireEvent.click(tabBtns[tabIdx] as unknown as HTMLElement);

      const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

      fireEvent.click(radioRoot.querySelectorAll('.item')[2] as unknown as HTMLElement);

      const selects = radioRoot.querySelectorAll('n-select');

      if (selects.length >= 4) {
        (selects[2] as unknown as HTMLElement).dispatchEvent(
          new CustomEvent('change', { detail: [3, { value: 3, label: '03' }] }),
        );
        (selects[3] as unknown as HTMLElement).dispatchEvent(
          new CustomEvent('change', { detail: [8, { value: 8, label: '08' }] }),
        );
      }
    });
  });

  it('dispatches some select changes on day/week/month/year tabs', () => {
    const change = jest.fn();
    const fullYear = new Date().getFullYear();
    const { getByTestId } = render(() => (
      <n-cron
        data-testid="tabs"
        default-value={`0,1 5,10 1,2 1,15 1,6 1,3 ${fullYear},${fullYear + 1}`}
        onChange={change}
      />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;
    const tabBtns = tabs!.querySelectorAll('.tab');

    [3, 4, 5, 6].forEach((tabIdx) => {
      fireEvent.click(tabBtns[tabIdx] as unknown as HTMLElement);

      const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;
      const items = radioRoot.querySelectorAll('.item');
      const lastItem = items[items.length - 1] as unknown as HTMLElement;

      fireEvent.click(lastItem);

      const selects = radioRoot.querySelectorAll('n-select');
      const someSelect = selects[selects.length - 1] as unknown as HTMLElement;

      if (someSelect) {
        someSelect.dispatchEvent(
          new CustomEvent('change', {
            detail: [[1, 2, 3], { value: 3, label: '03' }],
          }),
        );
      }
    });
  });

  it('week last select and day last rendering', () => {
    const { getByTestId } = render(() => (
      <n-cron data-testid="tabs" default-value="* * * L * 1L *" />
    ));
    const tabs = getByTestId('tabs').shadowRoot?.querySelector('n-tabs')?.shadowRoot;

    fireEvent.click(tabs!.querySelectorAll('.tab')[4] as unknown as HTMLElement);

    const radioRoot = tabs!.querySelector('n-radio')!.shadowRoot!;

    fireEvent.click(radioRoot.querySelectorAll('.item')[4] as unknown as HTMLElement);

    const selects = radioRoot.querySelectorAll('n-select');

    if (selects.length >= 5) {
      (selects[4] as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('change', { detail: [5, { value: 5, label: '星期四' }] }),
      );
    }
  });
});
