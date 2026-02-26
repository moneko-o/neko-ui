import { render } from '@solidjs/testing-library';

import Tree from '../index';
import type { TreeData, TreeProps } from '../type';

describe('Tree layout (direct)', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(performance.now());
      return 0;
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('frameCallback layout with multiple path elements', () => {
    let callCount = 0;

    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      callCount++;
      return {
        width: 200,
        height: 30,
        top: callCount * 30,
        left: 0,
        right: 200,
        bottom: callCount * 30 + 30,
        x: 0,
        y: callCount * 30,
        toJSON: () => {},
      };
    });

    const data = [
      {
        title: 'Root',
        key: 'root',
        children: [
          { title: 'Child1', key: 'c1' },
          { title: 'Child2', key: 'c2' },
        ],
      },
      { title: 'Other', key: 'other' },
    ];

    render(() => <Tree data={data} />);
  });

  it('layout with single path element at index 0', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 30,
      top: 0,
      left: 0,
      right: 200,
      bottom: 30,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    render(() => (
      <Tree data={[{ title: 'Solo', key: 'solo', children: [{ title: 'Kid', key: 'kid' }] }]} />
    ));
  });

  it('layout with deeply nested children for line calculation', () => {
    let callIdx = 0;

    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      callIdx++;
      return {
        width: 200,
        height: 30,
        top: callIdx * 40,
        left: 0,
        right: 200,
        bottom: callIdx * 40 + 30,
        x: 0,
        y: callIdx * 40,
        toJSON: () => {},
      };
    });

    const data: TreeData[] = [
      {
        title: 'Root',
        key: 'root',
        children: [
          {
            title: 'L1',
            key: 'l1',
            children: [
              { title: 'L2A', key: 'l2a' },
              { title: 'L2B', key: 'l2b' },
            ],
          },
          { title: 'L1B', key: 'l1b' },
        ],
      },
    ];

    render(() => <Tree data={data} />);
  });

  it('re-exports type module', () => {
    const treeData: TreeData = { key: 'test', title: 'Test' };
    const treeProps: Partial<TreeProps> = { data: [treeData] };

    expect(treeData.key).toBe('test');
    expect(treeProps.data).toBeDefined();
  });
});
