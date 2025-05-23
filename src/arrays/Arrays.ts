import {Numbers} from '../numbers/Numbers';
import {Objects} from '../objects/Objects';
import {Utils} from '../Utils';

/**
 * @private
 */
const ISharedArrayBuffer = typeof SharedArrayBuffer === undefined ? undefined : SharedArrayBuffer;

/**
 * Defines an abstract class with array utilities.
 */
export abstract class Arrays {
  /**
	 * Contains an empty array.
	 */
  public static readonly EMPTY: readonly [] = [] as const;

  /**
	 * Contains all the possible typed arrays.
	 */
  private static readonly TYPED_ARRAYS: Array<string> = [
    'BigInt64Array',
    'BigUint64Array',
    'Float32Array',
    'Float64Array',
    'Int16Array',
    'Int32Array',
    'Int8Array',
    'Uint16Array',
    'Uint32Array',
    'Uint8Array',
    'Uint8ClampedArray',
  ];

  /**
	 * Gets the supported typed arrays.
	 */
  public static get supportedTypedArrays(): Array<string> {
    const globalThat: any = Utils.globalThat,
      r = [],
      s = Arrays.TYPED_ARRAYS;
    let i = 0;
    for (; i < s.length; i++) {
      if (Utils.isFunction(globalThat[s[i]])) {
        r[r.length] = s[i];
      }
    }
    return r;
  }

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
    let i = 0,
      j = array.length - 1;
    if (j > -1) {
      while (i <= j) {
        if (array[i] === item || array[j] === item) {
          return true;
        }
        i++;
        j--;
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
	 * @param {Array} items Contains the items to be checked whether they exist
	 * in the given array.
	 * @return {Boolean} whether the specified array contains either of the
	 * specified items.
	 *
	 * @since v1.5.0
	 */
  public static containsAny<T>(array: T[] | readonly T[], ...items: T[]): boolean {
    let i = 0,
      j = array.length - 1;
    if (j > -1) {
      while (i <= j) {
        let m = 0;
        let n = items.length - 1,
          mi,
          ni;
        while (m <= n) {
          mi = items[m++];
          ni = items[n--];
          if (array[i] === mi || array[i] === ni || array[j] === mi || array[j] === ni) {
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
	 * Checks whether the specified array contains none of the specified items.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * Arrays.containsNone([], "a"); // true
	 * Arrays.containsNone(["a", "b", "c"], "g", "c", "i"); // true
	 * Arrays.containsNone(["a", "b", "c"], "d", "e"); // true
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @param {Array} items Contains the items to be checked whether they exist
	 * in the given array.
	 * @return {Boolean} whether the specified array contains none of the
	 * specified items.
	 *
	 * @since v1.6.5
	 */
  public static containsNone<T>(array: T[] | readonly T[], ...items: T[]): boolean {
    let i = 0,
      j = array.length - 1;
    if (j > -1) {
      while (i <= j) {
        let m = 0;
        let n = items.length - 1,
          mi,
          ni;
        while (m <= n) {
          mi = items[m++];
          ni = items[n--];
          if (array[i] === mi || array[i] === ni || array[j] === mi || array[j] === ni) {
            return false;
          }
        }
        i++;
        j--;
      }
    }
    return true;
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
  public static each<T>(array: readonly T[], predicate: (item: T, index: number, self: T[]) => void): void;
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
  public static each<T>(array: T[], predicate: (item: T, index: number, self: T[]) => void): void;
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
      predicate: ((item: T, index: number, self: T[]) => void) | ((item: T, index: number, self: T[]) => void),
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
  public static filterOut<T>(array: T[] | readonly T[], unwantedValues: T[]): T[] | readonly T[] {
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
	 * Flattens the specified array.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * const arr = [1,2,[3,4,5], [6],7,[8, [9, 10]]];
	 * Arrays.flatten(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	 * ```
	 *
	 * @param {Array} array Contains the specified array.
	 * @return {Array} the flattened array.
	 */
  public static flatten<T>(array: any[]): T[] {
    const r: T[] = [],
      s = [...array];
    let n;
    while (s.length) {
      n = s.pop();
      if (Arrays.isArray(n)) {
        s.push(...n);
      } else {
        r.push(n);
      }
    }
    return r.reverse();
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
    let i = 0;
    for (; i < array.length; ) {
      if (i !== 0) {
        result.push(separator);
      }
      result.push(array[i++]);
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
    return Objects.toString(value) === '[object Array]';
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
    return Utils.isNotNil(value) && Objects.toString(value) === '[object ArrayBuffer]';
  }

  /**
	 * Checks whether the specified value is an array buffer view.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is an array buffer view.
	 */
  public static isArrayBufferView(value?: any): boolean {
    return Utils.isDefined(ArrayBuffer) && Utils.isFunction(ArrayBuffer.isView) ?
			ArrayBuffer.isView(value) :
			Arrays.isTypedArray(value) || Utils.isDataView(value);
  }

  /**
	 * Checks whether the specified value is of type `BigInt64Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `BigInt64Array`.
	 */
  public static isBigInt64Array(value?: any): value is BigInt64Array {
    return Objects.toString(value) === '[object BigInt64Array]';
  }

  /**
	 * Checks whether the specified value is of type `BigUint64Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `BigUint64Array`.
	 */
  public static isBigUint64Array(value?: any): value is BigUint64Array {
    return Objects.toString(value) === '[object BigUint64Array]';
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
      let i = 0,
        j = array.length - 1,
        ai,
        aj;
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
	 * Checks whether the specified value is of type `Float32Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Float32Array`.
	 */
  public static isFloat32Array(value?: any): value is Float32Array {
    return Objects.toString(value) === '[object Float32Array]';
  }

  /**
	 * Checks whether the specified value is of type `Float64Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Float64Array`.
	 */
  public static isFloat64Array(value?: any): value is Float64Array {
    return Objects.toString(value) === '[object Float64Array]';
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
	 * Checks whether the specified value is of type `Int16Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Int16Array`.
	 */
  public static isInt16Array(value?: any): value is Int16Array {
    return Objects.toString(value) === '[object Int16Array]';
  }

  /**
	 * Checks whether the specified value is of type `Int8Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Int8Array`.
	 */
  public static isInt8Array(value?: any): value is Int8Array {
    return Objects.toString(value) === '[object Int8Array]';
  }

  /**
	 * Checks whether the specified value is of type `Int32Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Int32Array`.
	 */
  public static isInt32Array(value?: any): value is Int32Array {
    return Objects.toString(value) === '[object Int32Array]';
  }

  /**
	 * Checks whether the specified value is an iterable object.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is an iterable object.
	 */
  public static isIterable(value?: any): boolean {
    return Utils.isNotNil(value) && Utils.isFunction(value[Symbol.iterator]);
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
	 * Checks whether the specified value is of type `SharedArrayBuffer`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type
	 * `SharedArrayBuffer`.
	 */
  public static isSharedArrayBuffer(
      value?: any,
  ): value is typeof ISharedArrayBuffer extends undefined ? false : SharedArrayBuffer {
    return Utils.isDefined(SharedArrayBuffer) ?
			Objects.toString(new SharedArrayBuffer(0)) === '[object SharedArrayBuffer]' ?
				Objects.toString(value) === '[object SharedArrayBuffer]' :
				value instanceof SharedArrayBuffer :
			false;
  }

  /**
	 * Checks whether the specified array is sorted.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * Arrays.isSorted([]); // true
	 * Arrays.isSorted([1, 2, 3, 4]); // true
	 * Arrays.isSorted([6, 1, 9, 4, 2]); // false
	 * Arrays.isSorted([9, 8, 7, 6, 5, 4]); // false
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @return {Boolean} whether the specified array is sorted.
	 */
  public static isSorted<T>(array: T[]): boolean;
  /**
	 * Checks whether the specified array is sorted.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * Arrays.isSorted([]); // true
	 * Arrays.isSorted([1, 2, 3, 4]); // true
	 * Arrays.isSorted([6, 1, 9, 4, 2]); // false
	 * Arrays.isSorted([9, 8, 7, 6, 5, 4]); // false
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @return {Boolean} whether the specified array is sorted.
	 */
  public static isSorted<T>(array: readonly T[]): boolean;
  /**
	 * Checks whether the specified array is sorted.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * Arrays.isSorted([]); // true
	 * Arrays.isSorted([1, 2, 3, 4]); // true
	 * Arrays.isSorted([6, 1, 9, 4, 2]); // false
	 * Arrays.isSorted([9, 8, 7, 6, 5, 4]); // false
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @return {Boolean} whether the specified array is sorted.
	 */
  public static isSorted<T>(array: T[] | readonly T[]): boolean {
    let i = 0;
    const l = array.length;
    for (; i < l - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
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
    return (
      Utils.isNotNil(value) &&
			Numbers.isNumber(value.length) &&
			Arrays.supportedTypedArrays.map((typedArray) => `[object ${typedArray}]`).includes(Objects.toString(value))
    );
  }

  /**
	 * Checks whether the specified value is of type `Uint16Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Uint16Array`.
	 */
  public static isUint16Array(value?: any): value is Uint16Array {
    return Objects.toString(value) === '[object Uint16Array]';
  }

  /**
	 * Checks whether the specified value is of type `Uint32Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Uint32Array`.
	 */
  public static isUint32Array(value?: any): value is Uint32Array {
    return Objects.toString(value) === '[object Uint32Array]';
  }

  /**
	 * Checks whether the specified value is of type `Uint8Array`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type `Uint8Array`.
	 */
  public static isUint8Array(value?: any): value is Uint8Array {
    return Objects.toString(value) === '[object Uint8Array]';
  }

  /**
	 * Checks whether the specified value is of type `Uint8ClampedArray`.
	 *
	 * @param {*} value Contains some value.
	 * @return {Boolean} whether the specified value is of type
	 * `Uint8ClampedArray`.
	 */
  public static isUint8ClampedArray(value?: any): value is Uint8ClampedArray {
    return Objects.toString(value) === '[object Uint8ClampedArray]';
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
	 * Removes the specified items from the given array.
	 *
	 * ```typescript
	 * Arrays.removeAll([], 0); // []
	 * Arrays.removeAll([0], 0); // []
	 * Arrays.removeAll([1, 2, 3], 2, 3); // [1]
	 * Arrays.removeAll([1, 2, 3], 1, 2, 3); // []
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @param {Array} items Contains the array items to be removed.
	 * @return {Array} an array.
	 */
  public static removeAll<T>(array: T[], ...items: T[]): T[] {
    if (Arrays.isEmpty(array) || Arrays.isEmpty(items)) {
      return array;
    }
    let i = 0,
      e;
    const r: T[] = [];
    for (; i < array.length; i++) {
      e = array[i];
      if (items.indexOf(e) === -1) {
        r.push(e);
      }
    }
    return r;
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
    if (Number.isSafeInteger(index) && index < array.length && index >= array.length * -1) {
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
	 * Shuffles the specified array.
	 *
	 * @param {Array} array Contains some array.
	 * @return {Array} an array.
	 */
  public static shuffle<T>(array: T[]): T[] {
    const copy = Arrays.clone(array);
    let i = copy.length - 1,
      r,
      tmp;
    for (; i > 0; i--) {
      r = Math.floor(Math.random() * (i + 1));
      tmp = copy[i];
      copy[i] = copy[r];
      copy[r] = tmp;
    }
    return copy;
  }

  /**
	 * Sorts the specified array.
	 *
	 * @param {Array} array Contains some array.
	 * @param {String} order Contains the sorting order. Possible values are
	 * `asc` (ascending order) and `desc` (descending order). Defaults to `desc`.
	 * @return {Array} the sorted array.
	 */
  public static sort<T>(array: T[], order: 'asc' | 'desc' = 'desc'): T[] {
    if (order !== 'asc' && order !== 'desc') {
      throw new TypeError(`Unknown sorting order "${order}".`);
    }
    return order === 'asc' ? Arrays.__sortAsc(array) : Arrays.__sortDesc(array);
  }

  /**
	 * Generates a subarray with items from the given start index to the given
	 * end index of the items of the specified array.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * Arrays.subarray([], 0); // []
	 * Arrays.subarray([1, 2, 3], 0); // [1, 2, 3]
	 * Arrays.subarray([1, 2, 3], 1); // [2, 3]
	 * Arrays.subarray([1, 2, 3, 4], 1, 3); // [2, 3]
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @param {Number} start Contains the index of the first subarray item.
	 * @param {Number} end Contains the index next to the last index of the
	 * subarray. If not specified, the length of the given array is considered.
	 * Defaults to `array.length`.
	 * @return {Array} a subarray.
	 */
  public static subarray<T>(array: T[], start: number, end?: number): T[];
  /**
	 * Generates a subarray with items from the given start index to the given
	 * end index of the items of the specified array.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * Arrays.subarray([], 0); // []
	 * Arrays.subarray([1, 2, 3], 0); // [1, 2, 3]
	 * Arrays.subarray([1, 2, 3], 1); // [2, 3]
	 * Arrays.subarray([1, 2, 3, 4], 1, 3); // [2, 3]
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @param {Number} start Contains the index of the first subarray item.
	 * @param {Number} end Contains the index next to the last index of the
	 * subarray. If not specified, the length of the given array is considered.
	 * Defaults to `array.length`.
	 * @return {Array} a subarray.
	 */
  public static subarray<T>(array: readonly T[], start: number, end?: number): T[];
  /**
	 * Generates a subarray with items from the given start index to the given
	 * end index of the items of the specified array.
	 *
	 * **Usage Examples:**
	 * ```typescript
	 * Arrays.subarray([], 0); // []
	 * Arrays.subarray([1, 2, 3], 0); // [1, 2, 3]
	 * Arrays.subarray([1, 2, 3], 1); // [2, 3]
	 * Arrays.subarray([1, 2, 3, 4], 1, 3); // [2, 3]
	 * ```
	 *
	 * @param {Array} array Contains some array.
	 * @param {Number} start Contains the index of the first subarray item.
	 * @param {Number} end Contains the index next to the last index of the
	 * subarray. If not specified, the length of the given array is considered.
	 * Defaults to `array.length`.
	 * @return {Array} a subarray.
	 */
  public static subarray<T>(array: T[] | readonly T[], start: number, end?: number): T[] | readonly T[] {
    const l = array.length;
    if (l === 0) {
      return array;
    }
    if (start < 0) {
      start = 0;
    }
    if (Utils.isUndefined(end) || end > l) {
      end = l;
    }
    if (start === 0 && end === l) {
      return array;
    }
    const r: T[] = [];
    let i = start;
    for (; i < end; i++) {
      r.push(array[i]);
    }
    return r;
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
    return array.reduce((prev: number, curr: number) => prev + curr, 0);
  }

  /**
	 * Converts an iterable object to array.
	 *
	 * @param {Iterable} iterable Contains an iterable.
	 * @return {Array} an array.
	 */
  public static toArray<T>(iterable: Iterable<T>): T[] {
    if (Arrays.isIterable(iterable)) {
      return [...iterable];
    }
    throw new TypeError('Non-iterable object.');
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

  /* eslint-disable-next-line require-jsdoc */
  private static __sortAsc<T>(arr: T[]): T[] {
    if (arr.length < 2) {
      return arr;
    }
    let i = 1,
      e;
    const l = [],
      p = arr[0],
      r = [];
    for (; i < arr.length; i++) {
      e = arr[i];
      if (e < p) {
        l.push(e);
      } else {
        r.push(e);
      }
    }
    return [...Arrays.__sortAsc(l), p, ...Arrays.__sortAsc(r)];
  }

  /* eslint-disable-next-line require-jsdoc */
  private static __sortDesc<T>(array: T[]): T[] {
    if (array.length < 2) {
      return array;
    }
    let i = 1,
      e;
    const l = [],
      p = array[0],
      r = [];
    for (; i < array.length; i++) {
      e = array[i];
      if (e >= p) {
        l.push(e);
      } else {
        r.push(e);
      }
    }
    return [...Arrays.__sortDesc(l), p, ...Arrays.__sortDesc(r)];
  }
}
