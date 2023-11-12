import {Utils} from './Utils';

describe('Utils', () => {
  test('Utils.isBoolean()', () => {
    expect(Utils.isBoolean(!0)).toEqual(true);
    expect(Utils.isBoolean(!1)).toEqual(true);
    expect(Utils.isBoolean(false)).toEqual(true);
    expect(Utils.isBoolean(true)).toEqual(true);
    expect(Utils.isBoolean()).toEqual(false);
    expect(Utils.isBoolean(undefined)).toEqual(false);
    expect(Utils.isBoolean(null)).toEqual(false);
    expect(Utils.isBoolean('')).toEqual(false);
    expect(Utils.isBoolean({})).toEqual(false);
    expect(Utils.isBoolean([])).toEqual(false);
  });

  test('Utils.isDataView()', () => {
    const dataView1 = new DataView(new ArrayBuffer(1), 0, 1);
    expect(Utils.isDataView(dataView1)).toEqual(true);
  });

  test('Utils.isDefined()', () => {
    expect(Utils.isDefined()).toEqual(false);
    expect(Utils.isDefined(undefined)).toEqual(false);
    expect(Utils.isDefined(null)).toEqual(true);
    expect(Utils.isDefined('')).toEqual(true);
    expect(Utils.isDefined({})).toEqual(true);
    expect(Utils.isDefined('sdc')).toEqual(true);
    expect(Utils.isDefined([])).toEqual(true);
  });

  test('Utils.isError()', () => {
    expect(Utils.isError()).toEqual(false);
    expect(Utils.isError(new SyntaxError('abc'))).toEqual(true);
    expect(Utils.isError(new TypeError('abc'))).toEqual(true);
    expect(Utils.isError(new Error('abc'))).toEqual(true);
  });

  test('Utils.isFalsy()', () => {
    expect(Utils.isFalsy(null)).toEqual(true);
    expect(Utils.isFalsy(undefined)).toEqual(true);
    expect(Utils.isFalsy()).toEqual(true);
    expect(Utils.isFalsy(false)).toEqual(true);
    expect(Utils.isFalsy(Number.NaN)).toEqual(true);
    expect(Utils.isFalsy(0)).toEqual(true);
    expect(Utils.isFalsy(-0)).toEqual(true);
    expect(Utils.isFalsy('')).toEqual(true);
    expect(Utils.isFalsy(' ')).toEqual(false);
    expect(Utils.isFalsy('abc')).toEqual(false);
    expect(Utils.isFalsy([])).toEqual(false);
    expect(Utils.isFalsy({})).toEqual(false);
    expect(Utils.isFalsy({a: true})).toEqual(false);
  });

  // eslint-disable-next-line require-jsdoc
  function fn() {
    console.log('abc');
  }

  test('Utils.isFunction()', () => {
    expect(Utils.isFunction()).toEqual(false);
    expect(Utils.isFunction(undefined)).toEqual(false);
    expect(Utils.isFunction(null)).toEqual(false);
    expect(Utils.isFunction(true)).toEqual(false);
    expect(Utils.isFunction(() => true)).toEqual(true);
    expect(Utils.isFunction(fn)).toEqual(true);
  });

  test('Utils.isNotNil()', () => {
    expect(Utils.isNotNil()).toEqual(false);
    expect(Utils.isNotNil(undefined)).toEqual(false);
    expect(Utils.isNotNil(null)).toEqual(false);
    expect(Utils.isNotNil(true)).toEqual(true);
    expect(Utils.isNotNil(() => true)).toEqual(true);
    expect(Utils.isNotNil(fn)).toEqual(true);
    expect(Utils.isNotNil('abc')).toEqual(true);
  });

  test('Utils.isNotNull()', () => {
    expect(Utils.isNotNull()).toEqual(true);
    expect(Utils.isNotNull(undefined)).toEqual(true);
    expect(Utils.isNotNull(null)).toEqual(false);
    expect(Utils.isNotNull(true)).toEqual(true);
    expect(Utils.isNotNull(() => true)).toEqual(true);
    expect(Utils.isNotNull(fn)).toEqual(true);
    expect(Utils.isNotNull('abc')).toEqual(true);
  });

  test('Utils.isNotUndefined()', () => {
    expect(Utils.isNotUndefined()).toEqual(false);
    expect(Utils.isNotUndefined(undefined)).toEqual(false);
    expect(Utils.isNotUndefined(null)).toEqual(true);
    expect(Utils.isNotUndefined(true)).toEqual(true);
    expect(Utils.isNotUndefined(() => true)).toEqual(true);
    expect(Utils.isNotUndefined(fn)).toEqual(true);
    expect(Utils.isNotUndefined('abc')).toEqual(true);
  });

  test('Utils.isNull()', () => {
    expect(Utils.isNull()).toEqual(false);
    expect(Utils.isNull(undefined)).toEqual(false);
    expect(Utils.isNull(null)).toEqual(true);
    expect(Utils.isNull(true)).toEqual(false);
    expect(Utils.isNull(() => false)).toEqual(false);
    expect(Utils.isNull(fn)).toEqual(false);
    expect(Utils.isNull('abc')).toEqual(false);
  });

  test('Utils.isNullOrUndefined()', () => {
    expect(Utils.isNullOrUndefined()).toEqual(true);
    expect(Utils.isNullOrUndefined(undefined)).toEqual(true);
    expect(Utils.isNullOrUndefined(null)).toEqual(true);
    expect(Utils.isNullOrUndefined(true)).toEqual(false);
    expect(Utils.isNullOrUndefined(() => false)).toEqual(false);
    expect(Utils.isNullOrUndefined(fn)).toEqual(false);
    expect(Utils.isNullOrUndefined('abc')).toEqual(false);
  });

  test('Utils.isPrimitive()', () => {
    expect(Utils.isPrimitive()).toEqual(true);
    expect(Utils.isPrimitive(undefined)).toEqual(true);
    expect(Utils.isPrimitive(null)).toEqual(true);
    expect(Utils.isPrimitive(true)).toEqual(true);
    expect(Utils.isPrimitive(() => false)).toEqual(false);
    expect(Utils.isPrimitive(fn)).toEqual(false);
    expect(Utils.isPrimitive('abc')).toEqual(true);
    expect(Utils.isPrimitive(55)).toEqual(true);
    expect(Utils.isPrimitive(0)).toEqual(true);
    expect(Utils.isPrimitive({})).toEqual(false);
  });

  test('Utils.isPromise()', () => {
    expect(Utils.isPromise()).toEqual(false);
    expect(Utils.isPromise(/a/gm)).toEqual(false);
    expect(Utils.isPromise(new RegExp('abc', 'g'))).toEqual(false);
    expect(Utils.isPromise(Promise.resolve())).toEqual(true);
    expect(Utils.isPromise(new Promise(() => {}))).toEqual(true);
  });

  test('Utils.isRegExp()', () => {
    expect(Utils.isRegExp()).toEqual(false);
    expect(Utils.isRegExp(/a/gm)).toEqual(true);
    expect(Utils.isRegExp(new RegExp('abc', 'g'))).toEqual(true);
  });

  test('Utils.isSymbol()', () => {
    expect(Utils.isSymbol()).toEqual(false);
    expect(Utils.isSymbol(null)).toEqual(false);
    expect(Utils.isSymbol(undefined)).toEqual(false);
    expect(Utils.isSymbol(Symbol.iterator)).toEqual(true);
    expect(Utils.isSymbol(/a/gm)).toEqual(false);
    expect(Utils.isSymbol(new RegExp('abc', 'g'))).toEqual(false);
    expect(Utils.isSymbol(Symbol())).toEqual(true);
    expect(Utils.isSymbol(Symbol('abc'))).toEqual(true);
    expect(Utils.isSymbol(Symbol('foobar'))).toEqual(true);
  });

  test('Utils.isSymbolObject()', () => {
    expect(Utils.isSymbolObject()).toEqual(false);
    expect(Utils.isSymbolObject(null)).toEqual(false);
    expect(Utils.isSymbolObject(undefined)).toEqual(false);
    expect(Utils.isSymbolObject(Symbol.iterator)).toEqual(false);
    expect(Utils.isSymbolObject(/a/gm)).toEqual(false);
    expect(Utils.isSymbolObject(new RegExp('abc', 'g'))).toEqual(false);
    expect(Utils.isSymbolObject(Symbol())).toEqual(false);
    expect(Utils.isSymbolObject(Symbol('abc'))).toEqual(false);
    expect(Utils.isSymbolObject(Symbol('foobar'))).toEqual(false);
    expect(Utils.isSymbolObject(Object(Symbol('foo')))).toEqual(true);
  });

  test('Utils.isTruthy()', () => {
    expect(Utils.isTruthy()).toEqual(false);
    expect(Utils.isTruthy(undefined)).toEqual(false);
    expect(Utils.isTruthy(null)).toEqual(false);
    expect(Utils.isTruthy(true)).toEqual(true);
    expect(Utils.isTruthy(false)).toEqual(false);
    expect(Utils.isTruthy('')).toEqual(false);
    expect(Utils.isTruthy(0)).toEqual(false);
    expect(Utils.isTruthy('abc')).toEqual(true);
  });

  test('Utils.isUndefined()', () => {
    expect(Utils.isUndefined()).toEqual(true);
    expect(Utils.isUndefined(undefined)).toEqual(true);
    expect(Utils.isUndefined(null)).toEqual(false);
    expect(Utils.isUndefined(true)).toEqual(false);
    expect(Utils.isUndefined(false)).toEqual(false);
    expect(Utils.isUndefined('')).toEqual(false);
    expect(Utils.isUndefined(0)).toEqual(false);
    expect(Utils.isUndefined('abc')).toEqual(false);
  });
});
