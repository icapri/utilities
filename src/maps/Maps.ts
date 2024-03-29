import {Objects} from '../objects/Objects';

/**
 * Defines an abstract class with map utilities.
 */
export abstract class Maps {
  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Checks whether the given map is empty.
   *
   * @param {Map} map Contains some map.
   * @return {Boolean} whether the given map is empty.
   */
  public static isEmpty<TKey, TValue>(map: Map<TKey, TValue>): boolean {
    return map.size === 0;
  }

  /**
   * Checks whether the given value is a map.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a map.
   */
  public static isMap(value?: any): value is Map<any, any> {
    return value instanceof Map;
  }

  /**
   * Checks whether the specified value is a Map iterator.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a Map iterator.
   */
  public static isMapIterator(
      value?: any,
  ): value is IterableIterator<[any, any]> {
    return Objects.toString(value) === '[object Map Iterator]';
  }

  /**
   * Checks whether the given map is not empty.
   *
   * @param {Map} map Contains some map.
   * @return {Boolean} whether the given map is not empty.
   */
  public static isNotEmpty<TKey, TValue>(map: Map<TKey, TValue>): boolean {
    return map.size !== 0;
  }

  /**
   * Checks whether the specified value is of type `WeakMap`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is of type `WeakMap`.
   */
  public static isWeakMap(value?: any): value is WeakMap<any, any> {
    return Objects.toString(value) === '[object WeakMap]';
  }

  /**
   * Converts a map to an object.
   *
   * @param {Map} map Contains some map.
   * @return {Object} the object whose property keys and values are the
   * key-value pairs of the map.
   */
  public static toObject<U extends string | number | symbol, V>(
      map: Map<U, V>,
  ): Record<U, V> {
    const o: any = {};
    map.forEach((value, key) => {
      o[key] = value;
    });
    return o;
  }

  /**
   * Converts a map to a set.
   *
   * @param {Map} map Contains some map.
   * @return {Set} a set.
   */
  public static toSet<U, V>(map: Map<U, V>): Set<V> {
    const result = new Set<V>();
    map.forEach((item) => result.add(item));
    return result;
  }
}
