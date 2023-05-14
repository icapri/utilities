import {Sets} from './Sets';

describe('Sets', () => {
  test('Sets.isEmpty()', () => {
    const set = new Set();
    expect(Sets.isEmpty(set)).toEqual(true);
    set.add('abc');
    expect(Sets.isEmpty(set)).toEqual(false);
  });

  test('Sets.isNotEmpty()', () => {
    const set = new Set();
    expect(Sets.isNotEmpty(set)).toEqual(false);
    set.add('abc');
    expect(Sets.isNotEmpty(set)).toEqual(true);
  });

  test('Sets.isSet()', () => {
    expect(Sets.isSet()).toEqual(false);
    expect(Sets.isSet({})).toEqual(false);
    expect(Sets.isSet(undefined)).toEqual(false);
    expect(Sets.isSet([])).toEqual(false);
    expect(Sets.isSet(null)).toEqual(false);
    const set = new Set();
    expect(Sets.isSet(set)).toEqual(true);
    set.add('abc');
    expect(Sets.isSet(set)).toEqual(true);
  });

  test('Sets.isWeakSet()', () => {
    expect(Sets.isWeakSet()).toEqual(false);
    expect(Sets.isWeakSet({})).toEqual(false);
    expect(Sets.isWeakSet(undefined)).toEqual(false);
    expect(Sets.isWeakSet([])).toEqual(false);
    expect(Sets.isWeakSet(null)).toEqual(false);
    const set = new Set();
    expect(Sets.isWeakSet(set)).toEqual(false);
    set.add('abc');
    expect(Sets.isWeakSet(set)).toEqual(false);
    const weakSet = new WeakSet();
    expect(Sets.isWeakSet(weakSet)).toEqual(true);
    weakSet.add({someGarbage: 'abc'});
    expect(Sets.isWeakSet(weakSet)).toEqual(true);
  });

  test('Sets.toMap()', () => {
    const set = new Set();
    const map = new Map();
    expect(Sets.toMap(set)).toEqual(map);
    set.add('abc');
    map.set(0, 'abc');
    expect(Sets.toMap(set)).toEqual(map);
  });
});
