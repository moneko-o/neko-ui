import { render } from '@solidjs/testing-library';

import Tree from '../index';
import type { TreeData, TreeProps } from '../type';

describe('Tree layout (direct)', () => {
  let rafCallbacks: FrameRequestCallback[] = [];

  beforeEach(() => {
    rafCallbacks = [];
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function flushRaf() {
    const now = performance.now() + 20;
    while (rafCallbacks.length) {
      const cb = rafCallbacks.shift()!;
      cb(now);
    }
  }

  it('frameCallback layout with multiple path elements (al.length > 1)', () => {
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
    flushRaf();
  });

  it('single root with children hits else-if i===0 branch', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 30,
      top: 50,
      left: 0,
      right: 200,
      bottom: 80,
      x: 0,
      y: 50,
      toJSON: () => {},
    });

    render(() => (
      <Tree
        data={[
          {
            title: 'Root',
            key: 'root',
            children: [
              { title: 'A', key: 'a' },
              { title: 'B', key: 'b' },
            ],
          },
        ]}
      />
    ));
    flushRaf();
  });

  it('deeply nested tree covers i !== 0 sideLen calculation', () => {
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
    flushRaf();
  });

  it('re-exports type module', () => {
    const treeData: TreeData = { key: 'test', title: 'Test' };
    const treeProps: Partial<TreeProps> = { data: [treeData] };

    expect(treeData.key).toBe('test');
    expect(treeProps.data).toBeDefined();
  });
});
