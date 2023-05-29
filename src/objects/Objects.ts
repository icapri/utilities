import {Utils} from '../Utils';
import {JsonSerializer} from './JsonSerializer';

/**
 * Gets the object entries.
 *
 * @param {Object} obj Contains some object.
 *
 * @private
 */
function* __entries<T extends object>(obj: T): Generator<any[], void, unknown> {
  let i = 0;
  const entries = Object.entries(obj);
  for (; i < entries.length; i++) {
    yield [entries[i][0], entries[i][1]];
  }
}

/**
 * Defines a type for the property descriptors of an object.
 *
 * @since v1.5.8
 */
type PropertyDescriptors<TObject extends object> = {
  [TProperty in keyof TObject]: TypedPropertyDescriptor<TObject[TProperty]>;
} & {
  [propertyKey: string]: PropertyDescriptor;
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
   * **Usage Examples:**
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
   * **Usage Examples:**
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
   * Deserializes a JSON string i. e. parses it as an object.
   *
   * **Usage Examples:**
   * ```typescript
   * Objects.fromJson("{}"); // {}
   * Objects.fromJson('{"a":true}'); // {a: true}
   * Objects.fromJson('{"a":2,"b":"abc"}'); // {a: 2, b: "abc"}
   * ```
   *
   * @param {String} json Contains some JSON string.
   * @return {T} a JavaScript value equivalent to the JSON string.
   *
   * @since v1.5.10
   *
   * @see `JsonSerializer.deserialize()`
   */
  public static fromJson<T>(json: string): T {
    return JsonSerializer.deserialize(json);
  }

  /**
   * Gets the property descriptors of the specified object.
   *
   * @param {Object} obj Contains some object.
   * @return {PropertyDescriptors} the property descriptors of the specified
   * object.
   *
   * @since v1.5.8
   */
  public static getPropertyDescriptors<TObject extends object>(
      obj: TObject,
  ): PropertyDescriptors<TObject> {
    if (Objects.hasProperty(Object, 'getOwnPropertyDescriptors') &&
      Utils.isFunction(Object.getOwnPropertyDescriptors)) {
      return Object.getOwnPropertyDescriptors(obj);
    }

    const descriptors: any = {};
    Object.keys(obj).forEach((key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(obj, key);
    });
    return descriptors;
  }

  /**
   * Gets the object type of JavaScript built-in types such as `String`,
   * `RegExp`, `Number`, `Date`, etc.
   *
   * **Usage Examples:**
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
    return Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0;
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
    obj?: T | null): obj is null;
  /**
   * Checks whether the given object is null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is null.
   */
  public static isNull<T extends Object>(
    obj?: T | null): obj is null;
  /**
   * Checks whether the given object is null.
   *
   * @param {Object} obj Contains some object.
   * @return {Boolean} whether the given object is null.
   */
  public static isNull<T extends object | Object>(
      obj?: T | null): obj is null {
    return Utils.isNull(obj);
  }

  /**
   * Checks whether the given value is an object.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is an object.
   */
  public static isObject(value?: any): value is object {
    return typeof value === 'object' && value !== null;
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
   * Serializes the specified object i. e. converts it to a JSON string.
   *
   * **Usage Examples:**
   * ```typescript
   * Objects.toJson({}); // "{}"
   * Objects.toJson({a: true}); // "{"a":true}"
   * Objects.toJson({a: 2, b: "abc"}); // "{"a":2,"b":"abc"}"
   * ```
   *
   * @param {Object} obj Contains some object.
   * @return {String} the JSON string.
   *
   * @since v1.5.10
   *
   * @see `JsonSerializer.serialize()`
   */
  public static toJson<TObject extends object>(obj?: TObject): string {
    return JsonSerializer.serialize(obj);
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

  /**
   * Gets the string representation of the specified object.
   *
   * **Usage Examples:**
   * ```typescript
   * Objects.toString(); // "[object Undefined]"
   * Objects.toString({}); // "[object Object]"
   * Objects.toString(["a"]); // "[object Array]"
   * Objects.toString(12345); // "[object Number]"
   * ```
   *
   * @param {*} obj Contains some object.
   * @return {String} the string representation of the specified object.
   *
   * @since v1.5.8
   */
  public static toString(obj?: any): string {
    return Object.prototype.toString.call(obj);
  }
}

export type {PropertyDescriptors};
