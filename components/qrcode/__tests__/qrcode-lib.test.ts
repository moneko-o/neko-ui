import { Ecc, encodeSegments, makeSegments } from '../qrcode';

describe('QR Code library coverage', () => {
  it('encodes numeric-only string (makeNumeric path)', () => {
    const segs = makeSegments('12345');
    const qr = encodeSegments(segs, Ecc.get('LOW'));

    expect(qr.size).toBeGreaterThan(0);
  });

  it('encodes alphanumeric string (makeAlphanumeric path)', () => {
    const segs = makeSegments('HELLO WORLD');
    const qr = encodeSegments(segs, Ecc.get('LOW'));

    expect(qr.size).toBeGreaterThan(0);
  });

  it('encodes alphanumeric with odd length (trailing char)', () => {
    const segs = makeSegments('ABC');
    const qr = encodeSegments(segs, Ecc.get('MEDIUM'));

    expect(qr.size).toBeGreaterThan(0);
  });

  it('encodes unicode string (makeBytes via toUtf8ByteArray with percent encoding)', () => {
    const segs = makeSegments('你好世界');
    const qr = encodeSegments(segs, Ecc.get('MEDIUM'));

    expect(qr.size).toBeGreaterThan(0);
  });

  it('returns empty segments for empty string', () => {
    const segs = makeSegments('');

    expect(segs).toEqual([]);
  });

  it('encodes with HIGH error correction (boostEcl)', () => {
    const segs = makeSegments('Test');
    const qr = encodeSegments(segs, Ecc.get('HIGH'), 1, 40, -1, true);

    expect(qr.size).toBeGreaterThan(0);
  });

  it('encodes with specific mask', () => {
    const segs = makeSegments('mask test');
    const qr = encodeSegments(segs, Ecc.get('LOW'), 1, 40, 3, false);

    expect(qr.mask).toBe(3);
  });

  it('encodes with version >= 7 to trigger drawVersion', () => {
    const longText = 'A'.repeat(200);
    const segs = makeSegments(longText);
    const qr = encodeSegments(segs, Ecc.get('HIGH'), 7, 40, -1, false);

    expect(qr.version).toBeGreaterThanOrEqual(7);
  });

  it('encodes long text requiring higher version', () => {
    const longText = 'X'.repeat(500);
    const segs = makeSegments(longText);
    const qr = encodeSegments(segs, Ecc.get('LOW'));

    expect(qr.version).toBeGreaterThan(1);
  });

  it('all error correction levels', () => {
    const segs = makeSegments('ECC test');

    for (const level of ['LOW', 'MEDIUM', 'QUARTILE', 'HIGH'] as const) {
      const qr = encodeSegments(segs, Ecc.get(level));

      expect(qr.size).toBeGreaterThan(0);
    }
  });

  it('all mask patterns 0-7', () => {
    const segs = makeSegments('mask');

    for (let m = 0; m < 8; m++) {
      const qr = encodeSegments(segs, Ecc.get('LOW'), 1, 40, m as 0, false);

      expect(qr.mask).toBe(m);
    }
  });

  it('getModule returns false for out-of-bounds coordinates', () => {
    const segs = makeSegments('test');
    const qr = encodeSegments(segs, Ecc.get('LOW'));

    expect(qr.getModule(-1, 0)).toBe(false);
    expect(qr.getModule(0, -1)).toBe(false);
    expect(qr.getModule(qr.size, 0)).toBe(false);
    expect(qr.getModule(0, qr.size)).toBe(false);
  });

  it('throws on invalid encodeSegments params', () => {
    const segs = makeSegments('test');

    expect(() => encodeSegments(segs, Ecc.get('LOW'), 0 as 1)).toThrow(RangeError);
    expect(() => encodeSegments(segs, Ecc.get('LOW'), 1, 41 as 40)).toThrow(RangeError);
    expect(() => encodeSegments(segs, Ecc.get('LOW'), 5, 3)).toThrow(RangeError);
    expect(() => encodeSegments(segs, Ecc.get('LOW'), 1, 40, -2 as -1)).toThrow(RangeError);
    expect(() => encodeSegments(segs, Ecc.get('LOW'), 1, 40, 8 as 0)).toThrow(RangeError);
  });

  it('throws Data too long when maxVersion is too small', () => {
    const longText = 'Z'.repeat(200);
    const segs = makeSegments(longText);

    expect(() => encodeSegments(segs, Ecc.get('HIGH'), 1, 2)).toThrow('Data too long');
  });

  it('encodes with minVersion === maxVersion', () => {
    const segs = makeSegments('hi');
    const qr = encodeSegments(segs, Ecc.get('LOW'), 5, 5);

    expect(qr.version).toBe(5);
  });

  it('encodes numeric strings of various lengths (1, 2, 3+ digits)', () => {
    expect(makeSegments('1').length).toBe(1);
    expect(makeSegments('12').length).toBe(1);
    expect(makeSegments('1234').length).toBe(1);

    const segs1 = makeSegments('1');
    const qr1 = encodeSegments(segs1, Ecc.get('LOW'));

    expect(qr1.size).toBeGreaterThan(0);

    const segs4 = makeSegments('1234');
    const qr4 = encodeSegments(segs4, Ecc.get('LOW'));

    expect(qr4.size).toBeGreaterThan(0);
  });

  it('encodes with boostEcl=false to skip ecl improvement', () => {
    const segs = makeSegments('no boost');
    const qr = encodeSegments(segs, Ecc.get('LOW'), 1, 40, -1, false);

    expect(qr.errorCorrectionLevel).toBe(Ecc.get('LOW'));
  });

  it('handles very long numeric input requiring high version', () => {
    const nums = '0123456789'.repeat(30);
    const segs = makeSegments(nums);
    const qr = encodeSegments(segs, Ecc.get('HIGH'));

    expect(qr.version).toBeGreaterThanOrEqual(7);
  });
});
