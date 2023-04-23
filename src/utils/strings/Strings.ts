import { Arrays } from '../arrays/Arrays';
import { Comparator } from '../Comparator';
import { Numbers } from '../numbers/Numbers';

/**
 * Defines an abstract class with string utilities.
 */
export abstract class Strings extends Comparator {
  /**
   * Appends the given suffix to the given string in case the given string doesn't end
   * with the given suffix.
   *
   * @param s Contains some string.
   * @param suffix Contains the string suffix to be appended to the string in case it is
   * missing at the end of it.
   * @param ignoreCase Contains whether to ignore string case sensitivity.
   * @param suffixes Contains additional suffixes that are valid terminators. 
   * @returns the extended string.
   */
  public static appendIfMissing(
    s: string,
    suffix: string,
    ignoreCase: boolean,
    ...suffixes: string[]
  ) {
    if (Strings.isNilOrEmpty(suffix) || Strings.endsWith(s, suffix, ignoreCase)) {
      return s;
    }

    if (Arrays.isNotEmpty(suffixes)) {
      suffixes.forEach((c) => {
        if (Strings.endsWith(s, c, ignoreCase)) {
          return s;
        }
      });
    }

    return s + suffix.toString();
  }

  /**
   * Capitalizes the given string.
   * **Example:**
   * ```typescript
   * const name = 'john';
   * console.log(Strings.capitalize(name)); // John
   * ```
   *
   * @param s Contains some string.
   * @returns the capitalized string.
   */
  public static capitalize(s: string) {
    if (Strings.isEmpty(s)) {
      return s;
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * Removes the new line/-s from the given string if there are such ones.
   *
   * @param s Contains some string.
   * @returns the chomped string.
   */
  public static chomp(s: string): string {
    if (Strings.isEmpty(s)) {
      return s;
    }

    if (s.length === 1) {
      const firstChar = s.charAt(0);
      if (firstChar === Strings.CR || firstChar === Strings.LF) {
        return Strings.EMPTY;
      }
      return s;
    }

    let lastIndex = s.length - 1;
    const lastChar = s.charAt(lastIndex);
    if (lastChar === Strings.LF && s.charAt(lastIndex - 1) === Strings.CR) {
      lastIndex--;
    } else if (lastChar !== Strings.CR) {
      lastIndex++;
    }

    return s.substring(0, lastIndex);
  }

  /**
   * Removes the last string character.
   *
   * @param s Contains some string.
   * @returns the string without the last character.
   */
  public static chop(s: string): string {
    const length = s.length;
    if (length < 2) {
      return Strings.EMPTY;
    }

    const lastIndex = length - 1;
    const result = s.substring(0, lastIndex);
    const last = s.charAt(lastIndex);
    if (last === Strings.LF && result.charAt(lastIndex - 1) === Strings.CR) {
      return result.substring(0, lastIndex - 1);
    }

    return result;
  }

  /**
   * Coalesces the given string.
   *
   * @param s Contains some string.
   * @returns the coalesced string.
   */
  public static coalesce(s?: string | null | undefined): string | null {
    if (Strings.isNullOrUndefined(s)) {
      return null;
    }

    s = s.trim();
    if (Strings.isEmpty(s)) {
      return null;
    }

    return s;
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
  public static override compare(a: string, b: string): number {
    return Comparator.compare(a, b);
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
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @param ignoreCase Contains whether to ignore case sensitivity.
   * @returns whether the given string contains the given sequence.
   */
  public static contains(s: string, sequence: string, ignoreCase?: boolean): boolean {
    if (ignoreCase) {
      return s.toLowerCase().includes(sequence.toLowerCase());
    }
    return s.includes(sequence);
  }

  /**
   * Checks whether the given string contains either of the given string
   * sequences.
   *
   * @param s Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string contains either of the given string
   * sequences.
   */
  public static containsAny(s: string, ...sequences: string[]): boolean {
    if (!s.length || !sequences.length) {
      return false;
    }

    return sequences.some((sequence) => s.includes(sequence));
  }

  /**
   * Checks whether the given string contains the given sequence by ignoring
   * case sensitivity.
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @returns whether the given string contains the given sequence by ignoring
   * case sensitivity.
   */
  public static containsIgnoreCase(s: string, sequence: string): boolean {
    return Strings.contains(s, sequence, true);
  }

  /**
   * Checks whether the given string contains none of the given string
   * sequences.
   *
   * @param s Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string contains none of the given string
   * sequences.
   */
  public static containsNone(s: string, ...sequences: string[]): boolean {
    if (!s.length || !sequences.length) {
      return false;
    }

    return sequences.every((sequence) => !s.includes(sequence));
  }

  /**
   * Counts the sequences that match the given string.
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @returns the number of sequence the given string matches.
   */
  public static countMatches(s: string, sequence: string): number {
    if (!s.length || !sequence.length) {
      return 0;
    }

    const pattern = new RegExp(sequence, 'g');
    return s.match(pattern)?.length ?? 0;
  }

  /**
   * Returns the given default string in case the given string is empty;
   * otherwise the string itself.
   *
   * @param s Contains some string.
   * @param defaultString Contains some default string.
   * @returns the given default string in case the given string is empty;
   * otherwise the string itself.
   */
  public static defaultIfEmpty(s: string, defaultString: string): string {
    return Strings.isEmpty(s) ? defaultString : s;
  }

  /**
   * Gets the sequence of the second string which is not contained in the
   * first string.
   *
   * @param s1 Contains some string.
   * @param s2 Contains some other string.
   * @returns 
   */
  public static difference(s1: string, s2: string): string {
    const at = Strings.indexOfDifference(s1, s2);
    if (at === Strings.NF_INDEX) {
      return Strings.EMPTY;
    }

    return s2.substring(at);
  }

  /**
   * Checks whether the given string ends with the given sequence.
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @param ignoreCase Contains whether to ignore case sensitivity.
   * @returns whether the given string ends with the given sequence.
   */
  public static endsWith(s: string, sequence: string, ignoreCase?: boolean): boolean {
    if (Strings.isEmpty(s)) {
      return false;
    }

    if (ignoreCase) {
      return s.toLowerCase().endsWith(sequence.toLowerCase());
    }
    return s.endsWith(sequence);
  }

  /**
   * Checks whether the given string ends with either of the given
   * string sequences.
   *
   * @param s Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string ends with either of the given
   * string sequences.
   */
  public static endsWithAny(s: string, ...sequences: string[]): boolean {
    if (Strings.isEmpty(s) || Arrays.isEmpty(sequences)) {
      return false;
    }

    return sequences.some((sequence) => s.endsWith(sequence));
  }

  /**
   * Checks whether the given string ends with the given sequence (case-insensitive).
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @returns whether the given string ends with the given sequence (case-insensitive).
   */
  public static endsWithIgnoreCase(s: string, sequence: string): boolean {
    if (Strings.isEmpty(s)) {
      return false;
    }

    return Strings.endsWith(s, sequence, true);
  }

  /**
   * Checks whether the given string ends with neither of the given
   * string sequences.
   *
   * @param s Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string ends with neither of the given
   * string sequences.
   */
  public static endsWithNone(s: string, ...sequences: string[]): boolean {
    if (Strings.isEmpty(s) || Arrays.isEmpty(sequences)) {
      return false;
    }

    return sequences.every((sequence) => !s.endsWith(sequence));
  }

  /**
   * Checks whether the given strings equal.
   *
   * @param a Contains some string.
   * @param b Contains some other string.
   * @returns whether the given strings equal.
   */
  public static equal(a: string, b: string): boolean;
  public static equal(a: String, b: String): boolean;
  public static equal<T extends string | String>(a: T, b: T): boolean {
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
  public static equalIgnoreCase(s1: string, s2: string): boolean {
    if (s1 === s2) {
      return true;
    }

    if (s1.length !== s2.length) {
      return false;
    }

    let i, equal = true;
    for (i = 0; i < s1.length; i++) {
      if (s1.charAt(i).toLowerCase() !== s2.charAt(i).toLowerCase()) {
        equal = false;
        break;
      }
    }

    return !equal;
  }

  /**
   * Checks whether the given string equals any of the given sequences.
   *
   * @param s Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the the given string equals any of the given sequences.
   */
  public static equalsAny(s: string, ...sequences: string[]): boolean {
    return sequences.some((sequence) => sequence === s);
  }

  /**
   * Checks whether the given string equals either of the given string sequences
   * by ignoring case sensitivity.
   *
   * @param s Contains some string.
   * @param sequences Contains some string sequences.
   * @returns whether the given string equals either of the given string sequences
   * by ignoring case sensitivity.
   */
  public static equalsAnyIgnoreCase(s: string, ...sequences: string[]): boolean {
    return sequences.some((sequence) => sequence.toLowerCase() === s.toLowerCase());
  }

  /**
   * Gets the string bytes.
   *
   * @param s Contains some string.
   * @returns the string bytes.
   */
  public static getBytes(s: string): number {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(s).length;
  }

  /**
   * Gets the hash code from the given string. Adapted from:
   * [StackOverflow](https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript)
   *
   * @param s Contains some string.
   * @returns the hash code.
   */
  public static hashCode(s: string): number {
    let hash = 0, i, charCode;
    if (s.length === 0) {
      return hash;
    }

    for (i = 0; i < s.length; i++) {
      charCode = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + charCode;
      // convert the hash to a 32-bit integer
      hash |= 0;
    }
    return hash;
  }

  /**
   * Checks whether the given string has white spaces.
   *
   * @param s Contains some string.
   * @returns whether the given string has white spaces.
   */
  public static hasWhitespace(s: string): boolean {
    return s.indexOf(' ') >= 0;
  }

  /**
   * Gets the index of the given sequence in the given string. If
   * the given sequence is not contained in the given string, -1 is
   * returned.
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the index at which to begin searching
   * the String object. If omitted, search starts at the beginning
   * of the string.
   * @returns the index of the given sequence in the given string. If
   * the given sequence is not contained in the given string, -1 is
   * returned.
   */
  public static indexOf(s: string, sequence: string, position?: number): number {
    return s.indexOf(sequence, position);
  }

  /**
   * Gets the first index of any of the given sequences in the given string.
   *
   * @param s Contains some string.
   * @param sequences Contains some string sequences.
   * @returns the first index of any of the given sequences in the given string.
   */
  public static indexOfAny(s: string, ...sequences: string[]): number {
    if (Strings.isEmpty(s) || Arrays.isEmpty(sequences)) {
      return Strings.NF_INDEX;
    }

    let resultIndex = -1;
    sequences.forEach((sequence) => {
      if (s.indexOf(sequence) >= 0) {
        resultIndex = s.indexOf(sequence);
        return;
      }
    });

    return resultIndex;
  }

  /**
   * Gets the index at which the chars of both strings begin to differ.
   *
   * @param s1 Contains some string.
   * @param s2 Contains some other string.
   * @returns the index at which the chars of both strings begin to differ.
   */
  public static indexOfDifference(s1: string, s2: string): number {
    if (s1 === s2) {
      return Strings.NF_INDEX;
    }

    let i;
    for (i = 0; i < s1.length && i < s2.length; ++i) {
      if (s1.charAt(i) !== s2.charAt(i)) {
        break;
      }
    }

    return i < s2.length || i < s1.length ? i : Strings.NF_INDEX;
  }

  /**
   * Gets the index of the given sequence in the given string (case-insensitive).
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the string index at which to begin starting in
   * the given string.
   * @returns the index of the given sequence in the given string (case-insensitive).
   */
  public static indexOfIgnoreCase(s: string, sequence: string, position?: number): number {
    return s.toLowerCase().indexOf(sequence.toLowerCase(), position);
  }

  /**
   * Checks whether the given string is all blank i. e. white space.
   *
   * @param s Contains some string.
   * @returns whether the given string is all blank i. e. white space.
   */
  public static isAllBlank(s: string): boolean {
    return Strings.isWhitespace(s);
  }

  /**
   * Checks whether the given string is empty/blank.
   *
   * @param s Contains some string.
   * @returns whether the given string is empty/blank.
   */
  public static isBlank(s: string): boolean {
    return Strings.isEmpty(s);
  }

  /**
   * Checks whether the given string is empty/blank.
   *
   * @param s Contains some string.
   * @returns whether the given string is empty/blank.
   */
  public static isEmpty(s: string): boolean {
    return !s.length;
  }

  /**
   * Checks whether the given char is with high code-points in the
   * UTF-16 encoding scheme.
   *
   * @param c Contains some character.
   * @returns whether the given char is with high code-points in the
   * UTF-16 encoding scheme.
   */
  public static isHighSurrogate(c: string): boolean {
    return /[^\\uD800-\\uDBFF]/.test(c);
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
   * Checks whether the given char is with low code-points in the
   * UTF-16 encoding scheme.
   *
   * @param c Contains some character.
   * @returns whether the given char is with low code-points in the
   * UTF-16 encoding scheme.
   */
  public static isLowSurrogate(c: string): boolean {
    return /[^\\uDC00-\\uDFFF]/.test(c);
  }

  /**
   * Checks  whether the given string value is `null`, `undefined` or `""`.
   *
   * @param s Contains some string.
   * @returns whether the given string value is `null`, `undefined` or `""`.
   */
  public static isNilOrEmpty(s?: string | null | undefined): s is null | undefined {
    if (Strings.isNullOrUndefined(s)) {
      return true;
    }

    return Strings.isEmpty(s);
  }

  /**
   * Checks whether the given string is `null`, `undefined` or white space.
   *
   * @param s Contains some string.
   * @returns whether the given string is `null`, `undefined` or white space.
   */
  public static isNilOrWhitespace(s: string | null): s is null {
    if (Strings.isNullOrUndefined(s)) {
      return true;
    }

    return Strings.isWhitespace(s);
  }

  /**
   * Checks whether the given string is `null` or `""`.
   *
   * @param s Contains some string.
   * @returns whether the given string is `null` or `""`.
   */
  public static isNullOrEmpty(s: string | null): s is null {
    if (Strings.isNull(s)) {
      return true;
    }

    return Strings.isEmpty(s);
  }

  /**
   * Checks whether the given string is `null` or white space.
   *
   * @param s Contains some string.
   * @returns whether the given string is `null` or white space.
   */
  public static isNullOrWhiteSpace(s: string | null): s is null {
    if (Strings.isNull(s)) {
      return true;
    }

    return Strings.isWhitespace(s);
  }

  /**
   * Checks whether the given string represents a stringified number.
   *
   * @param s Contains some string.
   * @returns whether the given string represents a stringified number.
   */
  public static isNumeric(s: string) {
    return !Number.isNaN(s) && !Number.isNaN(parseFloat(s));
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
   * @param s Contains some string.
   * @returns whether the given string is upper case.
   */
  public static isUpperCase(s: string): boolean {
    let i, result = true;
    for (i = 0; i < s.length; i++) {
      const c = s.charAt(i);
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
   * Checks whether the given string is white space.
   *
   * @param s Contains some string.
   * @returns whether the given string is white space.
   */
  public static isWhitespace(s: string): boolean {
    return !s.trim().length;
  }

  /**
   * Joins a given string with other strings.
   *
   * @param s Contains some string.
   * @param otherStrings Contains some other strings.
   * @returns a string composed of a concatenation of all the given strings.
   */
  public static join(s: string, ...otherStrings: string[]): string {
    return s.concat(otherStrings.join(''));
  }

  /**
   * Gets the last index at which the given string sequence is located in the
   * given string.
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the index at which to begin searching in the given
   * string. If omitted, the search begins at the end of the string.
   * @returns the last index at which the given string sequence is located in the
   * given string.
   */
  public static lastIndexOf(s: string, sequence: string, position?: number): number {
    return s.lastIndexOf(sequence, position)
  }

  /**
   * Gets the last index at which the given string sequence is located in the
   * given string (case-insensitive).
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @param position Contains the last index at which to begin searching in the given
   * string. If omitted, the search begins at the end of the string.
   * @returns the last index at which the given string sequence is located in the
   * given string (case-insensitive).
   */
  public static lastIndexOfIgnoreCase(s: string, sequence: string, position?: number): number {
    return s.toLowerCase().lastIndexOf(sequence.toLowerCase(), position);
  }

  /**
   * Gets the `length` leftmost characters of the given string.
   *
   * @param s Contains some string.
   * @param length Contains the number of strings to take from the string end.
   * @returns the last `length` characters of the string as a substring.
   */
  public static left(s: string, length: number): string {
    if (length < 0) {
      return Strings.EMPTY;
    }
    if (s.length <= length) {
      return s;
    }
    return s.substring(0, length);
  }

  /**
   * Converts the given string to upper case.
   *
   * @param s Contains some string.
   * @returns the string converted to upper case.
   */
  public static lowerCase(s: string): string {
    return s.toLowerCase();
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
   * @param s Contains some string.
   * @param to Contains the value to show in case the string is `null`, `undefined`
   * or white space. Defaults to `""`.
   * @returns the normalized string.
   */
  public static normalize(s: string, to: null): string | null;
  public static normalize(s: string, to: undefined): string | undefined;
  public static normalize(s: string, to: ''): string;
  public static normalize(s: string, to: null | undefined | '' = ''): string | null | undefined {
    s = s.trim();
    if (Strings.isEmpty(s)) {
      return to;
    }

    return s.replace(/\s+/g, ' ');
  }

  /**
   * Appends the given prefix to the beginning of the given string.
   *
   * @param s Contains some string.
   * @param prefix Contains some string prefix.
   * @returns the string prepended by the given prefix.
   */
  public static prepend(s: string, prefix: string): string {
    return prefix.concat(s);
  }

  /**
   * Appends the given string sequence to the beginning of the string in
   * case the string does not begin with it.
   *
   * @param s Contains some string.
   * @param prefix Contains some string prefix.
   * @param ignoreCase Contains whether to ignore case sensitivity.
   * @returns the extended string.
   */
  public static prependIfMissing(s: string, prefix: string, ignoreCase: boolean) {
    if (Strings.isEmpty(prefix) || Strings.startsWith(s, prefix, ignoreCase)) {
      return s;
    }

    return prefix + s;
  }

  /**
   * Appends the given string sequence to the beginning of the string in
   * case the string does not begin with it (case-insensitive).
   *
   * @param s Contains some string.
   * @param prefix Contains some string prefix.
   * @returns the extended string.
   */
  public static prependIfMissingIgnoreCase(s: string, prefix: string): string {
    return Strings.prependIfMissing(s, prefix, true);
  }

  /**
   * Removes all the string sequences which match the given sequence.
   *
   * @param s Contains some string.
   * @param sequence Contains some sequence to be removed from the given string.
   * @returns the string without the given sequence.
   */
  public static remove(s: string, sequence: string): string {
    if (Strings.isEmpty(s) || Strings.isEmpty(sequence)) {
      return s;
    }

    if (s.indexOf(sequence) === Strings.NF_INDEX) {
      return s;
    }

    const regex = new RegExp(sequence, 'gm');
    return s.replace(regex, '');
  }

  /**
   * Removes the given sequence from the given string if the string ends with
   * it; otherwise simply returns the given string.
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @returns the string without the given sequence in case it ends with it;
   * otherwise the given string is returned.
   */
  public static removeEnd(s: string, sequence: string): string {
    if (Strings.isEmpty(s) || Strings.isEmpty(sequence)) {
      return s;
    }
    if (s.endsWith(sequence)) {
      return s.substring(0, s.length - sequence.length);
    }
    return s;
  }

  /**
   * Removes the given sequence from the given string if the string ends with
   * it; otherwise simply returns the given string (case-insensitive).
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @returns the string without the given sequence in case it ends with it;
   * otherwise the given string is returned (case-insensitive).
   */
  public static removeEndIgnoreCase(s: string, sequence: string): string {
    if (Strings.isEmpty(s) || Strings.isEmpty(sequence)) {
      return s;
    }
    if (Strings.endsWithIgnoreCase(s, sequence)) {
      return s.substring(0, s.length - sequence.length);
    }
    return s;
  }

  /**
   * Removes white spaces from the given string.
   *
   * @param s Contains some string.
   * @returns the string without white space.
   */
  public static removeWhitespace(s: string) {
    if (Strings.isEmpty(s)) {
      return s;
    }

    return s.replace(/\s/g, '');
  }

  /**
   * Repeats the given string the given number of times.
   *
   * @param s Contains some string.
   * @param times Contains the number of times to repeat the given string.
   * @returns the `times`-repeated string.
   */
  public static repeat(s: string, times: number): string {
    if (Strings.isEmpty(s) || !Numbers.isPositiveInteger(times)) {
      return Strings.EMPTY;
    }

    return Array(times + 1).join(s);
  }

  /**
   * Checks whether the given string ends with the given string sequence.
   *
   * @param s Contains some string.
   * @param sequence Contains some string sequence.
   * @param ignoreCase Contains whether to ignore case-sensitivity.
   * @param position Contains the index at which to begin searching
   * in the given string. If omitted, it starts with the string end.
   * @returns whether the given string ends with the given string sequence.
   */
  public static startsWith(s: string, sequence: string, ignoreCase: boolean, position?: number): boolean {
    if (ignoreCase) {
      return s.toLowerCase().startsWith(sequence.toLowerCase(), position);
    }
    return s.startsWith(sequence, position);
  }

  /**
   * Removes white spaces from the beginning and from the end of the given
   * string.
   *
   * @param s Contains some string.
   * @returns the trimmed string.
   */
  public static strip(s: string): string {
    return s.trim();
  }

  /**
   * Converts the given string to title case.
   *
   * This method was extracted from
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
   * @param s Contains some string.
   * @returns the trimmed string.
   */
  public static trim(s: string): string {
    return s.trim();
  }

  /**
   * Truncates the given string to the given number of chars. The rest
   * of the chars is replaced by "...".
   *
   * @param s Contains some string.
   * @param maxChars Contains the max number of chars to show.
   * @returns the truncated string.
   */
  public static truncate(s: string, maxChars: number): string {
    if (maxChars < 0 || !Numbers.isNaturalNumber(maxChars)) {
      throw new TypeError(`Invalid string max length: ${maxChars}.`);
    }

    if (s.length > maxChars) {
      return `${s.substring(0, maxChars - 1)}\u2026`;
    }

    return s;
  }

  /**
   * Converts the given string to upper case.
   *
   * @param s Contains some string.
   * @returns the string converted to upper case.
   */
  public static upperCase(s: string): string {
    return s.toUpperCase();
  }

  /**
   * Checks whether the given value is null.
   *
   * @param s Contains some value.
   * @returns whether the given value is `null`.
   *
   * @private
   */
  private static isNull(s?: any): s is null {
    return s === null;
  }

  /**
   * Checks whether the given value is `null` or `undefined`.
   *
   * @param s Contains some value.
   * @returns whether the given value is `null` or `undefined`.
   *
   * @private
   */
  private static isNullOrUndefined(s?: any): s is null | undefined {
    return Strings.isNull(s) || Strings.isUndefined(s);
  }

  /**
   * Checks whether the given value is not defined.
   *
   * @param s Contains some value.
   * @returns whether the given value is not defined.
   *
   * @private
   */
  private static isUndefined(s?: any): s is undefined {
    return s === undefined || typeof s === 'undefined';
  }

  /**
   * Gets the carriage return character. Unicode: `000d`.
   *
   * @private
   */
  private static get CR(): string {
    return '\r';
  }

  /**
   * Gets the empty string.
   *
   * @private
   */
  private static get EMPTY(): string {
    return '';
  }

  /**
   * Gets the linefeed character. Unicode: `000a`.
   *
   * @private
   */
  private static get LF(): string {
    return '\n';
  }

  /**
   * Gets the index returned when some sequence is not found in some
   * string.
   *
   * @private
   */
  private static get NF_INDEX(): number {
    return -1;
  }
}
