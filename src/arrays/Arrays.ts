import {Numbers} from '../numbers/Numbers';
import {Objects} from '../objects/Objects';
import {Utils} from '../Utils';

/**
 * Defines an abstract class with array utilities.
 */
export abstract class Arrays {
  /**
   * Contains an empty array.
   */
  public static readonly EMPTY: readonly [] = [] as const;

  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Adds the specified item to the beginning of the given array.
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains some array item.
   * @return {Array} an array.
   */
  public static addFirst<T>(array: T[], item: T): T[];
  /**
   * Adds the specified item to the beginning of the given array.
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains some array item.
   * @return {Array} an array.
   */
  public static addFirst<T>(array: T[], item: any): any[];
  /**
   * Adds the specified item to the beginning of the given array.
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains some array item.
   * @return {Array} an array.
   */
  public static addFirst<T>(array: T[], item: T | any): T[] | any[] {
    return Arrays.isEmpty(array) ? [item] : [item, ...array];
  }

  /**
   * Clones an array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} the cloned array.
   */
  public static clone<T>(array: T[]): T[] {
    return [...array];
  }

  /**
   * Checks whether the given array contains the given item.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.contains([], "a"); // false
   * Arrays.contains(["a", "b", "c"], "c"); // true
   * Arrays.contains(["a", "b", "c"], "d"); // false
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains the item to be checked whether it exists in the
   * given array.
   * @return {Boolean} whether the given array contains the given item.
   *
   * @since v1.5.0
   */
  public static contains<T>(array: T[] | readonly T[], item: T): boolean {
    let j = array.length - 1;
    if (j > -1) {
      let i = 0;
      while (i <= j) {
        if (array[i] === item || array[j] === item) {
          return true;
        }
        i++; j--;
      }
    }

    return false;
  }

  /**
   * Checks whether the specified array contains either of the specified
   * items.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.containsAny([], "a"); // false
   * Arrays.containsAny(["a", "b", "c"], "g", "c", "i"); // true
   * Arrays.containsAny(["a", "b", "c"], "d", "e"); // false
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Array} items Contains the items to be checked whether it exists
   * in the given array.
   * @return {Boolean} whether the specified array contains either of the
   * specified items.
   *
   * @since v1.5.0
   */
  public static containsAny<T>(
      array: T[] | readonly T[],
      ...items: T[]
  ): boolean {
    let j = array.length - 1;
    if (j > -1) {
      let i = 0;
      while (i <= j) {
        let m = 0; let n = items.length - 1;
        while (m <= n) {
          const mi = items[m++];
          const ni = items[n--];
          if (array[i] === mi || array[i] === ni ||
              array[j] === mi || array[j] === ni) {
            return true;
          }
        }
        i++;
        j--;
      }
    }

    return false;
  }

  /**
   * Calls the specified predicate function for each of the array elements.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.each(['a', 'b', 'c'], (item, index, self) => {
   *   // Code goes here..
   * })
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Function} predicate Contains some predicate to be executed
   * for each array item.
   */
  public static each<T>(
    array: readonly T[],
    predicate: (item: T, index: number, self: T[]) => void
  ): void;
  /**
   * Calls the specified predicate function for each of the array elements.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.each(['a', 'b', 'c'], (item, index, self) => {
   *   // Code goes here..
   * })
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Function} predicate Contains some predicate to be executed
   * for each array item.
   */
  public static each<T>(
    array: T[],
    predicate: (item: T, index: number, self: T[]) => void
  ): void;
  /**
   * Calls the specified predicate function for each of the array elements.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.each(['a', 'b', 'c'], (item, index, self) => {
   *   // Code goes here..
   * })
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Function} predicate Contains some predicate to be executed
   * for each array item.
   */
  public static each<T>(
      array: T[] | readonly T[],
      predicate: (
      (item: T, index: number, self: T[]) => void)
      | ((item: T, index: number, self: T[]) => void),
  ): void {
    let i = 0;
    const length = array.length;
    while (i < length) {
      predicate(array[i], i++, array as any[]);
    }
  }

