import {Arrays} from '../arrays/Arrays';
import {Numbers} from '../numbers/Numbers';
import {Utils} from '../Utils';

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
   * Contains the "new line" a. k. a. linefeed escape character "`\n`".
   * Unicode: `000a`.
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
   * Abbreviates the specified string to the given number of characters.
   *
   * **Example:**
   * ```typescript
   * Strings.abbreviate("", 2); // ""
   * Strings.abbreviate("a", 1); // "a"
   * Strings.abbreviate("abc", 2); // "ab..."
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} maxLength Contains the maximal number of characters to
   * show from the specified string.
   * @param {String} marker Contains the abbreviation marker. Defaults to
   * ellipsis `"..."`.
   * @return {String} the abbreviated string.
   */
  public static abbreviate(
      str: string, maxLength: number, marker: string = '...'): string {
    const length = str.length;
    if (length === 0) {
      return str;
    }

    if (length <= maxLength || Numbers.isNatural(maxLength) === false) {
      return str;
    }

    return str.slice(0, maxLength) + marker;
  }

  /**
   * Appends the given suffix to the given string in case the given string
   * doesn't end with the given suffix.
   *
   * @param {String} str Contains some string.
   * @param {String} suffix Contains the string suffix to be appended to the
   * string in case it is missing at the end of it.
   * @param {Boolean} ignoreCase Contains whether to ignore string case
   * sensitivity. Default: `false`
   * @return {String} the extended string.
   */
  public static appendIfMissing(
      str: string,
      suffix: string,
      ignoreCase: boolean = false,
  ): string {
    if (Strings.isNilOrEmpty(suffix) ||
      Strings.endsWith(str, suffix, ignoreCase)) {
      return str;
    }

    return str + suffix.toString();
  }

  /**
   * Gets the character at the specified position in the given string.
   *
   * @param {String} str Contains some string.
   * @param {Number} index Contains the index of the character to be returned.
   * @return {String} the character at the specified position in the given
   * string.
   */
  public static at(str: string, index: number): string {
    const l = str.length;
    if (l > 0 && Numbers.isNatural(index) && index < l) {
      return str.charAt(index);
    }

    return Strings.EMPTY;
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
   * @param {String} str Contains some string.
   * @return {String} the capitalized string.
   *
   * @see `Strings.upperFirst()`
   */
  public static capitalize(str: string): string {
    if (Strings.isEmpty(str)) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Capitalizes the first letter of the specified string and then converts
   * the rest of the string to lower case.
   *
   * **Example:
   * ```typescript
   * Strings.capitalizeFirstLetter(""); // ""
   * Strings.capitalizeFirstLetter("abc"); // "Abc"
   * Strings.capitalizeFirstLetter("aBc"); // "Abc"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string where the first letter is capitalized
   * and the rest of the letters are converted to lower case.
   */
  public static capitalizeFirstLetter(str: string): string {
    if (str.length === 0) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
   * @param {String} str Contains some string.
   * @return {String} the chomped string.
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
   * @param {String} str Contains some string.
   * @return {String} the string without its last character.
   */
  public static chop(str: string): string {
    const l = str.length;
    if (l <= 1) {
      return Strings.EMPTY;
    }

    const end = l - 1;
    const r = str.substring(0, end);
    if (str.charAt(end) === Strings.LF) {
      if (r.charAt(end - 1) === Strings.CR) {
        return r.substring(0, end - 1);
      }
    }

    return r;
  }

  /**
   * Compares two strings. Useful for array sorting.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Number}
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
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Number}
   * * `-1` if `a` is smaller than `b` (case-insensitive).
   * * `0`  if `a` equals `b` (case-insensitive).
   * * `1`  if `a` is greater than `b` (case-insensitive).
   */
  public static compareIgnoreCase(a: string, b: string): number {
    return Strings.compare(a.toLowerCase(), b.toLowerCase());
  }

  /**
   * Contains whether the specified string contains the given sequence.
   *
   * **Example:**
   * ```typescript
   * Strings.contains("", ""); // true
   * Strings.contains(" ", ""); // true
   * Strings.contains("abc", "bc"); // true
   * Strings.contains("abc", "BC"); // false
   * Strings.contains("aBc", "bC", true); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * Defaults to `false`.
   * @return {Boolean} whether the given string contains the given sequence.
   */
  public static contains(
      str: string,
      sequence: string,
      ignoreCase?: boolean,
  ): boolean {
    ignoreCase ??= false;
    const l = str.length;
    const n = sequence.length;
    if (n === 0) {
      return true;
    }

    if (n <= l) {
      let i = 0; let j = l - 1;
      while (i <= j) {
        let ci; let cj; let cs;
        if (ignoreCase) {
          ci = str.charAt(i).toLowerCase();
          cj = str.charAt(j).toLowerCase();
          cs = sequence.charAt(0).toLowerCase();
        } else {
          ci = str.charAt(i);
          cj = str.charAt(j);
          cs = sequence.charAt(0);
        }

        if (ci === cs) {
          if (n <= l - i) {
            const ic = str.substring(i, i + n);
            const a = ignoreCase ? ic.toLowerCase() : ic;
            const b = ignoreCase ? sequence.toLowerCase() : sequence;
            if (a === b) {
              return true;
            }
          }
        } else if (cj === cs) {
          if (n <= l - j + 1) {
            const ic = str.substring(j, j + n);
            const a = ignoreCase ? ic.toLowerCase() : ic;
            const b = ignoreCase ? sequence.toLowerCase() : sequence;
            if (a === b) {
              return true;
            }
          }
        }
        i++; j--;
      }
    }

    return false;
  }

  /**
   * Checks whether the specified string contains either of the given string
   * sequences.
   *
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Boolean} whether the given string contains either of the
   * given string sequences.
   */
  public static containsAny(str: string, ...sequences: string[]): boolean {
    if (sequences.length > 0) {
      let i = 0;
      while (i < sequences.length) {
        if (Strings.contains(str, sequences[i++])) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks whether the specified string contains the given sequence by ignoring
   * case sensitivity.
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Boolean} whether the given string contains the given sequence
   * by ignoring case sensitivity.
   */
  public static containsIgnoreCase(str: string, sequence: string): boolean {
    return Strings.contains(str, sequence, true);
  }

  /**
   * Checks whether the specified string contains none of the given string
   * sequences.
   *
   * **Example:**
   * ```typescript
   * Strings.containsNone("abc"); // true
   * Strings.containsNone("", "de", "bc"); // true
   * Strings.containsNone("abc", "de", "bc"); // false
   * Strings.containsNone("abc", "de", "fg"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Boolean} whether the specified string contains none of the given
   * string sequences.
   */
  public static containsNone(str: string, ...sequences: string[]): boolean {
    if (sequences.length > 0) {
      let i = 0;
      while (i < sequences.length) {
        if (Strings.contains(str, sequences[i++])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Gets the number of times the specified string sequence appears in the
   * specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.countMatches('', ''); // 0
   * Strings.countMatches('', 'ho'); // 0
   * Strings.countMatches('ho', ''); // 0
   * Strings.countMatches('ho ho ho', 'ho'); // 3
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Number} the number of sequence the given string matches.
   */
  public static countMatches(str: string, sequence: string): number {
    let r = 0;
    const l = str.length;
    const sl = sequence.length;
    let i = 0;

    if (l === 0 || sl === 0 || sl > l) {
      return r;
    }

    if (l === sl) {
      return str === sequence ? 1 : 0;
    }

    // now the length of the string is greater than that of the sequence
    while (i < l) {
      const c = str.charAt(i);
      const cs = sequence.charAt(0);
      if (c === cs) {
        // check whether the remaining length of the string is at least equal
        // the length of the specified sequence
        const rem = l - i;
        if (sl <= rem) {
          // now substring the specified string to the length of the sequence
          // to check whether they are equal
          const s = str.substring(i, i + sl);
          if (s === sequence) {
            r++;
          }
        }
      }

      i++;
    }

    return r;
  }

  /**
   * Returns the default string if the given string is empty.
   *
   * **Example:**
   * ```typescript
   * Strings.defaultIfEmpty('', '--'); // "--"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} defaultStr Contains some default string.
   * @return {String} the default string if the given string is empty.
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
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {String} the sequence of the second string which is not
   * contained in the first string.
   */
  public static difference(str1: string, str2: string): string {
    const diffIndex = Strings.indexOfDifference(str1, str2);
    if (diffIndex === Strings.NOT_FOUND) {
      return Strings.EMPTY;
    }

    if (str1.length > str2.length) {
      return str1.substring(diffIndex);
    } else {
      return str2.substring(diffIndex);
    }
  }

  /**
   * Checks whether a string ends with a given sequence.
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * @return {Boolean} whether the given string ends with the given sequence.
   */
  public static endsWith(
      str: string, sequence: string, ignoreCase?: boolean): boolean {
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
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Boolean} whether the given string ends with either of the given
   * string sequences.
   */
  public static endsWithAny(str: string, ...sequences: string[]): boolean {
    if (Strings.isEmpty(str) || Arrays.isEmpty(sequences)) {
      return false;
    }

    return sequences.some((sequence) => str.endsWith(sequence));
  }

  /**
   * Checks whether the given string ends with the given sequence
   * (case-insensitive).
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Boolean} whether the given string ends with the given
   * sequence (case-insensitive).
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
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Boolean} whether the given string ends with neither of
   * the given string sequences.
   */
  public static endsWithNone(str: string, ...sequences: string[]): boolean {
    if (Strings.isEmpty(str) || Arrays.isEmpty(sequences)) {
      return false;
    }

    return sequences.every((sequence) => str.endsWith(sequence) === false);
  }

  /**
   * Checks whether the given strings equal.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Boolean} whether the given strings equal.
   */
  public static equals(a: string, b: string): boolean;
  /**
   * Checks whether the given strings equal.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Boolean} whether the given strings equal.
   */
  public static equals(a: String, b: String): boolean;
  /**
   * Checks whether the given strings equal.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Boolean} whether the given strings equal.
   */
  public static equals<T extends string | String>(a: T, b: T): boolean {
    if (Strings.isString(a) && Strings.isString(b)) {
      return a === b;
    }

    return a.valueOf() === b.valueOf();
  }

  /**
   * Checks whether the given strings equal (case-insensitive).
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {Boolean} whether the given strings equal
   */
  public static equalsIgnoreCase(str1: string, str2: string): boolean {
    if (str1 === str2) {
      return true;
    }

    const l1 = str1.length;
    if (l1 !== str2.length) {
      return false;
    }

    let i = 0;
    let equal = true;
    for (; i < l1; i++) {
      if (str1.charAt(i).toLowerCase() !== str2.charAt(i).toLowerCase()) {
        equal = false;
        break;
      }
    }

    return equal;
  }

  /**
   * Checks whether the given string equals any of the given sequences.
   *
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Boolean} whether the the given string equals any of the
   * given sequences.
   */
  public static equalsAny(str: string, ...sequences: string[]): boolean {
    return sequences.some((sequence) => sequence === str);
  }

  /**
   * Checks whether the given string equals either of the given string
   * sequences by ignoring case sensitivity.
   *
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Boolean} whether the given string equals either of the given
   * string sequences by ignoring case sensitivity.
   */
  public static equalsAnyIgnoreCase(
      str: string, ...sequences: string[]): boolean {
    const lowerStr = str.toLowerCase();
    return sequences.some((sequence) => sequence.toLowerCase() === lowerStr);
  }

  /**
   * Gets the string bytes.
   *
   * @param {String} str Contains some string.
   * @return {Number} the string bytes.
   */
  public static getBytes(str: string): number {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(str).length;
  }

  /**
   * Checks whether the specified string contains the specified character.
   *
   * **Example:**
   * ```typescript
   * Strings.hasChar('abc', ''); // false
   * Strings.hasChar('', ''); // false
   * Strings.hasChar('', 'a'); // false
   * Strings.hasChar('', 'ab'); // false
   * Strings.hasChar('abc', 'b'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified string contains the specified
   * character.
   */
  public static hasChar(str: string, char: string): boolean {
    const l = str.length;
    let i = 0;
    let j = l - 1;

    if (l === 0 || char.length !== 1) {
      return false;
    }

    while (i <= j) {
      if (str.charAt(i++) === char || str.charAt(j--) === char) {
        return true;
      }
    }

    return false;
  }

  /**
   * Gets the hash code from the given string.
   *
   * @param {String} str Contains some string.
   * @return {Number} the hash code.
   */
  public static hashCode(str: string): number {
    let hash = 0; let i; let charCode; const length = str.length;
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
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string has whitespaces.
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

    let i = 0;
    let j = l - 1;

    while (i <= j) {
      if (Strings.isSpaceChar(str.charAt(i++)) ||
        Strings.isSpaceChar(str.charAt(j--))) {
        return true;
      }
    }

    return false;
  }

  /**
   * Gets the index of the given sequence in the given string. If
   * the given sequence is not contained in the given string, -1 is
   * returned.
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Number} the index of the given sequence in the given string. If
   * the given sequence is not contained in the given string, -1 is
   * returned.
   */
  public static indexOf(str: string, sequence: string): number {
    const len = str.length; const sqLen = sequence.length;
    // if both the string and the sequence are empty, return 0;
    if (len === 0 && sqLen === 0) {
      return 0;
    }

    if (len === 1 && sqLen === 1) {
      return str.charAt(0) === sequence.charAt(0) ? 0 : Strings.NOT_FOUND;
    }

    // if the length of the sequence is greater than the length of the string
    // it doesn't seem to be found somewhere in the specified string
    if (sqLen > len) {
      return Strings.NOT_FOUND;
    }

    let i = 0;
    let res = Strings.NOT_FOUND;

    // this is the case where the length of the specified string is >=
    // the length of the sequence
    while (i < len) {
      const cStr = str.charAt(i);
      const cSeq = sequence.charAt(0);
      if (cStr === cSeq) {
        // check whether the remaining length of the string is at least equal
        // the length of the specified sequence
        const strRem = len - i;
        if (sqLen <= strRem) {
          // now substring the specified string to the length of the sequence
          // to check whether they are equal
          const s = str.substring(i, i + sqLen);
          if (s === sequence) {
            res = i;
            break;
          }
        }
      }

      i++;
    }

    return res;
  }

  /**
   * Gets the first index of any of the given sequences in the specified string.
   *
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Number} the first index of any of the given sequences in the
   * specified string.
   */
  public static indexOfAny(str: string, ...sequences: string[]): number {
    if (str.length === 0 || sequences.length === 0) {
      return Strings.NOT_FOUND;
    }

    let j = 0; let r = -1;
    while (j < sequences.length) {
      const s = sequences[j++]; const sIndex = Strings.indexOf(str, s);
      if (sIndex >= 0) {
        r = sIndex;
        break;
      }
    }

    return r;
  }

  /**
   * Gets the first index at which the characters of both strings begin
   * to differ.
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {Number} the index at which the characters of both strings
   * begin to differ.
   */
  public static indexOfDifference(str1: string, str2: string): number {
    if (str1 !== str2) {
      let i;
      const l1 = str1.length;
      const l2 = str2.length;

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
   * Gets the index of the given sequence in the given string
   * (case-insensitive).
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Number} the index of the given sequence in the given
   * string (case-insensitive).
   */
  public static indexOfIgnoreCase(str: string, sequence: string): number {
    const len = str.length;
    const sqLen = sequence.length;
    const sqLower = sequence.toLowerCase();
    const sq1st = sequence.charAt(0).toLowerCase();

    // if both the string and the sequence are empty, return 0;
    if (len === 0 && sqLen === 0) {
      return 0;
    }

    if (len === 1 && sqLen === 1) {
      return str.charAt(0).toLowerCase() === sq1st ? 0 : Strings.NOT_FOUND;
    }

    // if the length of the sequence is greater than the length of the string
    // it doesn't seem to be found somewhere in the specified string
    if (sqLen > len) {
      return Strings.NOT_FOUND;
    }

    let i = 0;
    let res = Strings.NOT_FOUND;

    // this is the case where the length of the specified string is >=
    // the length of the sequence
    while (i < len) {
      const cStr = str.charAt(i).toLowerCase();
      const cSeq = sq1st;
      if (cStr === cSeq) {
        // check whether the remaining length of the string is at least equal
        // the length of the specified sequence
        const strRem = len - i;
        if (sqLen <= strRem) {
          // now substring the specified string to the length of the sequence
          // to check whether they are equal
          if (str.substring(i, i + sqLen).toLowerCase() === sqLower) {
            res = i;
            break;
          }
        }
      }

      i++;
    }

    return res;
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
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is all blank i. e.
   * white space.
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
   * Strings.isBinary('☻'); // false
   * Strings.isBinary(''); // true
   * Strings.isBinary('abc'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether each character of the string occupies only
   * one byte.
   */
  public static isBinary(str: string): boolean {
    return /[^\u0000-\u00ff]/.test(str) === false;
  }

  /**
   * Checks whether the given string is empty/blank.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is empty/blank.
   */
  public static isBlank(str: string): boolean {
    return Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is empty/blank.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is empty/blank.
   */
  public static isEmpty(str: string): boolean {
    return str.length === 0;
  }

  /**
   * Checks whether the string character at the specified index is high
   * surrogate. A high surrogate character is a 16-bit code character
   * between `U+D800` and `U+DBFF`.
   *
   * @param {String} str Contains some string.
   * @param {Number} index Contains the index of the character to be checked
   * whether it is low surrogate.
   * @return {Boolean} whether the string character at the specified index is
   * low surrogate.
   */
  public static isHighSurrogate(str: string, index: number): boolean {
    if (index >= str.length - 1 || Strings.isEmpty(str)) {
      return false;
    }

    const charCode = str.charCodeAt(index);
    if (Number.isNaN(charCode)) {
      return false;
    }

    return 0xD800 <= charCode && charCode <= 0xDBFF;
  }

  /**
   * Checks whether all the characters of the specified string are
   * lowercase.
   *
   * **Example:**
   * ```typescript
   * Strings.isLowerCase(""); // true
   * Strings.isLowerCase("123"); // true
   * Strings.isLowerCase("abc"); // true
   * Strings.isLowerCase("Abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether all the characters of the specified
   * string are lowercase.
   */
  public static isLowerCase(str: string): boolean {
    let i = 0;
    let j = str.length - 1;
    while (i <= j) {
      const ci = str.charAt(i++);
      if (ci !== ci.toLowerCase()) {
        return false;
      }
      const cj = str.charAt(j--);
      if (cj !== cj.toLowerCase()) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks whether the string character at the specified index is a
   * low surrogate. A low surrogate character is a 16-bit code character
   * between `U+D800` and `U+DBFF`.
   *
   * @param {String} str Contains some string.
   * @param {Number} index Contains the index of the character to be checked
   * whether it is low surrogate.
   * @return {Boolean} whether the string character at the specified index is
   * low surrogate.
   */
  public static isLowSurrogate(str: string, index: number): boolean {
    if (index < 1 || Strings.isEmpty(str)) {
      return false;
    }

    const charCode = str.charCodeAt(index);
    if (Number.isNaN(charCode)) {
      return false;
    }

    return 0xDC00 <= charCode && charCode <= 0xDFFF;
  }

  /**
   * Checks  whether the given string value is `null`, `undefined` or `""`.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string value is `null`, `undefined`
   * or `""`.
   */
  public static isNilOrEmpty(
      str?: string | null | undefined): str is null | undefined {
    if (Utils.isNullOrUndefined(str)) {
      return true;
    }

    return Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is `null`, `undefined` or white space.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is `null`, `undefined` or
   * white space.
   */
  public static isNilOrWhitespace(str?: string | null): str is null {
    if (Utils.isNullOrUndefined(str)) {
      return true;
    }

    return Strings.isWhitespace(str);
  }

  /**
   * Checks whether the given string is not empty.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is not empty.
   */
  public static isNotEmpty(str: string): boolean {
    return Strings.isEmpty(str) === false;
  }

  /**
   * Checks whether the given string is `null` or `""`.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is `null` or `""`.
   */
  public static isNullOrEmpty(str: string | null): str is null {
    return Utils.isNull(str) || Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is `null` or white space.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is `null` or white space.
   */
  public static isNullOrWhitespace(str: string | null): str is null {
    return Utils.isNull(str) || Strings.isWhitespace(str);
  }

  /**
   * Checks whether the given string represents a stringified number.
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string represents a stringified number.
   */
  public static isNumeric(str: string): boolean {
    return Number.isNaN(str) === false &&
      Number.isNaN(parseFloat(str)) === false;
  }

  /**
   * Checks whether the specified character is a space i. e. `" "`,
   * `"\t"`, `"\r"`, `"\n"`, `"\f"`.
   *
   * @param {String} char Contains some character.
   * @return {Boolean} whether the specified character is a space.
   */
  public static isSpaceChar(char: string): boolean {
    return char === Strings.SPACE ||
      char === Strings.HT ||
      char === Strings.CR ||
      char === Strings.LF ||
      char === Strings.FF;
  }

  /**
   * Checks whether the given value is a string.
   *
   * @param {String} str Contains some value.
   * @return {Boolean} whether the given value is a string.
   */
  public static isString(str?: any): str is string {
    return typeof str === 'string';
  }

  /**
   * Checks whether the given value is a string object i. e. `String`.
   *
   * @param {String} str Contains some value.
   * @return {Boolean} whether the given value is a string object.
   */
  public static isStringObject(str?: any): str is String {
    const proto = Object.prototype.toString.call(str);
    return proto === '[object String]' && typeof str === 'object';
  }

  /**
   * Checks whether the string character at the specified index together with
   * the next character create a surrogate pair. A surrogate pair according to
   * the [Unicode Standard](https://unicode.org/standard/standard.html) is a
   * combination of a Unicode code point from U+D800 to U+DBFF a. k. a. "high
   * surrogate" with another in range from U+DC00 to U+DFFF a. k. a. "low
   * surrogate".
   *
   * **Example:**
   * ```typescript
   * Strings.isSurrogatePair("🐑🐑🐑😀💖", 0); // true
   * Strings.isSurrogatePair("😀💖", 0); // true
   * Strings.isSurrogatePair("", 0); // false
   * Strings.isSurrogatePair("abc", 1); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} index Contains the index of the character. The index
   * is zero-based i. e. begins with 0.
   * @return {Boolean} whether the string character at the specified index
   * is surrogate.
   */
  public static isSurrogatePair(str: string, index: number): boolean {
    const l = str.length;
    if (l === 0 || index < 0 || index >= l) {
      return false;
    }

    const c = str.charCodeAt(index);
    const cpp = str.charCodeAt(index + 1);
    if (Number.isNaN(c) || Number.isNaN(cpp)) {
      return false;
    }

    return 0xd800 <= c && c <= 0xdbff && 0xdc00 <= cpp && cpp <= 0xdfff;
  }

  /**
   * Checks whether all the characters of the specified string are
   * upper case.
   *
   * **Example:**
   * ```typescript
   * Strings.isUpperCase(""); // true
   * Strings.isUpperCase("123"); // true
   * Strings.isUpperCase("ABC"); // true
   * Strings.isUpperCase("Abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether all the characters of the specified
   * string are upper case.
   */
  public static isUpperCase(str: string): boolean {
    let i = 0;
    let j = str.length - 1;
    while (i <= j) {
      const ci = str.charAt(i++);
      if (ci !== ci.toUpperCase()) {
        return false;
      }
      const cj = str.charAt(j--);
      if (cj !== cj.toUpperCase()) {
        return false;
      }
    }

    return true;
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
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is all blank i. e.
   * white space.
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

    let i = 0;
    let j = l - 1;

    while (i <= j) {
      if (Strings.isSpaceChar(str.charAt(i++)) === false ||
        Strings.isSpaceChar(str.charAt(j--)) === false) {
        return false;
      }
    }

    return true;
  }

  /**
   * Concatenates the specified string with other strings.
   *
   * **Example:**
   * ```typescript
   * Strings.join('John', ' ', 'Doe'); // "John Doe"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} otherStrs Contains some other strings.
   * @return {String} a string composed of a concatenation of all the given
   * strings.
   */
  public static join(str: string, ...otherStrs: string[]): string {
    const arrLen = otherStrs.length;
    if (arrLen === 0) {
      return str;
    }

    if (arrLen === 1) {
      return str + otherStrs[0];
    }

    let i = 0;
    let res = str;

    while (i < arrLen) {
      // using the performance API this way of concatenating strings seems
      // to be the most efficient
      res += otherStrs[i++];
    }

    return res;
  }

  /**
   * Gets the last index at which the given string sequence is located in the
   * given string.
   *
   * **Example:**
   * ```typescript
   * Strings.lastIndexOf('Abcddemmaxdemala', 'dem'); // 10
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Number} the last index at which the given string sequence is
   * located in the given string.
   */
  public static lastIndexOf(str: string, sequence: string): number {
    const len = str.length;
    const sqLen = sequence.length;

    // if both the string and the sequence are empty, return 0;
    if (len === 0 && sqLen === 0) {
      return 0;
    }

    if (len === 1 && sqLen === 1) {
      return str.charAt(0) === sequence.charAt(0) ? 0 : Strings.NOT_FOUND;
    }

    // if the length of the sequence is greater than the length of the string
    // it doesn't seem to be found somewhere in the specified string
    if (sqLen > len) {
      return Strings.NOT_FOUND;
    }

    let i = len;
    let res = Strings.NOT_FOUND;

    // this is the case where the length of the specified string is >=
    // the length of the sequence
    while (i > 0) {
      const cStr = str.charAt(i);
      const cSeq = sequence.charAt(0);
      if (cStr === cSeq) {
        // check whether the remaining length of the string is at least equal
        // the length of the specified sequence
        const strRem = len - i;
        if (sqLen <= strRem) {
          // now substring the specified string to the length of the sequence
          // to check whether they are equal
          const s = str.substring(i, i + sqLen);
          if (s === sequence) {
            res = i;
            break;
          }
        }
      }

      i--;
    }

    return res;
  }

  /**
   * Gets the last index at which the given string sequence is located in the
   * given string (case-insensitive).
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Number} the last index at which the given string sequence is
   * located in the given string (case-insensitive).
   */
  public static lastIndexOfIgnoreCase(str: string, sequence: string): number {
    const len = str.length;
    const sqLen = sequence.length;
    const sqLower = sequence.toLowerCase();
    const cSeq = sequence.charAt(0).toLowerCase();

    // if both the string and the sequence are empty, return 0;
    if (len === 0 && sqLen === 0) {
      return 0;
    }

    if (len === 1 && sqLen === 1) {
      return str.charAt(0).toLowerCase() === cSeq ? 0 : Strings.NOT_FOUND;
    }

    // if the length of the sequence is greater than the length of the string
    // it doesn't seem to be found somewhere in the specified string
    if (sqLen > len) {
      return Strings.NOT_FOUND;
    }

    let i = len;
    let res = Strings.NOT_FOUND;

    // this is the case where the length of the specified string is >=
    // the length of the sequence
    while (i > 0) {
      const cStr = str.charAt(i).toLowerCase();
      if (cStr === cSeq) {
        // check whether the remaining length of the string is at least equal
        // the length of the specified sequence
        const strRem = len - i;
        if (sqLen <= strRem) {
          // now substring the specified string to the length of the sequence
          // to check whether they are equal
          const s = str.substring(i, i + sqLen);
          if (s.toLowerCase() === sqLower) {
            res = i;
            break;
          }
        }
      }

      i--;
    }

    return res;
  }

  /**
   * Gets the `length` leftmost characters of the given string.
   *
   * **Example:**
   * ```typescript
   * Strings.left('Alphabet', 5); // "Alpha"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} length Contains the number of characters to pick from the
   * beginning of the specified string.
   * @return {String} the first `length` characters of the string.
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
   * @param {String} strs Contains some strings.
   * @return {String} the longest of the given strings.
   */
  public static longest(...strs: string[]): string {
    const l = strs.length;
    if (l === 0) {
      return Strings.EMPTY;
    }

    if (l === 1) {
      return strs[0];
    }

    if (l === 2) {
      const str0 = strs[0];
      const str1 = strs[1];
      return str0.length > str1.length ? str0 : str1;
    }

    let i = 0;
    let j = l - 1;
    let r = Strings.EMPTY;

    while (i <= j) {
      const si = strs[i++]; const sj = strs[j--];
      if (si.length > r.length) {
        r = si;
      }
      if (sj.length > r.length) {
        r = sj;
      }
    }

    return r;
  }

  /**
   * Converts the given string to upper case.
   *
   * @param {String} str Contains some string.
   * @return {String} the string converted to upper case.
   */
  public static lowerCase(str: string): string {
    return str.toLowerCase();
  }

  /**
   * Normalizes the string white spaces i. e. if there are more than one
   * consecutive white space, only one of them remains.
   *
   * **Example:**
   * ```typescript
   * Strings.normalize("  "); // ""
   * Strings.normalize("  Lorem  ipsum dolor sit "); // "Lorem ipsum dolor sit"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the normalized string.
   */
  public static normalize(str: string): string {
    const l = str.length;
    if (l === 0) {
      return Strings.EMPTY;
    }

    let i = 0; let r = Strings.EMPTY;
    for (; i < l; i++) {
      const c = str.charAt(i);
      if (Strings.isSpaceChar(c) && Strings.isSpaceChar(str.charAt(i + 1))) {
        continue;
      }

      r += c;
    }

    return r.trim();
  }

  /**
   * Appends the given prefix to the beginning of the given string.
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @return {String} the string prepended by the given prefix.
   */
  public static prepend(str: string, prefix: string): string {
    return prefix.concat(str);
  }

  /**
   * Appends the given string sequence to the beginning of the string in
   * case the string does not begin with it.
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * @return {String} the extended string.
   */
  public static prependIfMissing(
      str: string, prefix: string, ignoreCase?: boolean): string {
    if (Strings.isEmpty(prefix) ||
      Strings.startsWith(str, prefix, ignoreCase)) {
      return str;
    }

    return prefix.concat(str);
  }

  /**
   * Appends the given string sequence to the beginning of the string in
   * case the string does not begin with it (case-insensitive).
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @return {String} the extended string.
   */
  public static prependIfMissingIgnoreCase(
      str: string, prefix: string): string {
    return Strings.prependIfMissing(str, prefix, true);
  }

  /**
   * Removes all the string sequences which match the given sequence.
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some sequence to be removed from
   * the given string.
   * @return {String} the string without the given sequence.
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
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {String} the string without the given sequence in case it ends
   * with it; otherwise the given string is returned.
   */
  public static removeEnd(str: string, sequence: string): string {
    const strLen = str.length; const sqLen = sequence.length;
    if (strLen === 0 || sqLen === 0) {
      return str;
    }

    if (str.endsWith(sequence)) {
      return str.substring(0, strLen - sqLen);
    }

    return str;
  }

  /**
   * Removes the given sequence from the given string if the string ends with
   * it; otherwise simply returns the given string (case-insensitive).
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {String} the string without the given sequence in case it ends
   * with it; otherwise the given string is returned (case-insensitive).
   */
  public static removeEndIgnoreCase(str: string, sequence: string): string {
    const strLen = str.length; const sqLen = sequence.length;
    if (strLen === 0 || sqLen === 0) {
      return str;
    }

    if (Strings.endsWithIgnoreCase(str, sequence)) {
      return str.substring(0, strLen - sqLen);
    }

    return str;
  }

  /**
   * Removes white spaces from the given string.
   *
   * @param {String} str Contains some string.
   * @return {String} the string without white space.
   */
  public static removeWhitespace(str: string): string {
    const len = str.length;
    if (len === 0) {
      return str;
    }

    if (len === 1 && Strings.isSpaceChar(str.charAt(0))) {
      return Strings.EMPTY;
    }

    let res = Strings.EMPTY;
    let i = 0;

    while (i < len) {
      const c = str.charAt(i++);
      if (Strings.isSpaceChar(c) === false) {
        res += c;
      }
    }

    return res;
  }

  /**
   * Repeats the given string the given number of times.
   *
   * @param {String} str Contains some string.
   * @param {Number} times Contains the number of times to repeat the
   * given string.
   * @return {String} the `times`-repeated string.
   */
  public static repeat(str: string, times: number): string {
    if (Strings.isEmpty(str) ||
      Numbers.isInteger(times) === false || times < 0) {
      return Strings.EMPTY;
    }

    if (times === 1) {
      return str;
    }

    if (times === 2) {
      return str + str;
    }

    let res = str;
    let i = 0;

    while (++i < times) {
      res += str;
    }

    return res;
  }

  /**
   * Checks whether the given string starts with the specified string sequence.
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @param {Boolean} ignoreCase Contains whether to ignore case-sensitivity.
   * @param {Number} position Contains the index at which to begin searching
   * in the given string. If omitted, it starts with the string end.
   * @return {Boolean} whether the given string starts with the specified string
   * sequence.
   */
  public static startsWith(
      str: string,
      sequence: string,
      ignoreCase?: boolean,
      position?: number,
  ): boolean {
    if (ignoreCase) {
      return str.toLowerCase().startsWith(sequence.toLowerCase(), position);
    }

    return str.startsWith(sequence, position);
  }

  /**
   * Checks whether the specified string starts with any of the specified
   * string sequences.
   *
   * **Example:**
   * ```typescript
   * Strings.startsWithAny(''); // false
   * Strings.startsWithAny('', ''); // true
   * Strings.startsWithAny('', 'abc'); // false
   * Strings.startsWithAny('abc', ''); // false
   * Strings.startsWithAny('abc', 'a'); // true
   * Strings.startsWithAny('abc', 'a', 'b'); // true
   * Strings.startsWithAny('abc', ...['a', 'b', 'c']); // true
   * Strings.startsWithAny('abc def ghi', 'mno', 'pqr', 'abc'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} sequences Contains some string sequences.
   * @return {Boolean} whether the specified string starts with any of the
   * specified string sequences.
   */
  public static startsWithAny(str: string, ...sequences: string[]): boolean {
    let i = 0; const l = sequences.length;
    if (l === 0) {
      return false;
    }

    while (i < l) {
      if (Strings.indexOf(str, sequences[i++]) === 0) {
        return true;
      }
    }

    return false;
  }

  /**
   * Removes white spaces from the beginning and from the end of the given
   * string.
   *
   * @param {String} str Contains some string.
   * @return {String} the trimmed string.
   *
   * @see `Strings.trim()`
   */
  public static strip(str: string): string {
    return Strings.trim(str);
  }

  /**
   * Converts the specified string to camel-case.
   *
   * **Example:**
   * ```typescript
   * Strings.toCamelCase(""); // ""
   * Strings.toCamelCase("\n\t\n"); // ""
   * Strings.toCamelCase("foo bar baz"); // "fooBarBaz"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to camel-case.
   */
  public static toCamelCase(str: string): string {
    const length = str.length;
    if (length === 0 || Strings.isWhitespace(str)) {
      return Strings.EMPTY;
    }

    let index = 0; // the index of the char
    let camelCase = Strings.EMPTY;

    while (index < length) {
      const char = str.charAt(index);
      const charLower = char.toLowerCase();
      if (Strings.isSpaceChar(char)) {
        index++;
        continue;
      }

      const isPrevSpace = Strings.isSpaceChar(str.charAt(index - 1));
      if (isPrevSpace) {
        const empty = camelCase.length === 0;
        camelCase += empty ? charLower : char.toUpperCase();
      } else {
        camelCase += index === 0 ? charLower : char;
      }
      index++;
    }

    return Strings.trim(camelCase);
  }

  /**
   * Converts the specified string to an array of characters.
   *
   * **Example:**
   * ```typescript
   * Strings.toCharArray(''); // []
   * Strings.toCharArray('abc'); // ['a', 'b', 'c']
   * Strings.toCharArray('🐑🐑🐑'); // ['🐑', '🐑', '🐑'];
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Array} an array of the characters of the specified string.
   */
  public static toCharArray(str: string): string[] {
    if (str.length === 0) {
      return [];
    }

    return [...str];
  }

  /**
   * Converts the specified string to kebab-case.
   *
   * **Example:**
   * ```typescript
   * Strings.toKebabCase(""); // ""
   * Strings.toKebabCase("ABC"); // "abc"
   * Strings.toKebabCase("aBC\nDeF"); // "abc-def"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to kebab-case.
   */
  public static toKebabCase(str: string): string {
    const length = str.length;
    if (length === 0 || Strings.isWhitespace(str)) {
      return Strings.EMPTY;
    }

    let index = 0; // the index of the char
    let kebabCase = Strings.EMPTY;

    while (index < length) {
      const char = str.charAt(index);
      const charLower = char.toLowerCase();
      if (Strings.isSpaceChar(char)) {
        index++;
        continue;
      }

      const isPrevSpace = Strings.isSpaceChar(str.charAt(index - 1));
      const empty = kebabCase.length === 0;
      if (isPrevSpace && empty === false) {
        kebabCase += '-'.concat(charLower);
      } else {
        kebabCase += charLower;
      }

      index++;
    }

    return Strings.trim(kebabCase);
  }

  /**
   * Converts the specified string to pascal-case.
   *
   * **Example:**
   * ```typescript
   * Strings.toPascalCase(""); // ""
   * Strings.toPascalCase("  "); // ""
   * Strings.toPascalCase("abc def"); // "AbcDef"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to pascal-case.
   */
  public static toPascalCase(str: string): string {
    const length = str.length;
    if (length === 0 || Strings.isWhitespace(str)) {
      return Strings.EMPTY;
    }

    let index = 0;
    let pascalCase = Strings.EMPTY;

    while (index < length) {
      const char = str.charAt(index);
      const isSpace = Strings.isSpaceChar(char);
      if (isSpace) {
        index++;
        continue;
      }
      const isPrevSpace = Strings.isSpaceChar(str.charAt(index - 1));
      const empty = pascalCase.length === 0;
      pascalCase += isPrevSpace || empty ? char.toUpperCase() : char;
      index++;
    }

    return Strings.trim(pascalCase);
  }

  /**
   * Converts the specified string to title case id este the first letter
   * of the words between spaces is capitalized and the rest is converted
   * to lowercase.
   *
   * **Example:**
   * ```typescript
   * Strings.toTitleCase(""); // ""
   * Strings.toTitleCase("aBc"); // "Abc"
   * Strings.toTitleCase("aBC dEf"); // "Abc Def"
   * Strings.toTitleCase("\nabC"); // "\nAbc"
   * Strings.toTitleCase("ab\t\f\t\nc"); // "Ab\t\f\t\nC"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the title case string.
   */
  public static toTitleCase(str: string): string {
    if (str.length === 0) {
      return str;
    }

    let i = 0;
    let r = Strings.EMPTY;

    while (i < str.length) {
      const c = str.charAt(i);
      const s = Strings.isSpaceChar(c);
      if (i === 0) {
        r += s ? c : c.toUpperCase();
      }

      if (i > 0) {
        if (s === false) {
          const p = Strings.isSpaceChar(str.charAt(i - 1));
          r += p ? c.toUpperCase() : c.toLowerCase();
        } else {
          r += c;
        }
      }

      i++;
    }
    return r;
  }

  /**
   * Removes the whitespaces both from the beginning and from the
   * end of the specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.trim(""); // ""
   * Strings.trim(" "); // ""
   * Strings.trim(" abc "); // "abc"
   * Strings.trim("\nabc\t"); // "abc"
   * Strings.trim(" abc  ab       d \n\t\f"); // "abc  ab       d"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the trimmed string.
   *
   * @see `Strings.strip()`
   */
  public static trim(str: string): string {
    const l = str.length;
    if (l === 0) {
      return str;
    }

    if (Strings.isWhitespace(str)) {
      return Strings.EMPTY;
    }

    let i = 0;
    let j = l - 1;

    while (i <= j) {
      const ci = str.charAt(i);
      const cj = str.charAt(j);
      const si = Strings.isSpaceChar(ci);
      const sj = Strings.isSpaceChar(cj);
      if (si === false && sj === false) {
        return str.substring(i, j + 1);
      }

      if (si) {
        i++;
      }

      if (sj) {
        j--;
      }
    }

    return str;
  }

  /**
   * Converts the given string to upper case.
   *
   * @param {String} str Contains some string.
   * @return {String} the string converted to upper case.
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
   * @param {String} str Contains some string.
   * @return {String} the capitalized string.
   *
   * @see `Strings.capitalize()`
   */
  public static upperFirst(str: string): string {
    return Strings.capitalize(str);
  }
}
