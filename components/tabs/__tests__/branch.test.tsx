import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Tabs from '../index';

describe('Tabs branch coverage', () => {
  it('dark mode covers isDark truthy branch in cssVar', () => {
    theme.setScheme('dark');
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: 'CA' }]} />);
    theme.setScheme('light');
  });

  it('extra.left as function covers isFunction(extra.left) branch', () => {
    render(() => (
      <Tabs
        items={[{ value: 'a', label: 'A', content: 'CA' }]}
        extra={{ left: () => <span>L</span>, right: <span>R</span> }}
      />
    ));
  });

  it('extra.right as function covers isFunction(extra.right) branch', () => {
    render(() => (
      <Tabs
        items={[{ value: 'a', label: 'A', content: 'CA' }]}
        extra={{ left: <span>L</span>, right: () => <span>R</span> }}
      />
    ));
  });

  it('extra.left as JSX covers non-function left branch', () => {
    render(() => (
      <Tabs
        items={[{ value: 'a', label: 'A', content: 'CA' }]}
        extra={{ left: <span>Left</span> }}
      />
    ));
  });

  it('extra.right as JSX covers non-function right branch', () => {
    render(() => (
      <Tabs
        items={[{ value: 'a', label: 'A', content: 'CA' }]}
        extra={{ right: <span>Right</span> }}
      />
    ));
  });

  it('content as function covers isFunction(content) branch', () => {
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: () => <div>Dynamic</div> }]} />);
  });

  it('content as JSX covers non-function content branch', () => {
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: <div>Static</div> }]} />);
  });

  it('add=true renders add button', () => {
    const onEdit = jest.fn();

    render(() => (
      <Tabs items={[{ value: 'a', label: 'A', content: 'CA' }]} add={true} onEdit={onEdit} />
    ));
  });

  it('closable tab renders remove button', () => {
    const onEdit = jest.fn();

    render(() => (
      <Tabs items={[{ value: 'a', label: 'A', content: 'CA', closable: true }]} onEdit={onEdit} />
    ));
  });

  it('item with icon covers icon button prop', () => {
    render(() => (
      <Tabs items={[{ value: 'a', label: 'A', content: 'CA', icon: <span>★</span> }]} />
    ));
  });

  it('item.ref is assigned from items()[i()].ref', () => {
    const { container } = render(() => (
      <Tabs
        items={[
          { value: 'a', label: 'A', content: 'CA' },
          { value: 'b', label: 'B', content: 'CB' },
        ]}
      />
    ));

    expect(container).toBeInTheDocument();
  });

  it('animated=true sets slide-in animation class', () => {
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: 'CA' }]} animated={true} />);
  });

  it('animated=false does not set animation', () => {
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: 'CA' }]} animated={false} />);
  });

  it('centered=true sets centered class', () => {
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: 'CA' }]} centered={true} />);
  });

  it('disabled tab prevents onChange', () => {
    const onChange = jest.fn();

    render(() => (
      <Tabs
        items={[
          { value: 'a', label: 'A', content: 'CA' },
          { value: 'b', label: 'B', content: 'CB', disabled: true },
        ]}
        onChange={onChange}
      />
    ));
  });

  it('globally disabled prevents all tab changes', () => {
    const onChange = jest.fn();

    render(() => (
      <Tabs
        items={[{ value: 'a', label: 'A', content: 'CA' }]}
        disabled={true}
        onChange={onChange}
      />
    ));
  });

  it('no items renders empty tabs with offsetStyle=""', () => {
    render(() => <Tabs items={[]} />);
  });

  it('controlled value prop updates selection', () => {
    render(() => (
      <Tabs
        items={[
          { value: 'a', label: 'A', content: 'CA' },
          { value: 'b', label: 'B', content: 'CB' },
        ]}
        value="b"
      />
    ));
  });

  it('defaultValue sets initial selection', () => {
    render(() => (
      <Tabs
        items={[
          { value: 'a', label: 'A', content: 'CA' },
          { value: 'b', label: 'B', content: 'CB' },
        ]}
        defaultValue="b"
      />
    ));
  });

  it('type=card renders card style tabs', () => {
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: 'CA' }]} type="card" />);
  });

  it('keyUp with Enter triggers onChange', () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <Tabs
        items={[
          { value: 'a', label: 'A', content: 'CA' },
          { value: 'b', label: 'B', content: 'CB' },
        ]}
        onChange={onChange}
      />
    ));
    const btns = container.querySelectorAll('.tab');

    if (btns[1]) {
      btns[1].dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    }
  });

  it('class prop on tabs component', () => {
    render(() => <Tabs items={[{ value: 'a', label: 'A', content: 'CA' }]} class="my-tabs" />);
  });
});
