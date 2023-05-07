import { Strings } from './Strings'

describe('Strings', () => {
  test('Strings.appendIfMissing()', () => {
    const str = ''
    const suffix = ''
    expect(Strings.appendIfMissing(str, suffix)).toEqual('')
    expect(Strings.appendIfMissing('Lorem ', 'ipsum')).toEqual('Lorem ipsum')
    expect(Strings.appendIfMissing('Lorem ipsum', 'ipSum', true)).toEqual('Lorem ipsum')
  })

  test('Strings.capitalize()', () => {
    const str = ''
    expect(Strings.capitalize(str)).toEqual('')
    expect(Strings.capitalize('lorem ')).toEqual('Lorem ')
    expect(Strings.capitalize('lorem ipsum')).toEqual('Lorem ipsum')
    expect(Strings.capitalize('cAT')).toEqual('CAT')
  })

  test('Strings.chomp()', () => {
    expect(Strings.chomp('')).toEqual('')
    expect(Strings.chomp('\n')).toEqual('')
    expect(Strings.chomp('Lorem \r')).toEqual('Lorem ')
    expect(Strings.chomp('\r')).toEqual('')
    expect(Strings.chomp('Lorem\r\n\r\n')).toEqual('Lorem\r\n')
    expect(Strings.chomp('Lorem\r')).toEqual('Lorem')
    expect(Strings.chomp('Lorem\n')).toEqual('Lorem')
    expect(Strings.chomp('Lorem\r\n')).toEqual('Lorem')
    expect(Strings.chomp('Lorem\n\rLorem')).toEqual('Lorem\n\rLorem')
  })

  test('Strings.chop()', () => {
    expect(Strings.chop('')).toEqual('')
    expect(Strings.chop('\n')).toEqual('')
    expect(Strings.chop('\r')).toEqual('')
    expect(Strings.chop('\r\n')).toEqual('')
    expect(Strings.chop('\n\r')).toEqual('\n')
    expect(Strings.chop('Lorem \r')).toEqual('Lorem ')
    expect(Strings.chop('Germany')).toEqual('German')
  })

  test('Strings.compare()', () => {
    expect(Strings.compare('', '')).toEqual(0)
    expect(Strings.compare('a', 'A')).toEqual(-1)
    expect(Strings.compare('A', 'a')).toEqual(1)
  })

  test('Strings.compareIgnoreCase()', () => {
    expect(Strings.compareIgnoreCase('', '')).toEqual(0)
    expect(Strings.compareIgnoreCase('a', 'A')).toEqual(0)
    expect(Strings.compareIgnoreCase('A', 'a')).toEqual(0)
    expect(Strings.compareIgnoreCase('A', 'b')).toEqual(-1)
    expect(Strings.compareIgnoreCase('z', 'C')).toEqual(1)
  })

  test('Strings.contains()', () => {
    expect(Strings.contains('', '')).toEqual(true)
    expect(Strings.contains('a', 'A', true)).toEqual(true)
    expect(Strings.contains('Carbonate', 'car', true)).toEqual(true)
    expect(Strings.contains('collaboration', 'rat')).toEqual(true)
    expect(Strings.contains('\n', '\n')).toEqual(true)
  })

  test('Strings.containsAny()', () => {
    expect(Strings.containsAny('John Doe', 'oh', 'oe', 'ohn')).toEqual(true)
    expect(Strings.containsAny('Lorem ipsum', 'am', 'ram', 'isp')).toEqual(false)
  })

  test('Strings.containsIgnoreCase()', () => {
    expect(Strings.containsIgnoreCase('a', 'A')).toEqual(true)
    expect(Strings.containsIgnoreCase('Carbonate', 'car')).toEqual(true)
    expect(Strings.containsIgnoreCase('collaboration', 'rat')).toEqual(true)
    expect(Strings.containsIgnoreCase('\n', '\n')).toEqual(true)
  })

  test('Strings.containsNone()', () => {
    expect(Strings.containsNone('John Doe')).toEqual(false)
    expect(Strings.containsNone('', 'abc')).toEqual(false)
    expect(Strings.containsNone('John Doe', 'oh', 'oe', 'ohn')).toEqual(false)
    expect(Strings.containsNone('Lorem ipsum', 'am', 'ram', 'isp')).toEqual(true)
  })

  test('Strings.countMatches()', () => {
    expect(Strings.countMatches('Lorem ipsum dolor sit', 'or')).toEqual(2)
    expect(Strings.countMatches('ho ho ho', 'ho')).toEqual(3)
    expect(Strings.countMatches('ho ho ho', '')).toEqual(0)
    expect(Strings.countMatches('ho ho ho', ' ')).toEqual(2)
  })

  test('Strings.defaultIfEmpty()', () => {
    expect(Strings.defaultIfEmpty('', '')).toEqual('')
    expect(Strings.defaultIfEmpty('', 'default')).toEqual('default')
  })

  test('Strings.difference()', () => {
    expect(Strings.difference('Lorem', 'Lorem ipsum')).toEqual(' ipsum')
    expect(Strings.difference('Lorem ipsum', 'Lorem')).toEqual(' ipsum')
    expect(Strings.difference('Lorem ', 'Lorem')).toEqual(' ')
    expect(Strings.difference('Lorem', 'Lorem')).toEqual('')
  })

  test('Strings.endsWith()', () => {
    expect(Strings.endsWith('Lorem ipsum', 'm')).toEqual(true)
    expect(Strings.endsWith('Lorem ipsum', 'am')).toEqual(false)
    expect(Strings.endsWith('', 'am')).toEqual(false)
    expect(Strings.endsWith('Lorem', 'Em', true)).toEqual(true)
  })

  test('Strings.endsWithAny()', () => {
    expect(Strings.endsWithAny('Lorem ipsum', 'm')).toEqual(true)
    expect(Strings.endsWithAny('Lorem ipsum', 'aps', 'sum', 'farn')).toEqual(true)
    expect(Strings.endsWithAny('Lorem ipsum', 'aps', 'farn')).toEqual(false)
  })

  test('Strings.endsWithIgnoreCase()', () => {
    expect(Strings.endsWithIgnoreCase('', 'Em')).toEqual(false)
    expect(Strings.endsWithIgnoreCase('Lorem', 'Em')).toEqual(true)
    expect(Strings.endsWithIgnoreCase('Lorem', 'am')).toEqual(false)
  })

  test('Strings.endsWithNone()', () => {
    expect(Strings.endsWithNone('', 'Em')).toEqual(false)
    expect(Strings.endsWithNone('Em', '')).toEqual(false)
    expect(Strings.endsWithNone('Lorem ipsum', 'sam', 'sem', 'sim')).toEqual(true)
    expect(Strings.endsWithNone('Lorem ipsum', 'sum', 'sem', 'sim')).toEqual(false)
  })

  test('Strings.equals()', () => {
    expect(Strings.equals('', '')).toEqual(true)
    expect(Strings.equals('', 'Em')).toEqual(false)
    expect(Strings.equals('sdc', 'Em')).toEqual(false)
    expect(Strings.equals('Em', 'Em')).toEqual(true)
    expect(Strings.equals(new String('Em'), new String('Em'))).toEqual(true)
    expect(Strings.equals(new String('Esm'), new String('Em'))).toEqual(false)
  })

  test('Strings.equalsIgnoreCase()', () => {
    expect(Strings.equalsIgnoreCase('', '')).toEqual(true)
    expect(Strings.equalsIgnoreCase('LoReM', 'lorem')).toEqual(true)
    expect(Strings.equalsIgnoreCase('a', 'A')).toEqual(true)
    expect(Strings.equalsIgnoreCase('LoReMd', 'lorem')).toEqual(false)
  })

  test('Strings.equalsAny()', () => {
    expect(Strings.equalsAny('', '')).toEqual(true)
    expect(Strings.equalsAny('')).toEqual(false)
    expect(Strings.equalsAny('Lorem', 'Lorem')).toEqual(true)
    expect(Strings.equalsAny('Lorem', 'Ipsum', 'Dolor', 'Lorem')).toEqual(true)
    expect(Strings.equalsAny('Lorem', 'Ipsum', 'Dolor')).toEqual(false)
  })

  test('Strings.equalsAnyIgnoreCase()', () => {
    expect(Strings.equalsAnyIgnoreCase('', '')).toEqual(true)
    expect(Strings.equalsAnyIgnoreCase('')).toEqual(false)
    expect(Strings.equalsAnyIgnoreCase('Lorem', 'LORem')).toEqual(true)
    expect(Strings.equalsAnyIgnoreCase('Lorem', 'Ipsum', 'Dolor', 'lorem')).toEqual(true)
    expect(Strings.equalsAnyIgnoreCase('Lorem', 'Ipsum', 'Dolor')).toEqual(false)
  })

  test('Strings.getBytes()', () => {
    expect(Strings.getBytes('Lorem')).toEqual(5)
    expect(Strings.getBytes('sdcscdcsdsd')).toEqual(11)
  })

  test('Strings.hashCode()', () => {
    expect(Strings.hashCode('Lorem')).toEqual(73607191)
    expect(Strings.hashCode('Ipsum')).toEqual(70867876)
  })

  test('Strings.hasWhitespace()', () => {
    expect(Strings.hasWhitespace('')).toEqual(false)
    expect(Strings.hasWhitespace('l')).toEqual(false)
    expect(Strings.hasWhitespace('Lorem')).toEqual(false)
    expect(Strings.hasWhitespace('Ip sum')).toEqual(true)
    expect(Strings.hasWhitespace('\n')).toEqual(true)
    expect(Strings.hasWhitespace('\r')).toEqual(true)
    expect(Strings.hasWhitespace('\t')).toEqual(true)
    expect(Strings.hasWhitespace('\f')).toEqual(true)
    expect(Strings.hasWhitespace('Loremipsumdolorsit')).toEqual(false)
    expect(Strings.hasWhitespace('Lorem\n')).toEqual(true)
    expect(Strings.hasWhitespace('Lorem\r')).toEqual(true)
    expect(Strings.hasWhitespace('Lorem\t')).toEqual(true)
    expect(Strings.hasWhitespace('Lorem\f')).toEqual(true)
  })

  test('Strings.indexOf()', () => {
    expect(Strings.indexOf('', '')).toEqual(0)
    expect(Strings.indexOf('Lorem', 'em')).toEqual(3)
    expect(Strings.indexOf('Lorem', 'am')).toEqual(-1)
  })

  test('Strings.indexOfAny()', () => {
    expect(Strings.indexOfAny('Lorem')).toEqual(-1)
    expect(Strings.indexOfAny('')).toEqual(-1)
    expect(Strings.indexOfAny('Lorem', 'em')).toEqual(3)
    expect(Strings.indexOfAny('Lorem', 'am')).toEqual(-1)
    expect(Strings.indexOfAny('Lorem', 'am', 'em', 'um')).toEqual(3)
    expect(Strings.indexOfAny('Lorem', 'rem', 'em', 'um')).toEqual(2)
  })

  test('Strings.indexOfDifference()', () => {
    expect(Strings.indexOfDifference('', '')).toEqual(-1)
    expect(Strings.indexOfDifference('', 'a')).toEqual(0)
    expect(Strings.indexOfDifference('a', '')).toEqual(0)
    expect(Strings.indexOfDifference('Lorem', 'Lor')).toEqual(3)
    expect(Strings.indexOfDifference('Lor', 'Lorem')).toEqual(3)
    expect(Strings.indexOfDifference('Lor', 'asc')).toEqual(0)
  })

  test('Strings.indexOfIgnoreCase()', () => {
    expect(Strings.indexOfIgnoreCase('', '')).toEqual(0)
    expect(Strings.indexOfIgnoreCase('Lorem', 'EM')).toEqual(3)
    expect(Strings.indexOfIgnoreCase('Lorem', 'em')).toEqual(3)
  })

  test('Strings.isAllBlank()', () => {
    expect(Strings.isAllBlank('')).toEqual(true)
    expect(Strings.isAllBlank(' ')).toEqual(true)
    expect(Strings.isAllBlank('\n')).toEqual(true)
    expect(Strings.isAllBlank('\t')).toEqual(true)
    expect(Strings.isAllBlank('\r')).toEqual(true)
    expect(Strings.isAllBlank('\f')).toEqual(true)
    expect(Strings.isAllBlank('\f\n')).toEqual(true)
    expect(Strings.isAllBlank('\f\r')).toEqual(true)
    expect(Strings.isAllBlank('\t\r\f')).toEqual(true)
    expect(Strings.isAllBlank('\f\t\r\n\n')).toEqual(true)
    expect(Strings.isAllBlank('\f\t\r\n\na')).toEqual(false)
  })

  test('Strings.isBinary()', () => {
    expect(Strings.isBinary('')).toEqual(true)
    expect(Strings.isBinary(' ')).toEqual(true)
    expect(Strings.isBinary('☻')).toEqual(false)
    expect(Strings.isBinary('binary')).toEqual(true)
  })

  test('Strings.isBlank()', () => {
    expect(Strings.isBlank('')).toEqual(true)
    expect(Strings.isBlank(' ')).toEqual(false)
    expect(Strings.isBlank(' d')).toEqual(false)
  })

  test('Strings.isEmpty()', () => {
    expect(Strings.isEmpty('')).toEqual(true)
    expect(Strings.isEmpty(' ')).toEqual(false)
    expect(Strings.isEmpty(' d')).toEqual(false)
  })

  test('Strings.isLowerCase()', () => {
    expect(Strings.isLowerCase('')).toEqual(true)
    expect(Strings.isLowerCase('nnnn')).toEqual(true)
    expect(Strings.isLowerCase('Sdd')).toEqual(false)
    expect(Strings.isLowerCase('123')).toEqual(true)
  })

  test('Strings.isNilOrEmpty()', () => {
    expect(Strings.isNilOrEmpty('')).toEqual(true)
    expect(Strings.isNilOrEmpty(' ')).toEqual(false)
    expect(Strings.isNilOrEmpty(null)).toEqual(true)
    expect(Strings.isNilOrEmpty(undefined)).toEqual(true)
    expect(Strings.isNilOrEmpty('undefined')).toEqual(false)
  })

  test('Strings.isNilOrWhitespace()', () => {
    expect(Strings.isNilOrWhitespace('')).toEqual(true)
    expect(Strings.isNilOrWhitespace(' ')).toEqual(true)
    expect(Strings.isNilOrWhitespace(null)).toEqual(true)
    expect(Strings.isNilOrWhitespace(undefined)).toEqual(true)
    expect(Strings.isNilOrWhitespace('undefined')).toEqual(false)
    expect(Strings.isNilOrWhitespace('\n')).toEqual(true)
    expect(Strings.isNilOrWhitespace('\t')).toEqual(true)
    expect(Strings.isNilOrWhitespace('\r')).toEqual(true)
    expect(Strings.isNilOrWhitespace('\f')).toEqual(true)
    expect(Strings.isNilOrWhitespace('\f\r\n')).toEqual(true)
    expect(Strings.isNilOrWhitespace('\f\n\nr')).toEqual(false)
  })

  test('Strings.isNotEmpty()', () => {
    expect(Strings.isNotEmpty('')).toEqual(false)
    expect(Strings.isNotEmpty(' ')).toEqual(true)
    expect(Strings.isNotEmpty(' d')).toEqual(true)
  })

  test('Strings.isNullOrEmpty()', () => {
    expect(Strings.isNullOrEmpty('')).toEqual(true)
    expect(Strings.isNullOrEmpty(' ')).toEqual(false)
    expect(Strings.isNullOrEmpty(null)).toEqual(true)
    expect(Strings.isNullOrEmpty('undefined')).toEqual(false)
  })

  test('Strings.isNullOrWhitespace()', () => {
    expect(Strings.isNullOrWhitespace('')).toEqual(true)
    expect(Strings.isNullOrWhitespace(' ')).toEqual(true)
    expect(Strings.isNullOrWhitespace(null)).toEqual(true)
    expect(Strings.isNullOrWhitespace('undefined')).toEqual(false)
  })

  test('Strings.isSpaceChar()', () => {
    expect(Strings.isSpaceChar('')).toEqual(false)
    expect(Strings.isSpaceChar(' ')).toEqual(true)
    expect(Strings.isSpaceChar('\t')).toEqual(true)
    expect(Strings.isSpaceChar('\r')).toEqual(true)
    expect(Strings.isSpaceChar('\f')).toEqual(true)
    expect(Strings.isSpaceChar('\n')).toEqual(true)
    expect(Strings.isSpaceChar('\n\n')).toEqual(false)
    expect(Strings.isSpaceChar('d')).toEqual(false)
  })

  test('Strings.isString()', () => {
    expect(Strings.isString('')).toEqual(true)
    expect(Strings.isString(' ')).toEqual(true)
    expect(Strings.isString(null)).toEqual(false)
    expect(Strings.isString('undefined')).toEqual(true)
    expect(Strings.isString()).toEqual(false)
  })

  test('Strings.isStringObject()', () => {
    expect(Strings.isStringObject('')).toEqual(false)
    expect(Strings.isStringObject(' ')).toEqual(false)
    expect(Strings.isStringObject(null)).toEqual(false)
    expect(Strings.isStringObject('undefined')).toEqual(false)
    expect(Strings.isStringObject()).toEqual(false)
    expect(Strings.isStringObject(new String())).toEqual(true)
    expect(Strings.isStringObject(new String('abc'))).toEqual(true)
  })

  test('Strings.isUpperCase()', () => {
    expect(Strings.isUpperCase('')).toEqual(true)
    expect(Strings.isUpperCase('ABCD')).toEqual(true)
    expect(Strings.isUpperCase('ABCs')).toEqual(false)
  })

  test('Strings.isWhitespace()', () => {
    expect(Strings.isWhitespace('')).toEqual(true)
    expect(Strings.isWhitespace(' ')).toEqual(true)
    expect(Strings.isWhitespace('\n')).toEqual(true)
    expect(Strings.isWhitespace('\t')).toEqual(true)
    expect(Strings.isWhitespace('\r')).toEqual(true)
    expect(Strings.isWhitespace('\f')).toEqual(true)
    expect(Strings.isWhitespace('\f\n')).toEqual(true)
    expect(Strings.isWhitespace('\f\r')).toEqual(true)
    expect(Strings.isWhitespace('\t\r\f')).toEqual(true)
    expect(Strings.isWhitespace('\f\t\r\n\n')).toEqual(true)
    expect(Strings.isWhitespace('\f\t\r\n\na')).toEqual(false)
  })

  test('Strings.join()', () => {
    expect(Strings.join('')).toEqual('')
    expect(Strings.join('', '')).toEqual('')
    expect(Strings.join('Lorem', ' ', 'ipsum', ' ', 'dolor')).toEqual('Lorem ipsum dolor')
  })
})
