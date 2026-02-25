import { create, dispose } from '../worker';

describe('MD Worker', () => {
  it('create and dispose lifecycle', () => {
    const url = create();

    expect(typeof url).toBe('string');

    const url2 = create();

    expect(url2).toBe(url);

    const empty1 = dispose();

    expect(empty1).toBe(false);

    const empty2 = dispose();

    expect(empty2).toBe(true);
  });
});