  /**
   * Filters out unwanted values from the given array.
   *
   * @param {Array} array Contains some array to be filtered.
   * @param {*} unwantedValues Contains the values to be filtered out from the
   * array.
   * @return {Array} the filtered array.
   */
  public static filterOut<T>(array: T[], unwantedValues: T[]): T[];
  /**
   * Filters out unwanted values from the given array.
   *
   * @param {Array} array Contains some array to be filtered.
   * @param {*} unwantedValues Contains the values to be filtered out from the
   * array.
   * @return {Array} the filtered array.
   */
  public static filterOut<T>(array: readonly T[], unwantedValues: T[]): T[];
  /**
   * Filters out unwanted values from the given array.
   *
   * @param {Array} array Contains some array to be filtered.
   * @param {*} unwantedValues Contains the values to be filtered out from the
   * array.
   * @return {Array} the filtered array.
   */
  public static filterOut<T>(
      array: T[] | readonly T[],
      unwantedValues: T[],
  ): T[] | readonly T[] {
    return array.filter((value) => !unwantedValues.includes(value));
  }

  /**
   * Filters out falsy values like `null`, `undefined`, `false`, `NaN`, `0`,
   * `-0`, `0n`, `""`.
   *
   * @param {Array} array Contains some array to be filtered.
   * @return {Array} the filtered array.
   */
  public static filterTruthy<T>(array: T[]): T[];
  /**
   * Filters out falsy values like `null`, `undefined`, `false`, `NaN`, `0`,
   * `-0`, `0n`, `""`.
   *
   * @param {Array} array Contains some array to be filtered.
   * @return {Array} the filtered array.
   */
  public static filterTruthy<T>(array: readonly T[]): readonly T[];
  /**
   * Filters out falsy values like `null`, `undefined`, `false`, `NaN`, `0`,
   * `-0`, `0n`, `""`.
   *
   * @param {Array} array Contains some array to be filtered.
   * @return {Array} the filtered array.
   */
  public static filterTruthy<T>(array: T[] | readonly T[]): T[] | readonly T[] {
    return array.filter(Boolean);
  }

  /**
   * Gets the first array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the first array item.
   */
  public static first<T>(array: T[]): T;
  /**
   * Gets the first array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the first array item.
   */
  public static first(array: []): null;
  /**
   * Gets the first array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the first array item.
   */
  public static first(array: readonly []): null;
  /**
   * Gets the first array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the first array item.
   */
  public static first<T>(array: readonly T[]): T;
  /**
   * Gets the first array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the first array item.
   */
  public static first<T>(array: T[] | readonly T[]): T | null {
    return Arrays.isEmpty(array) ? null : array[0];
  }

  /**
   * Inserts the given item at the given index in the given array.
   *
   * **Usage Examples:**
   * ```typescript
   * const arr = ["f", "o", "o", "b", "r"];
   * Arrays.insertAt(arr, 4, "a"); // ["f", "o", "o", "b", "a", "r"]
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Number} index Contains the index at which to add the given items.
   * @param {*} item Contains the item to be inserted at the given
   * index.
   * @return {Array} the extended array.
   */
  public static insertAt<T>(array: T[], index: number, item: T): T[];
  /**
   * Inserts the given items at the given index in the given array.
   *
   * **Usage Examples:**
   * ```typescript
   * const arr = ["f", "o", "o", "b", "r"];
   * Arrays.insertAt(arr, 4, "a"); // ["f", "o", "o", "b", "a", "r"]
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Number} index Contains the index at which to add the given items.
   * @param {*} item Contains the items to be inserted at the given
   * index.
   * @return {Array} the extended array.
   */
  public static insertAt<T>(array: T[], index: number, item: T[]): T[];
  /**
   * Inserts the given item or items at the given index in the given array.
   *
   * **Usage Examples:**
   * ```typescript
   * const arr = ["f", "o", "o", "b", "r"];
   * Arrays.insertAt(arr, 4, "a"); // ["f", "o", "o", "b", "a", "r"]
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Number} index Contains the index at which to add the given items.
   * @param {*} item Contains the item or items to be inserted at the given
   * index.
   * @return {Array} the extended array.
   */
  public static insertAt<T>(array: T[], index: number, item: T | T[]): T[] {
    item = Arrays.isArray(item) ? item : [item];
    return [...array.slice(0, index), ...item, ...array.slice(index)];
  }

