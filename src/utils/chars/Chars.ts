/**
 * Defines an abstract class with character utilities.
 *
 * @since v1.4.1
 */
export abstract class Chars {
  /**
   * Contains the backslash escape character '`\`'.
   *
   * @since v1.4.1
   */
  public static readonly BACKSLASH: string = '\\' as const;

  /**
   * Contains the backspace escape character '`\b`'.
   *
   * @since v1.4.1
   */
  public static readonly BS: string = '\b' as const;

  /**
   * Contains the carriage return escape character '`\r`'.
   *
   * @since v1.4.1
   */
  public static readonly CR: string = '\r' as const;

  /**
   * Contains the double quote escape character '`"`'.
   *
   * @since v1.4.1
   */
  public static readonly DOUBLE_QUOTE: string = '\"' as const;

  /**
   * Contains the form feed escape character '`\f`'.
   *
   * @since v1.4.1
   */
  public static readonly FF: string = '\f' as const;

  /**
   * Contains the horizontal tabulator escape character '`\t`'.
   *
   * @since v1.4.1
   */
  public static readonly HT: string = '\t' as const;

  /**
   * Contains the "new line" a. k. a. linefeed escape character '`\n`'.
   *
   * @since v1.4.1
   */
  public static readonly LF: string = '\n' as const;

  /**
   * Contains the null control character `'\0'`.
   *
   * @since v1.4.1
   */
  public static NUL: string = '\0' as const;

  /**
   * Contains the single quote escape character '`'`'.
   *
   * @since v1.4.1
   */
  public static readonly SINGLE_QUOTE: string = '\'' as const;

  /**
   * Contains a white space '` `'.
   *
   * @since v1.4.1
   */
  public static readonly SPACE: string = ' ' as const;

  /**
   * Contains the vertical tabulator escape character '`\v`'.
   *
   * @since v1.4.1
   */
  public static readonly VT: string = '\v' as const;

  /** @private */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Checks whether the specified character is alpha (a-z or A-Z).
   *
   * **Example:**
   * ```typescript
   * Chars.isAlpha('a'); // true
   * Chars.isAlpha('B'); // true
   * Chars.isAlpha('-'); // false
   * Chars.isAlpha('0'); // false
   * ```
   *
   * @param {String} char Contains some character code.
   * @return {Boolean} whether the specified character is alpha (a-z or A-Z).
   *
   * @since v1.4.1
   */
  public static isAlpha(char: string): boolean {
    if (char.length !== 1) return false;
    return Chars.isAlphaLower(char) || Chars.isAlphaUpper(char);
  }

  /**
   * Checks whether the specified character is a lowercase letter (a-z).
   *
   * **Example:**
   * ```typescript
   * Chars.isAlphaLower('a'); // true
   * Chars.isAlphaLower('B'); // false
   * Chars.isAlphaLower('-'); // false
   * Chars.isAlphaLower('0'); // false
   * Chars.isAlphaLower('f'); // true
   * ```
   *
   * @param {String} char Contains some character code.
   * @return {Boolean} whether the specified character is a lowercase letter
   * (a-z).
   *
   * @since v1.4.1
   */
  public static isAlphaLower(char: string): boolean {
    if (char.length !== 1) return false;
    const charCode = char.charCodeAt(0);
    return charCode > 96 && charCode < 123;
  }

  /**
   * Checks whether the specified character is an uppercase letter (A-Z).
   *
   * **Example:**
   * ```typescript
   * Chars.isAlphaLower('a'); // true
   * Chars.isAlphaLower('B'); // false
   * Chars.isAlphaLower('-'); // false
   * Chars.isAlphaLower('0'); // false
   * Chars.isAlphaLower('f'); // true
   * ```
   *
   * @param {String} char Contains some character code.
   * @return {Boolean} whether the specified character is an uppercase letter
   * (a-z).
   *
   * @since v1.4.1
   */
  public static isAlphaUpper(char: string): boolean {
    if (char.length !== 1) return false;
    const charCode = char.charCodeAt(0);
    return charCode > 64 && charCode < 91;
  }

