import { Objects } from '../objects/Objects';
import { Util } from '../Util';

/**
 * Defines an abstract class with array utilities.
 */
export abstract class Arrays {
  /** @private */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Adds the specified item to the beginning of the given array.
   *
   * @param array Contains some array.
   * @param item Contains some array item.
   * @returns an array.
   */
  public static addFirst<T>(array: T[], item: T): T[] {
    if (Arrays.isEmpty(array)) {
      return [item];
    }

    let i, result: T[] = [item];
    for (i = 0; i < array.length; i++) {
      result.push(array[i]);
    }

    return result;
  }

  /**
   * Clones an array.
   *
   * @param array Contains some array.
   * @returns the cloned array.
   */
  public static clone<T>(array: T[]): T[] {
    return [...array];
  }

  /**
   * Calls the given predicate for each array element.
   *
   * @param array Contains some array.
   * @param predicate Contains some predicate to be executed for each array item.
   */
  public static each<T>(array: readonly T[], predicate: (item: T, index: number, self: T[]) => void): void;
  public static each<T>(array: T[], predicate: (item: T, index: number, self: T[]) => void): void;
  public static each<T>(
    array: T[] | readonly T[],
    predicate: ((item: T, index: number, self: T[]) => void) | ((item: T, index: number, self: T[]) => void)
  ): void {
    let i = 0, length = array.length;
    while (i < length) {
      predicate(array[i], i, array as any[]);
      i++;
    }
  }

  /**
   * Filters out unwanted values from the given array.
   *
   * @param array Contains some array to be filtered.
   * @param unwantedValues Contains the values to be filtered out from the
   * array.
   */
  public static filterOut<T>(array: T[], unwantedValues: T[]): T[]
  public static filterOut<T>(array: readonly T[], unwantedValues: T[]): T[]
  public static filterOut<T>(array: T[] | readonly T[], unwantedValues: T[]): T[] | readonly T[] {
    return array.filter((value) => !unwantedValues.includes(value));
  }

  /**
   * Filters out falsy values like `null`, `undefined`, `false`, `NaN`, `0`,
   * `-0`, `0n`, `""`.
   *
   * @param array Contains some array to be filtered.
   * @returns the filtered array.
   */
  public static filterTruthy<T>(array: T[]): T[]
  public static filterTruthy<T>(array: readonly T[]): readonly T[]
  public static filterTruthy<T>(array: T[] | readonly T[]): T[] | readonly T[] {
    return array.filter(Boolean);
  }

  /**
   * Gets the first array item.
   *
   * @param array Contains some array.
   * @returns the first array item.
   */
  public static first<T>(array: T[]): T | null;
  public static first<T>(array: readonly T[]): T | null;
  public static first<T>(array: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(array)) {
      return null;
    }

