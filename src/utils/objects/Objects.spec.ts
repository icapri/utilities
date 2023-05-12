import { Objects } from './Objects'

interface User {
  username: string
  password: string
}

describe('Objects', () => {
  test('Objects.EMPTY', () => {
    expect(Objects.EMPTY).toEqual({})
  })

  test('Objects.deepEquals()', () => {
    const o1 = {
      a: false,
      b: 44,
      c: 'abc',
    }
    const o2 = {
      c: 'abc',
      a: false,
      b: 44,
    }
    expect(Objects.deepEquals(o1, o2)).toEqual(true)
    const o11 = {
      d: {
        a: 'abcd',
      },
      a: false,
      b: 44,
      c: 'abc',
    }
    const o22 = {
      c: 'abc',
      a: false,
      b: 44,
      d: {
        a: 'abcd',
      }
    }
    expect(Objects.deepEquals(o11, o22)).toEqual(true)
    expect(Objects.deepEquals({
      a: true
    }, o22)).toEqual(false)
    const user: User = {
      password: 'User12345',
      username: 'User1',
    }
    expect(Objects.deepEquals(user, user)).toEqual(true)
    expect(Objects.deepEquals(user, {})).toEqual(false)
  })

  test('Objects.equals()', () => {
    expect(Objects.equals({}, {})).toEqual(false)
    const x = {
      a: true
    }
    const y = x
    expect(Objects.equals(x, y)).toEqual(true)
  })

  test('Objects.getClassOf()', () => {
    expect(Objects.getClassOf({})).toEqual('[object Object]')
    expect(Objects.getClassOf({a: true})).toEqual('[object Object]')
    expect(Objects.getClassOf(undefined)).toEqual('[object Undefined]')
    expect(Objects.getClassOf(null)).toEqual('[object Null]')
  })

  test('Objects.hasProperty()', () => {
    const o = {
      a: true,
      b: 'abc',
      c: []
    }
    expect(Objects.hasProperty(o, 'a')).toEqual(true)
    expect(Objects.hasProperty(o, 'c')).toEqual(true)
    expect(Objects.hasProperty(o, 'xx')).toEqual(false)
    expect(Objects.hasProperty(o, 'yy')).toEqual(false)
  })

  test('Objects.isEmpty()', () => {
    expect(Objects.isEmpty({})).toEqual(true)
    expect(Objects.isEmpty({ a: undefined })).toEqual(false)
  })

  test('Objects.isNotEmpty()', () => {
    expect(Objects.isNotEmpty({})).toEqual(false)
    expect(Objects.isNotEmpty({ a: undefined })).toEqual(true)
  })

  test('Objects.isNotNull()', () => {
    expect(Objects.isNotNull({})).toEqual(true)
    expect(Objects.isNotNull({ a: !0 })).toEqual(true)
    expect(Objects.isNotNull(null)).toEqual(false)
    expect(Objects.isNotNull(undefined)).toEqual(false)
  })

  test('Objects.isNull()', () => {
    expect(Objects.isNull({})).toEqual(false)
    expect(Objects.isNull({ a: !0 })).toEqual(false)
    expect(Objects.isNull(null)).toEqual(true)
    expect(Objects.isNull(undefined)).toEqual(true)
  })

  test('Objects.isObject()', () => {
    expect(Objects.isObject({})).toEqual(true)
    expect(Objects.isObject({ a: !0 })).toEqual(true)
    expect(Objects.isObject(null)).toEqual(false)
    expect(Objects.isObject(undefined)).toEqual(false)
    expect(Objects.isObject(new Object())).toEqual(true)
  })

  test('Objects.noNilProps()', () => {
    expect(Objects.noNilProps({})).toEqual(true)
    expect(Objects.noNilProps({ a: !0 })).toEqual(true)
    expect(Objects.noNilProps({ a: null })).toEqual(false)
    expect(Objects.noNilProps({ a: null, b: true })).toEqual(false)
  })

  test('Objects.omit()', () => {
    expect(Objects.omit({ a: !0 }, 'a')).toEqual(Objects.EMPTY)
    expect(Objects.omit({ a: null, b: true }, 'b')).toEqual({ a: null })
  })

  test('Objects.pick()', () => {
    expect(Objects.pick({ a: !0 }, 'a')).toEqual({ a: !0 })
    expect(Objects.pick({ a: null, b: true }, 'a')).toEqual({ a: null })
  })

  test('Objects.toIterable()', () => {
    const o = {
      a: 'abc',
      b: 444,
      c: true,
    }

    for (const [key, value] of Objects.toIterable(o)) {
      expect(['a', 'b', 'c'].includes(key as string)).toEqual(true)
      expect(['abc', 444, true].includes(value)).toEqual(true)
    }
  })

  test('Objects.toJSON()', () => {
    const json = `{\n  "a": true\n}`
    expect(Objects.toJSON({ a: !0 })).toEqual(json)
    const json1 = `{\n  "a": null,\n  "b": true\n}`
    expect(Objects.toJSON({ a: null, b: true, c: undefined })).toEqual(json1)
    // make sure circular object references are handled
    const obj = {self: {}}
    obj.self = obj
    expect(Objects.toJSON(obj)).toEqual('{}')
  })

  test('Objects.toMap()', () => {
    expect(Objects.toMap({})).toEqual(new Map())
    const map = new Map()
    map.set('a', true)
    expect(Objects.toMap({ a: true })).toEqual(map)
  })

  test('Objects.toSet()', () => {
    expect(Objects.toSet({})).toEqual(new Set())
    const s = new Set()
    s.add(true)
    expect(Objects.toSet({ a: true })).toEqual(s)
  })
})
