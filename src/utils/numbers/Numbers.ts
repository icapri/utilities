import { Comparator } from '../Comparator';
import { Strings } from '../strings/Strings';
import { NumberParser } from './NumberParser';

/**
 * Defines an abstract class with number utilities.
 */
export abstract class Numbers extends Comparator {
  /**
   * Compares two numbers. Useful for array sorting.
   *
   * @param a Contains some number.
   * @param b Contains some other number.
   * @returns
   * * `-1` if `a` is smaller than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is greater than `b`.
   */
  public static override compare(a: number, b: number): number {
    return Comparator.compare(a, b);
  }

  /**
   * Checks whether the given value is a positive integer.
   *
   * @param value Contains some value.
   * @returns whether the given value is an integer.
   */
  public static isInteger(value?: any): value is number {
    return Numbers.isNumber(value) && Number.isSafeInteger(value);
  }

  public static isNaturalNumber(value?: any): value is number {
    return Numbers.isInteger(value) && value >= 0;
  }

  public static isNumber(value?: any): value is number {
    return typeof value === 'number' && Number.isFinite(value);
  }

  public static isPositiveInteger(value?: any): value is number {
    return Numbers.isInteger(value) && value > 0;
  }

  public static parse(value: any, locale: string): number | null {
    // if the value is a valid number, simply return it
    if (Numbers.isNumber(value)) {
      return value;
    }

    if (Strings.isString(value) && !Strings.isWhitespace(value)) {
      const parser = new NumberParser(locale);
      const parsedValue = parser.parse(value);
      // make sure the parsed value is a valid number
      if (Numbers.isNumber(parsedValue)) {
        return parsedValue;
      }
    }

    return null;
  }
}
