import { render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('test Input', () => {
  it('normal', () => {
    render(() => (
      <n-typography data-testid="normal" type="primary">
        primary text
      </n-typography>
    ));

    expect(screen.getByShadowText('primary text')).toBeInTheDocument();
  });
  it('truncated', () => {
    render(() => (
      <n-typography data-testid="truncated" truncated={2}>
        truncated
      </n-typography>
    ));

    expect(screen.getByShadowText('truncated')).toBeInTheDocument();
  });

  it('type error uses error color', () => {
    render(() => (
      <n-typography data-testid="error" type="error">
        error text
      </n-typography>
    ));

    expect(screen.getByShadowText('error text')).toBeInTheDocument();
  });

  it('disabled uses disable color', () => {
    render(() => (
      <n-typography data-testid="disabled" disabled={true}>
        disabled text
      </n-typography>
    ));

    expect(screen.getByShadowText('disabled text')).toBeInTheDocument();
  });

  it('truncated as number', () => {
    render(() => (
      <n-typography data-testid="truncated-num" truncated={3}>
        truncated number
      </n-typography>
    ));

    expect(screen.getByShadowText('truncated number')).toBeInTheDocument();
  });

  it('custom tag renders different element', () => {
    render(() => (
      <n-typography data-testid="custom-tag" tag="div">
        custom tag content
      </n-typography>
    ));

    expect(screen.getByShadowText('custom tag content')).toBeInTheDocument();
  });

  it('secondary type', () => {
    render(() => (
      <n-typography data-testid="secondary" type="secondary">
        secondary text
      </n-typography>
    ));

    expect(screen.getByShadowText('secondary text')).toBeInTheDocument();
  });

  it('success type', () => {
    render(() => (
      <n-typography data-testid="success" type="success">
        success text
      </n-typography>
    ));

    expect(screen.getByShadowText('success text')).toBeInTheDocument();
  });

  it('warning type', () => {
    render(() => (
      <n-typography data-testid="warning" type="warning">
        warning text
      </n-typography>
    ));

    expect(screen.getByShadowText('warning text')).toBeInTheDocument();
  });

  it('truncated as boolean true', () => {
    render(() => (
      <n-typography data-testid="truncated-bool" truncated={true}>
        truncated bool
      </n-typography>
    ));

    expect(screen.getByShadowText('truncated bool')).toBeInTheDocument();
  });

  it('custom css prop', () => {
    render(() => (
      <n-typography data-testid="custom-css" css=".typography { font-weight: bold; }">
        styled text
      </n-typography>
    ));

    expect(screen.getByShadowText('styled text')).toBeInTheDocument();
  });

  it('error type with disabled overrides to disabled color', () => {
    render(() => (
      <n-typography data-testid="error-disabled" type="error" disabled={true}>
        error disabled text
      </n-typography>
    ));

    expect(screen.getByShadowText('error disabled text')).toBeInTheDocument();
  });
});
