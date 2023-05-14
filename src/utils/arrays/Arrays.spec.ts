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

  test('Arrays.has()', () => {
    expect(Arrays.has([], 'a')).toEqual(false);
    expect(Arrays.has([''], '')).toEqual(true);
    expect(Arrays.has(
        ['a', 1, false, Symbol.iterator], Symbol.iterator),
    ).toEqual(true);
    expect(Arrays.has(['🐑', '🐑', '🐑', '😀', '💖'], '🐑')).toEqual(true);
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

  test('Arrays.isNotEmpty()', () => {
    expect(Arrays.isNotEmpty([])).toEqual(false);
    expect(Arrays.isNotEmpty([null])).toEqual(true);
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

  test('Arrays.sort()', () => {
    const array = [7, 1, 6, 3, 5, 8, 2, 9, 4];
    expect(Arrays.sort(array)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('Arrays.sum()', () => {
    const array = [1, 2, 3, 4, 5];
    expect(Arrays.sum(array)).toEqual(15);
  });

  test('Arrays.unique()', () => {
    const array = [1, 9, 2, 4, 9, 3, 3, 2];
    expect(Arrays.unique(array)).toEqual([1, 9, 2, 4, 3]);
  });
});
