import { render } from '@solidjs/testing-library';

import Tree from '../index';

describe('Tree layout direct render', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(performance.now());
      return 0;
    });
    let callIdx = 0;

    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      callIdx++;
      return {
        width: 200,
        height: 30,
        top: callIdx * 35,
        left: 0,
        right: 200,
        bottom: callIdx * 35 + 30,
        x: 0,
        y: callIdx * 35,
        toJSON: () => {},
      };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('exercises frameCallback layout with nested data', () => {
    const data = [
      {
        title: 'A',
        key: 'a',
        children: [
          { title: 'A1', key: 'a1' },
          { title: 'A2', key: 'a2' },
        ],
      },
      {
        title: 'B',
        key: 'b',
        children: [{ title: 'B1', key: 'b1' }],
      },
    ];

    render(() => <Tree data={data} />);
  });

  it('layout with single child at index 0', () => {
    render(() => <Tree data={[{ title: 'X', key: 'x', children: [{ title: 'Y', key: 'y' }] }]} />);
  });

  it('layout with size=large', () => {
    render(() => (
      <Tree
        data={[{ title: 'R', key: 'r', children: [{ title: 'C', key: 'c' }] }]}
        size="large"
      />
    ));
  });
});
