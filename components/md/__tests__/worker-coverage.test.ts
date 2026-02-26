describe('MD Worker function coverage', () => {
  let capturedBlobContents: string[];
  const origCreateObjectURL = URL.createObjectURL;
  const origRevokeObjectURL = URL.revokeObjectURL;
  const OrigBlob = globalThis.Blob;

  beforeEach(() => {
    capturedBlobContents = [];
    URL.createObjectURL = jest.fn(() => `blob:mock-${capturedBlobContents.length}`);
    URL.revokeObjectURL = jest.fn();

    globalThis.Blob = class FakeBlob extends OrigBlob {
      constructor(parts?: BlobPart[], options?: BlobPropertyBag) {
        super(parts, options);
        if (parts) {
          capturedBlobContents.push(parts.map(String).join(''));
        }
      }
    } as typeof Blob;
  });

  afterEach(() => {
    URL.createObjectURL = origCreateObjectURL;
    URL.revokeObjectURL = origRevokeObjectURL;
    globalThis.Blob = OrigBlob;
  });

  it('executes the worker function body and message handler with all branches', (done) => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { create, dispose } = require('../worker');

      create();
      expect(capturedBlobContents.length).toBeGreaterThanOrEqual(2);

      const workerCode = capturedBlobContents[capturedBlobContents.length - 1];
      let messageHandler: (e: { data: Record<string, unknown> }) => void;
      const mockSelf: Record<string, unknown> = {
        importScripts: jest.fn(),
        postMessage: jest.fn(),
        addEventListener: jest.fn(
          (_event: string, handler: (e: { data: Record<string, unknown> }) => void) => {
            messageHandler = handler;
          },
        ),
        marked: Object.assign((text: string) => `<p>${text}</p>`, {
          Renderer: class {
            katexBlock?: (code: string) => string;
            katexInline?: (code: string) => string;
            image?: (src: string, title: string, alt: string) => string;
            code?: (sourcecode: string, lang: string) => string;
          },
        }),
      };

      const fn = new Function('self', workerCode);

      fn(mockSelf);

      expect(mockSelf.importScripts).toHaveBeenCalled();
      expect(mockSelf.addEventListener).toHaveBeenCalled();

      messageHandler!({
        data: {
          text: '# Hello\n```treeview\nroot/\n```',
          pictureViewer: true,
          lazyPicture: true,
          langToolbar: ['copy'],
          codeTheme: 'dark',
          codeClassic: false,
        },
      });
      expect(mockSelf.postMessage).toHaveBeenCalled();

      messageHandler!({
        data: {
          text: '```js\n<div>test</div>\n```',
          pictureViewer: false,
          lazyPicture: false,
          langToolbar: [],
        },
      });

      messageHandler!({
        data: {
          text: '![img](test.jpg "title")',
          pictureViewer: true,
          lazyPicture: true,
        },
      });

      messageHandler!({
        data: {
          text: '$x^2$\n\n$$y=mx+b$$',
        },
      });

      dispose();
      done();
    });
  });

  it('handles error in marked call', (done) => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { create, dispose } = require('../worker');

      create();
      const workerCode = capturedBlobContents[capturedBlobContents.length - 1];
      let messageHandler: (e: { data: Record<string, unknown> }) => void;
      const mockSelf: Record<string, unknown> = {
        importScripts: jest.fn(),
        postMessage: jest.fn(),
        addEventListener: jest.fn(
          (_event: string, handler: (e: { data: Record<string, unknown> }) => void) => {
            messageHandler = handler;
          },
        ),
        marked: Object.assign(
          () => {
            throw new Error('Parse error');
          },
          {
            Renderer: class {
              katexBlock?: (code: string) => string;
              katexInline?: (code: string) => string;
              image?: (src: string, title: string, alt: string) => string;
              code?: (sourcecode: string, lang: string) => string;
            },
          },
        ),
      };

      const fn = new Function('self', workerCode);

      fn(mockSelf);

      messageHandler!({ data: { text: 'error test' } });
      expect(mockSelf.postMessage).toHaveBeenCalledWith('Parse error');

      dispose();
      done();
    });
  });
});
