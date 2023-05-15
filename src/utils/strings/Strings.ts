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
   * The rest of characters are replaced by some user-defined marker string
   * or the default marker i. e. ellipsis "...".
   *
   * **Example:**
   * ```typescript
   * Strings.abbreviate("", 2); // ""
   * Strings.abbreviate("a", 1); // "a"
   * Strings.abbreviate("abc", 2); // "ab..."
   * Strings.abbreviate("caterpillar", 3); // "cat..."
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

    if (length <= maxLength || !Numbers.isNatural(maxLength)) {
      return str;
    }

    return str.slice(0, maxLength) + marker;
  }

  /**
   * Appends the specified suffix to the given string if the given string
   * doesn't end with it.
   *
   * **Example:**
   * ```typescript
   * Strings.appendIfMissing("", ""); // ""
   * Strings.appendIfMissing("abc", "def"); // "abcdef"
   * Strings.appendIfMissing("abcdef", "DeF", true); // "abcdef"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} suffix Contains the string suffix to be appended to the
   * string if it is missing at the end of it.
   * @param {Boolean} ignoreCase Contains whether to ignore string case
   * sensitivity. Defaults to `false`.
   * @return {String} a string.
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
   * Gets the character at the specified index in the specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.at("", 0); // ""
   * Strings.at(" ", 0); // " "
   * Strings.at("abc", 1); // "b"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} index Contains the index of the character.
   * @return {String} the character at the specified index in the specified
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
   * Removes a newline from the end of the specified string if there
   * is such one.
   *
   * **Example:**
   * ```typescript
   * Strings.chomp(''); // ""
   * Strings.chomp('\n'); // ""
   * Strings.chomp('abc \r'); // "abc "
   * Strings.chomp('abc\r\n'); // "abc"
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
   * Strings.chop('\n\r'); // "\n"
   * Strings.chop('abc \r'); // "abc "
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
   * Compares two strings.
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
   * Compares two strings by ignoring case sensitivity.
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
   * Contains whether the specified string contains the given substring.
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
   * @param {String} subStr Contains some string substring.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * Defaults to `false`.
   * @return {Boolean} whether the specified string contains the specified
   * substring.
   */
  public static contains(
      str: string,
      subStr: string,
      ignoreCase?: boolean,
  ): boolean {
    ignoreCase ??= false;
    const l = str.length;
    const n = subStr.length;
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
          cs = subStr.charAt(0).toLowerCase();
        } else {
          ci = str.charAt(i);
          cj = str.charAt(j);
          cs = subStr.charAt(0);
        }

        if (ci === cs) {
          if (n <= l - i) {
            const ic = str.substring(i, i + n);
            const a = ignoreCase ? ic.toLowerCase() : ic;
            const b = ignoreCase ? subStr.toLowerCase() : subStr;
            if (a === b) {
              return true;
            }
          }
        } else if (cj === cs) {
          if (n <= l - j + 1) {
            const ic = str.substring(j, j + n);
            const a = ignoreCase ? ic.toLowerCase() : ic;
            const b = ignoreCase ? subStr.toLowerCase() : subStr;
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
   * Checks whether the specified string contains either of the given
   * substrings.
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the given string contains either of the
   * given substrings.
   */
  public static containsAny(str: string, ...substrings: string[]): boolean {
    if (substrings.length > 0) {
      let i = 0;
      while (i < substrings.length) {
        if (Strings.contains(str, substrings[i++])) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks whether the specified string contains the specified substring by
   * ignoring case sensitivity.
   *
   * **Example:**
   * ```typescript
   * Strings.containsIgnoreCase("", ""); // true
   * Strings.containsIgnoreCase("\n\n", ""); // true
   * Strings.containsIgnoreCase("abc def", "EF"); // true
   * Strings.containsIgnoreCase("abc", "de"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Boolean} whether the specified string contains the specified
   * substring by ignoring case sensitivity.
   */
  public static containsIgnoreCase(str: string, substring: string): boolean {
    return Strings.contains(str, substring, true);
  }

  /**
   * Checks whether the specified string contains none of the specified
   * substrings.
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
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string contains none of the given
   * substrings.
   */
  public static containsNone(str: string, ...substrings: string[]): boolean {
    if (substrings.length > 0) {
      let i = 0;
      while (i < substrings.length) {
        if (Strings.contains(str, substrings[i++])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Gets the number of times the specified substring appears in the
   * specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.countMatches("", ""); // 0
   * Strings.countMatches("", "ho"); // 0
   * Strings.countMatches("ho", ""); // 0
   * Strings.countMatches("ho ho ho", "ho"); // 3
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Number} the number of times the specified substring appears
   * in the specified string.
   */
  public static countMatches(str: string, substring: string): number {
    let r = 0;
    const l = str.length;
    const sl = substring.length;
    let i = 0;

    if (l === 0 || sl === 0 || sl > l) {
      return r;
    }

    if (l === sl) {
      return str === substring ? 1 : 0;
    }

    while (i < l) {
      if (str.charAt(i) === substring.charAt(0) && sl <= l - i &&
        str.substring(i, i + sl) === substring) {
        r++;
      }
      i++;
    }

    return r;
  }

  /**
   * Returns the default string if the specified string is empty.
   *
   * **Example:**
   * ```typescript
   * Strings.defaultIfEmpty("", ""); // ""
   * Strings.defaultIfEmpty("", " "); // " "
   * Strings.defaultIfEmpty("", "--"); // "--"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} defaultStr Contains some default string.
   * @return {String} the default string if the specified string is empty.
   */
  public static defaultIfEmpty(str: string, defaultStr: string): string {
    if (Strings.isEmpty(str)) {
      return defaultStr;
    }

    return str;
  }

  /**
   * Gets the part of the second string which is not contained in the
   * first string or vice-versa.
   *
   * **Example:**
   * ```typescript
   * Strings.difference("abc", "abc"); // ""
   * Strings.difference("abc ", "abc"); // " "
   * Strings.difference("abc", "abc def"); // " def"
   * ```
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {String} the part of the second string which is not contained
   * in the first string or vice-versa.
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
   * Checks whether the specified string ends with the given substring.
   *
   * **Example:**
   * ```typescript
   * Strings.endsWith("", "ab"); // false
   * Strings.endsWith("abc", "c"); // true
   * Strings.endsWith("abc de", "DE", true); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * Defaults to `false`.
   * @return {Boolean} whether the specified string ends with the given
   * substring.
   */
  public static endsWith(
      str: string,
      substring: string,
      ignoreCase?: boolean,
  ): boolean {
    ignoreCase ??= false;
    if (ignoreCase) {
      return str.toLowerCase().endsWith(substring.toLowerCase());
    }

    return str.endsWith(substring);
  }

  /**
   * Checks whether the specified string ends with either of the specified
   * substrings.
   *
   * **Example:**
   * ```typescript
   * Strings.endsWithAny(""); // false
   * Strings.endsWithAny("abc"); // false
   * Strings.endsWithAny("abc", ""); // true
   * Strings.endsWithAny("abc def", "f"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} the specified string ends with either of the specified
   * substrings.
   */
  public static endsWithAny(str: string, ...substrings: string[]): boolean {
    if (Arrays.isEmpty(substrings)) {
      return false;
    }

    let i = 0;
    let j = substrings.length - 1;
    while (i <= j) {
      if (str.endsWith(substrings[i++]) || str.endsWith(substrings[j--])) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks whether the specified string ends with the specified substring
   * by ignoring case-sensitivity.
   *
   * **Example:**
   * ```typescript
   * Strings.endsWithIgnoreCase("", ""); // true
   * Strings.endsWithIgnoreCase("abc", ""); // true
   * Strings.endsWithIgnoreCase("", "abc"); // false
   * Strings.endsWithIgnoreCase("abc", "bC"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Boolean} whether the specified string ends with the specified
   * substring by ignoring case-sensitivity.
   */
  public static endsWithIgnoreCase(str: string, substring: string): boolean {
    return Strings.endsWith(str, substring, true);
  }

  /**
   * Checks whether the specified string ends with neither of the specified
   * substrings.
   *
   * **Example:**
   * ```typescript
   * Strings.endsWithNone(""); // false
   * Strings.endsWithNone("", "abc"); // true
   * Strings.endsWithNone("abc", ""); // false
   * Strings.endsWithNone("abc", "d", "e", "f"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some string sequences.
   * @return {Boolean} whether the specified string ends with neither of the
   * specified substrings.
   */
  public static endsWithNone(str: string, ...substrings: string[]): boolean {
    if (Arrays.isEmpty(substrings)) {
      return false;
    }

    let i = 0;
    let j = substrings.length - 1;
    while (i <= j) {
      if (str.endsWith(substrings[i++]) || str.endsWith(substrings[j--])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks whether the specified strings equal.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Boolean} whether the specified strings equal.
   */
  public static equals(a: string, b: string): boolean;
  /**
   * Checks whether the specified strings equal.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Boolean} whether the specified strings equal.
   */
  public static equals(a: String, b: String): boolean;
  /**
   * Checks whether the specified strings equal.
   *
   * @param {String} a Contains some string.
   * @param {String} b Contains some other string.
   * @return {Boolean} whether the specified strings equal.
   */
  public static equals<T extends string | String>(a: T, b: T): boolean {
    if (Strings.isString(a) && Strings.isString(b)) {
      return a === b;
    }

    return a.valueOf() === b.valueOf();
  }

  /**
   * Checks whether the two specified strings equal by ignoring case
   * sensitivity.
   *
   * **Example:**
   * ```typescript
   * Strings.equalsIgnoreCase("", ""); // true
   * Strings.equalsIgnoreCase("abc", "aBC"); // true
   * Strings.equalsIgnoreCase("abc", "Ab"); // false
   * ```
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {Boolean} whether the two specified strings equal by ignoring
   * case-sensitivity.
   */
  public static equalsIgnoreCase(str1: string, str2: string): boolean {
    if (str1 === str2) {
      return true;
    }

    let l = str1.length;
    if (l !== str2.length) {
      return false;
    }

    let i = 0;
    while (i <= l - 1) {
      if (str1.charAt(i).toLowerCase() !== str2.charAt(i).toLowerCase() ||
        str1.charAt(l).toLowerCase() !== str2.charAt(l).toLowerCase()) {
        return false;
      }
      i++; l--;
    }

    return true;
  }

  /**
   * Checks whether the specified string equals any of the specified substrings.
   *
   * **Example:**
   * ```typescript
   * Strings.equalsAny(""); // false
   * Strings.equalsAny("", ""); // true
   * Strings.equalsAny("abc", "ghi"); // false
   * Strings.equalsAny("abc", "def", "abc", "mno"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string equals any of the specified
   * substrings.
   */
  public static equalsAny(str: string, ...substrings: string[]): boolean {
    if (substrings.length > 0) {
      let i = 0; let j = substrings.length - 1;
      while (i <= j) {
        if (str === substrings[i++] || str === substrings[j--]) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks whether the specified string equals either of the specified
   * substrings by ignoring case-sensitivity.
   *
   * **Example:**
   * ```typescript
   * Strings.equalsAnyIgnoreCase(""); // false
   * Strings.equalsAnyIgnoreCase("", ""); // true
   * Strings.equalsAnyIgnoreCase("abc", "ghi"); // false
   * Strings.equalsAnyIgnoreCase("abc", "def", "ABc", "mno"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string equals either of the
   * specified substrings by ignoring case-sensitivity.
   */
  public static equalsAnyIgnoreCase(
      str: string,
      ...substrings: string[]
  ): boolean {
    const lowerStr = str.toLowerCase();
    if (substrings.length > 0) {
      let i = 0; let j = substrings.length - 1;
      while (i <= j) {
        if (lowerStr === substrings[i++].toLowerCase() ||
          lowerStr === substrings[j--].toLowerCase()) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Gets the string bytes.
   *
   * @param {String} str Contains some string.
   * @return {Number} the string bytes.
   */
  public static getBytes(str: string): number {
    const encoder = new TextEncoder();
    return encoder.encode(str).length;
  }

  /**
   * Checks whether the specified string contains the specified character.
   *
   * **Example:**
   * ```typescript
   * Strings.hasChar("abc", ""); // false
   * Strings.hasChar("", ""); // false
   * Strings.hasChar("", "a"); // false
   * Strings.hasChar("", "ab"); // false
   * Strings.hasChar("abc", "b"); // true
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

    if (l > 0 && char.length === 1) {
      while (i <= j) {
        if (str.charAt(i++) === char || str.charAt(j--) === char) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Gets the hash code of the specified string.
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
   * Strings.hasWhitespace("Lorem"); // false
   * Strings.hasWhitespace("Lor em"); // true
   * Strings.hasWhitespace("Lorem\n"); // true
   * Strings.hasWhitespace("Lorem\r"); // true
   * Strings.hasWhitespace("Lorem\t"); // true
   * Strings.hasWhitespace("Lorem\f"); // true
   * Strings.hasWhitespace(""); // false
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
      if (Strings.isSpaceChar(str.charAt(i)) ||
        Strings.isSpaceChar(str.charAt(j))) {
        return true;
      }
      i++; j--;
    }

    return false;
  }

  /**
   * Gets the index of the specified substring in the specified string. If
   * the specified substring is not contained in it, -1 is returned.
   *
   * **Example:**
   * ```typescript
   * Strings.indexOf("", ""); // 0
   * Strings.indexOf("abc", ""); // 0
   * Strings.indexOf("abc", "d"); // -1
   * Strings.indexOf("abcde", "de"); // 3
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Number} the index of the specified substring in the specified
   * string. If the specified substring is not contained in the specified
   * string, -1 is returned.
   */
  public static indexOf(str: string, substring: string): number {
    const m = str.length;
    const n = substring.length;
    if (n === 0) return 0;
    if (n <= m) {
      let i = 0;
      while (i < m) {
        if (str.charAt(i) === substring.charAt(0) && n <= m - i &&
          str.substring(i, i + n) === substring) {
          return i;
        }

        i++;
      }
    }

    return Strings.NOT_FOUND;
  }

  /**
   * Gets the first index of any of the specified substrings in the
   * specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.indexOfAny(""); // -1
   * Strings.indexOfAny("abc"); // -1
   * Strings.indexOfAny("abc", ""); // 0
   * Strings.indexOfAny("abcde", "de"); // 3
   * Strings.indexOfAny("abcde", "fgh", "cde"); // 2
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Number} the first index of any of the specified substrings
   * in the specified string.
   */
  public static indexOfAny(str: string, ...substrings: string[]): number {
    const l = substrings.length;
    if (l > 0) {
      let i = 0;
      while (i < l) {
        const index = Strings.indexOf(str, substrings[i++]);
        if (index >= 0) return index;
      }
    }

    return Strings.NOT_FOUND;
  }

  /**
   * Gets the first index at which the characters of both strings begin
   * to differ. If both strings are equal, the method returns -1.
   *
   * **Example:**
   * ```typescript
   * Strings.indexOfDifference("", ""); // -1
   * Strings.indexOfDifference("", "a"); // 0
   * Strings.indexOfDifference("a", ""); // 0
   * Strings.indexOfDifference("abcde", "abc"); // 3
   * Strings.indexOfDifference("abc", "abcde"); // 3
   * ```
   *
   * @param {String} str1 Contains some string.
   * @param {String} str2 Contains some other string.
   * @return {Number} the index at which the characters of both strings
   * begin to differ.
   */
  public static indexOfDifference(str1: string, str2: string): number {
    if (str1 !== str2) {
      let i = 0;
      const l1 = str1.length;
      const l2 = str2.length;

      for (; i < l1 && i < l2; ++i) {
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
   * Gets the first index of the specified substring in the given string.
   * This method is case-insensitive. If the specified substring is not
   * contained in the given string, -1 is returned.
   *
   * **Example:**
   * ```typescript
   * Strings.indexOfIgnoreCase("", ""); // 0
   * Strings.indexOfIgnoreCase("abc", ""); // 0
   * Strings.indexOfIgnoreCase("abcde", "DE"); // 3
   * Strings.indexOfIgnoreCase("abcde", "cde"); // 2
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some string sequence.
   * @return {Number} the index of the specified substring in the given
   * string.
   */
  public static indexOfIgnoreCase(str: string, sequence: string): number {
    return Strings.indexOf(str.toLowerCase(), sequence.toLowerCase());
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
    return !/[^\u0000-\u00ff]/.test(str);
  }

  /**
   * Checks whether the specified string is empty/blank.
   *
   * **Example:**
   * ```typescript
   * Strings.isBlank(""); // true
   * Strings.isBlank(" "); // false
   * Strings.isBlank("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is empty/blank.
   *
   * @see `Strings.isEmpty()`
   */
  public static isBlank(str: string): boolean {
    return Strings.isEmpty(str);
  }

  /**
   * Checks whether the specified string is empty/blank.
   *
   * **Example:**
   * ```typescript
   * Strings.isEmpty(""); // true
   * Strings.isEmpty(" "); // false
   * Strings.isEmpty("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is empty/blank.
   *
   * @see `Strings.isBlank()`
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
   * **Example:**
   * ```typescript
   * Strings.isNilOrEmpty(); // true
   * Strings.isNilOrEmpty(""); // true
   * Strings.isNilOrEmpty(" "); // false
   * Strings.isNilOrEmpty(null); // true
   * Strings.isNilOrEmpty(undefined); // true
   * Strings.isNilOrEmpty("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string value is `null`, `undefined`
   * or `""`.
   */
  public static isNilOrEmpty(
      str?: string | null | undefined,
  ): str is null | undefined {
    return Utils.isNullOrUndefined(str) || Strings.isEmpty(str);
  }

  /**
   * Checks whether the given string is `null`, `undefined` or white space.
   *
   * **Example:**
   * ```typescript
   * Strings.isNilOrWhitespace(); // true
   * Strings.isNilOrWhitespace(""); // true
   * Strings.isNilOrWhitespace(" "); // true
   * Strings.isNilOrWhitespace("\t\r\n\f"); // true
   * Strings.isNilOrWhitespace(null); // true
   * Strings.isNilOrWhitespace(undefined); // true
   * Strings.isNilOrWhitespace("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the given string is `null`, `undefined` or
   * white space.
   */
  public static isNilOrWhitespace(str?: string | null): str is null {
    return Utils.isNullOrUndefined(str) || Strings.isWhitespace(str);
  }

  /**
   * Checks whether the specified string is not empty.
   *
   * **Example:**
   * ```typescript
   * Strings.isNotEmpty(""); // false
   * Strings.isNotEmpty(" "); // true
   * Strings.isNotEmpty("abc"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is not empty.
   */
  public static isNotEmpty(str: string): boolean {
    return !Strings.isEmpty(str);
  }

  /**
   * Checks whether the specified string is equal to `null` or `""`.
   *
   * **Example:**
   * ```typescript
   * Strings.isNullOrEmpty(""); // true
   * Strings.isNullOrEmpty(null); // true
   * Strings.isNullOrEmpty(" "); // false
   * Strings.isNullOrEmpty("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is equal to `null` or `""`.
   */
  public static isNullOrEmpty(str: string | null): str is null {
    return Utils.isNull(str) || Strings.isEmpty(str);
  }

  /**
   * Checks whether the specified string is equal to `null` or white space.
   *
   * **Example:**
   * ```typescript
   * Strings.isNullOrWhitespace(""); // true
   * Strings.isNullOrWhitespace(" "); // true
   * Strings.isNullOrWhitespace("\t\r\n\f"); // true
   * Strings.isNullOrWhitespace(null); // true
   * Strings.isNullOrWhitespace("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is equal to `null` or
   * white space.
   */
  public static isNullOrWhitespace(str: string | null): str is null {
    return Utils.isNull(str) || Strings.isWhitespace(str);
  }

  /**
   * Checks whether the specified string represents a stringified number.
   *
   * **Example:**
   * ```typescript
   * Strings.isNumerical(""); // false
   * Strings.isNumerical(" "); // false
   * Strings.isNumerical("1e3"); // true
   * Strings.isNumerical("-0"); // true
   * Strings.isNumerical("123"); // true
   * Strings.isNumerical("0x12121"); // true
   * Strings.isNumerical("0b10011101"); // true
   * Strings.isNumerical("abc"); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string represents a stringified
   * number.
   */
  public static isNumerical(str: string): boolean {
    return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
  }

  /**
   * Checks whether the specified character is a space i. e. `" "`,
   * `"\t"`, `"\r"`, `"\n"`, `"\f"`.
   *
   * **Example:**
   * ```typescript
   * Strings.isSpaceChar(""); // false
   * Strings.isSpaceChar(" "); // true
   * Strings.isSpaceChar("\t"); // true
   * Strings.isSpaceChar("\r"); // true
   * Strings.isSpaceChar("\f"); // true
   * Strings.isSpaceChar("\n"); // true
   * Strings.isSpaceChar("\n\n"); // false
   * Strings.isSpaceChar("a"); // false
   * ```
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

  /*
  expect(Strings.isString('')).toEqual(true);
    expect(Strings.isString(' ')).toEqual(true);
    expect(Strings.isString(null)).toEqual(false);
    expect(Strings.isString('undefined')).toEqual(true);
    expect(Strings.isString()).toEqual(false);
  */

  /**
   * Checks whether the specified value is a string.
   *
   * **Example:**
   * ```typescript
   * Strings.isString(); // false
   * Strings.isString(""); // true
   * Strings.isString(" "); // true
   * Strings.isString(null); // false
   * Strings.isString(undefined); // false
   * Strings.isString({}); // false
   * Strings.isString("abc"); // true
   * ```
   *
   * @param {String} str Contains some value.
   * @return {Boolean} whether the specified value is a string.
   */
  public static isString(str?: any): str is string {
    return typeof str === 'string';
  }

  /**
   * Checks whether the specified value is a string object i. e. `String`.
   *
   * **Example:**
   * ```typescript
   * Strings.isStringObject(); // false
   * Strings.isStringObject(""); // false
   * Strings.isStringObject(" "); // false
   * Strings.isStringObject(null); // false
   * Strings.isStringObject(undefined); // false
   * Strings.isStringObject({}); // false
   * Strings.isStringObject("abc"); // false
   * Strings.isStringObject(new String("abc")); // true
   * ```
   *
   * @param {String} str Contains some value.
   * @return {Boolean} whether the specified value is a string object.
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
   * Strings.isWhitespace(""); // true
   * Strings.isWhitespace(" "); // true
   * Strings.isWhitespace("\n"); // true
   * Strings.isWhitespace("\t"); // true
   * Strings.isWhitespace("\r"); // true
   * Strings.isWhitespace("\f"); // true
   * Strings.isWhitespace("\f\n"); // true
   * Strings.isWhitespace("\f\r"); // true
   * Strings.isWhitespace("\t\r\f"); // true
   * Strings.isWhitespace("\f\t\r\n\n"); // true
   * Strings.isWhitespace("\f\t\r\n\na"); // false
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
      if (!Strings.isSpaceChar(str.charAt(i++)) ||
        !Strings.isSpaceChar(str.charAt(j--))) {
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
   * Strings.join("abc"); // "abc"
   * Strings.join("abc", ""); // "abc"
   * Strings.join("John", " ", "Doe"); // "John Doe"
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

    let i = 0; let res = str;
    while (i < arrLen) {
      res += otherStrs[i++];
    }

    return res;
  }

  /**
   * Gets the last index at which the specified substring is found in the
   * specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.lastIndexOf("", ""); // 0
   * Strings.lastIndexOf("abc", ""); // 0
   * Strings.lastIndexOf("", "abc"); // -1
   * Strings.lastIndexOf("Abcddemmaxdemala", "dem"); // 10
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Number} the last index at which the specified substring is
   * found in the specified string.
   */
  public static lastIndexOf(str: string, substring: string): number {
    const m = str.length;
    const n = substring.length;
    if (n === 0) return 0;
    if (n <= m) {
      let i = m;
      while (i >= 0) {
        if (str.charAt(i) === substring.charAt(0) && n <= m - i &&
          str.substring(i, i + n) === substring) {
          return i;
        }
        i--;
      }
    }

    return Strings.NOT_FOUND;
  }

  /**
   * Gets the last index at which the specified substring is found in the
   * given string by ignoring case-sensitivity.
   *
   * **Example:**
   * ```typescript
   * Strings.lastIndexOfIgnoreCase("", ""); // 0
   * Strings.lastIndexOfIgnoreCase("abc", ""); // 0
   * Strings.lastIndexOfIgnoreCase("", "abc"); // -1
   * Strings.lastIndexOfIgnoreCase("Abcddemmaxdemala", "DEm"); // 10
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {Number} the last index at which the specified substring is
   * located in the given string by ignoring case-sensitivity.
   */
  public static lastIndexOfIgnoreCase(str: string, substring: string): number {
    return Strings.lastIndexOf(str.toLowerCase(), substring.toLowerCase());
  }

  /**
   * Gets the `length` leftmost characters of the specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.left("abc", 2); // "ab"
   * Strings.left("abc", 5); // "abc"
   * Strings.left("Alphabet", 5); // "Alpha"
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
   * Gets the longest of the specified strings.
   *
   * **Example:**
   * ```typescript
   * Strings.longest(); // ""
   * Strings.longest(""); // ""
   * Strings.longest("abc", "ab"); // "abc"
   * ```
   *
   * @param {String} strings Contains some strings.
   * @return {String} the longest of the specified strings.
   */
  public static longest(...strings: string[]): string {
    const l = strings.length;
    if (l === 0) {
      return Strings.EMPTY;
    }

    if (l === 1) {
      return strings[0];
    }

    if (l === 2) {
      const str0 = strings[0];
      const str1 = strings[1];
      return str0.length > str1.length ? str0 : str1;
    }

    let i = 0;
    let j = l - 1;
    let r = Strings.EMPTY;

    while (i <= j) {
      const si = strings[i++];
      const sj = strings[j--];
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
   * Converts the specified string to upper case.
   *
   * **Example:**
   * ```typescript
   * Strings.toLowerCase(""); // ""
   * Strings.toLowerCase("abc"); // "abc"
   * Strings.toLowerCase("AbC"); // "abc"
   * ```
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
   * Strings.normalize("  Bye    -  bye   ! "); // "Bye - bye !"
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
   * Appends the specified prefix to the beginning of the given string.
   *
   * **Example:**
   * ```typescript
   * Strings.prepend("a", ""); // "a"
   * Strings.prepend("", "abc"); // "abc"
   * Strings.prepend("a", "bc"); // "bca"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @return {String} a string.
   */
  public static prepend(str: string, prefix: string): string {
    return prefix.concat(str);
  }

  /**
   * Appends the specified prefix to the beginning of the given string in
   * case it does not begin with it.
   *
   * **Example:**
   * ```typescript
   * Strings.prependIfMissing("", "abc"); // "abc"
   * Strings.prependIfMissing("a", "bc"); // "bca"
   * Strings.prependIfMissing("a", ""); // "a"
   * Strings.prependIfMissing("abcde", "ab"); // "abcde"
   * Strings.prependIfMissing("ABcde", "ab", true); // "ABcde"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} prefix Contains some string prefix.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * @return {String} a string.
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
   * Appends the specified prefix to the beginning of the string in case
   * the string does not begin with it by ignoring case-sensitivity.
   *
   * **Example:**
   * ```typescript
   * Strings.prependIfMissingIgnoreCase("", "abc"); // "abc"
   * Strings.prependIfMissingIgnoreCase("a", "bc"); // "bca"
   * Strings.prependIfMissingIgnoreCase("a", ""); // "a"
   * Strings.prependIfMissingIgnoreCase("abcde", "ab"); // "abcde"
   * Strings.prependIfMissingIgnoreCase("ABcde", "ab"); // "ABcde"
   * ```
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
   * Removes all the string parts in the specified string which match the
   * specified substring.
   *
   * **Example:**
   * ```typescript
   * Strings.remove("", ""); // "--"
   * Strings.remove("  ", " "); // "--"
   * Strings.remove("black", "l"); // "back"
   * Strings.remove("Ole-Ole-Ole", "Ole"); // "--"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring to be removed from
   * the given string.
   * @return {String} the string without the specified substring occurrences.
   */
  public static remove(str: string, substring: string): string {
    const l = str.length;
    const sl = substring.length;
    if (l === 0 || sl === 0 ||
        Strings.indexOf(str, substring) === Strings.NOT_FOUND) {
      return str;
    }

    let r = Strings.EMPTY;
    if (sl <= l) {
      let i = 0;
      while (i < l) {
        const ci = str.charAt(i);
        const c0 = substring.charAt(0);
        if (ci === c0 && sl <= l - i &&
            str.substring(i, i + sl) === substring) {
          i += sl - 1;
        } else {
          r += ci;
        }
        i++;
      }
    }

    return r;
  }

  /**
   * Removes the specified substring from the given string if the string
   * ends with it; otherwise simply returns the given string.
   *
   * **Example:**
   * ```typescript
   * Strings.removeEnd("", "abc"); // ""
   * Strings.removeEnd("abc", ""); // "abc"
   * Strings.removeEnd("abcdefgh", "fgh"); // "abcde"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {String} a string.
   */
  public static removeEnd(str: string, substring: string): string {
    const l = str.length; const sl = substring.length;
    if (l === 0 || sl === 0) {
      return str;
    }

    if (str.endsWith(substring)) {
      return str.substring(0, l - sl);
    }

    return str;
  }

  /**
   * Removes the specified substring from the given string if the string ends
   * with it by ignoring case-sensitivity; otherwise simply returns the given
   * string.
   *
   * **Example:**
   * ```typescript
   * Strings.removeEndIgnoreCase("", "abc"); // ""
   * Strings.removeEndIgnoreCase("abc", ""); // "abc"
   * Strings.removeEndIgnoreCase("abcdefgh", "fgh"); // "abcde"
   * Strings.removeEndIgnoreCase("abcdefgh", "FGh"); // "abcde"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some substring.
   * @return {String} a string.
   */
  public static removeEndIgnoreCase(str: string, substring: string): string {
    const strLen = str.length; const sqLen = substring.length;
    if (strLen === 0 || sqLen === 0) {
      return str;
    }

    if (Strings.endsWithIgnoreCase(str, substring)) {
      return str.substring(0, strLen - sqLen);
    }

    return str;
  }

  /**
   * Removes all the white spaces from the specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.removeWhitespace(""); // ""
   * Strings.removeWhitespace(" "); // ""
   * Strings.removeWhitespace("a b c\n"); // "abc"
   * Strings.removeWhitespace("\n\r\t\f "); // ""
   * Strings.removeWhitespace("abc @def.ghi"); // "abc@def.ghi"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the string without white spaces.
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
      if (!Strings.isSpaceChar(c)) {
        res += c;
      }
    }

    return res;
  }

  /**
   * Repeats the specified string the given number of times.
   *
   * **Example:**
   * ```typescript
   * Strings.repeat("", 10); // ""
   * Strings.repeat(" ", 1); // " "
   * Strings.repeat("abc", 2); // "abcabc"
   * Strings.repeat("*", 10); // "**********"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Number} times Contains the number of times to repeat the
   * specified string.
   * @return {String} the string repeated the specified number of times.
   */
  public static repeat(str: string, times: number): string {
    if (Strings.isEmpty(str) || !Numbers.isInteger(times) || times < 0) {
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
   * Checks whether the specified string starts with the specified substring.
   *
   * **Example:**
   * ```typescript
   * Strings.startsWith("", "") // true
   * Strings.startsWith("abc", "ab") // true
   * Strings.startsWith("abc", "A", true) // true
   * Strings.startsWith("abc", "b") // false
   * Strings.startsWith("abc", "C", true) // false
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} sequence Contains some substring.
   * @param {Boolean} ignoreCase Contains whether to ignore case-sensitivity.
   * Defaults to `false`.
   * @param {Number} position Contains the index at which to begin searching
   * in the specified string. If omitted, it starts with the string end.
   * @return {Boolean} whether the specified string starts with the specified
   * substring.
   */
  public static startsWith(
      str: string,
      sequence: string,
      ignoreCase?: boolean,
      position?: number,
  ): boolean {
    ignoreCase ??= false;
    if (ignoreCase) {
      return str.toLowerCase().startsWith(sequence.toLowerCase(), position);
    }

    return str.startsWith(sequence, position);
  }

  /**
   * Checks whether the specified string starts with any of the specified
   * substrings.
   *
   * **Example:**
   * ```typescript
   * Strings.startsWithAny(""); // false
   * Strings.startsWithAny("", ""); // true
   * Strings.startsWithAny("", "abc"); // false
   * Strings.startsWithAny("abc", ""); // false
   * Strings.startsWithAny("abc", "a"); // true
   * Strings.startsWithAny("abc", "a", "b"); // true
   * Strings.startsWithAny("abc", ...["a", "b", "c"]); // true
   * Strings.startsWithAny("abc def ghi", "mno", "pqr", "abc"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the specified string starts with any of the
   * specified substrings.
   */
  public static startsWithAny(str: string, ...substrings: string[]): boolean {
    let i = 0; const l = substrings.length;
    if (l === 0) {
      return false;
    }

    while (i < l) {
      if (Strings.indexOf(str, substrings[i++]) === 0) {
        return true;
      }
    }

    return false;
  }

  /**
   * Removes the white spaces from the beginning and from the end of the
   * specified string.
   *
   * **Example:**
   * ```typescript
   * Strings.strip(""); // ""
   * Strings.strip(" "); // ""
   * Strings.strip("  abc "); // "abc"
   * Strings.strip("\nabc def\t\r\f"); // "abc def"
   * ```
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
    return Strings.isEmpty(str) ? [] : [...str];
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
      if (isPrevSpace && !empty) {
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
        if (!s) {
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
      const si = Strings.isSpaceChar(str.charAt(i));
      const sj = Strings.isSpaceChar(str.charAt(j));
      if (!si && !sj) {
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
   * Converts the specified string to uppercase.
   *
   * **Example:**
   * ```typescript
   * Strings.upperCase(""); // ""
   * Strings.upperCase("ABC"); // "ABC"
   * Strings.upperCase("abC"); // "ABC"
   * ```
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
   * Strings.capitalize("john"); // "John"
   * Strings.capitalize("jOHN"); // "JOHN"
   * Strings.capitalize("jOHN", true); // "John"
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Boolean} lowerRest Contains whether to convert the characters
   * from the second to the last character to lowercase. Defaults to `false`.
   * @return {String} the capitalized string.
   */
  public static upperFirst(str: string, lowerRest?: boolean): string {
    if (Strings.isWhitespace(str)) {
      return str;
    }

    lowerRest ??= false;
    const rest = lowerRest ? str.slice(1).toLowerCase() : str.slice(1);
    return str.charAt(0).toUpperCase() + rest;
  }
}
