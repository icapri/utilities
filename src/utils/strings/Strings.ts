import { Arrays } from '../arrays/Arrays';
import { Numbers } from '../numbers/Numbers';
import { Util } from '../Util';

/**
 * Defines an abstract class with string utilities.
 */
export abstract class Strings {
  /**
   * Contains the backslash escape character "`\`".
   */
  public static readonly BACKSLASH: string = '\\' as const;

  /**
   * Contains the backspace escape character "`\b`".
   */
  public static readonly BACKSPACE: string = '\b' as const;

  /**
   * Contains the carriage return escape character "`\r`". Unicode: `000d`.
   */
  public static readonly CR: string = '\r' as const;

  /**
   * Contains the double quote escape character "`"`".
   */
  public static readonly DBL_QUOTE: string = '\"' as const;

  /**
   * Contains an empty string.
   */
  public static readonly EMPTY: string = '' as const;

  /**
   * Contains the form feed escape character "`\f`".
   */
  public static readonly FF: string = '\f' as const;

  /**
   * Contains the horizontal tabulator escape character "`\t`".
   */
  public static readonly HT: string = '\t' as const;

  /**
   * Contains the "new line" a. k. a. linefeed escape character "`\n`". Unicode: `000a`.
   */
  public static readonly LF: string = '\n' as const;

  /**
   * Contains the single quote escape character "`'`".
   */
  public static readonly SINGLE_QUOTE: string = '\'' as const;

  /**
   * Contains a white space.
   */
  public static readonly SPACE: string = ' ' as const;

  /**
   * Contains the vertical tabulator escape character "`\v`".
   */
  public static readonly VT: string = '\v' as const;

  /**
   * Gets the index returned when some sequence is not found in some
   * string.
   *
   * @private
   */
  private static readonly NOT_FOUND: number = -1 as const;

  /** @private */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Appends the given suffix to the given string in case the given string doesn't end
   * with the given suffix.
   *
   * @param str Contains some string.
   * @param suffix Contains the string suffix to be appended to the string in case it is
   * missing at the end of it.
   * @param ignoreCase Contains whether to ignore string case sensitivity. Default: `false`
   * @returns the extended string.
   */
  public static appendIfMissing(
    str: string,
    suffix: string,
    ignoreCase: boolean = false
  ) {
    if (Strings.isNilOrEmpty(suffix) || Strings.endsWith(str, suffix, ignoreCase)) {
      return str;
    }

    return str + suffix.toString();
  }

