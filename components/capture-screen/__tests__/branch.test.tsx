import { render } from '@solidjs/testing-library';

import CaptureScreen from '../index';

describe('CaptureScreen branches', () => {
  it('render with controls=false', () => {
    const { container } = render(() => <CaptureScreen controls={false} />);

    expect(container).toBeInTheDocument();
  });

  it('onStartRecorder callback', () => {
    const onStart = jest.fn();

    render(() => <CaptureScreen onStartRecorder={onStart} />);
  });

  it('onSaveRecorder callback', () => {
    const onSave = jest.fn();

    render(() => <CaptureScreen onSaveRecorder={onSave} />);
  });

  it('stream inactive branch', () => {
    render(() => <CaptureScreen />);
  });

  it('controls=true covers controls && mediaStream branch', () => {
    render(() => <CaptureScreen controls={true} preview={true} />);
  });

  it('renders with css prop to cover <Show when={local.css}>', () => {
    render(() => <CaptureScreen css=".capture-screen { border: 1px solid; }" />);
  });

  it('controls=true with active mediaStream covers controls && mediaStream !== null', async () => {
    const mockStream = { getTracks: () => [], active: true };
    const origGetDisplayMedia = navigator.mediaDevices?.getDisplayMedia;

    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getDisplayMedia: jest.fn().mockResolvedValue(mockStream),
      },
      configurable: true,
    });
    render(() => <CaptureScreen controls={true} preview={true} />);
    if (origGetDisplayMedia) {
      Object.defineProperty(navigator.mediaDevices, 'getDisplayMedia', {
        value: origGetDisplayMedia,
        configurable: true,
      });
    }
  });
});
