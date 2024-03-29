import {Objects} from '../objects/Objects';

/**
 * Defines an abstract class with set utilities.
 */
export abstract class Sets {
  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Checks whether the given set is empty.
   *
   * @param {Set} value Contains some set.
   * @return {Boolean} whether the given set is empty.
   */
  public static isEmpty<T>(value: Set<T>): boolean {
    return value.size === 0;
  }

  /**
   * Checks whether the given set is not emtpy.
   *
   * @param {Set} value Contains some set.
   * @return {Boolean} whether the given set is not emtpy.
   */
  public static isNotEmpty<T>(value: Set<T>): boolean {
    return value.size !== 0;
  }

  /**
   * Checks whether the given value is a set.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a set.
   */
  public static isSet(value?: any): value is Set<any> {
    return value instanceof Set;
  }

  /**
   * Checks whether the specified value is a Set iterator.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a Set iterator.
   */
  public static isSetIterator(value?: any): value is IterableIterator<any> {
    return Objects.toString(value) === '[object Set Iterator]';
  }

  /**
   * Checks whether the given value is of type `WeakSet`.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is of type `WeakSet`.
   */
  public static isWeakSet(value?: any): value is WeakSet<any> {
    return Objects.toString(value) === '[object WeakSet]';
  }

  /**
   * Converts a set to a map.
   *
   * @param {Set} value Contains some set.
   * @return {Map} a map whose keys are the indexes of each set value
   * and the respective values are the set items.
   */
  public static toMap<T>(value: Set<T>): Map<number, T> {
    let i = 0;
    const map = new Map<number, T>();
    value.forEach((item) => {
      map.set(i, item);
      i++;
    });
    return map;
  }
}
