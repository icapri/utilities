import { Utils } from '../Utils';

/**
 * Gets the object entries.
 *
 * @param o Contains some object.
 *
 * @private
 */
function* __entries<T extends object>(o: T) {
  for (const k in o) {
    yield [k, o[k]];
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

  /** @private */
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
   * @param o1 Contains some object.
   * @param o2 Contains some other object.
   * @returns whether the specified objects deep equal.
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

      if (!Objects.isObject(o1[p]) || !Objects.deepEquals((o1 as any)[p], o2[p])) {
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
   * @param o Contains some object.
   * @returns the object entries as an array of key-value pair tuples.
   */
  public static entries<T extends object>(
    o: T
  ): Generator<(Extract<keyof T, string> | T[Extract<keyof T, string>])[], void, unknown> {
    return __entries(o);
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
   * @param a Contains some object.
   * @param b Contains some other object.
   * @returns whether the two specified objects strictly equal.
   */
  public static equals(a: object, b: object): boolean {
    return a === b;
  }

  /**
   * Gets the class name of the specified argument.
   *
   * **Example:**
   * ```typescript
   * Utils.getClassOf(9); // "[object Number]"
   * Utils.getClassOf("abc"); // "[object String]"
   * Utils.getClassOf(false); // "[object Boolean]"
   * ```
   *
   * @returns the class name of the specified argument.
   */
  public static getClassOf = Function.prototype.call.bind(Object.prototype.toString);

  /**
   * Checks whether the given object has a property with the given name.
   *
   * @param o Contains some object.
   * @param key Contains some key.
   * @returns whether the given object has a property with the given key.
   */
  public static hasProperty<T extends object>(o: T, key: string | number | symbol): key is keyof T {
    return Object.prototype.hasOwnProperty.call(o, key);
  }

  /**
   * Checks whether the given object is empty.
   *
   * @param o Contains some object.
   * @returns whether the given object is empty.
   */
  public static isEmpty<T extends object>(
    o: T | Record<string, never>
  ): o is Record<string, never>;
  public static isEmpty<T extends Object>(
    o: T | Record<string, never>
  ): o is Record<string, never>;
  public static isEmpty<T extends object | Object>(
    o: T | Record<string, never>
  ): o is Record<string, never> {
    const noProps = Object.getOwnPropertyNames(o).length === 0;
    const noSymbs = Object.getOwnPropertySymbols(o).length === 0;
    return noProps && noSymbs;
  }

  /**
   * Checks whether the given object is not empty.
   *
   * @param o Contains some object.
   * @returns whether the given object is not empty.
   */
  public static isNotEmpty<T extends object>(o: T): boolean;
  public static isNotEmpty<T extends Object>(o: T): boolean;
  public static isNotEmpty<T extends object | Object>(o: T): boolean {
    return !Objects.isEmpty(o);
  }

  /**
   * Checks whether the given object is not null.
   *
   * @param o Contains some object.
   * @returns whether the given object is not null.
   */
  public static isNotNull<T extends object>(o?: T | null): o is T;
  public static isNotNull<T extends Object>(o?: T | null): o is T;
  public static isNotNull<T extends object | Object>(o?: T | null): o is T {
    return Utils.isNotNil(o);
  }

  /**
   * Checks whether the given object is null.
   *
   * @param o Contains some object.
   * @returns whether the given object is null.
   */
  public static isNull<T extends object>(o?: T | null | undefined): o is null | undefined;
  public static isNull<T extends Object>(o?: T | null | undefined): o is null | undefined;
  public static isNull<T extends object | Object>(o?: T | null | undefined): o is null | undefined {
    return Utils.isNullOrUndefined(o);
  }

  /**
   * Checks whether the given value is an object.
   *
   * @param value Contains some value.
   * @returns whether the given value is an object.
   */
  public static isObject(value?: any): value is object {
    return value !== null && typeof value === 'object';
  }

  /**
   * Checks whether the specified object has no property `null` or `undefined`.
   *
   * @param o Contains some object.
   * @returns whether the specified object has no property `null` or `undefined`.
   */
  public static noNilProps<T extends object>(o: T): boolean {
    const values = Object.values(o);
    let i = 0, length = values.length;
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
   * @param o Contains some object.
   * @param keys Contains the keys of the object properties to be omitted.
   * @returns a truncated object.
   */
  public static omit<T extends object, Keys extends [...(keyof T)[]]>(o: T, ...keys: Keys): {
    [P in Exclude<keyof T, Keys[number]>]: T[P]
  } {
    const result: any = {};
    Object.entries(o).forEach(([key, value]) => {
      if (!(keys.includes(key as any))) {
        result[key] = value;
      }
    });

    return result;
  }

  /**
   * Picks the properties of the given object with the given keys.
   *
   * @param o Contains some object.
   * @param keys Contains the keys of the object properties to be picked.
   * @returns the truncated object.
   */
  public static pick<T extends object, K extends keyof T>(o: T, ...keys: K[]): Pick<T, K> {
    const result: any = {};
    Object.entries(o).forEach(([key, value]) => {
      if (keys.includes(key as any)) {
        result[key] = value;
      }
    });
    return result;
  }

  /**
   * Makes the specified object iterable.
   *
   * @param obj Contains some object.
   * @returns an iterable object.
   */
  public static toIterable<T extends object>(
    obj: T
  ): Iterable<[Omit<keyof T, number | symbol>, T[keyof T]]> {
    return {
      ...obj,
      *[Symbol.iterator]() {
        yield* Object.entries(obj);
      }
    }
  }

  /**
   * Converts the specified object to a JSON string. This method also handles
   * circular object references.
   *
   * **Example:**
   * ```typescript
   * const obj = {self: {}};
   * obj.self = obj;
   *
   * JSON.stringify(obj); // throws "TypeError: cyclic object value"
   *
   * console.log(Objects.toJSON(obj)); // "{}"
   * ```
   *
   * @param o Contains some object.
   * @param indent Contains the text indent to be used in the JSON string.
   * Defaults to `2` white spaces.
   * @returns a JSON string.
   *
   * @see `Objects.serialize()`
   */
  public static toJSON<T extends object>(o: T, indent: number | string = 2): string {
    let cache = new WeakSet<object>();
    const json = JSON.stringify(o, (_, value) => Objects.isObject(value)
      ? cache.has(value)
        ? undefined // circular object reference detected
        : cache.add(value) && value // Store value in our collection
      : value,
      indent
    );

    // after the cache has been used by the replacer, it can be garbage collected
    cache = null as unknown as WeakSet<object>;
    return json;
  }

  /**
   * Converts an object to a map.
   *
   * @param o Contains some object.
   * @returns a map whose keys are the object property keys and values are their values.
   */
  public static toMap<T extends object, K extends keyof T>(o: T): Map<K, T[K]> {
    const entries = Objects.entries(o);
    return new Map<K, T[K]>(entries as any);
  }

  /**
   * Converts an object to a set.
   *
   * @param o Contains some object.
   * @returns a set composed of the object values.
   */
  public static toSet<T extends object>(o: T): Set<T[keyof T]> {
    const values = Object.values(o);
    return new Set<T[keyof T]>(values);
  }
}
