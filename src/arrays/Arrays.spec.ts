import {Arrays} from './Arrays';

describe('Arrays', () => {
  test('Arrays.addFirst()', () => {
    expect(Arrays.addFirst(['b', 'c'], 'a')).toEqual(['a', 'b', 'c']);
  });

  test('Arrays.clone()', () => {
    const array = [1, 2, 4];
    const cloned = Arrays.clone(array);
    array[0] = 0;
    array.pop();
    expect(cloned).toEqual([1, 2, 4]);
  });

  test('Arrays.contains()', () => {
    expect(Arrays.contains([], 'a')).toEqual(false);
    expect(Arrays.contains([''], '')).toEqual(true);
    expect(Arrays.contains(
        ['a', 1, false, Symbol.iterator], Symbol.iterator),
    ).toEqual(true);
    expect(Arrays.contains(['🐑', '🐑', '🐑', '😀', '💖'], '🐑')).toEqual(true);
  });

  test('Arrays.containsAny()', () => {
    expect(Arrays.containsAny([])).toEqual(false);
    expect(Arrays.containsAny([], 'a')).toEqual(false);
    expect(Arrays.containsAny([''], '')).toEqual(true);
    expect(Arrays.containsAny(
        ['a', 1, false, Symbol.iterator], Symbol.iterator),
    ).toEqual(true);
    expect(Arrays.containsAny(['🐑', '🐑', '🐑', '😀', '💖'], '🐑')).toEqual(true);
    expect(Arrays.containsAny(
        ['a', 1, false, Symbol.iterator], 'c', Symbol.iterator),
    ).toEqual(true);
    expect(Arrays.containsAny(['🐑', '🐑', '🐑', '😀', '💖'], '🐑', '💖'))
        .toEqual(true);
    expect(Arrays.containsAny(['🐑', '🐑', '🐑', '😀', '💖'], 'a', 'b'))
        .toEqual(false);
  });

  test('Arrays.containsNone()', () => {
    expect(Arrays.containsNone([])).toEqual(true);
    expect(Arrays.containsNone([], 'a')).toEqual(true);
    expect(Arrays.containsNone([''], '')).toEqual(false);
    expect(Arrays.containsNone(
        ['a', 1, false, Symbol.iterator], Symbol.iterator),
    ).toEqual(false);
    expect(Arrays.containsNone(['🐑', '🐑', '🐑', '😀', '💖'], '🐑')).toEqual(false);
    expect(Arrays.containsNone(
        ['a', 1, false, Symbol.iterator], 'c', Symbol.iterator),
    ).toEqual(false);
    expect(Arrays.containsNone(['🐑', '🐑', '🐑', '😀', '💖'], '🐑', '💖'))
        .toEqual(false);
    expect(Arrays.containsNone(['🐑', '🐑', '🐑', '😀', '💖'], 'a', 'b'))
        .toEqual(true);
  });

  test('Arrays.each()', () => {
    const array = ['My ', 'name ', 'is ', 'John ', 'Doe'];
    let text = '';
    Arrays.each(array, (item) => {
      text += item;
    });
    expect(text).toEqual('My name is John Doe');
  });

  test('Arrays.filterOut()', () => {
    const array = ['happy', 'sad', 'glad', 'glorious', 'bad', 'amazed'];
    const happy = Arrays.filterOut(array, ['sad', 'bad']);
    expect(happy).toEqual(['happy', 'glad', 'glorious', 'amazed']);
  });

  test('Arrays.filterTruthy()', () => {
    const array = ['abc', false, -0, 55, {}, true, 'c', '', 0];
    expect(Arrays.filterTruthy(array)).toEqual(['abc', 55, {}, true, 'c']);
  });

  test('Arrays.first()', () => {
    const array = ['a', 'b', 'c'];
    expect(Arrays.first(array)).toEqual('a');
  });

  test('Arrays.insertAt()', () => {
    const array = ['a', 'b', 'e'];
    expect(Arrays.insertAt(array, 2, 'c')).toEqual(['a', 'b', 'c', 'e']);
    expect(Arrays.insertAt(array, 2, ['c', 'd'])).toEqual(
        ['a', 'b', 'c', 'd', 'e'],
    );
  });

  test('Arrays.intersperse()', () => {
    const array = ['a', 'b', 'c'];
    expect(Arrays.intersperse(array, 'x')).toEqual(['a', 'x', 'b', 'x', 'c']);
  });

  test('Arrays.isArray()', () => {
    expect(Arrays.isArray([])).toBeTruthy();
    expect(Arrays.isArray(false)).toEqual(false);
    expect(Arrays.isArray([1, 2])).toBeTruthy();
  });

  test('Arrays.isArrayBuffer()', () => {
    expect(Arrays.isArrayBuffer([])).toEqual(false);
    expect(Arrays.isArrayBuffer(false)).toEqual(false);
    expect(Arrays.isArrayBuffer([1, 2])).toEqual(false);
    expect(Arrays.isArrayBuffer()).toEqual(false);
    expect(Arrays.isArrayBuffer(null)).toEqual(false);
    const buffer = new ArrayBuffer(5);
    expect(Arrays.isArrayBuffer(buffer)).toEqual(true);
  });

  test('Arrays.isBinary()', () => {
    expect(Arrays.isBinary([])).toEqual(true);
    expect(Arrays.isBinary([4, 3])).toEqual(false);
    expect(Arrays.isBinary([0])).toEqual(true);
    expect(Arrays.isBinary([0, 0])).toEqual(true);
    expect(Arrays.isBinary([0, 0, 1])).toEqual(true);
    expect(Arrays.isBinary([0, 0, 1, 0])).toEqual(true);
    expect(Arrays.isBinary([-1, -0])).toEqual(false);
  });

  test('Arrays.isEmpty()', () => {
    expect(Arrays.isEmpty([])).toEqual(true);
    expect(Arrays.isEmpty([undefined])).toEqual(false);
  });

  test('Arrays.isIdentical()', () => {
    expect(Arrays.isIdentical([])).toEqual(true);
    expect(Arrays.isIdentical([undefined])).toEqual(true);
    expect(Arrays.isIdentical([undefined, null])).toEqual(false);
    expect(Arrays.isIdentical(['a', 'a', 'a'])).toEqual(true);
  });

  test('Arrays.isIterable()', () => {
    expect(Arrays.isIterable()).toEqual(false);
    expect(Arrays.isIterable(undefined)).toEqual(false);
    expect(Arrays.isIterable(null)).toEqual(false);
    expect(Arrays.isIterable(true)).toEqual(false);
    expect(Arrays.isIterable(() => true)).toEqual(false);
    expect(Arrays.isIterable(() => true)).toEqual(false);

    expect(Arrays.isIterable('abc')).toEqual(true);
    const map = new Map();
    const set = new Set();
    expect(Arrays.isIterable(map)).toEqual(true);
    expect(Arrays.isIterable(set)).toEqual(true);
    expect(Arrays.isIterable([])).toEqual(true);
    expect(Arrays.isIterable(['a', 'b', 'c'])).toEqual(true);
  });

  test('Arrays.isNotEmpty()', () => {
    expect(Arrays.isNotEmpty([])).toEqual(false);
    expect(Arrays.isNotEmpty([null])).toEqual(true);
  });

  test('Arrays.isSorted()', () => {
    expect(Arrays.isSorted([])).toEqual(true);
    expect(Arrays.isSorted([9, 8, 7, 6, 5, 4])).toEqual(false);
    expect(Arrays.isSorted([4, 1, 8, 3, 9, 7])).toEqual(false);
    expect(Arrays.isSorted([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(true);
    const array: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(Arrays.isSorted(array)).toEqual(true);
  });

  test('Arrays.isTypedArray()', () => {
    expect(Arrays.isTypedArray([])).toEqual(false);
    expect(Arrays.isTypedArray([null])).toEqual(false);
    const t1 = new Int8Array();
    const t2 = new Int16Array();
    const t3 = new Int32Array();
    const t4 = new Float32Array();
    const t5 = new Float64Array();
    const t6 = new Uint8Array();
    const t7 = new Uint8ClampedArray();
    const t8 = new Uint16Array();
    const t9 = new Uint32Array();
    expect([t1, t2, t3, t4, t5, t6, t7, t8, t9].every((a) =>
      Arrays.isTypedArray(a))).toEqual(true);
  });

  test('Arrays.last()', () => {
    expect(Arrays.last([])).toEqual(null);
    expect(Arrays.last(['a', 'b'])).toEqual('b');
  });

  test('Arrays.removeAll()', () => {
    expect(Arrays.removeAll([], 0)).toEqual([]);
    expect(Arrays.removeAll([0], 0)).toEqual([]);
    expect(Arrays.removeAll([1, 2, 3], 1, 2, 3)).toEqual([]);
    expect(Arrays.removeAll(['a', 'b', 'c', 'd', 'e'], 'b', 'd'))
        .toEqual(['a', 'c', 'e']);
  });

  test('Arrays.removeAt()', () => {
    expect(Arrays.removeAt([], 0)).toEqual([]);
    expect(Arrays.removeAt(['a', 'b'], 1)).toEqual(['a']);
    expect(Arrays.removeAt(['a', 'b', 'c'], 0)).toEqual(['b', 'c']);
    expect(Arrays.removeAt(['a', 'b'], -1)).toEqual(['a']);
    expect(Arrays.removeAt(['a', 'b'], 2.3)).toEqual(['a', 'b']);
    expect(Arrays.removeAt(['a'], 0)).toEqual([]);
  });

  test('Arrays.reverse()', () => {
    expect(Arrays.reverse([])).toEqual([]);
    expect(Arrays.reverse(['a'])).toEqual(['a']);
    expect(Arrays.reverse(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
    expect(Arrays.reverse(['', 0, null, undefined]))
        .toEqual([undefined, null, 0, '']);
  });

  test('Arrays.sort()', () => {
    const array = [7, 1, 6, 3, 5, 8, 2, 9, 4];
    expect(Arrays.sort(array, 'asc')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(Arrays.sort(array)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
    const arr = ['alpha', 'beta', 'gamma'];
    expect(Arrays.sort(arr, 'asc')).toEqual(arr);
    expect(Arrays.sort(arr)).toEqual(['gamma', 'beta', 'alpha']);
    expect(() => Arrays.sort([], 'abc' as any))
        .toThrowError(/Unknown sorting order/);
  });

  test('Arrays.subarray()', () => {
    expect(Arrays.subarray([], 0)).toEqual([]);
    expect(Arrays.subarray([1, 2, 3], 0)).toEqual([1, 2, 3]);
    expect(Arrays.subarray([1, 2, 3], 1)).toEqual([2, 3]);
    const array: readonly number[] = [1, 2, 3];
    expect(Arrays.subarray(array, 1)).toEqual([2, 3]);
    expect(Arrays.subarray([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
    expect(Arrays.subarray([1, 2, 3, 4], 0, 15)).toEqual([1, 2, 3, 4]);
    expect(Arrays.subarray([1, 2, 3, 4], -1000)).toEqual([1, 2, 3, 4]);
  });

  test('Arrays.sum()', () => {
    const array = [1, 2, 3, 4, 5];
    expect(Arrays.sum(array)).toEqual(15);
  });

  test('Arrays.toArray()', () => {
    const set = new Set();
    const iterable1 = set.keys();
    const map = new Map();
    const iterable2 = map.values();
    const iterable3 = map.keys();
    const iterable4 = map.entries();
    expect(Arrays.isArray(Arrays.toArray(iterable1))).toBeTruthy();
    expect(Arrays.isArray(Arrays.toArray(iterable2))).toBeTruthy();
    expect(Arrays.isArray(Arrays.toArray(iterable3))).toBeTruthy();
    expect(Arrays.isArray(Arrays.toArray(iterable4))).toBeTruthy();
  });

  test('Arrays.unique()', () => {
    const array = [1, 9, 2, 4, 9, 3, 3, 2];
    expect(Arrays.unique(array)).toEqual([1, 9, 2, 4, 3]);
  });
});
