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
   * Chars.isDigit('0'); // true
   * Chars.isDigit('3'); // true
   * Chars.isDigit('5'); // true
   * Chars.isDigit('6'); // true
   * Chars.isDigit('7'); // true
   * Chars.isDigit('9'); // true
   * Chars.isDigit('B'); // false
   * Chars.isDigit('z'); // false
   * Chars.isDigit('`'); // false
   * Chars.isDigit('ä'); // false
   * Chars.isDigit('Ö'); // false
   * ```
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a digit.
   *
   * @since v1.4.1
   */
  public static isDigit(char: string): boolean {
    if (char.length !== 1) return false;
    const charCode = char.charCodeAt(0);
    return charCode > 47 && charCode < 58;
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
    if (char.length === 0 || [...char].length !== 1) return false;
    const charCode = char.charCodeAt(0);
    if (Number.isNaN(charCode)) return false;
    return 0xD800 <= charCode && charCode <= 0xDBFF;
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
    if (char.length === 0 || [...char].length !== 1) return false;
    const charCode = char.charCodeAt(0);
    if (Number.isNaN(charCode)) return false;
    return 0xDC00 <= charCode && charCode <= 0xDFFF;
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
