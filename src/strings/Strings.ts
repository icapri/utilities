import {Arrays} from '../arrays/Arrays';
import {Chars} from '../chars/Chars';
import {Numbers} from '../numbers/Numbers';
import {Objects} from '../objects/Objects';
import {Utils} from '../Utils';

/**
 * Defines an abstract class with string utilities.
 */
export abstract class Strings {
  /**
   * Contains an empty string.
   */
  public static readonly EMPTY: string = '' as const;

  /**
   * Gets the index returned when some sequence is not found in some
   * string.
   *
   * @private
   */
  private static readonly NOT_FOUND: number = -1 as const;

  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Abbreviates the specified string to the given number of characters.
   * The rest of characters are replaced by some user-defined marker string
   * or the default marker i. e. ellipsis "...".
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * Removes a newline from the end of the specified string if there
   * is such one.
   *
   * **Usage Examples:**
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
      if ([Chars.CR, Chars.LF].includes(str.charAt(0))) {
        return Strings.EMPTY;
      }

      return str;
    }

    let end = length - 1;
    const lastChar = str.charAt(end);
    if (lastChar === Chars.LF) {
      if (str.charAt(end - 1) === Chars.CR) {
        end--;
      }
    } else if (lastChar !== Chars.CR) {
      end++;
    }

    return str.substring(0, end);
  }

  /**
   * Removes the last character from the specified string.
   *
   * **Usage Examples:**
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

    const end = l - 1, r = str.substring(0, end);
    if (str.charAt(end) === Chars.LF) {
      if (r.charAt(end - 1) === Chars.CR) {
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
   * **Usage Examples:**
   * ```typescript
   * Strings.contains("", ""); // true
   * Strings.contains(" ", ""); // true
   * Strings.contains("abc", "bc"); // true
   * Strings.contains("abc", "BC"); // false
   * Strings.contains("aBc", "bC", true); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {String} substring Contains some string substring.
   * @param {Boolean} ignoreCase Contains whether to ignore case sensitivity.
   * Defaults to `false`.
   * @return {Boolean} whether the specified string contains the specified
   * substring.
   */
  public static contains(
      str: string,
      substring: string,
      ignoreCase: boolean = false,
  ): boolean {
    if (ignoreCase) {
      const subLow = substring.toLowerCase();
      return str.toLowerCase().indexOf(subLow) !== Strings.NOT_FOUND;
    }
    return str.indexOf(substring) !== Strings.NOT_FOUND;
  }

  /**
   * Checks whether the specified string contains either of the given
   * substrings.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.containsAny(""); // false
   * Strings.containsAny("", ""); // true
   * Strings.containsAny("ab", "cd", "ab", "ef"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @param {Array} substrings Contains some substrings.
   * @return {Boolean} whether the given string contains either of the
   * given substrings.
   */
  public static containsAny(str: string, ...substrings: string[]): boolean {
    let j = substrings.length - 1;
    if (j > -1) {
      let i = 0;
      while (i <= j) {
        if (Strings.contains(str, substrings[i]) ||
          Strings.contains(str, substrings[j])) {
          return true;
        }
        i++; j--;
      }
    }

    return false;
  }

  /**
   * Checks whether the specified string contains the specified substring by
   * ignoring case sensitivity.
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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
    let j = substrings.length - 1;
    if (j > -1) {
      let i = 0;
      while (i <= j) {
        if (Strings.contains(str, substrings[i]) ||
          Strings.contains(str, substrings[j])) {
          return false;
        }
        i++; j--;
      }
    }

    return true;
  }

  /**
   * Gets the number of times the specified substring appears in the
   * specified string.
   *
   * **Usage Examples:**
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
    let i = 0, r = 0;
    const l = str.length, sl = substring.length;
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
   * Decapitalizes the specified string if it begins with a capital letter.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.decapitalize(""); // ""
   * Strings.decapitalize("\n"); // "\n"
   * Strings.decapitalize("Abc"); // "abc"
   * Strings.decapitalize("ABC"); // "aBC"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the decapitalized string.
   */
  public static decapitalize(str: string): string {
    if (str.length === 0) {
      return Strings.EMPTY;
    }

    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**
   * Decodes a string encoded using Base64.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.decode("27Hbstuz"); // "۱۲۳"
   * Strings.decode("2aMgaXMgMyBpbiBBcmFiaWM="); // "٣ is 3 in Arabic"
   * Strings.decode("VGhlIOKFsS1uZCBDZW50dXJ5IEIuIEMu");
   * //= "The ⅱ-nd Century B. C."
   * ```
   *
   * @param {String} base64 Contains a Base64-encoded string.
   * @return {String} the decoded string.
   *
   * @since v1.5.0
   */
  public static decode(base64: string): string {
    const esc = base64.replace(/[^A-Za-z0-9+/]/g, ''), // escape non-Base64 char
      l = esc.length,
      length = (l * 3 + 1) >> 2,
      bytes = new Uint8Array(length);
    let mod3, mod4, u24 = 0, i = 0, j = 0, c, u6;
    while (i < l) {
      mod4 = i & 3;
      c = esc.charCodeAt(i);
      u6 = c > 64 && c < 91 ? c - 65 : c > 96 && c < 123 ? c - 71 :
        c > 47 && c < 58 ? c + 4 : c === 43 ? 62 : c === 47 ? 63 : 0;
      u24 |= u6 << (6 * (3 - mod4));
      if (mod4 === 3 || l - i === 1) {
        mod3 = 0;
        while (mod3 < 3 && j < length) {
          bytes[j] = (u24 >>> ((16 >>> mod3) & 24)) & 255; mod3++; j++;
        }
        u24 = 0;
      }
      i++;
    }

    return Strings.fromBytesArray(bytes);
  }

  /**
   * Returns the default string if the specified string is empty.
   *
   * **Usage Examples:**
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
    return Strings.isEmpty(str) ? defaultStr : str;
  }

  /**
   * Gets the part of the second string which is not contained in the
   * first string or vice-versa.
   *
   * **Usage Examples:**
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
   * Encodes the specified string using Base64 encoding.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.encode("\u06f1\u06f2\u06f3"); // "27Hbstuz"
   * Strings.encode("\u0663 is 3 in Arabic"); // "2aMgaXMgMyBpbiBBcmFiaWM="
   * Strings.encode("The \u2171-nd Century B. C.");
   * //= "VGhlIOKFsS1uZCBDZW50dXJ5IEIuIEMu"
   * ```
   *
   * @param {String} str Contains the string to be encoded.
   * @param {Boolean} lineBreak Contains whether to break the base64 string
   * into lines of at most 80 characters.
   * @return {String} the encoded string.
   *
   * @since v1.5.0
   */
  public static encode(str: string, lineBreak: boolean = false): string {
    let i = 0, mod3 = 2, encoded = '', u24 = 0;
    const bytes: Uint8Array = Strings.toBytesArray(str), l = bytes.length;
    const $ = (u6: number) => u6 < 26 ? u6 + 65 : u6 < 52 ? u6 + 71 :
      u6 < 62 ? u6 - 4 : u6 === 62 ? 43 : u6 === 63 ? 47 : 65;
    while (i < l) {
      mod3 = i % 3;
      if (lineBreak && i > 0 && ((i * 4) / 3) % 76 === 0) {
        encoded += '\r\n';
      }

      u24 |= bytes[i] << ((16 >>> mod3) & 24);
      if (mod3 === 2 || bytes.length - i === 1) {
        encoded += String.fromCodePoint(
            $((u24 >>> 18) & 63), $((u24 >>> 12) & 63),
            $((u24 >>> 6) & 63), $(u24 & 63),
        );
        u24 = 0;
      }
      i++;
    }
    const e = mod3 === 2 ? '' : mod3 === 1 ? '=' : '==';
    return encoded.substring(0, encoded.length - 2 + mod3).concat(e);
  }

  /**
   * Checks whether the specified string ends with the given substring.
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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
    if (Arrays.isNotEmpty(substrings)) {
      let i = 0, j = substrings.length - 1;
      while (i <= j) {
        if (str.endsWith(substrings[i++]) || str.endsWith(substrings[j--])) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Checks whether the specified string ends with the specified substring
   * by ignoring case-sensitivity.
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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

    let i = 0, j = substrings.length - 1;
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
    const value1 = Strings.isStringObject(a) ? a.valueOf() : a,
      value2 = Strings.isStringObject(b) ? b.valueOf() : b;
    return value1 === value2;
  }

  /**
   * Checks whether the two specified strings equal by ignoring case
   * sensitivity.
   *
   * **Usage Examples:**
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
    if (str1 !== str2) {
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
        i++;
        l--;
      }
    }
    return true;
  }

  /**
   * Checks whether the specified string equals any of the specified substrings.
   *
   * **Usage Examples:**
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
      let i = 0, j = substrings.length - 1;
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
   * **Usage Examples:**
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
      let i = 0, j = substrings.length - 1;
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
   * Converts a binary string to Unicode in case it has previously
   * contained Unicode.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.fromBinary(Strings.decode('PsOYFMOdIAA9w5hDw54=')); // "🤔 🙃"
   * ```
   *
   * @param {String} binaryStr Contains some binary string.
   * @return {String} a string which might contain Unicode.
   *
   * @since v1.5.0
   */
  public static fromBinary(binaryStr: string): string {
    const length = binaryStr.length;
    if (length === 0) {
      return binaryStr;
    }
    const ccs = new Uint16Array(
        Uint8Array
            .from({length}, (_, i) => binaryStr.charCodeAt(i))
            .buffer);
    let r = Strings.EMPTY;
    ccs.forEach((char) => {
      r += String.fromCharCode(char);
    });
    return r;
  }

  /**
   * Converts an UTF-8 encoded bytes array to string.
   *
   * @param {Uint8Array} bytes Contains the UTF-8 encoded bytes array.
   * @return {String} a Base64-encoded string.
   *
   * @since v1.5.0
   */
  public static fromBytesArray(bytes: Uint8Array): string {
    let i = 0, s = Strings.EMPTY, b;
    const l = bytes.length;
    for (; i < l; i++) {
      b = bytes[i];
      s += String.fromCodePoint(
        b > 251 && b < 254 && i + 5 < l ?
            (b - 252) * 1073741824 + ((bytes[++i] - 128) << 24) +
              ((bytes[++i] - 128) << 18) + ((bytes[++i] - 128) << 12) +
              ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
          b > 247 && b < 252 && i + 4 < l ?
          ((b - 248) << 24) +
            ((bytes[++i] - 128) << 18) + ((bytes[++i] - 128) << 12) +
            ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
          b > 239 && b < 248 && i + 3 < l ?
          ((b - 240) << 18) + ((bytes[++i] - 128) << 12) +
            ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
          b > 223 && b < 240 && i + 2 < l ? ((b - 224) << 12) +
            ((bytes[++i] - 128) << 6) + bytes[++i] - 128 :
          b > 191 && b < 224 && i + 1 < l ?
          ((b - 192) << 6) + bytes[++i] - 128 : b,
      );
    }
    return s;
  }

  /**
   * Gets the string bytes.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.getBytes(""); // 0
   * Strings.getBytes("abc"); // 3
   * Strings.getBytes("🤔 🙃"); // 9
   * Strings.getBytes("🤔 abc"); 8
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Number} the string bytes.
   */
  public static getBytes(str: string): number {
    const l = str.length;
    let i = 0, c = 0, p, n;
    for (; i < l; i++) {
      p = str.charCodeAt(i);
      if (p >= 0xD800 && p < 0xE000 && p < 0xDC00 && i + 1 < l) {
        n = str.charCodeAt(i + 1);
        if (n >= 0xDC00 && n < 0xE000) {
          c += 4;
          i++;
        }
      } else {
        c += (p < 0x80 ? 1 : (p < 0x800 ? 2 : 3));
      }
    }
    return c;
  }

  /**
   * Gets the hash code of the specified string.
   *
   * @param {String} str Contains some string.
   * @return {Number} the hash code.
   */
  public static hashCode(str: string): number {
    let i = 0, hash = 0, charCode;
    const length = str.length;
    for (; i < length;) {
      charCode = str.charCodeAt(i++);
      hash = (hash << 5) - hash + charCode;
      // convert the hash to a 32-bit integer
      hash |= 0;
    }
    return hash;
  }

  /**
   * Checks whether the given string has whitespaces.
   *
   * **Usage Examples:**
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
    if (Strings.isNotEmpty(str)) {
      const l = str.length;
      let c;
      if (l === 1) {
        c = str.charAt(0);
        if (Chars.isWhitespace(c)) {
          return true;
        }
      }
      let i = 0, j = l - 1;
      while (i <= j) {
        if (Chars.isWhitespace(str.charAt(i)) ||
        Chars.isWhitespace(str.charAt(j))) {
          return true;
        }
        i++;
        j--;
      }
    }
    return false;
  }

  /**
   * Gets the first index of any of the specified substrings in the
   * specified string.
   *
   * **Usage Examples:**
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
      let i = 0, idx;
      while (i < l) {
        idx = str.indexOf(substrings[i++]);
        if (idx >= 0) {
          return idx;
        }
      }
    }
    return Strings.NOT_FOUND;
  }

  /**
   * Gets the first index at which the characters of both strings begin
   * to differ. If both strings are equal, the method returns -1.
   *
   * **Usage Examples:**
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
      const l1 = str1.length, l2 = str2.length;
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
   * **Usage Examples:**
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
    return str.toLowerCase().indexOf(sequence.toLowerCase());
  }

  /**
   * Checks whether the specified string is all blank i. e. white space.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAllBlank(''); // true
   * Strings.isAllBlank(' '); // true
   * Strings.isAllBlank('\n'); // true
   * Strings.isAllBlank('\t'); // true
   * Strings.isAllBlank('\r'); // true
   * Strings.isAllBlank('\f'); // true
   * Strings.isAllBlank('\f\n'); // true
   * Strings.isAllBlank('\t\r\f'); // true
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
   * Checks whether the specified string contains only lowercase and
   * uppercase letters a - z and A - Z.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAlpha(''); // false
   * Strings.isAlpha('a'); // true
   * Strings.isAlpha('abc'); // true
   * Strings.isAlpha('abcDEF'); // true
   * Strings.isAlpha('abc DEF'); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string contains only lowercase
   * and uppercase letters a - z and A - Z.
   *
   * @since v1.4.1
   */
  public static isAlpha(str: string): boolean {
    let i = 0, j = str.length - 1, ci, cj;
    if (j < 0) {
      return false;
    }
    while (i <= j) {
      ci = str.charCodeAt(i++);
      cj = str.charCodeAt(j--);
      if ((!(ci > 64 && ci < 91) && !(ci > 96 && ci < 123)) ||
        (!(cj > 64 && cj < 91) && !(cj > 96 && cj < 123))) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks whether the specified string is an alphanumeric string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAlphanumeric(''); // false
   * Strings.isAlphanumeric('a'); // true
   * Strings.isAlphanumeric('abc'); // true
   * Strings.isAlphanumeric('abcDEF'); // true
   * Strings.isAlphanumeric('abc DEF'); // false
   * Strings.isAlphanumeric('0123'); // true
   * Strings.isAlphanumeric('abcDEF123'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is an alphanumeric
   * string.
   *
   * @since v1.4.1
   */
  public static isAlphanumeric(str: string): boolean {
    let i = 0, j = str.length - 1;
    if (j < 0) {
      return false;
    }
    while (i <= j) {
      const ci = str.charCodeAt(i++);
      const cj = str.charCodeAt(j--);
      if ((!(ci > 47 && ci < 58) &&
          !(ci > 64 && ci < 91) &&
          !(ci > 96 && ci < 123)) ||
          (!(cj > 47 && cj < 58) &&
          !(cj > 64 && cj < 91) &&
          !(cj > 96 && cj < 123))
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks whether any of the specified strings is blank.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isAnyBlank(); // true
   * Strings.isAnyBlank(''); // true
   * Strings.isAnyBlank('a'); // false
   * Strings.isAnyBlank('a', ''); // true
   * ```
   *
   * @param {Array} strings Contains some strings.
   * @return {Boolean} whether any of the specified strings is blank.
   *
   * @since v1.4.1
   */
  public static isAnyBlank(...strings: string[]): boolean {
    let i = 0, j = strings.length - 1;
    if (j >= 0) {
      while (i <= j) {
        if (Strings.isBlank(strings[i]) || Strings.isBlank(strings[j])) {
          return true;
        }
        i++;
        j--;
      }
    }
    return false;
  }

  /**
   * Checks whether the given string is binary i. e. each character of the
   * string occupies only one byte.
   *
   * **Usage Examples:**
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
   * Checks whether the specified string is empty/blank.
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * Checks whether all the characters of the specified string are
   * lowercase.
   *
   * **Usage Examples:**
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
    let i = 0, j = str.length - 1, ci, cj;
    while (i <= j) {
      ci = str.charAt(i++);
      cj = str.charAt(j--);
      if (ci !== ci.toLowerCase() || cj !== cj.toLowerCase()) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks whether the specified string contains at least one uppercase
   * and one lowercase character.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.isMixedCase(''); // false
   * Strings.isMixedCase(' '); // false
   * Strings.isMixedCase('abc'); // false
   * Strings.isMixedCase('Abc'); // true
   * Strings.isMixedCase('ab Cd ef'); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string contains at least one
   * uppercase and one lowercase character.
   *
   * @since v1.4.1
   */
  public static isMixedCase(str: string): boolean {
    if (Strings.isWhitespace(str)) {
      return false;
    }

    let i = 0, j = str.length - 1, hasLower = false, hasUpper = false, ci, cj;
    while (i <= j) {
      ci = str.charAt(i++);
      cj = str.charAt(j--);
      if (Chars.isLowerCase(ci) || Chars.isLowerCase(cj)) {
        hasLower = true;
      }

      if (Chars.isUpperCase(ci) || Chars.isUpperCase(cj)) {
        hasUpper = true;
      }

      if (hasLower && hasUpper) {
        return true;
      }
    }
    return hasLower && hasUpper;
  }

  /**
   * Checks  whether the given string value is `null`, `undefined` or `""`.
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * **Usage Examples:**
   * ```typescript
   * Strings.isNumeric(""); // false
   * Strings.isNumeric("1e3"); // true
   * Strings.isNumeric("-0"); // true
   * Strings.isNumeric("123"); // true
   * Strings.isNumeric("\u0663\u0664"); // true
   * Strings.isNumeric("\u0663 \u0664"); // false
   * Strings.isNumeric("\u0664"); // true
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string represents a stringified
   * number.
   *
   * @since v1.4.2
   */
  public static isNumeric(str: string): boolean {
    let i = 0, j = str.length - 1;
    if (j < 0) {
      return false;
    }

    if (Number.isNaN(str) || Number.isNaN(parseFloat(str))) {
      while (i <= j) {
        if (!Chars.isDigit(str.charAt(i)) || !Chars.isDigit(str.charAt(j))) {
          return false;
        }
        i++;
        j--;
      }
    }
    return true;
  }

  /**
   * Checks whether the specified value is a string.
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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
    return Objects.isObject(str) && Objects.toString(str) === '[object String]';
  }

  /**
   * Checks whether the string character at the specified index together with
   * the next character create a surrogate pair. A surrogate pair according to
   * the [Unicode Standard](https://unicode.org/standard/standard.html) is a
   * combination of a Unicode code point from U+D800 to U+DBFF a. k. a. "high
   * surrogate" with another in range from U+DC00 to U+DFFF a. k. a. "low
   * surrogate".
   *
   * **Usage Examples:**
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
    const c = str.charCodeAt(index), cpp = str.charCodeAt(index + 1);
    if (Number.isNaN(c) || Number.isNaN(cpp)) {
      return false;
    }
    return 0xd800 <= c && c <= 0xdbff && 0xdc00 <= cpp && cpp <= 0xdfff;
  }

  /**
   * Checks whether all the characters of the specified string are
   * upper case.
   *
   * **Usage Examples:**
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
    let i = 0, j = str.length - 1, ci, cj;
    while (i <= j) {
      ci = str.charAt(i++);
      cj = str.charAt(j--);
      if (ci !== ci.toUpperCase() || cj !== cj.toUpperCase()) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks whether the specified string is all blank i. e. white space.
   *
   * **Usage Examples:**
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
      if (Chars.isWhitespace(c)) {
        return true;
      }
    }

    let i = 0, j = l - 1;
    while (i <= j) {
      if (!Chars.isWhitespace(str.charAt(i++)) ||
        !Chars.isWhitespace(str.charAt(j--))) {
        return false;
      }
    }
    return true;
  }

  /**
   * Concatenates the specified string with other strings.
   *
   * **Usage Examples:**
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

    let i = 0, res = str;
    while (i < arrLen) {
      res += otherStrs[i++];
    }
    return res;
  }

  /**
   * Gets the last index at which the specified substring is found in the
   * specified string.
   *
   * **Usage Examples:**
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
    const m = str.length, n = substring.length;
    if (n === 0) {
      return 0;
    }
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
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * **Usage Examples:**
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
      const str0 = strings[0], str1 = strings[1];
      return str0.length > str1.length ? str0 : str1;
    }

    let i = 0, j = l - 1, r = Strings.EMPTY, si, sj;
    while (i <= j) {
      si = strings[i++];
      sj = strings[j--];
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
   * Normalizes the string white spaces i. e. if there are more than one
   * consecutive white space, only one of them remains.
   *
   * **Usage Examples:**
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

    let i = 0, r = Strings.EMPTY, c;
    for (; i < l; i++) {
      c = str.charAt(i);
      if (Chars.isWhitespace(c) && Chars.isWhitespace(str.charAt(i + 1))) {
        continue;
      }
      r += c;
    }
    return r.trim();
  }

  /**
   * Appends the specified prefix to the beginning of the given string.
   *
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * Defaults to `false`.
   * @return {String} a string.
   */
  public static prependIfMissing(
      str: string,
      prefix: string,
      ignoreCase: boolean = false,
  ): string {
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
   * **Usage Examples:**
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
      str: string,
      prefix: string,
  ): string {
    return Strings.prependIfMissing(str, prefix, true);
  }

  /**
   * Removes all the string parts in the specified string which match the
   * specified substring.
   *
   * **Usage Examples:**
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
    if (substring.length === 0) return str;
    let i = 0, r = '';
    const m = str.length, n = substring.length;
    while (i < m) {
      if (str.substring(i, i + n) === substring) {
        i += n - 1;
      } else {
        r += str.charAt(i);
      }
      i++;
    }
    return r;
  }

  /**
   * Removes the specified substring from the given string if the string
   * ends with it; otherwise simply returns the given string.
   *
   * **Usage Examples:**
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
    const l = str.length, sl = substring.length;
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
   * **Usage Examples:**
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
    const strLen = str.length, sqLen = substring.length;
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
   * **Usage Examples:**
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

    if (len === 1 && Chars.isWhitespace(str.charAt(0))) {
      return Strings.EMPTY;
    }

    let i = 0, c, res = Strings.EMPTY;
    while (i < len) {
      c = str.charAt(i++);
      if (!Chars.isWhitespace(c)) {
        res += c;
      }
    }
    return res;
  }

  /**
   * Repeats the specified string the given number of times.
   *
   * **Usage Examples:**
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
    let res = str, i = 0;
    while (++i < times) {
      res += str;
    }
    return res;
  }

  /**
   * Reverses the specified string.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.reverse(""); // ""
   * Strings.reverse("cba"); // "abc"
   * Strings.reverse("😃😄😁😆🤣"); // "🤣😆😁😄😃"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the reversed string.
   *
   * @since v1.4.3
   */
  public static reverse(str: string): string {
    return str.length < 2 ? str : [...str].reverse().join('');
  }

  /**
   * Replaces the string characters in the specified range by the given
   * substring.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.splice("", 0, 0, "abc"); // "abc"
   * Strings.splice("abcde", 1, 0, "hijk"); // "ahijkbcde"
   * Strings.splice("lorem ipsum dolor", 6, 5, "amet"); // "lorem amet dolor"
   * ```
   *
   * @param {String} str Contains a string.
   * @param {Number} fromIndex Contains the start index at which to place the
   * new substring.
   * @param {Number} deleteCount Contains the number of characters to remove
   * from the specified `fromIndex` of the specified string.
   * @param {String} subStr Contains the new substring to be inserted between
   * the specified indexes.
   *
   * @return {string} a new string with the specified sequence replaced by the
   * new substring.
   *
   * @since v1.6.8
   */
  public static splice(
      str: string,
      fromIndex: number,
      deleteCount: number,
      subStr: string,
  ): string {
    return str.slice(0, fromIndex) +
      subStr +
      str.slice(fromIndex + Math.abs(deleteCount));
  }

  /**
   * Checks whether the specified string starts with the specified substring.
   *
   * **Usage Examples:**
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
      ignoreCase: boolean = false,
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
   * **Usage Examples:**
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
    let i = 0;
    const l = substrings.length;
    if (l > 0) {
      while (i < l) {
        if (str.indexOf(substrings[i++]) === 0) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Converts the specified string to binary string in case it contains
   * Unicode characters. A binary string is a string in which each 16-bit
   * unit occupies only 1 byte.
   *
   * **Usage Examples:**
   * ```typescript
   * const binary = Strings.toBinary("🤔 🙃");
   * Strings.encode(binary); // "PtgU3SAAPdhD3g=="
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} a binary string.
   *
   * @since v1.5.0
   */
  public static toBinary(str: string): string {
    const length = str.length, charCodeUnits = Uint16Array.from(
          {length},
          (_, index) => str.charCodeAt(index),
      ), ccs = new Uint8Array(charCodeUnits.buffer);
    let bin = '';
    ccs.forEach((c) => {
      bin += String.fromCharCode(c);
    });
    return bin;
  }

  /**
   * Converts the specified string to a UTF8 bytes array.
   *
   * @param {String} str Contains some string.
   * @return {Uint8Array} an UTF8 array.
   *
   * @since v1.5.0
   */
  public static toBytesArray(str: string): Uint8Array {
    const strLength = str.length;
    let arrayLength = 0, i = 0, p: number;
    for (; i < strLength; i++) {
      p = str.codePointAt(i) as number;
      if (p >= 0x10000) {
        i++;
      }
      arrayLength += p < 0x80 ? 1 : p < 0x800 ? 2 :
      p < 0x10000 ? 3 : p < 0x200000 ? 4 : p < 0x4000000 ? 5 : 6;
    }

    let pi = 0; i = 0;
    const bytes: Uint8Array = new Uint8Array(arrayLength);
    while (i < arrayLength) {
      p = str.codePointAt(pi) as number;
      if (p < 128) { // ASCII character (1 byte)
        bytes[i++] = p;
      } else if (p < 0x800) { // (2 bytes)
        bytes[i++] = 192 + (p >>> 6);
        bytes[i++] = 128 + (p & 63);
      } else if (p < 0x10000) { // (3 bytes)
        bytes[i++] = 224 + (p >>> 12);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
      } else if (p < 0x200000) { // (4 bytes)
        bytes[i++] = 240 + (p >>> 18);
        bytes[i++] = 128 + ((p >>> 12) & 63);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
        pi++;
      } else if (p < 0x4000000) { // (5 bytes)
        bytes[i++] = 248 + (p >>> 24);
        bytes[i++] = 128 + ((p >>> 18) & 63);
        bytes[i++] = 128 + ((p >>> 12) & 63);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
        pi++;
      } else { // (6 bytes)
        bytes[i++] = 252 + (p >>> 30);
        bytes[i++] = 128 + ((p >>> 24) & 63);
        bytes[i++] = 128 + ((p >>> 18) & 63);
        bytes[i++] = 128 + ((p >>> 12) & 63);
        bytes[i++] = 128 + ((p >>> 6) & 63);
        bytes[i++] = 128 + (p & 63);
        pi++;
      }
      pi++;
    }
    return bytes;
  }

  /**
   * Converts the specified string to camel-case.
   *
   * **Usage Examples:**
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
    return Strings.decapitalize(Strings.toPascalCase(str));
  }

  /**
   * Converts the specified string to an array of characters.
   *
   * **Usage Examples:**
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
   * Converts the specified string to constant-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toConstantCase(""); // ""
   * Strings.toConstantCase("ABC"); // "ABC"
   * Strings.toConstantCase("aBC\nDeF"); // "ABC_DEF"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to constant-case.
   *
   * @since v1.5.10
   */
  public static toConstantCase(str: string): string {
    return Strings.__toCase(str, '_', true);
  }

  /**
   * Converts the specified string to kebab-case.
   *
   * **Usage Examples:**
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
    return Strings.__toCase(str, '-');
  }

  /**
   * Converts the specified string to pascal-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toPascalCase(""); // ""
   * Strings.toPascalCase("  "); // ""
   * Strings.toPascalCase("abc def"); // "AbcDef"
   * Strings.toPascalCase("abc_def"); // "AbcDef"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to pascal-case.
   */
  public static toPascalCase(str: string): string {
    const length = str.length;
    if (length === 0) {
      return Strings.EMPTY;
    }
    let i = 0, c, p, r = '';
    while (i < length) {
      c = str.charAt(i);
      if (!Chars.isWhitespace(c) && c !== '_' && c !== '-') {
        p = str.charAt(i - 1);
        r += i === 0 || Chars.isWhitespace(p) || p === '_' || p === '-' ?
          c.toUpperCase() : c.toLowerCase();
      }
      i++;
    }
    return r;
  }

  /**
   * Converts the specified string to snake-case.
   *
   * **Usage Examples:**
   * ```typescript
   * Strings.toSnakeCase(""); // ""
   * Strings.toSnakeCase("ABC"); // "abc"
   * Strings.toSnakeCase("aBC\nDeF"); // "abc_def"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {String} the specified string converted to snake-case.
   *
   * @since v1.5.0
   */
  public static toSnakeCase(str: string): string {
    return Strings.__toCase(str, '_');
  }

  /**
   * Converts the specified string to title case id este the first letter
   * of the words between spaces is capitalized and the rest is converted
   * to lowercase.
   *
   * **Usage Examples:**
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
    let i = 0, r = Strings.EMPTY, c, s, p;
    while (i < str.length) {
      c = str.charAt(i);
      s = Chars.isWhitespace(c);
      if (i === 0) {
        r += s ? c : c.toUpperCase();
      }
      if (i > 0) {
        if (!s) {
          p = Chars.isWhitespace(str.charAt(i - 1));
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
   * Capitalizes the specified string.
   *
   * **Usage Examples:**
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
  public static upperFirst(str: string, lowerRest: boolean = false): string {
    if (Strings.isWhitespace(str)) {
      return str;
    }
    const rest = lowerRest ? str.slice(1).toLowerCase() : str.slice(1);
    return str.charAt(0).toUpperCase() + rest;
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * @private
   *
   * @since v1.5.11
   */
  private static __toCase(str: string, conn: string, upper = false): string {
    let i = 0, r = '', c, n;
    for (; i < str.length; i++) {
      c = str.charAt(i);
      if (Chars.isWhitespace(c) || c === '-' || c === '_') {
        n = str.charAt(i + 1);
        if (r.length !== 0 && n !== '' && n !== '-' && n !== '_' &&
          Chars.isWhitespace(n) === false) {
          r += conn;
        }
      } else {
        r += upper ? c.toUpperCase() : c.toLowerCase();
      }
    }
    return r;
  }
}
