if (!CSS.highlights) {
  CSS.highlights = {
    get: () => {
      return {
        add: () => {},
      } as unknown as Highlight;
    },
    set: () => CSS.highlights as unknown as HighlightRegistry,
    keys: () => [][Symbol.iterator](),
    delete: () => false,
    has: () => false,
    clear: () => {},
    forEach: () => {},
    entries: () => [][Symbol.iterator](),
    values: () => [][Symbol.iterator](),
    size: 0,
  } as unknown as HighlightRegistry;
}