  /**
   * Checks whether the specified character is an Arabic digit.
   *
   * **Example:**
   * ```typescript
   * Chars.isArabicDigit('\u0660'); // true
   * Chars.isArabicDigit('\u0661'); // true
   * Chars.isArabicDigit('\u0667'); // true
   * Chars.isArabicDigit('\u0668'); // true
   * Chars.isArabicDigit('\u0669'); // true
   * Chars.isArabicDigit('0'); // false
   * Chars.isArabicDigit('6'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an Arabic digit.
   *
   * @since v1.4.2
   */
  public static isArabicDigit(char: string): boolean {
    return char.length === 1 && (
      char === '\u0660' ||
      char === '\u0661' ||
      char === '\u0662' ||
      char === '\u0663' ||
      char === '\u0664' ||
      char === '\u0665' ||
      char === '\u0666' ||
      char === '\u0667' ||
      char === '\u0668' ||
      char === '\u0669'
    );
  }

  /**
   * Checks whether the specified character is [ASCII](https://www.ascii-code.com/).
   *
   * **Example:**
   * ```typescript
   * Chars.isASCII('a'); // true
   * Chars.isASCII('f'); // true
   * Chars.isASCII('B'); // true
   * Chars.isASCII('-'); // true
   * Chars.isASCII('0'); // true
   * Chars.isASCII('{'); // true
   * Chars.isASCII('|'); // true
   * Chars.isASCII('ä'); // false
   * Chars.isASCII('Ö'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is
   * [ASCII](https://www.ascii-code.com/).
   *
   * @since v1.4.1
   */
  public static isASCII(char: string): boolean {
    if (char.length !== 1) return false;
    return char.charCodeAt(0) < 128;
  }

  /**
   * Checks whether the specified character is an ASCII control character.
   *
   * **Example:**
   * ```typescript
   * Chars.isASCIIControl(Chars.NUL); // true
   * Chars.isASCIIControl(Chars.BS); // true
   * Chars.isASCIIControl(Chars.CR); // true
   * Chars.isASCIIControl(Chars.FF); // true
   * Chars.isASCIIControl(Chars.HT); // true
   * Chars.isASCIIControl(Chars.LF); // true
   * Chars.isASCIIControl(Chars.VT); // true
   * Chars.isASCIIControl('0'); // false
   * Chars.isASCIIControl('a'); // false
   * Chars.isASCIIControl('B'); // false
   * Chars.isASCIIControl('z'); // false
   * Chars.isASCIIControl('ä'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an ASCII control
   * character.
   *
   * @since v1.4.1
   */
  public static isASCIIControl(char: string): boolean {
    if (char.length !== 1) return false;
    const charCode = char.charCodeAt(0);
    return charCode === 127 || charCode < 32;
  }

  /**
   * Checks whether the specified character is a printable character.
   *
   * **Example:**
   * ```typescript
   * Chars.isASCIIPrintable('0'); // true
   * Chars.isASCIIPrintable('a'); // true
   * Chars.isASCIIPrintable('B'); // true
   * Chars.isASCIIPrintable('z'); // true
   * Chars.isASCIIPrintable('`'); // true
   * Chars.isASCIIPrintable('ä'); // false
   * Chars.isASCIIPrintable('Ö'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a printable character.
   *
   * @since v1.4.1
   */
  public static isASCIIPrintable(char: string): boolean {
    if (char.length !== 1) return false;
    const charCode = char.charCodeAt(0);
    return charCode > 31 && charCode < 127;
  }

  /**
   * Checks whether the specified character is a digit.
   *
   * **Example:**
   * ```typescript
   * Chars.isDigit(''); // false
   * Chars.isDigit('3'); // true
   * Chars.isDigit('\u0660'); // true
   * Chars.isDigit('\u0967'); // true
   * Chars.isDigit('\u06f4'); // true
   * Chars.isDigit('\u2175'); // true
   * Chars.isDigit('\u216F'); // true
   * Chars.isDigit('a'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a digit.
   *
   * @since v1.4.1
   */
  public static isDigit(char: string): boolean {
    return char.length === 1 && (
      Chars.isModernDigit(char) ||
      Chars.isArabicDigit(char) ||
      Chars.isHinduDigit(char) ||
      Chars.isPersianDigit(char) ||
      Chars.isLowerRomanDigit(char) ||
      Chars.isUpperRomanDigit(char)
    );
  }

