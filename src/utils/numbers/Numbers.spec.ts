import { Numbers } from './Numbers'

describe('Numbers', () => {
  test('Numbers.abs()', () => {
    const x = 4
    const y = -5
    expect(Numbers.abs(x)).toEqual(4)
    expect(Numbers.abs(y)).toEqual(5)
  })

  test('Numbers.compare()', () => {
    expect(Numbers.compare(1, 2)).toEqual(-1)
    expect(Numbers.compare(3, Numbers.abs(-3))).toEqual(0)
    expect(Numbers.compare(11, 5)).toEqual(1)
  })

  test('Numbers.isInteger()', () => {
    expect(Numbers.isInteger(1)).toEqual(true)
    expect(Numbers.isInteger(.9)).toEqual(false)
    expect(Numbers.isInteger(2e+2)).toEqual(true)
    expect(Numbers.isInteger(1.000000009)).toEqual(false)
    expect(Numbers.isInteger(-9)).toEqual(true)
    expect(Numbers.isInteger(0)).toEqual(true)
    expect(Numbers.isInteger(-0)).toEqual(true)
    expect(Numbers.isInteger(Number.NaN)).toEqual(false)
    expect(Numbers.isInteger(Number.POSITIVE_INFINITY)).toEqual(false)
    expect(Numbers.isInteger(Number.MAX_SAFE_INTEGER + 1)).toEqual(false)
  })

  test('Numbers.isNatural()', () => {
    expect(Numbers.isNatural(1)).toEqual(true)
    expect(Numbers.isNatural(.9)).toEqual(false)
    expect(Numbers.isNatural(2e+2)).toEqual(true)
    expect(Numbers.isNatural(1.000000009)).toEqual(false)
    expect(Numbers.isNatural(-9)).toEqual(false)
    expect(Numbers.isNatural(0)).toEqual(true)
    expect(Numbers.isNatural(-0)).toEqual(true)
    expect(Numbers.isNatural(Number.NaN)).toEqual(false)
    expect(Numbers.isNatural(Number.POSITIVE_INFINITY)).toEqual(false)
    expect(Numbers.isNatural(Number.MAX_SAFE_INTEGER + 1)).toEqual(false)
  })

  test('Numbers.isNumber()', () => {
    expect(Numbers.isNumber(1)).toEqual(true)
    expect(Numbers.isNumber(3.4e+2)).toEqual(true)
    expect(Numbers.isNumber(Number.NaN)).toEqual(false)
    expect(Numbers.isNumber(Number.POSITIVE_INFINITY)).toEqual(false)
    expect(Numbers.isNumber(Number.MAX_SAFE_INTEGER + 1)).toEqual(true)
  })

  test('Numbers.isPositiveInteger()', () => {
    expect(Numbers.isPositiveInteger(1)).toEqual(true)
    expect(Numbers.isPositiveInteger(.9)).toEqual(false)
    expect(Numbers.isPositiveInteger(2e+2)).toEqual(true)
    expect(Numbers.isPositiveInteger(1.000000009)).toEqual(false)
    expect(Numbers.isPositiveInteger(-9)).toEqual(false)
    expect(Numbers.isPositiveInteger(0)).toEqual(false)
    expect(Numbers.isPositiveInteger(-0)).toEqual(false)
    expect(Numbers.isPositiveInteger(Number.NaN)).toEqual(false)
    expect(Numbers.isPositiveInteger(Number.POSITIVE_INFINITY)).toEqual(false)
    expect(Numbers.isPositiveInteger(Number.MAX_SAFE_INTEGER + 1)).toEqual(false)
  })

  test('Numbers.isPrime()', () => {
    expect([
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59,
      61,
      67,
      71,
      73,
      79,
      83,
      89,
      97
    ].every((n) => Numbers.isPrime(n))).toEqual(true)
  })
  expect(Numbers.isPrime(4)).toEqual(false)
})
