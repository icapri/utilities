/**
 * Defines an abstract class with array utilities.
 */
export abstract class Arrays {
  /**
   * Filters out unwanted values from the given array.
   *
   * @param array Contains some array to be filtered.
   * @param unwantedValues Contains the values to be filtered out from the
   * array.
   */
  static filterOut<T>(array: T[], unwantedValues: T[]): T[]
  static filterOut<T>(array: readonly T[], unwantedValues: T[]): T[]
  static filterOut<T>(array: T[] | readonly T[], unwantedValues: T[]): T[] | readonly T[] {
    return array.filter((value) => !unwantedValues.includes(value));
  }

  /**
   * Filters out falsy values like `null`, `undefined`, `false`, `NaN`, `0`,
   * `-0`, `0n`, `""`.
   *
   * @param array Contains some array to be filtered.
   * @returns the filtered array.
   */
  static filterTruthy<T>(array: T[]): T[]
  static filterTruthy<T>(array: readonly T[]): readonly T[]
  static filterTruthy<T>(array: T[] | readonly T[]): T[] | readonly T[] {
    return array.filter(Boolean);
  }

  /**
   * Gets the first array item.
   *
   * @param array Contains some array.
   * @returns the first array item.
   */
  static first<T>(array: T[]): T | null;
  static first<T>(array: readonly T[]): T | null;
  static first<T>(array: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(array)) {
      return null;
    }

    return array[0];
  }

  static has<T>(array: T[], item: T): boolean;
  static has<T>(array: readonly T[], item: T): boolean;
  static has<T>(array: T[] | readonly T[], item: T): boolean {
    return array.includes(item);
  }

  static insertAt<T>(array: T[], index: number, item: T): T[];
  static insertAt<T>(array: T[], index: number, item: T[]): T[];
  static insertAt<T>(array: T[], index: number, item: T | T[]): T[] {
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
   * const arr2 = Arrays.intersperse(array, 'x');
   * console.log(arr2); // 'a', 'x', 'b', 'x', 'c'
   * ```
   * This method has been adopted from an article about readonly arrays written by
   * [Marius Schulz](https://mariusschulz.com/blog/read-only-array-and-tuple-types-in-typescript)
   *
   * @param array Contains some array.
   * @param separator Contains some separator array item which appears after each
   * array item.
   * @returns a new array where each of the items of the given array is followed
   * by the given separator item.
   */
  static intersperse<T>(array: T[], separator: T): T[] {
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
  static isArray(value?: any | any[]): value is any[] {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  /**
   * Checks whether the given array is empty.
   *
   * @param array Contains some array.
   * @returns whether the given array is empty.
   */
  static isEmpty<T>(array: T[]): boolean;
  static isEmpty<T>(array: readonly T[]): boolean;
  static isEmpty<T>(array: T[] | readonly T[]): boolean {
    return !array.length;
  }

  /**
   * Checks whether the given value is a readonly array.
   *
   * @param value Contains some value.
   * @returns whether the given value is a readonly array.
   */
  static isReadonlyArray(value?: any | readonly any[]): value is readonly any[] {
    return Arrays.isArray(value);
  }

  /**
   * Gets the last array item.
   *
   * @param array Contains some array.
   * @returns the last array item.
   */
  static last<T>(array: T[]): T | null
  static last<T>(array: readonly T[]): T | null
  static last<T>(array: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(array)) {
      return null;
    }
    return array[array.length - 1];
  }

  /**
   * Calculates the sum of the numerical array items.
   *
   * @param array Contains some array of numbers.
   */
  static sum(array: number[]): number;
  static sum(array: readonly number[]): number;
  static sum(array: number[] | readonly number[]): number {
    return array.reduce(
      (prevValue: number, currValue: number) => prevValue + currValue,
      0
    );
  }

  /**
   * Removes duplicates from the given array.
   *
   * @param array Contains some array.
   * @returns the array without duplicates.
   */
  static unique<T>(array: T[]): T[];
  static unique<T>(array: readonly T[]): readonly T[];
  static unique<T>(array: T[] | readonly T[]): T[] | readonly T[] {
    return array.filter((item, index, self) => self.indexOf(item) === index);
  }
}
