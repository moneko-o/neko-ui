import fromSchema from '../index';

describe('fromSchema branches', () => {
  it('schema with no properties returns empty array', () => {
    const result = fromSchema({ type: 'object' });

    expect(result).toEqual([]);
  });

  it('schema with nested array items', () => {
    const result = fromSchema({
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          title: 'Tags',
          items: {
            type: 'string',
          },
        },
      },
    });

    expect(result.length).toBe(1);
  });

  it('schema with deeply nested properties', () => {
    const result = fromSchema({
      type: 'object',
      properties: {
        user: {
          type: 'object',
          title: 'User',
          properties: {
            name: { type: 'string', title: 'Name' },
          },
        },
      },
    });

    expect(result.length).toBe(1);
    expect(result[0].children?.length).toBe(1);
  });
});
