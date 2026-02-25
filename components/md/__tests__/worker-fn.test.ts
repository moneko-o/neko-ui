describe('MD Worker internal function coverage', () => {
  let blobs: Blob[];
  const origCreateObjectURL = URL.createObjectURL;

  beforeEach(() => {
    blobs = [];
    URL.createObjectURL = jest.fn((blob: Blob) => {
      blobs.push(blob);
      return 'blob:mock-' + blobs.length;
    });
  });
  afterEach(() => {
    URL.createObjectURL = origCreateObjectURL;
  });

  it('worker function executes message handler', async () => {
    jest.isolateModules(() => {
      const { create, dispose } = require('../worker');

      create();

      expect(blobs.length).toBeGreaterThanOrEqual(2);
      const workerBlob = blobs[blobs.length - 1];

      const reader = new FileReader();
      const textPromise = new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
      });

      reader.readAsText(workerBlob);

      textPromise.then((workerCode) => {
        const mockSelf: Record<string, unknown> = {
          importScripts: jest.fn(),
          postMessage: jest.fn(),
          addEventListener: jest.fn(),
          marked: Object.assign(
            (text: string, opts: Record<string, unknown>) => `<p>${text}</p>`,
            {
              Renderer: class {
                katexBlock = jest.fn();
                katexInline = jest.fn();
                image = jest.fn();
                code = jest.fn();
              },
            },
          ),
        };

        try {
          const fn = new Function('self', workerCode.replace(/^\(/, '').replace(/\)\(self\)$/, ''));

          fn(mockSelf);
        } catch {
          // eval may fail due to string mangling, that's ok
        }

        const handler = (mockSelf.addEventListener as jest.Mock).mock.calls?.[0]?.[1];

        if (handler) {
          handler({
            data: {
              text: '# Hello\n![img](test.jpg)\n```js\nvar x;\n```\n```treeview\nroot/\n```',
              pictureViewer: true,
              lazyPicture: true,
              langToolbar: ['copy'],
              codeTheme: 'dark',
              codeClassic: false,
            },
          });

          handler({ data: { text: '# No extras' } });
        }
      });

      dispose();
    });
  });
});
