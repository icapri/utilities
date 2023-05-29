import {Objects} from '../objects/Objects';

/**
 * Defines an abstract class with number utilities.
 */
export abstract class Numbers {
  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Gets the absolute value of the given number.
   *
   * @param {Number} num Contains some number.
   * @return {Number} the absolute value of the given number.
   */
  public static abs(num: number): number {
    let abs = num;
    if (abs < 0) {
      abs *= -1;
    }
    return abs;
  }

  /**
   * Compares two numbers. Useful for array sorting.
   *
   * @param {Number} a Contains some number.
   * @param {Number} b Contains some other number.
   * @return {Number}
   * * `-1` if `a` is smaller than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is greater than `b`.
   */
  public static compare(a: number, b: number): number {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }

  /**
   * Checks whether the given value is a positive integer.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is an integer.
   */
  public static isInteger(value?: any): value is number {
    return Numbers.isNumber(value) && Number.isSafeInteger(value);
  }

  /**
   * Checks whether the given value is greater than or equal 0.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a natural number
   * i. e. greater than or equal 0.
   */
  public static isNatural(value?: any): value is number {
    return Numbers.isInteger(value) && value >= 0;
  }

  /**
   * Checks whether the specified value equals `NaN`.
   *
   * @param {*} value
   * @return {Boolean} whether the specified value is not a number.
   *
   * @since v1.5.6
   */
  public static isNotNumber(value?: any): value is typeof Number.NaN {
    return (typeof value === 'number' && Number.isNaN(value)) ||
      (Numbers.isNumberObject(value) && Number.isNaN(value.valueOf()));
  }

  /**
   * Checks whether the given value is a number.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a number.
   */
  public static isNumber(value?: any): value is number {
    return typeof value === 'number' && Number.isFinite(value);
  }

  /**
   * Checks whether the specified value is an instance of the `Number`
   * object.
   *
   * **Usage Examples:**
   * ```typescript
   * Numbers.isNumberObject(); // false
   * Numbers.isNumberObject(5); // false
   * Numbers.isNumberObject("44"); // false
   * Numbers.isNumberObject(new Number(12)); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is an instance
   * of the `Number` object.
   */
  public static isNumberObject(value?: any): value is Number {
    return Objects.isObject(value) &&
      Objects.getType(value) === '[object Number]';
  }

  /**
   * Checks whether the given value is a positive integer.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a positive integer.
   */
  public static isPositiveInteger(value?: any): value is number {
    return Numbers.isInteger(value) && value > 0;
  }

  /**
   * Checks whether the specified number is a prime number.
   *
   * @param {Number} num Contains some number.
   * @return {Boolean} whether the specified number is a prime number.
   */
  public static isPrime(num: number): boolean {
    let i = 2;
    const s = Math.sqrt(num);
    for (; i <= s; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  }

  /**
   * Get a random integer in the specified range.
   *
   * @param {Number} min Contains the minimum for the random integer.
   * @param {Number} max Contains the maximum for the random integer.
   * @param {Boolean} incl Contains whether to include `min` and `max`.
   * Defaults to `false`;
   * @return {Number} a random integer in the specified range.
   */
  public static randomInt(
      min: number,
      max: number,
      incl?: boolean,
  ): number {
    if (min >= max) {
      throw new Error('Invalid arguments min and max.');
    }
    incl ??= false;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - (incl ? min + 1 : min)) + min);
  }

  /**
   * Converts the specified number to string.
   *
   * **Usage Examples:**
   * ```typescript
   * Numbers.toString(123); // "123"
   * Numbers.toString(12.3); // "12.3"
   * ```
   *
   * @param {Number} num Contains some number.
   * @return {String} a string.
   */
  public static toString(num: number): string {
    return '' + num;
  }
}
