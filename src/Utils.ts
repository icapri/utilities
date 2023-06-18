import {Objects} from './objects/Objects';

/**
 * Represents the type of a class.
 *
 * @since v1.5.6
 */
type ConstructorType<T = any> = new(...args: any[]) => T;

/**
 * Represents the type of a function.
 *
 * @since v1.5.6
 */
type FunctionType<T = any> = (...args: any[]) => T;

/**
 * Defines a base utility class.
 */
export abstract class Utils {
  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Gets the global object.
   */
  public static get globalScope(): typeof globalThis |
    (Window & typeof globalThis) {
    if (Objects.isObject(window) && window.window === window) {
      return window;
    }
    if (Objects.isObject(self) && self.self === self) {
      return self;
    }
    if (Objects.isObject(global) && global.global === global) {
      return global;
    }
    throw new Error('Noop!');
  }

  /**
   * Checks whether the given value is of boolean type.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is of boolean type.
   */
  public static isBoolean(value?: any): value is boolean {
    return typeof value === 'boolean';
  }

  /**
   * Checks whether the given value is defined.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is defined.
   */
  public static isDefined<T>(value?: T | undefined): value is T {
    return Utils.isUndefined(value) === false;
  }

  /**
   * Checks whether the specified value is an `Error` instance.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is an error instance.
   *
   * @since v1.5.6
   */
  public static isError(value?: any): value is Error {
    return Objects.toString(value) === '[object Error]';
  }

  /**
   * Checks whether the given value is falsy i. e.: `null`, `undefined`,
   * `false`, `NaN`, `0`, `-0`, `0n` or `''`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is falsy.
   */
  public static isFalsy(
      value?: any): value is null | undefined | false | 0 | -0 | 0n | '' {
    return [
      // @ts-expect-error
      null, undefined, false, Number.NaN, 0, -0, 0n, '',
    ].includes(value);
  }

  /**
   * Checks whether the specified value is a `File` instance.
   *
   * **Usage Examples:**
   * ```typescript
   * Utils.isFile(null); // false
   * Utils.isFile(new File([], "abc")); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `File` instance.
   *
   * @since v1.5.6
   */
  public static isFile(value?: any): value is File {
    return Objects.toString(value) === '[object File]';
  }

  /**
   * Checks whether the specified value is a `FormData` object.
   *
   * **Usage Examples:**
   * ```typescript
   * const formData = new FormData();
   * formData.append('a', 'abc');
   * Utils.isFormData(formData); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `FormData` object.
   *
   * @since v1.6.7
   */
  public static isFormData(value?: any): value is FormData {
    return Objects.toString(value) === '[object FormData]';
  }

  /**
   * Checks whether the given value is a function.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a function.
   */
  public static isFunction(value?: any): value is Function {
    return typeof value === 'function';
  }

  /**
   * Checks whether the specified value is an iterable object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is an iterable object.
   */
  public static isIterable(value?: any): boolean {
    return Utils.isNotNil(value) && Utils.isFunction(value[Symbol.iterator]);
  }

  /**
   * Checks whether the given value is neither `null` nor `undefined`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is neither `null` nor
   * `undefined`.
   */
  public static isNotNil<T>(value?: T | null | undefined): value is T {
    return Utils.isNullOrUndefined(value) === false;
  }

  /**
   * Checks whether the given value is not `null`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not `null`.
   */
  public static isNotNull<T>(value?: T | null): value is T {
    return Utils.isNull(value) === false;
  }

  /**
   * Checks whether the given value is not `undefined`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not `undefined`.
   */
  public static isNotUndefined<T>(value?: T | undefined): value is T {
    return Utils.isUndefined(value) === false;
  }

  /**
   * Checks whether the given value is null.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is `null`.
   */
  public static isNull(value?: any): value is null {
    return value === null;
  }

  /**
   * Checks whether the given value is `null` or `undefined`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is `null` or `undefined`.
   */
  public static isNullOrUndefined(value?: any): value is null | undefined {
    return Utils.isNull(value) || Utils.isUndefined(value);
  }

  /**
   * Checks whether the given value is of primitive type. In JavaScript
   * there are 7 primitive types: `string`, `number`, `bigint`, `boolean`,
   * `undefined`, `symbol` and `null`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is of primitive type.
   */
  public static isPrimitive(value?: any): value is
    | bigint
    | boolean
    | null
    | number
    | string
    | symbol
    | undefined {
    const type = typeof value;
    return Utils.isNull(value) || [
      'string',
      'number',
      'bigint',
      'boolean',
      'symbol',
      'undefined',
    ].includes(type);
  }

  /**
   * Checks whether the specified value is a `Promise`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a JavaScript `promise`.
   *
   * @since v1.5.6
   */
  public static isPromise(value?: any): value is Promise<any> {
    return Objects.toString(value) === '[object Promise]';
  }

  /**
   * Checks whether the specified value is a `PromiseLike<T>` object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `PromiseLike<T>` object.
   *
   * @since v1.6.7
   */
  public static isPromiseLike(value?: any): value is PromiseLike<any> {
    return value && Utils.isFunction(value.then);
  }

  /**
   * Checks whether the specified value is a regular expression.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a regular expression.
   */
  public static isRegExp(value?: any): value is RegExp {
    return Objects.isObject(value) &&
      Objects.toString(value) === '[object RegExp]';
  }

  /**
   * Checks whether the specified value is a symbol.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a symbol.
   */
  public static isSymbol(value?: any): value is symbol {
    return typeof value === 'symbol';
  }

  /**
   * Checks whether the given value is not falsy i. e. not: `null`, `undefined`,
   * `false`, `NaN`, `0`, `-0`, `0n` or `''`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not falsy.
   */
  public static isTruthy<T>(
      value?: T | null | undefined | false | 0 | -0 | 0n | ''): value is T {
    return Utils.isFalsy(value) === false;
  }

  /**
   * Checks whether the given value is not defined.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is not defined.
   */
  public static isUndefined(value?: any): value is undefined {
    return value === void 0;
  }
}

export type {
  ConstructorType,
  FunctionType,
};
