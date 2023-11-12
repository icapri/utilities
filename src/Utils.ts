import {Numbers} from './numbers/Numbers';
import {Objects} from './objects/Objects';

/**
 * Represents an asynchronous function.
 */
type AsyncFunction <
  TArgs extends Array<any> = Array<any>,
  TReturn = any> = (...args: TArgs) => Promise<TReturn>;

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
 * @private
 */
type ThisArgsFn<T = any> = (thisArg: T, ...args: any[]) => T;

/**
 * Defines the type of a primitive wrapper constructor.
 */
interface PrimitiveWrapperCtor {
  prototype: {
      valueOf: FunctionType
  }
}

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
  public static get globalThat(): typeof globalThis |
    (Window & typeof globalThis) {
    if (Utils.isDefined(globalThis)) {
      return globalThis;
    }
    if (Objects.isObject(global) && global.global === global) {
      return global;
    }
    if (Objects.isObject(window) && window.window === window) {
      return window;
    }
    if (Objects.isObject(self) && self.self === self) {
      return self;
    }
    throw new Error('Noop!');
  }

  /**
   * Checks whether the specified value is an asynchronous function.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is an asynchronous function.
   */
  public static isAsyncFunction(value?: any): value is AsyncFunction {
    return Objects.toString(value) === '[object AsyncFunction]';
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
   * Checks whether the specified value is of type `DataView`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is of type `DataView`.
   */
  public static isDataView(value?: any): value is DataView {
    return Utils.isDefined(DataView) &&
      Utils.isDefined(ArrayBuffer) &&
      Objects.toString(
          new DataView(new ArrayBuffer(1), 0, 1),
      ) === '[object DataView]' ?
        Objects.toString(value) === '[object DataView]' :
        value instanceof DataView;
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
   * Checks whether the specified value is a generator object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a generator object.
   */
  public static isGeneratorObject(value?: any): value is Generator {
    return Objects.toString(value) === '[object Generator]';
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
    return value === null ||
      type === 'boolean' ||
      type === 'number' ||
      type === 'string' ||
      type === 'symbol' ||
      type === 'undefined';
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
    return (Utils.isDefined(Promise) && value instanceof Promise) ||
      (Objects.isObject(value) &&
        Utils.isFunction((value as any).then) &&
        Utils.isFunction((value as any).catch)
        // there is a finally method in the newer versions of Promise
      );
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
   * Checks whether the specified value is a `Symbol` object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `Symbol` object.
   */
  public static isSymbolObject(
      value?: any,
  ): value is (typeof Symbol extends undefined ? false : Symbol) {
    return Utils.isDefined(Symbol) &&
    Utils.__isPrimitiveWrapperSupported(value, Symbol);
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
    return typeof value === 'undefined' || value === undefined;
  }

  /**
   * Checks whether the specified value is a web assembly module.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a web assembly module.
   */
  public static isWebAssemblyCompiledModule(
      value?: any,
  ): value is WebAssembly.Module {
    return Objects.toString(value) === '[object WebAssembly.Module]';
  }

  /**
   * Checks whether the specified value is a primitive wrapper object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a primitive wrapper
   * object.
   */
  public static isWrappedPrimitive(value?: any): boolean {
    const t = Objects.toString(value);
    return t === '[object Boolean]' ||
      t === '[object Number]' ||
      t === '[object String]' ||
      Numbers.isBigIntObject(value) ||
      Utils.isSymbolObject(value);
  }

  /**
   * Uncurries the specified function.
   *
   * @param {Function} func Contains some function.
   * @return {ThisArgsFn} an uncurried function.
   */
  public static uncurry(func: FunctionType): ThisArgsFn {
    return func.call.bind(func);
  }

  /**
   * Checks whether the specified wrapper type is supported.
   *
   * @param {*} value Contains some value.
   * @param {TWrapper} wrapperType Contains the wrapper type constructor.
   * @return {Boolean} whether the specified wrapper type is supported.
   *
   * @private
   */
  public static __isPrimitiveWrapperSupported<
    TWrapper extends PrimitiveWrapperCtor
  >(value: any, wrapperType: TWrapper): boolean {
    if (Objects.isObject(value) && Utils.isDefined(wrapperType)) {
      const valueOfType = Utils.uncurry(wrapperType.prototype.valueOf as any);
      try {
        valueOfType(value);
        return true;
      } catch (_) {
        return false;
      }
    }
    return false;
  }
}

export type {
  AsyncFunction,
  ConstructorType,
  FunctionType,
};
