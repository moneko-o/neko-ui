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
});
