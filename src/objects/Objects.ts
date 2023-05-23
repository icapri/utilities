import {Utils} from '../Utils';
import {JsonSerializer} from './JsonSerializer';

/**
 * Gets the object entries.
 *
 * @param {Object} o Contains some object.
 *
 * @private
 */
function* __entries<T extends object>(o: T): Generator<any[], void, unknown> {
  let i = 0;
  const entries = Object.entries(o);
  for (; i < entries.length; i++) {
    yield [entries[i][0], entries[i][1]];
  }
}

/**
 * Defines an abstract class with object utilities.
 */
export abstract class Objects {
  /**
   * Contains an empty object.
   */
  public static readonly EMPTY: {} = {} as const;

  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Checks whether the specified objects deep equal.
   *
   * **Example:**
   * ```typescript
   * const o1 = {a: '55', b: 4, c: false};
   * const o2 = {c: false, a: '55', b: 4};
   *
   * console.log(Objects.deepEqual(o1, o2)); // true
   * ```
   *
   * @param {Object} o1 Contains some object.
   * @param {Object} o2 Contains some other object.
   * @return {Boolean} whether the specified objects deep equal.
   *
   * **Note:** According to ES3
   */
  public static deepEquals(o1: object, o2: object): boolean {
    if (Objects.equals(o1, o2)) {
      return true;
    }

    if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
      return false;
    }

    if (o1.constructor !== o2.constructor) {
      return false;
    }

    // intentional dec. with "var" for access out of the "for" block
    // eslint-disable-next-line no-var
    for (var p in o1) {
      if (!Objects.hasProperty(o1, p)) {
        continue;
      }

      if (!Objects.hasProperty(o2, p)) {
        return false;
      }

      if (o1[p] === o2[p]) {
        continue;
      }

      if (Objects.isObject(o1[p]) === false ||
        Objects.deepEquals((o1 as any)[p], o2[p]) === false) {
        return false;
      }
    }

