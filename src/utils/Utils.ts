/**
 * Defines a base utility class.
 */
export abstract class Utils {
  /** @private */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Checks whether the given value is of boolean type.
   *
   * @param value Contains some value.
   * @returns whether the given value is of boolean type.
   */
  public static isBoolean(value?: any): value is boolean {
    return typeof value === 'boolean';
  }

  /**
   * Checks whether the given value is defined.
   *
   * @param value Contains some value.
   * @returns whether the given value is defined.
   */
  public static isDefined<T>(value?: T | undefined): value is T {
    return !Utils.isUndefined(value);
  }

  /**
   * Checks whether the given value is falsy i. e.: `null`, `undefined`,
   * `false`, `NaN`, `0`, `-0`, `0n` or `''`.
   *
   * @param value Contains some value.
   * @returns whether the given value is falsy.
   */
  public static isFalsy(value?: any): value is null | undefined | false | 0 | -0 | 0n | '' {
    return [
      // @ts-expect-error
      null, undefined, false, Number.NaN, 0, -0, 0n, '' 
    ].includes(value);
  }

  /**
   * Checks whether the given value is a function.
   *
   * @param value Contains some value.
   * @returns whether the given value is a function.
   */
  public static isFunction(value?: any): value is Function {
    return typeof value === 'function';
  }

  /**
   * Checks whether the given value is neither `null` nor `undefined`.
   *
   * @param value Contains some value.
   * @returns whether the given value is neither `null` nor `undefined`.
   */
  public static isNotNil<T>(value?: T | null | undefined): value is T {
    return !Utils.isNullOrUndefined(value);
  }

  /**
   * Checks whether the given value is not `null`.
   *
   * @param value Contains some value.
   * @returns whether the given value is not `null`.
   */
  public static isNotNull<T>(value?: T | null): value is T {
    return !Utils.isNull(value);
  }

  /**
   * Checks whether the given value is not `undefined`.
   *
   * @param value Contains some value.
   * @returns whether the given value is not `undefined`.
   */
  public static isNotUndefined<T>(value?: T | undefined): value is T {
    return !Utils.isUndefined(value);
  }

  /**
   * Checks whether the given value is null.
   *
   * @param value Contains some value.
   * @returns whether the given value is `null`.
   */
  public static isNull(value?: any): value is null {
    return value === null;
  }

  /**
   * Checks whether the given value is `null` or `undefined`.
   *
   * @param value Contains some value.
   * @returns whether the given value is `null` or `undefined`.
   */
  public static isNullOrUndefined(value?: any): value is null | undefined {
    return Utils.isNull(value) || Utils.isUndefined(value);
  }

  /**
   * Checks whether the given value is of primitive type. In JavaScript
   * there are 7 primitive types: `string`, `number`, `bigint`, `boolean`,
   * `undefined`, `symbol` and `null`.
   *
   * @param value Contains some value.
   * @returns whether the given value is of primitive type.
   */
  public static isPrimitive(value?: any): value is
    | bigint
    | boolean
    | null
    | number
    | string
    | symbol
    | undefined {
    return value !== Object(value);
  }

  /**
   * Checks whether the given value is not falsy i. e. not: `null`, `undefined`,
   * `false`, `NaN`, `0`, `-0`, `0n` or `''`.
   *
   * @param value Contains some value.
   * @returns whether the given value is not falsy.
   */
  public static isTruthy<T>(value: T | null | undefined | false | 0 | -0 | 0n | ''): value is T {
    return !Utils.isFalsy(value);
  }

  /**
   * Checks whether the given value is not defined.
   *
   * @param value Contains some value.
   * @returns whether the given value is not defined.
   */
  public static isUndefined(value?: any): value is undefined {
    return value === undefined || typeof value === 'undefined';
  }
}