  /**
   * Generates an array where each of the items of the given array is followed
   * by the given separator item.
   *
   * **Usage Examples:**
   * ```typescript
   * const arr1 = ['a', 'b', 'c'];
   * const arr2 = Arrays.intersperse(arr1, 'x');
   * console.log(arr2); // 'a', 'x', 'b', 'x', 'c'
   * ```
   * This method has been adopted from an article about readonly arrays written
   * by [Marius Schulz](https://mariusschulz.com/blog/read-only-array-and-tuple-types-in-typescript).
   *
   * @param {Array} array Contains some array.
   * @param {*} separator Contains some separator array item which appears after
   * each array item.
   * @return {Array} a new array where each of the items of the given array is
   * followed by the given separator item.
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
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is an array.
   */
  public static isArray(value?: any | any[]): value is any[] {
    return Objects.getType(value) === '[object Array]';
  }

  /**
   * Check whether the specified value is of type `ArrayBuffer`.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.isArrayBuffer([]); // false
   * Arrays.isArrayBuffer(new ArrayBuffer(5)); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is of type `ArrayBuffer`.
   */
  public static isArrayBuffer(value?: any): boolean {
    return Utils.isNotNil(value) &&
      Objects.getType(value) === '[object ArrayBuffer]';
  }

  /**
   * Checks whether the specified array of numbers is a binary array i. e.
   * whether its values are only `0` and `1`.
   *
   * @param {Array} array Contains an array of numbers.
   * @return {Boolean} whether the specified array of numbers is a binary
   * array i. e. whether its values are only `0` and `1`.
   */
  public static isBinary(array: number[]): boolean;
  /**
   * Checks whether the specified array of numbers is a binary array i. e.
   * whether its values are only `0` and `1`.
   *
   * @param {Array} array Contains an array of numbers.
   * @return {Boolean} whether the specified array of numbers is a binary
   * array i. e. whether its values are only `0` and `1`.
   */
  public static isBinary(array: readonly number[]): boolean;
  /**
   * Checks whether the specified array of numbers is a binary array i. e.
   * whether its values are only `0` and `1`.
   *
   * @param {Array} array Contains an array of numbers.
   * @return {Boolean} whether the specified array of numbers is a binary
   * array i. e. whether its values are only `0` and `1`.
   */
  public static isBinary(array: number[] | readonly number[]): boolean {
    if (Arrays.isNotEmpty(array)) {
      let i = 0, j = array.length - 1, ai, aj;
      while (i <= j) {
        ai = array[i++];
        aj = array[j--];
        if ((ai !== 0 && ai !== 1) || (aj !== 0 && aj !== 1)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  public static isEmpty<T>(array: T[]): boolean;
  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  public static isEmpty<T>(array: readonly T[]): boolean;
  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  public static isEmpty<T>(array: T[] | readonly T[]): boolean {
    return array.length === 0;
  }

  /**
   * Checks whether the specified array is identical i. e. whether
   * all the array items are equal to one another.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.isIdentical([]); // true
   * Arrays.isIdentical(["a"]); // true
   * Arrays.isIdentical(["a", "a"]); // true
   * Arrays.isIdentical(["a", "b"]); // false
   * Arrays.isIdentical([1, false]); // false
   * ```
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the specified array is identical.
   */
  public static isIdentical<T>(array: T[]): boolean {
    const l = array.length;
    if (l > 1) {
      let i = 0;
      while (i < l - 1) {
        if (array[i] !== array[++i]) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  public static isNotEmpty<T>(array: T[]): boolean;
  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  public static isNotEmpty<T>(array: readonly T[]): boolean;
  /**
   * Checks whether the given array is empty.
   *
   * @param {Array} array Contains some array.
   * @return {Boolean} whether the given array is empty.
   */
  public static isNotEmpty<T>(array: T[] | readonly T[]): boolean {
    return array.length > 0;
  }

  /**
   * Checks whether the specified value is a typed array.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.isTypedArray(new Int8Array()); // true
   * Arrays.isTypedArray(new Int16Array()); // true
   * Arrays.isTypedArray(new Int32Array()); // true
   * Arrays.isTypedArray(new Float32Array()); // true
   * Arrays.isTypedArray(new Float64Array()); // true
   * Arrays.isTypedArray(new Uint8Array()); // true
   * Arrays.isTypedArray(new Uint8ClampedArray()); // true
   * Arrays.isTypedArray(new Uint16Array()); // true
   * Arrays.isTypedArray(new Uint32Array()); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a typed array
   * i. e. of type `Uint8Array`, `Uint8ClampedArray`, `Int8Array`,
   * `Uint16Array`, `Uint16Array`
   */
  public static isTypedArray(value?: any): boolean {
    return Utils.isNotNil(value) && Numbers.isNumber(value.length) && [
      '[object Int8Array]',
      '[object Int16Array]',
      '[object Int32Array]',
      '[object Float32Array]',
      '[object Float64Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Uint16Array]',
      '[object Uint32Array]',
    ].includes(Objects.getType(value));
  }

  /**
   * Gets the last array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the last array item.
   */
  public static last<T>(array: T[]): T;
  /**
    * Gets the last array item.
    *
    * @param {Array} array Contains some array.
    * @return {*} the last array item.
    */
  public static last(array: []): null;
  /**
    * Gets the last array item.
    *
    * @param {Array} array Contains some array.
    * @return {*} the last array item.
    */
  public static last(array: readonly []): null;
  /**
    * Gets the last array item.
    *
    * @param {Array} array Contains some array.
    * @return {*} the last array item.
    */
  public static last<T>(array: readonly T[]): T | null;
  /**
    * Gets the last array item.
    *
    * @param {Array} array Contains some array.
    * @return {*} the last array item.
    */
  public static last<T>(array: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(array)) {
      return null;
    }
    return array[array.length - 1];
  }

  /**
   * Removes the array item at the specified index and returns an array copy.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.removeAt([], 0); // []
   * Arrays.removeAt(['a'], 0); // []
   * Arrays.removeAt(['a', 'b'], 1); // ['a']
   * Arrays.removeAt(['a', 'b', 'c'], 0); // ['b', 'c']
   * Arrays.removeAt(['a', 'b', 'c'], -1); // ['a', 'b']
   * ```
   *
   * @param {Array} array Contains some array.
   * @param {Number} index Contains the index of the array item to be removed.
   * @return {Array} an array.
   */
  public static removeAt<T>(array: T[], index: number): T[] {
    if (Number.isSafeInteger(index) && index < array.length &&
      index >= array.length * -1) {
      const copy = Arrays.clone(array);
      copy.splice(index, 1);
      return copy;
    }
    return array;
  }

  /**
   * Reverses the specified array.
   *
   * **Usage Examples:**
   * ```typescript
   * Arrays.reverse([]); // []
   * Arrays.reverse(["a"]); // ["a"]
   * Arrays.reverse(["a", "b", "c"]); // ["c", "b", "a"]
   * ```
   *
   * @param {Array} array Contains some array.
   * @return {Array} the reverse array.
   */
  public static reverse<T>(array: T[]): T[] {
    return array.length < 2 ? array : [...array].reverse();
  }

  /**
   * Sorts the specified array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} the sorted array.
   */
  public static sort<T>(array: T[]): T[] {
    const length = array.length;
    if (length < 2) {
      return array;
    }

    const pivot = array[Math.floor(Math.random() * length)];
    const l: T[] = [];
    const r: T[] = [];
    const e: T[] = [];
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
      ...Arrays.sort<any>(r),
    ];
  }

  /**
   * Calculates the sum of the numerical array items.
   *
   * @param {Array} array Contains some array of numbers.
   * @return {Number} the sum of the array items.
   */
  public static sum(array: number[]): number;
  /**
   * Calculates the sum of the numerical array items.
   *
   * @param {Array} array Contains some array of numbers.
   * @return {Number} the sum of the array items.
   */
  public static sum(array: readonly number[]): number;
  /**
   * Calculates the sum of the numerical array items.
   *
   * @param {Array} array Contains some array of numbers.
   * @return {Number} the sum of the array items.
   */
  public static sum(array: number[] | readonly number[]): number {
    return array.reduce(
        (prev: number, curr: number) => prev + curr,
        0,
    );
  }

  /**
   * Removes duplicates from the given array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} the array without duplicates.
   */
  public static unique<T>(array: T[]): T[];
  /**
   * Removes duplicates from the given array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} the array without duplicates.
   */
  public static unique<T>(array: readonly T[]): readonly T[];
  /**
   * Removes duplicates from the given array.
   *
   * @param {Array} array Contains some array.
   * @return {Array} the array without duplicates.
   */
  public static unique<T>(array: T[] | readonly T[]): T[] | readonly T[] {
    return [...new Set(array)];
  }
}
