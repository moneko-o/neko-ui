if (!CSS.highlights) {
  const store = new Map<string, Highlight>();

  CSS.highlights = {
    get: (key: string) => {
      return (
        store.get(key) ||
        ({
          add: () => {},
          clear: () => {},
        } as unknown as Highlight)
      );
    },
    set: (key: string, value: Highlight) => {
      store.set(key, value);
      return CSS.highlights as unknown as HighlightRegistry;
    },
    keys: () => store.keys(),
    delete: (key: string) => store.delete(key),
    has: (key: string) => store.has(key),
    clear: () => store.clear(),
    forEach: (cb: (value: Highlight, key: string) => void) => store.forEach(cb),
    entries: () => store.entries(),
    values: () => store.values(),
    size: store.size,
    [Symbol.iterator]: () => store[Symbol.iterator](),
  } as unknown as HighlightRegistry;
}
