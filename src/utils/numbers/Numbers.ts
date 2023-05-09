/**
 * Defines an abstract class with number utilities.
 */
export abstract class Numbers {
  /** @private */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Gets the absolute value of the given number.
   *
   * @param num Contains some number.
   * @returns the absolute value of the given number.
   */
  public static abs(num: number) {
    let abs = num;
    if(abs < 0) {
      abs *= -1
    }

    return abs;
  }

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
   * @param value Contains some value.
   * @returns whether the given value is an integer.
   */
  public static isInteger(value?: any): value is number {
    return Numbers.isNumber(value) && Number.isSafeInteger(value);
  }

  /**
   * Checks whether the given value is greater than or equal 0.
   *
   * @param value Contains some value.
   * @returns whether the given value is a natural number i. e. greater
   * than or equal 0.
   */
  public static isNatural(value?: any): value is number {
    return Numbers.isInteger(value) && value >= 0;
  }

  /**
   * Checks whether the given value is a number.
   *
   * @param value Contains some value.
   * @returns whether the given value is a number.
   */
  public static isNumber(value?: any): value is number {
    return typeof value === 'number' && Number.isFinite(value);
  }

  /**
   * Checks whether the given value is a positive integer.
   *
   * @param value Contains some value.
   * @returns whether the given value is a positive integer.
   */
  public static isPositiveInteger(value?: any): value is number {
    return Numbers.isInteger(value) && value > 0;
  }

  /**
   * Checks whether the specified number is a prime number.
   *
   * @param n Contains some number.
   * @returns whether the specified number is a prime number.
   */
  public static isPrime(n: number): boolean {
    let i = 2, s = Math.sqrt(n);
    for (; i <= s; i++) if (n % i === 0) return false;
    return n > 1;
  }
}
