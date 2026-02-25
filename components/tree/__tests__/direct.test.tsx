import { render } from '@solidjs/testing-library';

import Tree from '../index';

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
});