  /**
   * Checks whether the specified character is high surrogate. A high
   * surrogate character is a 16-bit code character between `U+D800`
   * and `U+DBFF`.
   *
   * **Example:**
   * ```typescript
   * Chars.isHighSurrogate(''); // false
   * Chars.isHighSurrogate('😀'); // true
   * Chars.isHighSurrogate('😎'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is high surrogate.
   *
   * @since v1.4.1
   */
  public static isHighSurrogate(char: string): boolean {
    return char.length === 1 && /[\uD800-\uDBFF]/g.test(char);
  }

  /**
   * Checks whether the specified character is a Hindu digit.
   *
   * **Example:**
   * ```typescript
   * Chars.isHinduDigit(''); // true
   * Chars.isHinduDigit('0'); // true
   * Chars.isHinduDigit('१'); // true
   * Chars.isHindiDigit('२'); // true
   * Chars.isHinduDigit('\u0967'); // true
   * Chars.isHinduDigit('\u0968'); // true
   * Chars.isHinduDigit('\u0969'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a Hindu digit.
   *
   * @since v1.4.2
   */
  public static isHinduDigit(char: string): boolean {
    return char.length === 1 && (
      char === '\u0966' ||
      char === '\u0967' ||
      char === '\u0968' ||
      char === '\u0969' ||
      char === '\u096A' ||
      char === '\u096B' ||
      char === '\u096C' ||
      char === '\u096D' ||
      char === '\u096E' ||
      char === '\u096F'
    );
  }

  /**
   * Checks whether the specified character is a letter.
   *
   * **Example:**
   * ```typescript
   * Chars.isLetter('c'); // true
   * Chars.isLetter('Ā'); // true
   * Chars.isLetter('ה'); // true
   * Chars.isLetter('ت'); // true
   * Chars.isLetter('δ'); // true
   * Chars.isLetter('ю'); // true
   * Chars.isLetter('Ö'); // true
   * Chars.isLetter('ぃ'); // true
   * Chars.isLetter('`'); // false
   * Chars.isLetter('°'); // false
   * Chars.isLetter('©'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a letter.
   *
   * @since v1.4.1
   */
  public static isLetter(char: string): boolean {
    return char.length === 1 &&
      /^[a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD]+$/.test(char);
  }

  /**
   * Checks whether the specified character is either letter or digit.
   *
   * **Example:**
   * ```typescript
   * Chars.isLetterOrDigit('c'); // true
   * Chars.isLetterOrDigit('Ā'); // true
   * Chars.isLetterOrDigit('ה'); // true
   * Chars.isLetterOrDigit('ت'); // true
   * Chars.isLetterOrDigit('δ'); // true
   * Chars.isLetterOrDigit('ю'); // true
   * Chars.isLetterOrDigit('Ö'); // true
   * Chars.isLetterOrDigit('ぃ'); // true
   * Chars.isLetterOrDigit('3'); // true
   * Chars.isLetterOrDigit('\u0660'); // true
   * Chars.isLetterOrDigit('\u0967'); // true
   * Chars.isLetterOrDigit('\u06f4'); // true
   * Chars.isLetterOrDigit('\u2175'); // true
   * Chars.isLetterOrDigit('\u216F'); // true
   * Chars.isLetterOrDigit('a'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is either letter
   * or digit.
   *
   * @since v1.4.3
   */
  public static isLetterOrDigit(char: string): boolean {
    return char.length === 1 && (Chars.isLetter(char) || Chars.isDigit(char));
  }

  /**
   * Checks whether the specified character is lowercase.
   *
   * **Example:**
   * ```typescript
   * Chars.isLowerCase(''); // false
   * Chars.isLowerCase('abc'); // false
   * Chars.isLowerCase('a'); // true
   * Chars.isLowerCase('Б'); // false
   * Chars.isLowerCase('ö'); // true
   * Chars.isLowerCase('Ü'); // false
   * Chars.isLowerCase('ы'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is lowercase.
   *
   * @since v1.4.1
   */
  public static isLowerCase(char: string): boolean {
    if (char.length !== 1) return false;
    const char0 = char.charAt(0);
    if (!Number.isNaN(+char0 * 1)) return false;
    return char0 === char0.toLowerCase();
  }