    return array[0];
  }

  /**
   * Checks whether the given array contains the given item.
   *
   * @param array Contains some array.
   * @param item Contains the item to be checked whether it exists in the
   * given array.
   */
  public static has<T>(array: T[], item: T): boolean;
  public static has<T>(array: readonly T[], item: T): boolean;
  public static has<T>(array: T[] | readonly T[], item: T): boolean {
    return array.includes(item);
  }

  /**
   * Inserts the given item or items at the given index in the given array.
   *
   * **Example:**
   * ```typescript
   * const arr1 = ['f', 'o', 'o', 'b', 'r'];
   * const arr2 = Arrays.insertAt(arr1, 4, 'a');
   * console.log(arr2.join('')); // foobar 
   * ```
   *
   * @param array Contains some array.
   * @param index Contains the index at which to add the given items.
   * @param item Contains the item or items to be inserted at the given index.
   * @returns the extended array.
   */
  public static insertAt<T>(array: T[], index: number, item: T): T[];
  public static insertAt<T>(array: T[], index: number, item: T[]): T[];
  public static insertAt<T>(array: T[], index: number, item: T | T[]): T[] {
    item = Arrays.isArray(item) ? item : [item];
    return [...array.slice(0, index), ...item, ...array.slice(index)]
  }

  /**
   * Generates an array where each of the items of the given array is followed
   * by the given separator item.
   *
   * **Example:**
   * ```typescript
   * const arr1 = ['a', 'b', 'c'];
   * const arr2 = Arrays.intersperse(arr1, 'x');
   * console.log(arr2); // 'a', 'x', 'b', 'x', 'c'
   * ```
   * This method has been adopted from an article about readonly arrays written by
   * [Marius Schulz](https://mariusschulz.com/blog/read-only-array-and-tuple-types-in-typescript).
   *
   * @param array Contains some array.
   * @param separator Contains some separator array item which appears after each
   * array item.
   * @returns a new array where each of the items of the given array is followed
   * by the given separator item.
   */
  public static intersperse<T>(array: T[], separator: T): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) {
        result.push(separator);
      }
      result.push(array[i]);
    }
    return result;
  }

  /**
   * Checks whether the given value is an array.
   *
   * @param value Contains some value.
   * @returns whether the given value is an array.
   */
  public static isArray(value?: any | any[]): value is any[] {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  /**
   * Checks whether the given array is empty.
   *
   * @param array Contains some array.
   * @returns whether the given array is empty.
   */
  public static isEmpty<T>(array: T[]): boolean;
  public static isEmpty<T>(array: readonly T[]): boolean;
  public static isEmpty<T>(array: T[] | readonly T[]): boolean {
    return !array.length;
  }

  public static isHomogeneous<T>(array: T[]): boolean;
  public static isHomogeneous<T>(array: readonly T[]): boolean;
  public static isHomogeneous<T>(array: T[] | readonly T[]): boolean {
    // the method does not apply for array with at most 1 item
    const length = array.length;
    if (length < 2) {
      return true;
    }

    // for primitive types, we check by using `typeof`
    if (array.every((item) => Util.isPrimitive(item))) {
      return new Set(array.map((item) => typeof item)).size <= 1;
    }

    const _1stType = Util.getClassOf(array[0]);
    if (array.every((item) => Objects.isObject(item))) {
      let i = 1, x = true;
      while (i < length) {
        if (_1stType !== Util.getClassOf(array[i])) {
          x = false;
          break;
        }
        i++;
      }

      return x;
    }

    return true;
  }

  /**
   * Checks whether the given array is empty.
   *
   * @param array Contains some array.
   * @returns whether the given array is empty.
   */
  public static isNotEmpty<T>(array: T[]): boolean;
  public static isNotEmpty<T>(array: readonly T[]): boolean;
  public static isNotEmpty<T>(array: T[] | readonly T[]): boolean {
    return array.length > 0;
  }

  /**
   * Checks whether the given value is a readonly array.
   *
   * @param value Contains some value.
   * @returns whether the given value is a readonly array.
   */
  public static isReadonlyArray(value?: any | readonly any[]): value is readonly any[] {
    return Arrays.isArray(value);
  }

  /**
   * Gets the last array item.
   *
   * @param array Contains some array.
   * @returns the last array item.
   */
  public static last<T>(array: T[]): T | null
  public static last<T>(array: readonly T[]): T | null
  public static last<T>(array: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(array)) {
      return null;
    }
    return array[array.length - 1];
  }

  /**
   * Sorts the specified array.
   *
   * @param array Contains some array.
   * @returns the sorted array.
   */
  public static sort<T>(array: T[]): T[] {
    const length = array.length;
    if (length < 2) {
      return array;
    }

    const pivot = array[Math.floor(Math.random() * length)], l: T[] = [], r: T[] = [], e: T[] = [];
    array.reduce((acc, item) => {
      if (item < pivot) {
        l.push(item);
      } else if (item > pivot) {
        r.push(item);
      } else {
        e.push(item);
      }
      return acc;
    }, []);

    return [
      ...Arrays.sort<any>(l),
      ...e,
      ...Arrays.sort<any>(r)
    ];
  }

  /**
   * Calculates the sum of the numerical array items.
   *
   * @param array Contains some array of numbers.
   */
  public static sum(array: number[]): number;
  public static sum(array: readonly number[]): number;
  public static sum(array: number[] | readonly number[]): number {
    return array.reduce(
      (prev: number, curr: number) => prev + curr,
      0
    );
  }

  /**
   * Removes duplicates from the given array.
   *
   * @param array Contains some array.
   * @returns the array without duplicates.
   */
  public static unique<T>(array: T[]): T[];
  public static unique<T>(array: readonly T[]): readonly T[];
  public static unique<T>(array: T[] | readonly T[]): T[] | readonly T[] {
    return [...new Set(array)];
  }
}
