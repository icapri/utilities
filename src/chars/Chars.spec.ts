import {Chars} from './Chars';

describe('Chars', () => {
  test('Chars.isAlpha()', () => {
    expect(Chars.isAlpha('')).toEqual(false);
    expect(Chars.isAlpha('a')).toEqual(true);
    expect(Chars.isAlpha('b')).toEqual(true);
    expect(Chars.isAlpha('c')).toEqual(true);
    expect(Chars.isAlpha('d')).toEqual(true);
    expect(Chars.isAlpha('e')).toEqual(true);
    expect(Chars.isAlpha('f')).toEqual(true);
    expect(Chars.isAlpha('g')).toEqual(true);
    expect(Chars.isAlpha('h')).toEqual(true);
    expect(Chars.isAlpha('i')).toEqual(true);
    expect(Chars.isAlpha('j')).toEqual(true);
    expect(Chars.isAlpha('k')).toEqual(true);
    expect(Chars.isAlpha('l')).toEqual(true);
    expect(Chars.isAlpha('m')).toEqual(true);
    expect(Chars.isAlpha('n')).toEqual(true);
    expect(Chars.isAlpha('o')).toEqual(true);
    expect(Chars.isAlpha('p')).toEqual(true);
    expect(Chars.isAlpha('q')).toEqual(true);
    expect(Chars.isAlpha('r')).toEqual(true);
    expect(Chars.isAlpha('s')).toEqual(true);
    expect(Chars.isAlpha('t')).toEqual(true);
    expect(Chars.isAlpha('u')).toEqual(true);
    expect(Chars.isAlpha('v')).toEqual(true);
    expect(Chars.isAlpha('w')).toEqual(true);
    expect(Chars.isAlpha('x')).toEqual(true);
    expect(Chars.isAlpha('y')).toEqual(true);
    expect(Chars.isAlpha('z')).toEqual(true);
    expect(Chars.isAlpha('A')).toEqual(true);
    expect(Chars.isAlpha('B')).toEqual(true);
    expect(Chars.isAlpha('C')).toEqual(true);
    expect(Chars.isAlpha('D')).toEqual(true);
    expect(Chars.isAlpha('E')).toEqual(true);
    expect(Chars.isAlpha('F')).toEqual(true);
    expect(Chars.isAlpha('G')).toEqual(true);
    expect(Chars.isAlpha('H')).toEqual(true);
    expect(Chars.isAlpha('I')).toEqual(true);
    expect(Chars.isAlpha('J')).toEqual(true);
    expect(Chars.isAlpha('K')).toEqual(true);
    expect(Chars.isAlpha('L')).toEqual(true);
    expect(Chars.isAlpha('M')).toEqual(true);
    expect(Chars.isAlpha('N')).toEqual(true);
    expect(Chars.isAlpha('O')).toEqual(true);
    expect(Chars.isAlpha('P')).toEqual(true);
    expect(Chars.isAlpha('Q')).toEqual(true);
    expect(Chars.isAlpha('R')).toEqual(true);
    expect(Chars.isAlpha('S')).toEqual(true);
    expect(Chars.isAlpha('T')).toEqual(true);
    expect(Chars.isAlpha('U')).toEqual(true);
    expect(Chars.isAlpha('V')).toEqual(true);
    expect(Chars.isAlpha('W')).toEqual(true);
    expect(Chars.isAlpha('X')).toEqual(true);
    expect(Chars.isAlpha('Y')).toEqual(true);
    expect(Chars.isAlpha('Z')).toEqual(true);
    expect(Chars.isAlpha('Ä')).toEqual(false);
    expect(Chars.isAlpha('ö')).toEqual(false);
    expect(Chars.isAlpha('-')).toEqual(false);
    expect(Chars.isAlpha('0')).toEqual(false);
  });

  test('Chars.isAlphaLower()', () => {
    expect(Chars.isAlphaLower('a')).toEqual(true);
    expect(Chars.isAlphaLower('b')).toEqual(true);
    expect(Chars.isAlphaLower('c')).toEqual(true);
    expect(Chars.isAlphaLower('d')).toEqual(true);
    expect(Chars.isAlphaLower('e')).toEqual(true);
    expect(Chars.isAlphaLower('f')).toEqual(true);
    expect(Chars.isAlphaLower('g')).toEqual(true);
    expect(Chars.isAlphaLower('h')).toEqual(true);
    expect(Chars.isAlphaLower('i')).toEqual(true);
    expect(Chars.isAlphaLower('j')).toEqual(true);
    expect(Chars.isAlphaLower('k')).toEqual(true);
    expect(Chars.isAlphaLower('l')).toEqual(true);
    expect(Chars.isAlphaLower('m')).toEqual(true);
    expect(Chars.isAlphaLower('n')).toEqual(true);
    expect(Chars.isAlphaLower('o')).toEqual(true);
    expect(Chars.isAlphaLower('p')).toEqual(true);
    expect(Chars.isAlphaLower('q')).toEqual(true);
    expect(Chars.isAlphaLower('r')).toEqual(true);
    expect(Chars.isAlphaLower('s')).toEqual(true);
    expect(Chars.isAlphaLower('t')).toEqual(true);
    expect(Chars.isAlphaLower('u')).toEqual(true);
    expect(Chars.isAlphaLower('v')).toEqual(true);
    expect(Chars.isAlphaLower('w')).toEqual(true);
    expect(Chars.isAlphaLower('x')).toEqual(true);
    expect(Chars.isAlphaLower('y')).toEqual(true);
    expect(Chars.isAlphaLower('z')).toEqual(true);
    expect(Chars.isAlphaLower('Ä')).toEqual(false);
    expect(Chars.isAlphaLower('ö')).toEqual(false);
    expect(Chars.isAlphaLower('-')).toEqual(false);
    expect(Chars.isAlphaLower('0')).toEqual(false);
  });

  test('Chars.isAlphaUpper()', () => {
    expect(Chars.isAlphaUpper('')).toEqual(false);
    expect(Chars.isAlphaUpper('A')).toEqual(true);
    expect(Chars.isAlphaUpper('B')).toEqual(true);
    expect(Chars.isAlphaUpper('C')).toEqual(true);
    expect(Chars.isAlphaUpper('D')).toEqual(true);
    expect(Chars.isAlphaUpper('E')).toEqual(true);
    expect(Chars.isAlphaUpper('F')).toEqual(true);
    expect(Chars.isAlphaUpper('G')).toEqual(true);
    expect(Chars.isAlphaUpper('H')).toEqual(true);
    expect(Chars.isAlphaUpper('I')).toEqual(true);
    expect(Chars.isAlphaUpper('J')).toEqual(true);
    expect(Chars.isAlphaUpper('K')).toEqual(true);
    expect(Chars.isAlphaUpper('L')).toEqual(true);
    expect(Chars.isAlphaUpper('M')).toEqual(true);
    expect(Chars.isAlphaUpper('N')).toEqual(true);
    expect(Chars.isAlphaUpper('O')).toEqual(true);
    expect(Chars.isAlphaUpper('P')).toEqual(true);
    expect(Chars.isAlphaUpper('Q')).toEqual(true);
    expect(Chars.isAlphaUpper('R')).toEqual(true);
    expect(Chars.isAlphaUpper('S')).toEqual(true);
    expect(Chars.isAlphaUpper('T')).toEqual(true);
    expect(Chars.isAlphaUpper('U')).toEqual(true);
    expect(Chars.isAlphaUpper('V')).toEqual(true);
    expect(Chars.isAlphaUpper('W')).toEqual(true);
    expect(Chars.isAlphaUpper('X')).toEqual(true);
    expect(Chars.isAlphaUpper('Y')).toEqual(true);
    expect(Chars.isAlphaUpper('Z')).toEqual(true);
    expect(Chars.isAlphaUpper('Ä')).toEqual(false);
    expect(Chars.isAlphaUpper('ö')).toEqual(false);
    expect(Chars.isAlphaUpper('-')).toEqual(false);
    expect(Chars.isAlphaUpper('0')).toEqual(false);
  });

  test('Chars.isArabicDigit()', () => {
    expect(Chars.isArabicDigit('')).toEqual(false);
    expect(Chars.isArabicDigit(' ')).toEqual(false);
    expect(Chars.isArabicDigit('\u0660')).toEqual(true);
    expect(Chars.isArabicDigit('\u0661')).toEqual(true);
    expect(Chars.isArabicDigit('\u0662')).toEqual(true);
    expect(Chars.isArabicDigit('\u0663')).toEqual(true);
    expect(Chars.isArabicDigit('\u0664')).toEqual(true);
    expect(Chars.isArabicDigit('\u0665')).toEqual(true);
    expect(Chars.isArabicDigit('\u0666')).toEqual(true);
    expect(Chars.isArabicDigit('\u0667')).toEqual(true);
    expect(Chars.isArabicDigit('\u0668')).toEqual(true);
    expect(Chars.isArabicDigit('\u0669')).toEqual(true);
    expect(Chars.isArabicDigit('0')).toEqual(false);
    expect(Chars.isArabicDigit('6')).toEqual(false);
  });

  test('Chars.isASCII()', () => {
    expect(Chars.isASCII('"')).toEqual(true);
    expect(Chars.isASCII('a')).toEqual(true);
    expect(Chars.isASCII('b')).toEqual(true);
    expect(Chars.isASCII('c')).toEqual(true);
    expect(Chars.isASCII('d')).toEqual(true);
    expect(Chars.isASCII('z')).toEqual(true);
    expect(Chars.isASCII('A')).toEqual(true);
    expect(Chars.isASCII('B')).toEqual(true);
    expect(Chars.isASCII('C')).toEqual(true);
    expect(Chars.isASCII('D')).toEqual(true);
    expect(Chars.isASCII('Z')).toEqual(true);
    expect(Chars.isASCII('Ä')).toEqual(false);
    expect(Chars.isASCII('ö')).toEqual(false);
    expect(Chars.isASCII('-')).toEqual(true);
    expect(Chars.isASCII('0')).toEqual(true);
    expect(Chars.isASCII('/')).toEqual(true);
    expect(Chars.isASCII(']')).toEqual(true);
    expect(Chars.isASCII('{')).toEqual(true);
    expect(Chars.isASCII('|')).toEqual(true);
  });

  test('Chars.isASCIIControl()', () => {
    expect(Chars.isASCIIControl(Chars.NUL)).toEqual(true);
    expect(Chars.isASCIIControl(Chars.BS)).toEqual(true);
    expect(Chars.isASCIIControl(Chars.CR)).toEqual(true);
    expect(Chars.isASCIIControl(Chars.FF)).toEqual(true);
    expect(Chars.isASCIIControl(Chars.HT)).toEqual(true);
    expect(Chars.isASCIIControl(Chars.LF)).toEqual(true);
    expect(Chars.isASCIIControl(Chars.VT)).toEqual(true);
    expect(Chars.isASCIIControl('0')).toEqual(false);
    expect(Chars.isASCIIControl('a')).toEqual(false);
    expect(Chars.isASCIIControl('B')).toEqual(false);
    expect(Chars.isASCIIControl('z')).toEqual(false);
    expect(Chars.isASCIIControl('ä')).toEqual(false);
  });

  test('Chars.isASCIIPrintable()', () => {
    expect(Chars.isASCIIPrintable(Chars.NUL)).toEqual(false);
    expect(Chars.isASCIIPrintable(Chars.BS)).toEqual(false);
    expect(Chars.isASCIIPrintable(Chars.CR)).toEqual(false);
    expect(Chars.isASCIIPrintable(Chars.FF)).toEqual(false);
    expect(Chars.isASCIIPrintable(Chars.HT)).toEqual(false);
    expect(Chars.isASCIIPrintable(Chars.LF)).toEqual(false);
    expect(Chars.isASCIIPrintable(Chars.VT)).toEqual(false);
    expect(Chars.isASCIIPrintable('0')).toEqual(true);
    expect(Chars.isASCIIPrintable('a')).toEqual(true);
    expect(Chars.isASCIIPrintable('B')).toEqual(true);
    expect(Chars.isASCIIPrintable('z')).toEqual(true);
    expect(Chars.isASCIIPrintable('ä')).toEqual(false);
    expect(Chars.isASCIIPrintable('`')).toEqual(true);
  });

  test('Chars.isDigit()', () => {
    expect(Chars.isDigit('0')).toEqual(true);
    expect(Chars.isDigit('1')).toEqual(true);
    expect(Chars.isDigit('2')).toEqual(true);
    expect(Chars.isDigit('3')).toEqual(true);
    expect(Chars.isDigit('4')).toEqual(true);
    expect(Chars.isDigit('5')).toEqual(true);
    expect(Chars.isDigit('6')).toEqual(true);
    expect(Chars.isDigit('7')).toEqual(true);
    expect(Chars.isDigit('8')).toEqual(true);
    expect(Chars.isDigit('9')).toEqual(true);
    expect(Chars.isDigit(Chars.NUL)).toEqual(false);
    expect(Chars.isDigit(Chars.BS)).toEqual(false);
    expect(Chars.isDigit(Chars.CR)).toEqual(false);
    expect(Chars.isDigit(Chars.FF)).toEqual(false);
    expect(Chars.isDigit(Chars.HT)).toEqual(false);
    expect(Chars.isDigit(Chars.LF)).toEqual(false);
    expect(Chars.isDigit(Chars.VT)).toEqual(false);
    expect(Chars.isDigit('a')).toEqual(false);
    expect(Chars.isDigit('B')).toEqual(false);
    expect(Chars.isDigit('z')).toEqual(false);
    expect(Chars.isDigit('ä')).toEqual(false);
    expect(Chars.isDigit('`')).toEqual(false);
    expect(Chars.isDigit('')).toEqual(false);
    expect(Chars.isDigit('12')).toEqual(false);
    expect(Chars.isDigit('a')).toEqual(false);
    expect(Chars.isDigit('\u06f0')).toEqual(true);
    expect(Chars.isDigit('\u06f1')).toEqual(true);
    expect(Chars.isDigit('۲')).toEqual(true);
    expect(Chars.isDigit('۳')).toEqual(true);
    expect(Chars.isDigit('۴')).toEqual(true);
    expect(Chars.isDigit('\u06f5')).toEqual(true);
    expect(Chars.isDigit('۶')).toEqual(true);
    expect(Chars.isDigit('\u06f7')).toEqual(true);
    expect(Chars.isDigit('۸')).toEqual(true);
    expect(Chars.isDigit('۹')).toEqual(true);
    expect(Chars.isDigit('')).toEqual(false);
    expect(Chars.isDigit('\u2170')).toEqual(true);
    expect(Chars.isDigit('\u2171')).toEqual(true);
    expect(Chars.isDigit('\u2172')).toEqual(true);
    expect(Chars.isDigit('\u2173')).toEqual(true);
    expect(Chars.isDigit('\u2174')).toEqual(true);
    expect(Chars.isDigit('\u2175')).toEqual(true);
    expect(Chars.isDigit('\u2176')).toEqual(true);
    expect(Chars.isDigit('\u2177')).toEqual(true);
    expect(Chars.isDigit('\u2178')).toEqual(true);
    expect(Chars.isDigit('\u2179')).toEqual(true);
    expect(Chars.isDigit('\u217A')).toEqual(true);
    expect(Chars.isDigit('\u217B')).toEqual(true);
    expect(Chars.isDigit('\u217C')).toEqual(true);
    expect(Chars.isDigit('\u217D')).toEqual(true);
    expect(Chars.isDigit('\u217E')).toEqual(true);
    expect(Chars.isDigit('\u217F')).toEqual(true);
    expect(Chars.isDigit('a')).toEqual(false);
    expect(Chars.isDigit('')).toEqual(false);
    expect(Chars.isDigit('\u2160')).toEqual(true);
    expect(Chars.isDigit('\u2161')).toEqual(true);
    expect(Chars.isDigit('\u2162')).toEqual(true);
    expect(Chars.isDigit('\u2163')).toEqual(true);
    expect(Chars.isDigit('\u2164')).toEqual(true);
    expect(Chars.isDigit('\u2165')).toEqual(true);
    expect(Chars.isDigit('\u2166')).toEqual(true);
    expect(Chars.isDigit('\u2167')).toEqual(true);
    expect(Chars.isDigit('\u2168')).toEqual(true);
    expect(Chars.isDigit('\u2169')).toEqual(true);
    expect(Chars.isDigit('\u216A')).toEqual(true);
    expect(Chars.isDigit('\u216B')).toEqual(true);
    expect(Chars.isDigit('\u216C')).toEqual(true);
    expect(Chars.isDigit('\u216D')).toEqual(true);
    expect(Chars.isDigit('\u216E')).toEqual(true);
    expect(Chars.isDigit('\u216F')).toEqual(true);
    expect(Chars.isDigit('a')).toEqual(false);
    expect(Chars.isDigit('')).toEqual(false);
    expect(Chars.isDigit(' ')).toEqual(false);
    expect(Chars.isDigit('\u0660')).toEqual(true);
    expect(Chars.isDigit('\u0661')).toEqual(true);
    expect(Chars.isDigit('\u0662')).toEqual(true);
    expect(Chars.isDigit('\u0663')).toEqual(true);
    expect(Chars.isDigit('\u0664')).toEqual(true);
    expect(Chars.isDigit('\u0665')).toEqual(true);
    expect(Chars.isDigit('\u0666')).toEqual(true);
    expect(Chars.isDigit('\u0667')).toEqual(true);
    expect(Chars.isDigit('\u0668')).toEqual(true);
    expect(Chars.isDigit('\u0669')).toEqual(true);
  });

  test('Chars.isHinduDigit()', () => {
    expect(Chars.isHinduDigit('')).toEqual(false);
    expect(Chars.isHinduDigit('0')).toEqual(false);
    expect(Chars.isHinduDigit('12')).toEqual(false);
    expect(Chars.isHinduDigit('१')).toEqual(true);
    expect(Chars.isHinduDigit('\u0966')).toEqual(true);
    expect(Chars.isHinduDigit('\u0967')).toEqual(true);
    expect(Chars.isHinduDigit('\u0968')).toEqual(true);
    expect(Chars.isHinduDigit('\u0969')).toEqual(true);
    expect(Chars.isHinduDigit('\u096A')).toEqual(true);
    expect(Chars.isHinduDigit('\u096B')).toEqual(true);
    expect(Chars.isHinduDigit('\u096C')).toEqual(true);
    expect(Chars.isHinduDigit('\u096D')).toEqual(true);
    expect(Chars.isHinduDigit('\u096E')).toEqual(true);
    expect(Chars.isHinduDigit('\u096F')).toEqual(true);
  });

  test('Chars.isLetter()', () => {
    expect(Chars.isLetter('')).toEqual(false);
    expect(Chars.isLetter('0')).toEqual(false);
    expect(Chars.isLetter(Chars.BACKSLASH)).toEqual(false);
    expect(Chars.isLetter('a')).toEqual(true);
    expect(Chars.isLetter('ö')).toEqual(true);
    expect(Chars.isLetter('0')).toEqual(false);
    expect(Chars.isLetter('我')).toEqual(true);
    expect(Chars.isLetter('Բ')).toEqual(true);
    expect(Chars.isLetter('Ա')).toEqual(true);
    expect(Chars.isLetter('ぃ')).toEqual(true);
    expect(Chars.isLetter('ぁ')).toEqual(true);
    expect(Chars.isLetter('じ')).toEqual(true);
    expect(Chars.isLetter('ד')).toEqual(true);

    for (const char of 'החתול שלי אכל את הטוסט שלי') {
      expect(Chars.isLetter(char) || char === ' ').toEqual(true);
    }

    for (const char of 'قطتي أكلت نخبتي') {
      expect(Chars.isLetter(char) || char === ' ').toEqual(true);
    }

    for (const char of 'मेरी बिल्ली ने मेरा टोस्ट खा लिया') {
      expect(Chars.isLetter(char) || char === ' ').toEqual(true);
    }

    expect(Chars.isLetter('Ā')).toEqual(true);
    expect(Chars.isLetter('ā')).toEqual(true);
    expect(Chars.isLetter('Ă')).toEqual(true);
    expect(Chars.isLetter('Ĭ')).toEqual(true);
    expect(Chars.isLetter('©')).toEqual(false);
    expect(Chars.isLetter('`')).toEqual(false);
    expect(Chars.isLetter('\'')).toEqual(false);
    expect(Chars.isLetter('}')).toEqual(false);
    expect(Chars.isLetter('=')).toEqual(false);
    expect(Chars.isLetter('°')).toEqual(false);
  });

  test('Chars.isLetterOrDigit()', () => {
    expect(Chars.isLetterOrDigit(' ')).toEqual(false);
    expect(Chars.isLetterOrDigit('c')).toEqual(true);
    expect(Chars.isLetterOrDigit('Ā')).toEqual(true);
    expect(Chars.isLetterOrDigit('ה')).toEqual(true);
    expect(Chars.isLetterOrDigit('ت')).toEqual(true);
    expect(Chars.isLetterOrDigit('δ')).toEqual(true);
    expect(Chars.isLetterOrDigit('ю')).toEqual(true);
    expect(Chars.isLetterOrDigit('Ö')).toEqual(true);
    expect(Chars.isLetterOrDigit('ぃ')).toEqual(true);
    expect(Chars.isLetterOrDigit('`')).toEqual(false);
    expect(Chars.isLetterOrDigit('°')).toEqual(false);
    expect(Chars.isLetterOrDigit('©')).toEqual(false);
    expect(Chars.isLetterOrDigit('')).toEqual(false);
    expect(Chars.isLetterOrDigit('3')).toEqual(true);
    expect(Chars.isLetterOrDigit('\u0660')).toEqual(true);
    expect(Chars.isLetterOrDigit('\u0967')).toEqual(true);
    expect(Chars.isLetterOrDigit('\u06f4')).toEqual(true);
    expect(Chars.isLetterOrDigit('\u2175')).toEqual(true);
    expect(Chars.isLetterOrDigit('\u216F')).toEqual(true);
    expect(Chars.isLetterOrDigit('a')).toEqual(true);
    expect(Chars.isLetterOrDigit('-')).toEqual(false);
    expect(Chars.isLetterOrDigit('_')).toEqual(false);
    expect(Chars.isLetterOrDigit('|')).toEqual(false);
  });

  test('Chars.isLowerCase()', () => {
    expect(Chars.isLowerCase('')).toEqual(false);
    expect(Chars.isLowerCase('ā')).toEqual(true);
    expect(Chars.isLowerCase('δ')).toEqual(true);
    expect(Chars.isLowerCase('ы')).toEqual(true);
    expect(Chars.isLowerCase('Б')).toEqual(false);
    expect(Chars.isLowerCase('a')).toEqual(true);
    expect(Chars.isLowerCase('ö')).toEqual(true);
    expect(Chars.isLowerCase('öä')).toEqual(false);
    expect(Chars.isLowerCase('Ü')).toEqual(false);
    expect(Chars.isLowerCase('0')).toEqual(false);
  });

  test('Chars.isLowerRomanDigit()', () => {
    expect(Chars.isLowerRomanDigit('')).toEqual(false);
    expect(Chars.isLowerRomanDigit('\u2170')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2171')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2172')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2173')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2174')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2175')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2176')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2177')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2178')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u2179')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u217A')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u217B')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u217C')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u217D')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u217E')).toEqual(true);
    expect(Chars.isLowerRomanDigit('\u217F')).toEqual(true);
    expect(Chars.isLowerRomanDigit('a')).toEqual(false);
    expect(Chars.isLowerRomanDigit('0')).toEqual(false);
    expect(Chars.isLowerRomanDigit('9')).toEqual(false);
  });

  test('Chars.isLowSurrogate()', () => {
    expect(Chars.isLowSurrogate('')).toEqual(false);
    expect(Chars.isLowSurrogate('\uDC00')).toEqual(true);
    expect(Chars.isLowSurrogate('\uDFFF')).toEqual(true);
  });

  test('Chars.isModernDigit()', () => {
    expect(Chars.isModernDigit('0')).toEqual(true);
    expect(Chars.isModernDigit('1')).toEqual(true);
    expect(Chars.isModernDigit('2')).toEqual(true);
    expect(Chars.isModernDigit('3')).toEqual(true);
    expect(Chars.isModernDigit('4')).toEqual(true);
    expect(Chars.isModernDigit('5')).toEqual(true);
    expect(Chars.isModernDigit('6')).toEqual(true);
    expect(Chars.isModernDigit('7')).toEqual(true);
    expect(Chars.isModernDigit('8')).toEqual(true);
    expect(Chars.isModernDigit('9')).toEqual(true);
    expect(Chars.isModernDigit(Chars.NUL)).toEqual(false);
    expect(Chars.isModernDigit(Chars.BS)).toEqual(false);
    expect(Chars.isModernDigit(Chars.CR)).toEqual(false);
    expect(Chars.isModernDigit(Chars.FF)).toEqual(false);
    expect(Chars.isModernDigit(Chars.HT)).toEqual(false);
    expect(Chars.isModernDigit(Chars.LF)).toEqual(false);
    expect(Chars.isModernDigit(Chars.VT)).toEqual(false);
    expect(Chars.isModernDigit('a')).toEqual(false);
    expect(Chars.isModernDigit('B')).toEqual(false);
    expect(Chars.isModernDigit('z')).toEqual(false);
    expect(Chars.isModernDigit('ä')).toEqual(false);
    expect(Chars.isModernDigit('`')).toEqual(false);
  });

  test('Chars.isPersianDigit()', () => {
    expect(Chars.isPersianDigit('')).toEqual(false);
    expect(Chars.isPersianDigit('0')).toEqual(false);
    expect(Chars.isPersianDigit('12')).toEqual(false);
    expect(Chars.isPersianDigit('a')).toEqual(false);
    expect(Chars.isPersianDigit('\u06f0')).toEqual(true);
    expect(Chars.isPersianDigit('\u06f1')).toEqual(true);
    expect(Chars.isPersianDigit('۲')).toEqual(true);
    expect(Chars.isPersianDigit('۳')).toEqual(true);
    expect(Chars.isPersianDigit('۴')).toEqual(true);
    expect(Chars.isPersianDigit('\u06f5')).toEqual(true);
    expect(Chars.isPersianDigit('۶')).toEqual(true);
    expect(Chars.isPersianDigit('\u06f7')).toEqual(true);
    expect(Chars.isPersianDigit('۸')).toEqual(true);
    expect(Chars.isPersianDigit('۹')).toEqual(true);
    expect(Chars.isPersianDigit('9')).toEqual(false);
  });

  test('Chars.isSurrogate()', () => {
    expect(Chars.isSurrogate(' ')).toEqual(false);
    expect(Chars.isSurrogate('\uD800')).toEqual(true);
    expect(Chars.isSurrogate('\uDC00')).toEqual(true);
    expect(Chars.isSurrogate('\uD891')).toEqual(true);
    expect(Chars.isSurrogate('\uDE12')).toEqual(true);
    expect(Chars.isSurrogate('\uD882')).toEqual(true);
    expect(Chars.isSurrogate('\uDF01')).toEqual(true);
    expect(Chars.isSurrogate('\uD914')).toEqual(true);
    expect(Chars.isSurrogate('\uDFFF')).toEqual(true);
    expect(Chars.isSurrogate('\uDBFF')).toEqual(true);
    expect(Chars.isSurrogate('\uDA87')).toEqual(true);
    expect(Chars.isSurrogate('\uD914\uD882')).toEqual(false);
    expect(Chars.isSurrogate('\uDFFF\uD882')).toEqual(false);
  });

  test('Chars.isSurrogatePair()', () => {
    expect(Chars.isSurrogatePair(' ', ' ')).toEqual(false);
    expect(Chars.isSurrogatePair('\uD800', '\uDC00')).toEqual(true);
    expect(Chars.isSurrogatePair('\uD891', '\uDE12')).toEqual(true);
    expect(Chars.isSurrogatePair('\uD882', '\uDF01')).toEqual(true);
    expect(Chars.isSurrogatePair('\uD914', '\uDFFF')).toEqual(true);
    expect(Chars.isSurrogatePair('\uDBFF', '\uDA87')).toEqual(false);
    expect(Chars.isSurrogatePair('\uD914\uD882', '\uDFFF')).toEqual(false);
  });

  test('Chars.isUpperCase()', () => {
    expect(Chars.isUpperCase('')).toEqual(false);
    expect(Chars.isUpperCase('ā')).toEqual(false);
    expect(Chars.isUpperCase('δ')).toEqual(false);
    expect(Chars.isUpperCase('ы')).toEqual(false);
    expect(Chars.isUpperCase('Б')).toEqual(true);
    expect(Chars.isUpperCase('a')).toEqual(false);
    expect(Chars.isUpperCase('ö')).toEqual(false);
    expect(Chars.isUpperCase('öä')).toEqual(false);
    expect(Chars.isUpperCase('Ü')).toEqual(true);
    expect(Chars.isUpperCase('0')).toEqual(false);
  });

  test('Chars.isUpperRomanDigit()', () => {
    expect(Chars.isUpperRomanDigit('')).toEqual(false);
    expect(Chars.isUpperRomanDigit('\u2160')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2161')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2162')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2163')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2164')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2165')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2166')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2167')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2168')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u2169')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u216A')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u216B')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u216C')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u216D')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u216E')).toEqual(true);
    expect(Chars.isUpperRomanDigit('\u216F')).toEqual(true);
    expect(Chars.isUpperRomanDigit('a')).toEqual(false);
    expect(Chars.isUpperRomanDigit('0')).toEqual(false);
    expect(Chars.isUpperRomanDigit('9')).toEqual(false);
  });

  test('Chars.isWhitespace()', () => {
    expect(Chars.isWhitespace('')).toEqual(false);
    expect(Chars.isWhitespace(' ')).toEqual(true);
    expect(Chars.isWhitespace('\t')).toEqual(true);
    expect(Chars.isWhitespace('\r')).toEqual(true);
    expect(Chars.isWhitespace('\f')).toEqual(true);
    expect(Chars.isWhitespace('\n')).toEqual(true);
    expect(Chars.isWhitespace('\n\n')).toEqual(false);
    expect(Chars.isWhitespace('d')).toEqual(false);
  });
});