  /**
   * Checks whether the specified character is an upper Roman numberal.
   *
   * **Example:**
   * ```typescript
   * Chars.isLowerRomanDigit(''); false
   * Chars.isLowerRomanDigit('ⅳ'); true
   * Chars.isLowerRomanDigit('\u2171'); true
   * Chars.isLowerRomanDigit('\u2179'); true
   * Chars.isLowerRomanDigit('\u217C'); true
   * Chars.isLowerRomanDigit('\u217F'); true
   * Chars.isLowerRomanDigit('a'); false
   * Chars.isLowerRomanDigit('0'); false
   * Chars.isLowerRomanDigit('9'); false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an upper Roman
   * numberal.
   *
   * @since v1.4.2
   */
  public static isLowerRomanDigit(char: string): boolean {
    return char.length === 1 && (
      char === '\u2170' ||
      char === '\u2171' ||
      char === '\u2172' ||
      char === '\u2173' ||
      char === '\u2174' ||
      char === '\u2175' ||
      char === '\u2176' ||
      char === '\u2177' ||
      char === '\u2178' ||
      char === '\u2179' ||
      char === '\u217A' ||
      char === '\u217B' ||
      char === '\u217C' ||
      char === '\u217D' ||
      char === '\u217E' ||
      char === '\u217F'
    );
  }

  /**
   * Checks whether the specified character is low surrogate. A low
   * surrogate character is a 16-bit code character between `U+D800`
   * and `U+DBFF`.
   *
   * **Example:**
   * ```typescript
   * Chars.isLowSurrogate(''); // false
   * Chars.isLowSurrogate('\uDC00'); // true
   * Chars.isLowSurrogate('\uDFFF'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is low surrogate.
   *
   * @since v1.4.1
   */
  public static isLowSurrogate(char: string): boolean {
    return char.length === 1 && /[\uDC00-\uDFFF]/g.test(char);
  }

  /**
   * Checks whether the specified character is a modern digit.
   *
   * **Example:**
   * ```typescript
   * Chars.isModernDigit('0'); // true
   * Chars.isModernDigit('3'); // true
   * Chars.isModernDigit('9'); // true
   * Chars.isModernDigit('B'); // false
   * Chars.isModernDigit('z'); // false
   * Chars.isModernDigit('`'); // false
   * Chars.isModernDigit('ä'); // false
   * Chars.isModernDigit('Ö'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a modern digit.
   *
   * @since v1.4.2
   */
  public static isModernDigit(char: string): boolean {
    return char.length === 1 && char >= '0' && char <= '9';
  }

  /**
   * Checks whether the specified character is a Persian digit.
   *
   * **Example:**
   * ```typescript
   * Chars.isPersianDigit('۰'); // true
   * Chars.isPersianDigit('۱'); // true
   * Chars.isPersianDigit('۲'); // true
   * Chars.isPersianDigit('۳'); // true
   * Chars.isPersianDigit('۴'); // true
   * Chars.isPersianDigit('۵'); // true
   * Chars.isPersianDigit('۶'); // true
   * Chars.isPersianDigit('۷'); // true
   * Chars.isPersianDigit('۸'); // true
   * Chars.isPersianDigit('۹'); // true
   * Chars.isPersianDigit('9'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a Persian digit.
   *
   * @since v1.4.2
   */
  public static isPersianDigit(char: string): boolean {
    return char.length === 1 && (
      char === '\u06f0' ||
      char === '\u06f1' ||
      char === '\u06f2' ||
      char === '\u06f3' ||
      char === '\u06f4' ||
      char === '\u06f5' ||
      char === '\u06f6' ||
      char === '\u06f7' ||
      char === '\u06f8' ||
      char === '\u06f9'
    );
  }

  /**
   * Checks whether the specified character is a space character.
   *
   * **Example:**
   * ```typescript
   * Chars.isSpace(' '); // true
   * Chars.isSpace('_'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a space character.
   *
   * @since v1.4.3
   */
  public static isSpace(char: string): boolean {
    return char.length === 1 && char === Chars.SPACE;
  }

  /**
   * Checks whether the specified character is surrogate (high or low
   * surrogate).
   *
   * **Example:**
   * ```typescript
   * Chars.isSurrogate(' '); // false
   * Chars.isSurrogate('\uD800'); // true
   * Chars.isSurrogate('\uDC00'); // true
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is surrogate.
   *
   * @since v1.4.3
   */
  public static isSurrogate(char: string): boolean {
    return Chars.isLowSurrogate(char) || Chars.isHighSurrogate(char);
  }