    for (p in o2) {
      if (Objects.hasProperty(o2, p) && !Objects.hasProperty(o1, p)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Deserializes a JSON string.
   *
   * **Example:**
   * ```typescript
   * Objects.deserialize("{}"); // {}
   * Objects.deserialize('{"a":true}'); // {a: true}
   * Objects.deserialize('{"a":2,"b":"abc"}'); // {a: 2, b: "abc"}
   * ```
   *
   * @param {String} json Contains some JSON string.
   * @return {T} a JavaScript value equivalent to the JSON string.
   *
   * @since v1.5.5
   */
  public static deserialize<T>(json: string): T {
    return JsonSerializer.deserialize(json);
  }

  /**
   * Gets the object entries.
   *
   * @param {Object} obj Contains some object.
   * @return {Iterator} the object entries as an array of key-value pair tuples.
   */
  public static entries<T extends object>(
      obj: T,
  ): Generator<(Extract<keyof T, string>
    | T[Extract<keyof T, string>])[], void, unknown> {
    return __entries(obj);
  }

  /**
   * Checks whether the two specified objects strictly equal.
   *
   * **Example:**
   * ```typescript
   * const obj1 = {
   *   a: 'string',
   *   b: false,
   *   c: 44,
   * };
   * const obj2 = obj1;
   * console.log(Objects.equals(obj1, obj2)); // true
   * ```
   *
   * @param {Object} a Contains some object.
   * @param {Object} b Contains some other object.
   * @return {Boolean} whether the two specified objects strictly equal.
   */
  public static equals(a: object, b: object): boolean {
    return a === b;
  }

  /**
   * Gets the object type of JavaScript built-in types such as `String`,
   * `RegExp`, `Number`, `Date`, etc.
   *
   * **Example:**
   * ```typescript
   * Objects.getType("abc"); // "[object String]"
   * Objects.getType(new Date()); // "[object Date]"
   * ```
   *
   * @param {Object} obj Contains some object.
   * @return {String} the object type.
   */
  public static getType<T extends object>(obj?: T): string {
    return Object.prototype.toString.call(obj);
  }

  /**
   * Checks whether the given object has a property with the given name.
   *
   * @param {Object} obj Contains some object.
   * @param {String} key Contains some key.
   * @return {Boolean} whether the given object has a property with the
   * given key.
   */
  public static hasProperty<T extends object>(
      obj: T, key: string | number | symbol): key is keyof T {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  /**
   * Checks whether the given object is empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is empty.
   */
  public static isEmpty<T extends object>(
    obj: T | Record<string, never>
  ): obj is Record<string, never>;
  /**
   * Checks whether the given object is empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is empty.
   */
  public static isEmpty<T extends Object>(
    obj: T | Record<string, never>
  ): obj is Record<string, never>;
  /**
   * Checks whether the given object is empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is empty.
   */
  public static isEmpty<T extends object | Object>(
      obj: T | Record<string, never>,
  ): obj is Record<string, never> {
    const noProps = Object.getOwnPropertyNames(obj).length === 0;
    const noSymbs = Object.getOwnPropertySymbols(obj).length === 0;
    return noProps && noSymbs;
  }

  /**
   * Checks whether the given object is not empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not empty.
   */
  public static isNotEmpty<T extends object>(obj: T): boolean;
  /**
   * Checks whether the given object is not empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not empty.
   */
  public static isNotEmpty<T extends Object>(obj: T): boolean;
  /**
   * Checks whether the given object is not empty.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not empty.
   */
  public static isNotEmpty<T extends object | Object>(obj: T): boolean {
    return Objects.isEmpty(obj) === false;
  }

  /**
   * Checks whether the given object is not null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not null.
   */
  public static isNotNull<T extends object>(obj?: T | null): obj is T;
  /**
   * Checks whether the given object is not null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not null.
   */
  public static isNotNull<T extends Object>(obj?: T | null): obj is T;
  /**
   * Checks whether the given object is not null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is not null.
   */
  public static isNotNull<T extends object | Object>(obj?: T | null): obj is T {
    return Utils.isNotNil(obj);
  }

  /**
   * Checks whether the given object is null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is null.
   */
  public static isNull<T extends object>(
    obj?: T | null | undefined): obj is null | undefined;
  /**
   * Checks whether the given object is null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is null.
   */
  public static isNull<T extends Object>(
    obj?: T | null | undefined): obj is null | undefined;
  /**
   * Checks whether the given object is null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is null.
   */
  public static isNull<T extends object | Object>(
      obj?: T | null | undefined): obj is null | undefined {
    return Utils.isNullOrUndefined(obj);
  }

  /**
   * Checks whether the given value is an object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is an object.
   */
  public static isObject(value?: any): value is object {
    return value !== null && typeof value === 'object';
  }

  /**
   * Checks whether the specified value is a plain object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a plain object.
   *
   * @since v1.5.6
   */
  public static isPlainObject(
      value?: any,
  ): value is Record<string | number | symbol, any> {
    if (Objects.isObject(value) &&
      Objects.getType(value) === '[object Object]') {
      const Ctor = value.constructor;
      if (Utils.isFunction(Ctor)) {
        const proto = Ctor.prototype;
        return Objects.isObject(proto) &&
          Objects.getType(proto) === '[object Object]' &&
          proto.hasOwnProperty('isPrototypeOf');
      }
    }
    return false;
  }

  /**
   * Checks whether the specified object has no property `null` or `undefined`.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the specified object has no property `null`
   * or `undefined`.
   */
  public static noNilProps<T extends object>(obj: T): boolean {
    const values = Object.values(obj);
    let i = 0; const length = values.length;
    while (i < length) {
      const value = values[i];
      if (Utils.isNullOrUndefined(value)) {
        return false;
      }

      i++;
    }

    return true;
  }

  /**
   * Omits the object properties with the given keys.
   *
   * @param {Object} obj Contains some object.
   * @param {Array} keys Contains the keys of the object properties to
   * be omitted.
   * @return {Object} a truncated object.
   */
  public static omit<T extends object, Keys extends [...(keyof T)[]]>(
      obj: T, ...keys: Keys): {
    [P in Exclude<keyof T, Keys[number]>]: T[P]
  } {
    const result: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (!(keys.includes(key as any))) {
        result[key] = value;
      }
    });

    return result;
  }

  /**
   * Picks the properties of the given object with the given keys.
   *
   * @param {Object} obj Contains some object.
   * @param {Array} keys Contains the keys of the object properties
   * to be picked.
   * @return {Boolean} the truncated object.
   */
  public static pick<T extends object, K extends keyof T>(
      obj: T, ...keys: K[]): Pick<T, K> {
    const result: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (keys.includes(key as any)) {
        result[key] = value;
      }
    });
    return result;
  }

  /**
   * Serializes the specified value i. e. converts it to a JSON string.
   *
   * **Example:**
   * ```typescript
   * Objects.serialize({}); // "{}"
   * Objects.serialize({a: true}); // "{"a":true}"
   * Objects.serialize({a: 2, b: "abc"}); // "{"a":2,"b":"abc"}"
   * ```
   *
   * @param {String} value Contains some value.
   * @return {String} a JSON string.
   *
   * @since v1.5.5
   */
  public static serialize<T>(value: T): string {
    return JsonSerializer.serialize(value);
  }

  /**
   * Makes the specified object iterable.
   *
   * @param {Object} obj Contains some object.
   * @return {Object} an iterable object.
   */
  public static toIterable<T extends object>(
      obj: T,
  ): Iterable<[Omit<keyof T, number | symbol>, T[keyof T]]> {
    return {
      ...obj,
      * [Symbol.iterator]() {
        yield* Object.entries(obj);
      },
    };
  }

  /**
   * Converts an object to a map.
   *
   * @param {Object} obj Contains some object.
   * @return {Map} a map whose keys are the object property keys and
   * values are their values.
   */
  public static toMap<T extends object, K extends keyof T>(
      obj: T,
  ): Map<K, T[K]> {
    const entries = Objects.entries(obj);
    return new Map<K, T[K]>(entries as any);
  }

  /**
   * Converts an object to a set.
   *
   * @param {Object} obj Contains some object.
   * @return {Set} a set composed of the object values.
   */
  public static toSet<T extends object>(obj: T): Set<T[keyof T]> {
    const values = Object.values(obj);
    return new Set<T[keyof T]>(values);
  }
}
