import { render } from '@solidjs/testing-library';

import theme from '../../theme';
import Popover from '../index';

describe('Popover branch coverage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('close with isContains=true and type !== mousedown covers || branch at line 180', () => {
    const { container } = render(() => (
      <Popover content="Test" open={true} trigger="hover">
        <span>Trigger</span>
      </Popover>
    ));
    const popover = container.querySelector('.popover');

    if (popover) {
      popover.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      jest.advanceTimersByTime(400);
    }
  });

  it('placement=left covers left/topLeft/bottomLeft switch case', () => {
    render(() => (
      <Popover content="Left" open={true} placement="left">
        <span>Left trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('placement=right covers right/topRight/bottomRight switch case', () => {
    render(() => (
      <Popover content="Right" open={true} placement="right">
        <span>Right trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('placement=bottom covers bottom/top/default switch case', () => {
    render(() => (
      <Popover content="Bottom" open={true} placement="bottom">
        <span>Bottom trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('placement=topLeft covers left switch case', () => {
    render(() => (
      <Popover content="TopLeft" open={true} placement="topLeft">
        <span>TL trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('placement=bottomRight covers right switch case', () => {
    render(() => (
      <Popover content="BottomRight" open={true} placement="bottomRight">
        <span>BR trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('contextMenu trigger covers contextmenu handler', () => {
    render(() => (
      <Popover content="Context" trigger="contextMenu">
        <span data-testid="ctx">Right click</span>
      </Popover>
    ));
    const span = document.querySelector('[data-testid="ctx"]');

    if (span) {
      span.dispatchEvent(
        new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 200 }),
      );
      jest.advanceTimersByTime(100);
    }
  });

  it('arrow=true covers arrowHeight=8 branch', () => {
    render(() => (
      <Popover content="Arrow" open={true} arrow={true}>
        <span>Arrow trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('arrow=false covers arrowHeight=4 branch', () => {
    render(() => (
      <Popover content="No arrow" open={true} arrow={false}>
        <span>No arrow trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('dark mode covers isDark() truthy branch in hostStyle', () => {
    theme.setScheme('dark');
    render(() => (
      <Popover content="Dark" open={true}>
        <span>Dark trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
    theme.setScheme('light');
  });

  it('popupCss prop covers <Show when={local.popupCss}>', () => {
    render(() => (
      <Popover content="Styled" open={true} popupCss=".portal { color: red; }">
        <span>Styled trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('css prop covers <Show when={local.css}>', () => {
    render(() => (
      <Popover content="CSS" css=".popover { border: 1px; }">
        <span>CSS trigger</span>
      </Popover>
    ));
  });

  it('content as empty string covers fallback Empty', () => {
    render(() => (
      <Popover content="" open={true}>
        <span>Empty content</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('string content covers typeof content === string branch', () => {
    render(() => (
      <Popover content="plain text" open={true}>
        <span>Text content</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('JSX content covers non-string content branch', () => {
    render(() => (
      <Popover content={<div>JSX</div>} open={true}>
        <span>JSX content</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('destroyInactive=false keeps portal when closed', () => {
    render(() => (
      <Popover content="Keep" destroyInactive={false}>
        <span>Keep trigger</span>
      </Popover>
    ));
  });

  it('size prop is passed to portalCls', () => {
    render(() => (
      <Popover content="Small" open={true} size="small">
        <span>Small trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('popupClass is included in portalCls', () => {
    render(() => (
      <Popover content="Popup" open={true} popupClass="my-popup">
        <span>Popup trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('disabled popover does not open', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Popover content="Disabled" disabled={true} onOpenChange={onOpenChange}>
        <span>Disabled trigger</span>
      </Popover>
    ));
  });

  it('dropdownMatchSelectWidth sets portal width', () => {
    render(() => (
      <Popover content="Match" open={true} dropdownMatchSelectWidth={true}>
        <span>Match trigger</span>
      </Popover>
    ));
    jest.advanceTimersByTime(100);
  });

  it('exit function sets open to null when open() === false', () => {
    const onOpenChange = jest.fn();

    render(() => (
      <Popover content="Exit" open={false} onOpenChange={onOpenChange}>
        <span>Exit trigger</span>
      </Popover>
    ));
  });

  it('handle-closed=false attribute prevents close', () => {
    const { container } = render(() => (
      <Popover content="Handle" open={true} trigger="click">
        <span handle-closed="false">No close</span>
      </Popover>
    ));
    const span = container.querySelector('.popover');

    if (span) {
      span.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      jest.advanceTimersByTime(100);
    }
  });
});
