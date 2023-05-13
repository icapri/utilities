import {Maps} from './Maps';

describe('Maps', () => {
  test('Maps.isEmpty()', () => {
    const map = new Map();
    expect(Maps.isEmpty(map)).toEqual(true);
    map.set('a', 'a');
    expect(Maps.isEmpty(map)).toBeFalsy();
  });

  test('Maps.isMap()', () => {
    const map = new Map();
    expect(Maps.isMap(map)).toEqual(true);
    expect(Maps.isMap({})).toBeFalsy();
    expect(Maps.isMap([['key1', 'value1']])).toBeFalsy();
    expect(Maps.isMap()).toBeFalsy();
    expect(Maps.isMap(undefined)).toBeFalsy();
    expect(Maps.isMap(!1)).toBeFalsy();
  });

  test('Maps.isNotEmpty()', () => {
    const map = new Map();
    expect(Maps.isNotEmpty(map)).toBeFalsy();
    map.set('a', 'a');
    expect(Maps.isNotEmpty(map)).toBeTruthy();
  });

  test('Maps.toObject()', () => {
    const map = new Map();
    expect(Maps.toObject(map)).toEqual({});
    map.set('a', 'haleluja');
    map.set('b', false);
    map.set('c', 44);
    expect(Maps.toObject(map)).toEqual({
      a: 'haleluja',
      b: false,
      c: 44,
    });
  });

  test('Maps.toSet()', () => {
    const map = new Map();
    expect(Maps.toSet(map)).toEqual(new Set());
    map.set('a', 'a');
    const s = new Set();
    s.add('a');
    expect(Maps.toSet(map)).toEqual(s);
  });
});