  /**
   * Capitalizes the given string.
   *
   * **Example:**
   * ```typescript
   * Strings.capitalize('john'); // John
   * Strings.capitalize('jOHN'); // JOHN
   * ```
   *
   * @param str Contains some string.
   * @returns the capitalized string.
   *
   * @see `Strings.upperFirst()`
   */
  public static capitalize(str: string) {
    if (Strings.isEmpty(str)) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Chomps the specified string i. e. removes a newline from the end
   * of the specified string if there is such one.
   *
   * **Example:**
   * ```typescript
   * const str = Strings.chomp('Lorem ipsum\r\n'); // "Lorem ipsum"
   * ```
   *
   * @param str Contains some string.
   * @returns the chomped string.
   */
  public static chomp(str: string): string {
    const length = str.length;
    if (length === 0) {
      return str;
    }

    if (length === 1) {
      if ([Strings.CR, Strings.LF].includes(str.charAt(0))) {
        return Strings.EMPTY;
      }

      return str;
    }

    let end = length - 1;
    const lastChar = str.charAt(end);
    if (lastChar === Strings.LF) {
      if (str.charAt(end - 1) === Strings.CR) {
        end--;
      }
    } else if (lastChar !== Strings.CR) {
      end++;
    }

    return str.substring(0, end);
  }

  /**
   * Removes the last character from the specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.chop(''); // ""
   * Strings.chop('Germany'); // "German"
   * ```
   *
   * @param str Contains some string.
   * @returns the string without its last character.
   */
  public static chop(str: string): string {
    const l = str.length;
    if (l <= 1) {
      return Strings.EMPTY;
    }

    const end = l - 1, r = str.substring(0, end), c = str.charAt(end);
    if (c === Strings.LF) {
      if (r.charAt(end - 1) === Strings.CR) {
        return r.substring(0, end - 1);
      }
    }

    return r;
  }

  /**
   * Compares two strings. Useful for array sorting.
   *
   * @param a Contains some string.
   * @param b Contains some other string.
   * @returns
   * * `-1` if `a` is smaller than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is greater than `b`.
   */
  public static compare(a: string, b: string): number {
    return a.localeCompare(b);
  }

  /**
   * Compares two strings by ignoring case sensitivity. Useful for
   * array sorting.
   *
   * @param a Contains some string.
   * @param b Contains some other string.
   * @returns
   * * `-1` if `a` is smaller than `b` (case-insensitive).
   * * `0`  if `a` equals `b` (case-insensitive).
   * * `1`  if `a` is greater than `b` (case-insensitive).
   */
  public static compareIgnoreCase(a: string, b: string): number {
    return Strings.compare(a.toLowerCase(), b.toLowerCase());
  }

  /**
   * Contains whether the given string contains the given sequence.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @param ignoreCase Contains whether to ignore case sensitivity.
   * @returns whether the given string contains the given sequence.
   */
  public static contains(str: string, sequence: string, ignoreCase?: boolean): boolean {
    if (ignoreCase) {
      return str.toLowerCase().includes(sequence.toLowerCase());
    }
    return str.includes(sequence);
  }

  /**
   * Checks whether the given string contains either of the given string
   * sequences.
   *
   * @param str Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string contains either of the given string
   * sequences.
   */
  public static containsAny(str: string, ...sequences: string[]): boolean {
    if (str.length === 0 || sequences.length === 0) {
      return false;
    }

    return sequences.some((sequence) => str.includes(sequence));
  }

  /**
   * Checks whether the given string contains the given sequence by ignoring
   * case sensitivity.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @returns whether the given string contains the given sequence by ignoring
   * case sensitivity.
   */
  public static containsIgnoreCase(str: string, sequence: string): boolean {
    return Strings.contains(str, sequence, true);
  }

  /**
   * Checks whether the given string contains none of the given string
   * sequences.
   *
   * @param str Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string contains none of the given string
   * sequences.
   */
  public static containsNone(str: string, ...sequences: string[]): boolean {
    if (str.length === 0 || sequences.length === 0) {
      return false;
    }

    return sequences.every((sequence) => !str.includes(sequence));
  }

  /**
   * Counts the sequences that match the given string.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @returns the number of sequence the given string matches.
   */
  public static countMatches(str: string, sequence: string): number {
    if (str.length === 0 || sequence.length === 0) {
      return 0;
    }

    const pattern = new RegExp(sequence, 'g');
    return str.match(pattern)?.length ?? 0;
  }

  /**
   * Returns the default string if the given string is empty.
   *
   * **Example:**
   * ```typescript
   * Strings.defaultIfEmpty('', '--'); // "--"
   * ```
   *
   * @param str Contains some string.
   * @param defaultStr Contains some default string.
   * @returns the default string if the given string is empty.
   */
  public static defaultIfEmpty(str: string, defaultStr: string): string {
    if (Strings.isEmpty(str)) {
      return defaultStr;
    }

    return str;
  }

  /**
   * Gets the sequence of the second string which is not contained in the
   * first string.
   *
   * @param s1 Contains some string.
   * @param s2 Contains some other string.
   * @returns the sequence of the second string which is not contained in
   * the first string.
   */
  public static difference(s1: string, s2: string): string {
    const diffIndex = Strings.indexOfDifference(s1, s2);
    if (diffIndex === Strings.NOT_FOUND) {
      return Strings.EMPTY;
    }

    if (s1.length > s2.length) {
      return s1.substring(diffIndex);
    } else {
      return s2.substring(diffIndex);
    }
  }

  /**
   * Checks whether a string ends with a given sequence.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @param ignoreCase Contains whether to ignore case sensitivity.
   * @returns whether the given string ends with the given sequence.
   */
  public static endsWith(str: string, sequence: string, ignoreCase?: boolean): boolean {
    if (Strings.isEmpty(str)) {
      return false;
    }

    if (ignoreCase) {
      return str.toLowerCase().endsWith(sequence.toLowerCase());
    }
    return str.endsWith(sequence);
  }

  /**
   * Checks whether the given string ends with either of the given
   * string sequences.
   *
   * @param str Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string ends with either of the given
   * string sequences.
   */
  public static endsWithAny(str: string, ...sequences: string[]): boolean {
    if (Strings.isEmpty(str) || Arrays.isEmpty(sequences)) {
      return false;
    }

    return sequences.some((sequence) => str.endsWith(sequence));
  }

  /**
   * Checks whether the given string ends with the given sequence (case-insensitive).
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @returns whether the given string ends with the given sequence (case-insensitive).
   */
  public static endsWithIgnoreCase(str: string, sequence: string): boolean {
    if (Strings.isEmpty(str)) {
      return false;
    }

    return Strings.endsWith(str, sequence, true);
  }

  /**
   * Checks whether the given string ends with neither of the given
   * string sequences.
   *
   * @param str Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string ends with neither of the given
   * string sequences.
   */
  public static endsWithNone(str: string, ...sequences: string[]): boolean {
    if (Strings.isEmpty(str) || Arrays.isEmpty(sequences)) {
      return false;
    }

    return sequences.every((sequence) => !str.endsWith(sequence));
  }

  /**
   * Checks whether the given strings equal.
   *
   * @param a Contains some string.
   * @param b Contains some other string.
   * @returns whether the given strings equal.
   */
  public static equals(a: string, b: string): boolean;
  public static equals(a: String, b: String): boolean;
  public static equals<T extends string | String>(a: T, b: T): boolean {
    if (Strings.isString(a) && Strings.isString(b)) {
      return a === b;
    }

    return a.valueOf() === b.valueOf();
  }

  /**
   * Checks whether the given strings equal (case-insensitive).
   *
   * @param s1 Contains some string.
   * @param s2 Contains some other string.
   * @returns whether the given strings equal
   */
  public static equalsIgnoreCase(s1: string, s2: string): boolean {
    if (s1 === s2) {
      return true;
    }

    const l1 = s1.length;
    if (l1 !== s2.length) {
      return false;
    }

    let i = 0, equal = true;
    for (; i < l1; i++) {
      if (s1.charAt(i).toLowerCase() !== s2.charAt(i).toLowerCase()) {
        equal = false;
        break;
      }
    }

    return equal;
  }

  /**
   * Checks whether the given string equals any of the given sequences.
   *
   * @param str Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the the given string equals any of the given sequences.
   */
  public static equalsAny(str: string, ...sequences: string[]): boolean {
    return sequences.some((sequence) => sequence === str);
  }

  /**
   * Checks whether the given string equals either of the given string sequences
   * by ignoring case sensitivity.
   *
   * @param str Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string equals either of the given string sequences
   * by ignoring case sensitivity.
   */
  public static equalsAnyIgnoreCase(str: string, ...sequences: string[]): boolean {
    const lowerStr = str.toLowerCase();
    return sequences.some((sequence) => sequence.toLowerCase() === lowerStr);
  }

  /**
   * Gets the string bytes.
   *
   * @param str Contains some string.
   * @returns the string bytes.
   */
  public static getBytes(str: string): number {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(str).length;
  }

  /**
   * Gets the hash code from the given string.
   *
   * @param str Contains some string.
   * @returns the hash code.
   */
  public static hashCode(str: string): number {
    let hash = 0, i, charCode, length = str.length;
    for (i = 0; i < length; i++) {
      charCode = str.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      // convert the hash to a 32-bit integer
      hash |= 0;
    }
    return hash;
  }

  /**
   * Checks whether the given string has whitespaces.
   *
   * **Example:**
   * ```typescript
   * Strings.hasWhitespace('Lorem'); // false
   * Strings.hasWhitespace('Lor em'); // true
   * Strings.hasWhitespace('Lorem\n'); // true
   * Strings.hasWhitespace('Lorem\r'); // true
   * Strings.hasWhitespace('Lorem\t'); // true
   * Strings.hasWhitespace('Lorem\f'); // true
   * Strings.hasWhitespace(''); // false
   * ```
   *
   * @param str Contains some string.
   * @returns whether the given string has whitespaces.
   */
  public static hasWhitespace(str: string): boolean {
    if (Strings.isEmpty(str)) {
      return false;
    }

    const l = str.length;
    if (l === 1) {
      const c = str.charAt(0);
      if (Strings.isSpaceChar(c)) {
        return true;
      }
    }

    let i = l, r = false;
    while (i > 0) {
      const c = str.charAt(--i);
      if (Strings.isSpaceChar(c)) {
        r = true;
        break;
      }
    }

    return r;
  }

  /**
   * Gets the index of the given sequence in the given string. If
   * the given sequence is not contained in the given string, -1 is
   * returned.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the index at which to begin searching
   * the String object. If omitted, search starts at the beginning
   * of the string.
   * @returns the index of the given sequence in the given string. If
   * the given sequence is not contained in the given string, -1 is
   * returned.
   */
  public static indexOf(str: string, sequence: string, position?: number): number {
    return str.indexOf(sequence, position);
  }

  /**
   * Gets the first index of any of the given sequences in the given string.
   *
   * @param str Contains some string.
   * @param sequences Contains some string sequences.
   * @returns the first index of any of the given sequences in the given string.
   */
  public static indexOfAny(str: string, ...sequences: string[]): number {
    if (str.length === 0 || sequences.length === 0) {
      return Strings.NOT_FOUND;
    }

    let j = 0, r = -1;
    while (j < sequences.length) {
      const s = sequences[j++], sIndex = Strings.indexOf(str, s);
      if (sIndex >= 0) {
        r = sIndex;
        break;
      }
    }

    return r;
  }

  /**
   * Gets the first index at which the characters of both strings begin to differ.
   *
   * @param str1 Contains some string.
   * @param str2 Contains some other string.
   * @returns the index at which the characters of both strings begin to differ.
   */
  public static indexOfDifference(str1: string, str2: string): number {
    if (str1 !== str2) {
      let i, l1 = str1.length, l2 = str2.length;
      for (i = 0; i < l1 && i < l2; ++i) {
        if (str1.charAt(i) !== str2.charAt(i)) {
          break;
        }
      }

      if (i < l2 || i < l1) {
        return i;
      }
    }

    return Strings.NOT_FOUND;
  }

  /**
   * Gets the index of the given sequence in the given string (case-insensitive).
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the string index at which to begin starting in
   * the given string.
   * @returns the index of the given sequence in the given string (case-insensitive).
   */
  public static indexOfIgnoreCase(str: string, sequence: string, position?: number): number {
    return str.toLowerCase().indexOf(sequence.toLowerCase(), position);
  }

  /**
   * Checks whether the specified string is all blank i. e. white space.
   *
   * **Example:**
   * ```typescript
   * Strings.isAllBlank(''); // true
   * Strings.isAllBlank(' '); // true
   * Strings.isAllBlank('\n'); // true
   * Strings.isAllBlank('\t'); // true
   * Strings.isAllBlank('\r'); // true
   * Strings.isAllBlank('\f'); // true
   * Strings.isAllBlank('\f\n'); // true
   * Strings.isAllBlank('\f\r'); // true
   * Strings.isAllBlank('\t\r\f'); // true
   * Strings.isAllBlank('\f\t\r\n\n'); // true
   * Strings.isAllBlank('\f\t\r\n\na'); // false
   * ```
   *
   * @param str Contains some string.
   * @returns whether the specified string is all blank i. e. white space.
   *
   * @see `Strings.isWhitespace()`
   */
  public static isAllBlank(str: string): boolean {
    return Strings.isWhitespace(str);
  }

  /**
   * Checks whether the given string is binary i. e. each character of the
   * string occupies only one byte.
   *
   * **Example:**
   * ```typescript
   * const str = '☻';
   * console.log(Strings.isBinary(str)); // false
   * ```
   *
   * @param str Contains some string.
   * @returns whether each character of the string occupies only one byte.
   */
  public static isBinary(str: string) {
    return !/[^\u0000-\u00ff]/.test(str);
  }

  /**
   * Checks whether the given string is empty/blank.
   *
   * @param str Contains some string.
   * @returns whether the given string is empty/blank.
   */
  public static isBlank(str: string): boolean {
    return Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is empty/blank.
   *
   * @param str Contains some string.
   * @returns whether the given string is empty/blank.
   */
  public static isEmpty(str: string): boolean {
    return str.length === 0;
  }

  /**
   * Checks whether the given string is lower case.
   *
   * @param s Contains some string.
   * @returns whether the given string is lower case.
   */
  public static isLowerCase(s: string): boolean {
    let i, result = true;
    for (i = 0; i < s.length; i++) {
      const c = s.charAt(i);
      if (Strings.isNumeric(c)) {
        continue;
      }

      if (c !== c.toLowerCase()) {
        result = false;
      }
    }

    return result;
  }

  /**
   * Checks  whether the given string value is `null`, `undefined` or `""`.
   *
   * @param str Contains some string.
   * @returns whether the given string value is `null`, `undefined` or `""`.
   */
  public static isNilOrEmpty(str?: string | null | undefined): str is null | undefined {
    if (Util.isNullOrUndefined(str)) {
      return true;
    }

    return Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is `null`, `undefined` or white space.
   *
   * @param str Contains some string.
   * @returns whether the given string is `null`, `undefined` or white space.
   */
  public static isNilOrWhitespace(str?: string | null): str is null {
    if (Util.isNullOrUndefined(str)) {
      return true;
    }

    return Strings.isWhitespace(str);
  }

  /**
   * Checks whether the given string is not empty.
   *
   * @param str Contains some string.
   * @returns whether the given string is not empty.
   */
  public static isNotEmpty(str: string): boolean {
    return !Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is `null` or `""`.
   *
   * @param str Contains some string.
   * @returns whether the given string is `null` or `""`.
   */
  public static isNullOrEmpty(str: string | null): str is null {
    if (Util.isNull(str)) {
      return true;
    }

    return Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is `null` or white space.
   *
   * @param str Contains some string.
   * @returns whether the given string is `null` or white space.
   */
  public static isNullOrWhitespace(str: string | null): str is null {
    if (Util.isNull(str)) {
      return true;
    }

    return Strings.isWhitespace(str);
  }

  /**
   * Checks whether the given string represents a stringified number.
   *
   * @param str Contains some string.
   * @returns whether the given string represents a stringified number.
   */
  public static isNumeric(str: string) {
    return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
  }

  /**
   * Checks whether the specified character is a space i. e. `" "`,
   * `"\t"`, `"\r"`, `"\n"`, `"\f"`.
   *
   * @param char Contains some character.
   * @returns whether the specified character is a space.
   */
  public static isSpaceChar(char: string): boolean {
    return char === Strings.SPACE
      || char === Strings.HT
      || char === Strings.CR
      || char === Strings.LF
      || char === Strings.FF;
  }

  /**
   * Checks whether the given value is a string.
   *
   * @param s Contains some value.
   * @returns whether the given value is a string.
   */
  public static isString(s?: any): s is string {
    return typeof s === 'string';
  }

  /**
   * Checks whether the given value is a string object i. e. `String`.
   *
   * @param s Contains some value.
   * @returns whether the given value is a string object.
   */
  public static isStringObject(s?: any): s is String {
    const proto = Object.prototype.toString.call(s);
    return proto === '[object String]' && typeof s === 'object';
  }

  /**
   * Checks whether the given string is upper case.
   *
   * @param str Contains some string.
   * @returns whether the given string is upper case.
   */
  public static isUpperCase(str: string): boolean {
    let i, result = true;
    for (i = 0; i < str.length; i++) {
      const c = str.charAt(i);
      if (Strings.isNumeric(c)) {
        continue;
      }

      if (c !== c.toUpperCase()) {
        result = false;
      }
    }

    return result;
  }

  /**
   * Checks whether the specified string is all blank i. e. white space.
   *
   * **Example:**
   * ```typescript
   * Strings.isWhitespace(''); // true
   * Strings.isWhitespace(' '); // true
   * Strings.isWhitespace('\n'); // true
   * Strings.isWhitespace('\t'); // true
   * Strings.isWhitespace('\r'); // true
   * Strings.isWhitespace('\f'); // true
   * Strings.isWhitespace('\f\n'); // true
   * Strings.isWhitespace('\f\r'); // true
   * Strings.isWhitespace('\t\r\f'); // true
   * Strings.isWhitespace('\f\t\r\n\n'); // true
   * Strings.isWhitespace('\f\t\r\n\na'); // false
   * ```
   *
   * @param str Contains some string.
   * @returns whether the specified string is all blank i. e. white space.
   *
   * @see `Strings.isAllBlank()`
   */
  public static isWhitespace(str: string): boolean {
    if (Strings.isEmpty(str)) {
      return true;
    }

    const l = str.length;
    if (l === 1) {
      const c = str.charAt(0);
      if (Strings.isSpaceChar(c)) {
        return true;
      }
    }

    let i = l, r = true;
    while (i > 0) {
      const c = str.charAt(--i);
      if (!Strings.isSpaceChar(c)) {
        r = false;
        break;
      }
    }

    return r;
  }

  /**
   * Joins a given string with other strings.
   *
   * @param str Contains some string.
   * @param otherStrs Contains some other strings.
   * @returns a string composed of a concatenation of all the given strings.
   */
  public static join(str: string, ...otherStrs: string[]): string {
    return str.concat(otherStrs.join(''));
  }

  /**
   * Gets the last index at which the given string sequence is located in the
   * given string.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the index at which to begin searching in the given
   * string. If omitted, the search begins at the end of the string.
   * @returns the last index at which the given string sequence is located in the
   * given string.
   */
  public static lastIndexOf(str: string, sequence: string, position?: number): number {
    return str.lastIndexOf(sequence, position)
  }

  /**
   * Gets the last index at which the given string sequence is located in the
   * given string (case-insensitive).
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the last index at which to begin searching in the given
   * string. If omitted, the search begins at the end of the string.
   * @returns the last index at which the given string sequence is located in the
   * given string (case-insensitive).
   */
  public static lastIndexOfIgnoreCase(str: string, sequence: string, position?: number): number {
    return str.toLowerCase().lastIndexOf(sequence.toLowerCase(), position);
  }

  /**
   * Gets the `length` leftmost characters of the given string.
   *
   * @param str Contains some string.
   * @param length Contains the number of strings to take from the string end.
   * @returns the last `length` characters of the string as a substring.
   */
  public static left(str: string, length: number): string {
    if (length < 0) {
      return Strings.EMPTY;
    }
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length);
  }

  /**
   * Gets the longest of the given strings.
   *
   * @param strs Contains some strings.
   * @returns the longest of the given strings.
   */
  public static longest(...strs: string[]): string {
    let longestStr = Strings.EMPTY;
    for (let str of strs) {
      if (str.length > longestStr.length) {
        longestStr = str;
      }
    }

    return longestStr;
  }

  /**
   * Converts the given string to upper case.
   *
   * @param str Contains some string.
   * @returns the string converted to upper case.
   */
  public static lowerCase(str: string): string {
    return str.toLowerCase();
  }

  /**
   * Normalizes the string white spaces i. e. if there are more than one consecutive
   * white space, only one of them remains.
   * **Example:**
   * ```typescript
   * const str1 = '  Lorem  ipsum dolor sit ';
   * const str2 = Strings.normalize(str1);
   * console.log(str2); // "Lorem ipsum dolor sit"
   * ```
   *
   * @param str Contains some string.
   * @param to Contains the value to show in case the string is `null`, `undefined`
   * or white space. Defaults to `""`.
   * @returns the normalized string.
   */
  public static normalize(str: string, to: null): string | null;
  public static normalize(str: string, to: undefined): string | undefined;
  public static normalize(str: string, to: ''): string;
  public static normalize(str: string, to: null | undefined | '' = ''): string | null | undefined {
    str = str.trim();
    if (Strings.isEmpty(str)) {
      return to;
    }

    return str.replace(/\s+/g, ' ');
  }

  /**
   * Appends the given prefix to the beginning of the given string.
   *
   * @param str Contains some string.
   * @param prefix Contains some string prefix.
   * @returns the string prepended by the given prefix.
   */
  public static prepend(str: string, prefix: string): string {
    return prefix.concat(str);
  }

  /**
   * Appends the given string sequence to the beginning of the string in
   * case the string does not begin with it.
   *
   * @param str Contains some string.
   * @param prefix Contains some string prefix.
   * @param ignoreCase Contains whether to ignore case sensitivity.
   * @returns the extended string.
   */
  public static prependIfMissing(str: string, prefix: string, ignoreCase: boolean) {
    if (Strings.isEmpty(prefix) || Strings.startsWith(str, prefix, ignoreCase)) {
      return str;
    }

    return prefix.concat(str);
  }

  /**
   * Appends the given string sequence to the beginning of the string in
   * case the string does not begin with it (case-insensitive).
   *
   * @param str Contains some string.
   * @param prefix Contains some string prefix.
   * @returns the extended string.
   */
  public static prependIfMissingIgnoreCase(str: string, prefix: string): string {
    return Strings.prependIfMissing(str, prefix, true);
  }

  /**
   * Removes all the string sequences which match the given sequence.
   *
   * @param str Contains some string.
   * @param sequence Contains some sequence to be removed from the given string.
   * @returns the string without the given sequence.
   */
  public static remove(str: string, sequence: string): string {
    if (Strings.isEmpty(str) || Strings.isEmpty(sequence)) {
      return str;
    }

    if (str.indexOf(sequence) === Strings.NOT_FOUND) {
      return str;
    }

    const regex = new RegExp(sequence, 'gm');
    return str.replace(regex, '');
  }

  /**
   * Removes the given sequence from the given string if the string ends with
   * it; otherwise simply returns the given string.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @returns the string without the given sequence in case it ends with it;
   * otherwise the given string is returned.
   */
  public static removeEnd(str: string, sequence: string): string {
    if (Strings.isEmpty(str) || Strings.isEmpty(sequence)) {
      return str;
    }
    if (str.endsWith(sequence)) {
      return str.substring(0, str.length - sequence.length);
    }
    return str;
  }

  /**
   * Removes the given sequence from the given string if the string ends with
   * it; otherwise simply returns the given string (case-insensitive).
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @returns the string without the given sequence in case it ends with it;
   * otherwise the given string is returned (case-insensitive).
   */
  public static removeEndIgnoreCase(str: string, sequence: string): string {
    if (Strings.isEmpty(str) || Strings.isEmpty(sequence)) {
      return str;
    }
    if (Strings.endsWithIgnoreCase(str, sequence)) {
      return str.substring(0, str.length - sequence.length);
    }
    return str;
  }

  /**
   * Removes white spaces from the given string.
   *
   * @param str Contains some string.
   * @returns the string without white space.
   */
  public static removeWhitespace(str: string) {
    if (Strings.isEmpty(str)) {
      return str;
    }

    return str.replace(/\s/g, '');
  }

  /**
   * Repeats the given string the given number of times.
   *
   * @param str Contains some string.
   * @param times Contains the number of times to repeat the given string.
   * @returns the `times`-repeated string.
   */
  public static repeat(str: string, times: number): string {
    if (Strings.isEmpty(str) || !Numbers.isPositiveInteger(times)) {
      return Strings.EMPTY;
    }

    return Array(times + 1).join(str);
  }

  /**
   * Checks whether the given string ends with the given string sequence.
   *
   * @param str Contains some string.
   * @param sequence Contains some string sequence.
   * @param ignoreCase Contains whether to ignore case-sensitivity.
   * @param position Contains the index at which to begin searching
   * in the given string. If omitted, it starts with the string end.
   * @returns whether the given string ends with the given string sequence.
   */
  public static startsWith(str: string, sequence: string, ignoreCase: boolean, position?: number): boolean {
    if (ignoreCase) {
      return str.toLowerCase().startsWith(sequence.toLowerCase(), position);
    }
    return str.startsWith(sequence, position);
  }

  /**
   * Removes white spaces from the beginning and from the end of the given
   * string.
   *
   * @param str Contains some string.
   * @returns the trimmed string.
   */
  public static strip(str: string): string {
    return str.trim();
  }

  /**
   * Converts the given string to title case.
   *
   * Adapted from
   * [this StackOverflow Question](https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript).
   * @param str Contains some string.
   * @returns the title case string.
   */
  public static toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function (s) {
        return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
      }
    );
  }

  /**
   * Removes white spaces from the beginning and from the end of the given
   * string.
   *
   * @param str Contains some string.
   * @returns the trimmed string.
   */
  public static trim(str: string): string {
    if (Strings.isEmpty(str)) {
      return str;
    }
    return str.trim();
  }

  /**
   * Truncates the given string to the given number of chars. The rest
   * of the chars is replaced by "...".
   *
   * @param str Contains some string.
   * @param maxChars Contains the max number of chars to show.
   * @returns the truncated string.
   */
  public static truncate(str: string, maxChars: number): string {
    if (maxChars < 0 || !Numbers.isNaturalNumber(maxChars)) {
      throw new TypeError(`Invalid string max length: ${maxChars}.`);
    }

    if (str.length > maxChars) {
      return `${str.substring(0, maxChars - 1)}\u2026`;
    }

    return str;
  }

  /**
   * Converts the given string to upper case.
   *
   * @param str Contains some string.
   * @returns the string converted to upper case.
   */
  public static upperCase(str: string): string {
    return str.toUpperCase();
  }

  /**
   * Capitalizes the specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.upperFirst('john'); // John
   * Strings.upperFirst('jOHN'); // JOHN
   * ```
   *
   * @param str Contains some string.
   * @returns the capitalized string.
   *
   * @see `Strings.capitalize()`
   */
  public static upperFirst(str: string): string {
    return Strings.capitalize(str);
  }
}
