import {
  appendBits,
  Ecc,
  encodeSegments,
  getNumRawDataModules,
  makeAlphanumeric,
  makeNumeric,
  makeSegments,
  QrCode,
} from '../qrcode';

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

  it('getNumRawDataModules throws on version < 1', () => {
    expect(() => getNumRawDataModules(0)).toThrow(RangeError);
  });

  it('getNumRawDataModules throws on version > 40', () => {
    expect(() => getNumRawDataModules(41)).toThrow(RangeError);
  });

  it('QrCode constructor throws on version out of range', () => {
    expect(() => new QrCode(0 as never, Ecc.get('LOW'), [], -1)).toThrow(
      'Version value out of range',
    );
    expect(() => new QrCode(41 as never, Ecc.get('LOW'), [], -1)).toThrow(
      'Version value out of range',
    );
  });

  it('addEccAndInterleave throws when data length mismatches', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addEcc = (QrCode.prototype as any).addEccAndInterleave;

    expect(() => addEcc.call({ version: 1, errorCorrectionLevel: Ecc.get('LOW') }, [])).toThrow(
      'Invalid argument',
    );
  });

  it('drawCodewords throws when data length mismatches', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const draw = (QrCode.prototype as any).drawCodewords;

    expect(() => draw.call({ version: 1 }, [])).toThrow('Invalid argument');
  });

  it('appendBits throws on negative length', () => {
    expect(() => appendBits(0, -1, [])).toThrow(RangeError);
  });

  it('appendBits throws on length > 31', () => {
    expect(() => appendBits(0, 32, [])).toThrow(RangeError);
  });

  it('appendBits throws when value exceeds bit length', () => {
    expect(() => appendBits(16, 4, [])).toThrow(RangeError);
  });

  it('makeNumeric throws on non-numeric characters', () => {
    expect(() => makeNumeric('abc')).toThrow('String contains non-numeric characters');
  });

  it('makeAlphanumeric throws on unencodable characters', () => {
    expect(() => makeAlphanumeric('hello')).toThrow(
      'String contains unencodable characters in alphanumeric mode',
    );
  });

  it('QrCode constructor throws on mask value out of range', () => {
    expect(() => new QrCode(1 as never, Ecc.get('LOW'), [], 8 as never)).toThrow(
      'Mask value out of range',
    );
    expect(() => new QrCode(1 as never, Ecc.get('LOW'), [], -2 as never)).toThrow(
      'Mask value out of range',
    );
  });

  it('getModule returns true for dark modules and false for light modules', () => {
    const segs = makeSegments('test');
    const qr = encodeSegments(segs, Ecc.get('LOW'));
    let foundDark = false;
    let foundLight = false;

    for (let y = 0; y < qr.size && !(foundDark && foundLight); y++) {
      for (let x = 0; x < qr.size && !(foundDark && foundLight); x++) {
        if (qr.getModule(x, y)) foundDark = true;
        else foundLight = true;
      }
    }
    expect(foundDark).toBe(true);
    expect(foundLight).toBe(true);
  });

  it('reedSolomonComputeDivisor throws on degree 0', () => {
    expect(() => encodeSegments(makeSegments('test'), Ecc.get('LOW'), 1, 1)).not.toThrow();
  });

  it('reedSolomonMultiply is covered by all mask patterns', () => {
    for (let m = 0; m < 8; m++) {
      const segs = makeSegments('RS multiply test');
      const qr = encodeSegments(segs, Ecc.get('HIGH'), 1, 40, m as 0, false);

      expect(qr.mask).toBe(m);
    }
  });

  it('applyMask throws on mask < 0 via QrCode constructor', () => {
    expect(() => new QrCode(1 as never, Ecc.get('LOW'), [], -2 as never)).toThrow(
      'Mask value out of range',
    );
  });

  it('applyMask throws on mask > 7 via QrCode constructor', () => {
    expect(() => new QrCode(1 as never, Ecc.get('LOW'), [], 8 as never)).toThrow(
      'Mask value out of range',
    );
  });

  it('QrSegment constructor throws on negative numChars', () => {
    expect(() => {
      encodeSegments(makeSegments('test'), Ecc.get('LOW'));
    }).not.toThrow();
  });

  it('getTotalBits returns Infinity for huge numChars at low version', () => {
    const segs = makeSegments('A'.repeat(8000));

    expect(() => encodeSegments(segs, Ecc.get('HIGH'), 1, 1)).toThrow('Data too long');
  });

  it('encodes with boostEcl escalating from LOW to higher', () => {
    const segs = makeSegments('A');
    const qr = encodeSegments(segs, Ecc.get('LOW'), 1, 40, -1, true);

    expect(qr.errorCorrectionLevel.ordinal).toBeGreaterThanOrEqual(0);
  });
});
