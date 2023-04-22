import { Comparator } from '../../core/comparators';
import { Validator } from '../../core/validators';

export abstract class Strings extends Comparator {
  static override compare(a: string, b: string): number {
    return Comparator.compare(a, b);
  }

  static equal(a: string, b: string): boolean;
  static equal(a: String, b: String): boolean;
  static equal<T extends string | String>(a: T, b: T): boolean {
    if (Validator.isString(a) && Validator.isString(b)) {
      return a === b;
    }

    const valueOfA = new String(a).valueOf();
    const valueOfB = new String(b).valueOf();
    return valueOfA === valueOfB;
  }

  static hashCode(value: string): number {
    let hash = 0, i, chr;
    if (value.length === 0) {
      return hash;
    }

    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      // convert the hash to a 32-bit integer
      hash |= 0;
    }
    return hash;
  }

  static hasWhiteSpace(value: string): boolean {
    return value.indexOf(' ') >= 0;
  }

  static isEmpty(value: string): boolean {
    return !value.length;
  }

  static isNilOrEmpty(value?: string | null | undefined): value is null | undefined {
    return Validator.isNullOrUndefined(value) || Strings.isEmpty(value);
  }

  static isNilOrWhiteSpace(value: string | null): value is null {
    return Validator.isNullOrUndefined(value) || Strings.isWhiteSpace(value);
  }

  static isNullOrEmpty(value: string | null): value is null {
    return Validator.isNull(value) || Strings.isEmpty(value);
  }

  static isNullOrWhiteSpace(value: string | null): value is null {
    return Validator.isNull(value) || Strings.isWhiteSpace(value);
  }

  static isString(value?: any): value is string {
    return Validator.isString(value);
  }

  static isStringObject(value?: any): value is String {
    return Validator.isStringObject(value);
  }

  static isWhiteSpace(value: string): boolean {
    return !value.trim().length;
  }

  static truncate(value: string, maxChars: number): string {
    if (maxChars < 0 || !Validator.isNaturalNumber(maxChars)) {
      throw new TypeError(`Invalid string max length: ${maxChars}.`);
    }

    if (value.length > maxChars) {
      return `${value.substring(0, maxChars - 1)}\u2026`;
    }

    return value;
  }
}