  /**
   * Checks whether the specified characters create a surrogate pair. A
   * surrogate pair according to the [Unicode Standard](https://unicode.org/standard/standard.html)
   * is a combination of a Unicode code point from U+D800 to U+DBFF a. k.
   * a. "high surrogate" with another in range from U+DC00 to U+DFFF a. k.
   * a. "low surrogate".
   *
   * **Example:**
   * ```typescript
   * Chars.isSurrogatePair('', ''); // false
   * Chars.isSurrogatePair('\ud801', '\udc9f'); // true
   * Chars.isSurrogatePair('\ud801\udbff', '\udc9f'); // false
   * ```
   *
   * @param {String} high Contains some character.
   * @param {String} low Contains some other character.
   * @return {Boolean} whether the specified characters create a surrogate
   * pair.
   *
   * @since v1.4.3
   */
  public static isSurrogatePair(high: string, low: string): boolean {
    return Chars.isHighSurrogate(high) && Chars.isLowSurrogate(low);
  }

  /**
   * Checks whether the specified character is an upper Roman numberal.
   *
   * **Example:**
   * ```typescript
   * Chars.isUpperRomanDigit(''); false
   * Chars.isUpperRomanDigit('\u2160'); true
   * Chars.isUpperRomanDigit('\u2161'); true
   * Chars.isUpperRomanDigit('\u2169'); true
   * Chars.isUpperRomanDigit('\u216A'); true
   * Chars.isUpperRomanDigit('\u216B'); true
   * Chars.isUpperRomanDigit('\u216C'); true
   * Chars.isUpperRomanDigit('\u216F'); true
   * Chars.isUpperRomanDigit('a'); false
   * Chars.isUpperRomanDigit('0'); false
   * Chars.isUpperRomanDigit('9'); false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is an upper Roman
   * numberal.
   *
   * @since v1.4.2
   */
  public static isUpperRomanDigit(char: string): boolean {
    return char.length === 1 && (
      char === '\u2160' ||
      char === '\u2161' ||
      char === '\u2162' ||
      char === '\u2163' ||
      char === '\u2164' ||
      char === '\u2165' ||
      char === '\u2166' ||
      char === '\u2167' ||
      char === '\u2168' ||
      char === '\u2169' ||
      char === '\u216A' ||
      char === '\u216B' ||
      char === '\u216C' ||
      char === '\u216D' ||
      char === '\u216E' ||
      char === '\u216F'
    );
  }

  /**
   * Checks whether the specified character is uppercase.
   *
   * **Example:**
   * ```typescript
   * Chars.isUpperCase(''); // false
   * Chars.isUpperCase('abc'); // false
   * Chars.isUpperCase('a'); // false
   * Chars.isUpperCase('Б'); // true
   * Chars.isUpperCase('ö'); // false
   * Chars.isUpperCase('Ü'); // true
   * Chars.isUpperCase('ы'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is uppercase.
   *
   * @since v1.4.1
   */
  public static isUpperCase(char: string): boolean {
    if (char.length !== 1) return false;
    const char0 = char.charAt(0);
    if (!Number.isNaN(+char0 * 1)) return false;
    return char0 === char0.toUpperCase();
  }

  /**
   * Checks whether the specified character is a space i. e. `" "`,
   * `"\t"`, `"\r"`, `"\n"`, `"\f"`.
   *
   * **Example:**
   * ```typescript
   * Chars.isWhitespace(""); // false
   * Chars.isWhitespace(" "); // true
   * Chars.isWhitespace("\t"); // true
   * Chars.isWhitespace("\r"); // true
   * Chars.isWhitespace("\f"); // true
   * Chars.isWhitespace("\n"); // true
   * Chars.isWhitespace("\n\n"); // false
   * Chars.isWhitespace("a"); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a space.
   *
   * @since v1.4.1
   */
  public static isWhitespace(char: string): boolean {
    if (char.length !== 1) return false;
    return char === Chars.SPACE ||
      char === Chars.HT ||
      char === Chars.CR ||
      char === Chars.LF ||
      char === Chars.FF;
  }
}
