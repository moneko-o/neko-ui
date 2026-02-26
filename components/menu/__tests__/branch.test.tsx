import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Menu from '../index';

describe('Menu branch coverage', () => {
  it('dark mode covers isDark() truthy branch in cssVar', () => {
    theme.setScheme('dark');
    render(() => <Menu items={['A', 'B']} />);
    theme.setScheme('light');
  });

  it('light mode covers isDark() falsy branch in cssVar', () => {
    theme.setScheme('light');
    render(() => <Menu items={['A', 'B']} />);
  });

  it('sub-menu with children covers Child component and ref el', () => {
    render(() => (
      <Menu
        items={[
          {
            label: 'Parent',
            value: 'parent',
            children: [
              {
                label: 'Group',
                options: [{ label: 'Leaf', value: 'leaf' }],
              },
            ],
          },
        ]}
        openKeys={['parent']}
      />
    ));
  });

  it('renders with class prop covers section class', () => {
    render(() => <Menu items={['A']} class="my-menu" />);
  });

  it('sub-menu renders with open state covers show() truthy branch', () => {
    const { container } = render(() => (
      <Menu
        items={[
          {
            label: 'Sub',
            value: 'sub',
            children: [
              {
                label: 'G',
                options: [{ label: 'L', value: 'l' }],
              },
            ],
          },
        ]}
        openKeys={['sub']}
      />
    ));
    const subChildren = container.querySelector('.sub-menu-children');

    expect(subChildren).toBeTruthy();
  });
});
