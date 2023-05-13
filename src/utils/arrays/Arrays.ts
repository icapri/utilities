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
  public static addFirst<T>(array: T[], item: T): T[] {
    if (Arrays.isEmpty(array)) {
      return [item];
    }

    let i = 0;
    const result: T[] = [item];
    for (; i < array.length; i++) {
      result.push(array[i]);
    }

    return result;
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
   * Calls the specified predicate function for each of the array elements.
   *
   * **Example:**
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
   * **Example:**
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
   * **Example:**
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
  public static first<T>(array: readonly T[]): T | null;
  /**
   * Gets the first array item.
   *
   * @param {Array} array Contains some array.
   * @return {*} the first array item.
   */
  public static first<T>(array: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(array)) {
      return null;
    }

    return array[0];
  }

  /**
   * Checks whether the given array contains the given item.
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains the item to be checked whether it exists in the
   * given array.
   * @return {Boolean} whether the given array contains the given item.
   */
  public static has<T>(array: T[], item: T): boolean;
  /**
   * Checks whether the given array contains the given item.
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains the item to be checked whether it exists in the
   * given array.
   * @return {Boolean} whether the given array contains the given item.
   */
  public static has<T>(array: readonly T[], item: T): boolean;
  /**
   * Checks whether the given array contains the given item.
   *
   * @param {Array} array Contains some array.
   * @param {*} item Contains the item to be checked whether it exists in the
   * given array.
   * @return {Boolean} whether the given array contains the given item.
   */
  public static has<T>(array: T[] | readonly T[], item: T): boolean {
    const l = array.length;
    if (l !== 0) {
      let i = 0;
      let j = l - 1;
      while (i <= j) {
        if (array[i++] === item || array[j--] === item) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Inserts the given item at the given index in the given array.
   *
   * **Example:**
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
   * **Example:**
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
   * **Example:**
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
   * **Example:**
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
    return Object.prototype.toString.call(value) === '[object Array]';
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
   * **Example:**
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
   * Checks whether the given value is a readonly array.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a readonly array.
   */
  public static isReadonlyArray(
      value?: any | readonly any[],
  ): value is readonly any[] {
    return Arrays.isArray(value);
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
