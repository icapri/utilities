import {Strings} from './Strings';

describe('Strings', () => {
  test('Strings.abbreviate()', () => {
    expect(Strings.abbreviate('', 2)).toEqual('');
    expect(Strings.abbreviate('', 2.5)).toEqual('');
    expect(Strings.abbreviate('', -2)).toEqual('');
    expect(Strings.abbreviate('a', 1)).toEqual('a');
    expect(Strings.abbreviate('abc', 2)).toEqual('ab...');
    expect(Strings.abbreviate('Lorem ipsum dolor', 8)).toEqual('Lorem ip...');
    expect(Strings.abbreviate('Lorem ipsum dolor', 18)).toEqual(
        'Lorem ipsum dolor');
  });

  test('Strings.appendIfMissing()', () => {
    expect(Strings.appendIfMissing('', '')).toEqual('');
    expect(Strings.appendIfMissing('abc', 'def')).toEqual('abcdef');
    expect(Strings.appendIfMissing('abcdef', 'DeF', true)).toEqual('abcdef');
    expect(Strings.appendIfMissing('Lorem ', 'ipsum')).toEqual('Lorem ipsum');
    expect(Strings.appendIfMissing('Lorem ipsum', 'ipSum', true)).toEqual(
        'Lorem ipsum');
  });

  test('Strings.at()', () => {
    expect(Strings.at('', 0)).toEqual('');
    expect(Strings.at('', -1)).toEqual('');
    expect(Strings.at('', -0)).toEqual('');
    expect(Strings.at(' ', 0)).toEqual(' ');
    expect(Strings.at('abc', -23)).toEqual('');
    expect(Strings.at('abc', 3)).toEqual('');
    expect(Strings.at('abcde', 4)).toEqual('e');
    expect(Strings.at('\\\r', 0)).toEqual('\\');
    expect(Strings.at('\\\r', 1)).toEqual('\r');
    expect(Strings.at('\\\r\t', 2)).toEqual('\t');
    expect(Strings.at('\n\t\f\n', 2)).toEqual('\f');
    expect(Strings.at('\t\f\n', 2)).toEqual('\n');
  });

  test('Strings.chomp()', () => {
    expect(Strings.chomp('')).toEqual('');
    expect(Strings.chomp('\n')).toEqual('');
    expect(Strings.chomp('Lorem \r')).toEqual('Lorem ');
    expect(Strings.chomp('\r')).toEqual('');
    expect(Strings.chomp('Lorem\r\n\r\n')).toEqual('Lorem\r\n');
    expect(Strings.chomp('Lorem\r')).toEqual('Lorem');
    expect(Strings.chomp('Lorem\n')).toEqual('Lorem');
    expect(Strings.chomp('Lorem\r\n')).toEqual('Lorem');
    expect(Strings.chomp('Lorem\n\rLorem')).toEqual('Lorem\n\rLorem');
  });

  test('Strings.chop()', () => {
    expect(Strings.chop('')).toEqual('');
    expect(Strings.chop('\n')).toEqual('');
    expect(Strings.chop('\r')).toEqual('');
    expect(Strings.chop('\r\n')).toEqual('');
    expect(Strings.chop('\n\r')).toEqual('\n');
    expect(Strings.chop('Lorem \r')).toEqual('Lorem ');
    expect(Strings.chop('Germany')).toEqual('German');
  });

  test('Strings.compare()', () => {
    expect(Strings.compare('', '')).toEqual(0);
    expect(Strings.compare('a', 'A')).toEqual(-1);
    expect(Strings.compare('A', 'a')).toEqual(1);
  });

  test('Strings.compareIgnoreCase()', () => {
    expect(Strings.compareIgnoreCase('', '')).toEqual(0);
    expect(Strings.compareIgnoreCase('a', 'A')).toEqual(0);
    expect(Strings.compareIgnoreCase('A', 'a')).toEqual(0);
    expect(Strings.compareIgnoreCase('A', 'b')).toEqual(-1);
    expect(Strings.compareIgnoreCase('z', 'C')).toEqual(1);
  });

  test('Strings.contains()', () => {
    expect(Strings.contains('', '')).toEqual(true);
    expect(Strings.contains('a', 'A', true)).toEqual(true);
    expect(Strings.contains('Carbonate', 'car', true)).toEqual(true);
    expect(Strings.contains('collaboration', 'rat')).toEqual(true);
    expect(Strings.contains('\n', '\n')).toEqual(true);
    expect(Strings.contains('  ', '')).toEqual(true);
    expect(Strings.contains('  ', '', true)).toEqual(true);
    expect(Strings.contains('abc\ndef', '\nd')).toEqual(true);
    expect(Strings.contains('abc def', 'EF', true)).toEqual(true);
  });

  test('Strings.containsAny()', () => {
    expect(Strings.containsAny('', 'oe', '')).toEqual(true);
    expect(Strings.containsAny('  ', 'oe', '')).toEqual(true);
    expect(Strings.containsAny('\t\t\t', 'oe', '\t')).toEqual(true);
    expect(Strings.containsAny('John Doe', 'oh', 'oe', 'ohn')).toEqual(true);
    expect(Strings.containsAny('Lorem ipsum', 'am', 'ram', 'isp')).toEqual(
        false);
  });

  test('Strings.containsIgnoreCase()', () => {
    expect(Strings.containsIgnoreCase('', '')).toEqual(true);
    expect(Strings.containsIgnoreCase('\n\n\n', '')).toEqual(true);
    expect(Strings.containsIgnoreCase('  ', '')).toEqual(true);
    expect(Strings.containsIgnoreCase(' ', '')).toEqual(true);
    expect(Strings.containsIgnoreCase('abcDeF', 'CDE')).toEqual(true);
    expect(Strings.containsIgnoreCase('a', 'A')).toEqual(true);
    expect(Strings.containsIgnoreCase('Carbonate', 'car')).toEqual(true);
    expect(Strings.containsIgnoreCase('collaboration', 'rat')).toEqual(true);
    expect(Strings.containsIgnoreCase('\n', '\n')).toEqual(true);
    expect(Strings.containsIgnoreCase('abc def', 'EF')).toEqual(true);
    expect(Strings.containsIgnoreCase('abc def', 'ghi')).toEqual(false);
  });

  test('Strings.containsNone()', () => {
    expect(Strings.containsNone('')).toEqual(true);
    expect(Strings.containsNone('  ')).toEqual(true);
    expect(Strings.containsNone('', '', '')).toEqual(false);
    expect(Strings.containsNone('John Doe')).toEqual(true);
    expect(Strings.containsNone('', 'abc')).toEqual(true);
    expect(Strings.containsNone(
        'Tic toc toe', 'tac', 'tuc', 'tec')).toEqual(true);
    expect(Strings.containsNone('John Doe', 'oh', 'oe', 'ohn')).toEqual(false);
    expect(Strings.containsNone('Lorem ipsum', 'am', 'ram', 'isp')).toEqual(
        true);
  });

  test('Strings.countMatches()', () => {
    expect(Strings.countMatches('', '')).toEqual(0);
    expect(Strings.countMatches('Lorem ipsum dolor sit', 'or')).toEqual(2);
    expect(Strings.countMatches('ho ho ho', 'ho')).toEqual(3);
    expect(Strings.countMatches('ho ho ho', '')).toEqual(0);
    expect(Strings.countMatches('ho ho ho', ' ')).toEqual(2);
  });

  test('Strings.defaultIfEmpty()', () => {
    expect(Strings.defaultIfEmpty('', '')).toEqual('');
    expect(Strings.defaultIfEmpty('', 'default')).toEqual('default');
  });

  test('Strings.difference()', () => {
    expect(Strings.difference('Lorem', 'Lorem ipsum')).toEqual(' ipsum');
    expect(Strings.difference('Lorem ipsum', 'Lorem')).toEqual(' ipsum');
    expect(Strings.difference('Lorem ', 'Lorem')).toEqual(' ');
    expect(Strings.difference('Lorem', 'Lorem')).toEqual('');
  });

  test('Strings.endsWith()', () => {
    expect(Strings.endsWith('', '')).toEqual(true);
    expect(Strings.endsWith('abc', '')).toEqual(true);
    expect(Strings.endsWith('Lorem ipsum', 'm')).toEqual(true);
    expect(Strings.endsWith('Lorem ipsum', 'am')).toEqual(false);
    expect(Strings.endsWith('', 'am')).toEqual(false);
    expect(Strings.endsWith('Lorem', 'Em', true)).toEqual(true);
  });

  test('Strings.endsWithAny()', () => {
    expect(Strings.endsWithAny('')).toEqual(false);
    expect(Strings.endsWithAny('', 'abc')).toEqual(false);
    expect(Strings.endsWithAny('abc')).toEqual(false);
    expect(Strings.endsWithAny('abc', '')).toEqual(true);
    expect(Strings.endsWithAny('Lorem ipsum', 'm')).toEqual(true);
    expect(Strings.endsWithAny('Lorem ipsum', 'aps', 'sum', 'farn')).toEqual(
        true);
    expect(Strings.endsWithAny('Lorem ipsum', 'aps', 'farn')).toEqual(false);
  });

  test('Strings.endsWithIgnoreCase()', () => {
    expect(Strings.endsWithIgnoreCase('', '')).toEqual(true);
    expect(Strings.endsWithIgnoreCase('abc', '')).toEqual(true);
    expect(Strings.endsWithIgnoreCase('', 'Em')).toEqual(false);
    expect(Strings.endsWithIgnoreCase('Lorem', 'Em')).toEqual(true);
    expect(Strings.endsWithIgnoreCase('Lorem', 'am')).toEqual(false);
  });

  test('Strings.endsWithNone()', () => {
    expect(Strings.endsWithNone('')).toEqual(false);
    expect(Strings.endsWithNone('', 'Em')).toEqual(true);
    expect(Strings.endsWithNone('Em', '')).toEqual(false);
    expect(Strings.endsWithNone('Lorem ipsum', 'sam', 'sem', 'sim')).toEqual(
        true);
    expect(Strings.endsWithNone('Lorem ipsum', 'sum', 'sem', 'sim')).toEqual(
        false);
    expect(Strings.endsWithNone('abc', 'd', 'e', 'f')).toEqual(true);
  });

  test('Strings.equals()', () => {
    expect(Strings.equals('', '')).toEqual(true);
    expect(Strings.equals('', 'Em')).toEqual(false);
    expect(Strings.equals('sdc', 'Em')).toEqual(false);
    expect(Strings.equals('Em', 'Em')).toEqual(true);
    // eslint-disable-next-line no-new-wrappers
    expect(Strings.equals(new String('Em'), new String('Em'))).toEqual(true);
    // eslint-disable-next-line no-new-wrappers
    expect(Strings.equals(new String('Esm'), new String('Em'))).toEqual(false);
  });

  test('Strings.equalsIgnoreCase()', () => {
    expect(Strings.equalsIgnoreCase('', '')).toEqual(true);
    expect(Strings.equalsIgnoreCase(' ', ' ')).toEqual(true);
    expect(Strings.equalsIgnoreCase('    ', '\t')).toEqual(false);
    expect(Strings.equalsIgnoreCase('LoReM', 'lorem')).toEqual(true);
    expect(Strings.equalsIgnoreCase('a', 'A')).toEqual(true);
    expect(Strings.equalsIgnoreCase('LoReMd', 'lorem')).toEqual(false);
  });

  test('Strings.equalsAny()', () => {
    expect(Strings.equalsAny('')).toEqual(false);
    expect(Strings.equalsAny('', '')).toEqual(true);
    expect(Strings.equalsAny('Lorem', 'Lorem')).toEqual(true);
    expect(Strings.equalsAny('Lorem', 'Ipsum', 'Dolor', 'Lorem')).toEqual(true);
    expect(Strings.equalsAny('Lorem', 'Ipsum', 'Dolor')).toEqual(false);
  });

  test('Strings.equalsAnyIgnoreCase()', () => {
    expect(Strings.equalsAnyIgnoreCase('', '')).toEqual(true);
    expect(Strings.equalsAnyIgnoreCase('')).toEqual(false);
    expect(Strings.equalsAnyIgnoreCase('Lorem', 'LORem')).toEqual(true);
    expect(Strings.equalsAnyIgnoreCase(
        'Lorem', 'Ipsum', 'Dolor', 'lorem')).toEqual(true);
    expect(Strings.equalsAnyIgnoreCase(
        'Lorem', 'Ipsum', 'Dolor')).toEqual(false);
    expect(Strings.equalsAnyIgnoreCase(
        'abc', 'def', 'ABc', 'mno')).toEqual(true);
  });

  test('Strings.getBytes()', () => {
    expect(Strings.getBytes('Lorem')).toEqual(5);
    expect(Strings.getBytes('sdcscdcsdsd')).toEqual(11);
  });

  test('Strings.hasChar()', () => {
    expect(Strings.hasChar('', '')).toEqual(false);
    expect(Strings.hasChar('', 's')).toEqual(false);
    expect(Strings.hasChar('d', '')).toEqual(false);
    // this next expectation is false because the second arg is not a char
    expect(Strings.hasChar('Lorem', 'em')).toEqual(false);
    expect(Strings.hasChar('Lorem', 'e')).toEqual(true);
    expect(Strings.hasChar('Ipsum', 'u')).toEqual(true);
    expect(Strings.hasChar('Ipsum', '\\')).toEqual(false);
    expect(Strings.hasChar('Ips\\um', '\\')).toEqual(true);
  });

  test('Strings.hashCode()', () => {
    expect(Strings.hashCode('Lorem')).toEqual(73607191);
    expect(Strings.hashCode('Ipsum')).toEqual(70867876);
  });

  test('Strings.hasWhitespace()', () => {
    expect(Strings.hasWhitespace('')).toEqual(false);
    expect(Strings.hasWhitespace('l')).toEqual(false);
    expect(Strings.hasWhitespace('Lorem')).toEqual(false);
    expect(Strings.hasWhitespace('Ip sum')).toEqual(true);
    expect(Strings.hasWhitespace('\n')).toEqual(true);
    expect(Strings.hasWhitespace('\r')).toEqual(true);
    expect(Strings.hasWhitespace('\t')).toEqual(true);
    expect(Strings.hasWhitespace('\f')).toEqual(true);
    expect(Strings.hasWhitespace('Loremipsumdolorsit')).toEqual(false);
    expect(Strings.hasWhitespace('Lorem\n')).toEqual(true);
    expect(Strings.hasWhitespace('Lorem\r')).toEqual(true);
    expect(Strings.hasWhitespace('Lorem\t')).toEqual(true);
    expect(Strings.hasWhitespace('Lorem\f')).toEqual(true);
  });

  test('Strings.indexOf()', () => {
    expect(Strings.indexOf('', '')).toEqual(0);
    expect(Strings.indexOf('abc', '')).toEqual(0);
    expect(Strings.indexOf('Lorem', 'em')).toEqual(3);
    expect(Strings.indexOf('Lorem', 'am')).toEqual(-1);
    expect(Strings.indexOf('Lorem', 'rem')).toEqual(2);
    expect(Strings.indexOf('abcde', 'de')).toEqual(3);
  });

  test('Strings.indexOfAny()', () => {
    expect(Strings.indexOfAny('Lorem')).toEqual(-1);
    expect(Strings.indexOfAny('Lorem', '')).toEqual(0);
    expect(Strings.indexOfAny('')).toEqual(-1);
    expect(Strings.indexOfAny('Lorem', 'em')).toEqual(3);
    expect(Strings.indexOfAny('Lorem', 'am')).toEqual(-1);
    expect(Strings.indexOfAny('Lorem', 'am', 'em', 'um')).toEqual(3);
    expect(Strings.indexOfAny('Lorem', 'rem', 'em', 'um')).toEqual(2);
  });

  test('Strings.indexOfDifference()', () => {
    expect(Strings.indexOfDifference('', '')).toEqual(-1);
    expect(Strings.indexOfDifference('', 'a')).toEqual(0);
    expect(Strings.indexOfDifference('a', '')).toEqual(0);
    expect(Strings.indexOfDifference('Lorem', 'Lor')).toEqual(3);
    expect(Strings.indexOfDifference('Lor', 'Lorem')).toEqual(3);
    expect(Strings.indexOfDifference('Lor', 'asc')).toEqual(0);
  });

  test('Strings.indexOfIgnoreCase()', () => {
    expect(Strings.indexOfIgnoreCase('', '')).toEqual(0);
    expect(Strings.indexOfIgnoreCase('abc', '')).toEqual(0);
    expect(Strings.indexOfIgnoreCase('', 'abc')).toEqual(-1);
    expect(Strings.indexOfIgnoreCase('Lorem', 'EM')).toEqual(3);
    expect(Strings.indexOfIgnoreCase('Lorem', 'em')).toEqual(3);
    expect(Strings.indexOfIgnoreCase('abcde', 'cde')).toEqual(2);
  });

  test('Strings.isAlpha()', () => {
    expect(Strings.isAlpha('')).toEqual(false);
    expect(Strings.isAlpha('0')).toEqual(false);
    expect(Strings.isAlpha('-')).toEqual(false);
    expect(Strings.isAlpha('.')).toEqual(false);
    expect(Strings.isAlpha('}')).toEqual(false);
    expect(Strings.isAlpha('\\')).toEqual(false);
    expect(Strings.isAlpha('a')).toEqual(true);
    expect(Strings.isAlpha('B')).toEqual(true);
    expect(Strings.isAlpha('f')).toEqual(true);
    expect(Strings.isAlpha('Z')).toEqual(true);
    expect(Strings.isAlpha('o')).toEqual(true);
    expect(Strings.isAlpha('abc')).toEqual(true);
    expect(Strings.isAlpha('abcDEF')).toEqual(true);
    expect(Strings.isAlpha('abc DEF')).toEqual(false);
  });

  test('Strings.isAlphanumeric()', () => {
    expect(Strings.isAlphanumeric('')).toEqual(false);
    expect(Strings.isAlphanumeric('ab')).toEqual(true);
    expect(Strings.isAlphanumeric('abc123')).toEqual(true);
    expect(Strings.isAlphanumeric('abc 123')).toEqual(false);
    expect(Strings.isAlphanumeric('0')).toEqual(true);
    expect(Strings.isAlphanumeric('1')).toEqual(true);
    expect(Strings.isAlphanumeric('2')).toEqual(true);
    expect(Strings.isAlphanumeric('3')).toEqual(true);
    expect(Strings.isAlphanumeric('4')).toEqual(true);
    expect(Strings.isAlphanumeric('5')).toEqual(true);
    expect(Strings.isAlphanumeric('6')).toEqual(true);
    expect(Strings.isAlphanumeric('7')).toEqual(true);
    expect(Strings.isAlphanumeric('8')).toEqual(true);
    expect(Strings.isAlphanumeric('9')).toEqual(true);
    expect(Strings.isAlphanumeric('-')).toEqual(false);
    expect(Strings.isAlphanumeric('.')).toEqual(false);
    expect(Strings.isAlphanumeric('}')).toEqual(false);
    expect(Strings.isAlphanumeric('\\')).toEqual(false);
    expect(Strings.isAlphanumeric('a')).toEqual(true);
    expect(Strings.isAlphanumeric('B')).toEqual(true);
    expect(Strings.isAlphanumeric('f')).toEqual(true);
    expect(Strings.isAlphanumeric('Z')).toEqual(true);
    expect(Strings.isAlphanumeric('o')).toEqual(true);
    expect(Strings.isAlphanumeric('abcDEF123')).toEqual(true);
    expect(Strings.isAlphanumeric('0123')).toEqual(true);
  });

  test('Strings.isAnyBlank()', () => {
    expect(Strings.isAnyBlank()).toEqual(false);
    expect(Strings.isAnyBlank('')).toEqual(true);
    expect(Strings.isAnyBlank('a')).toEqual(false);
    expect(Strings.isAnyBlank('a', '', 'b')).toEqual(true);
  });

  test('Strings.isAllBlank()', () => {
    expect(Strings.isAllBlank('')).toEqual(true);
    expect(Strings.isAllBlank(' ')).toEqual(true);
    expect(Strings.isAllBlank('\n')).toEqual(true);
    expect(Strings.isAllBlank('\t')).toEqual(true);
    expect(Strings.isAllBlank('\r')).toEqual(true);
    expect(Strings.isAllBlank('\f')).toEqual(true);
    expect(Strings.isAllBlank('\f\n')).toEqual(true);
    expect(Strings.isAllBlank('\f\r')).toEqual(true);
    expect(Strings.isAllBlank('\t\r\f')).toEqual(true);
    expect(Strings.isAllBlank('\f\t\r\n\n')).toEqual(true);
    expect(Strings.isAllBlank('\f\t\r\n\na')).toEqual(false);
  });

  test('Strings.isBinary()', () => {
    expect(Strings.isBinary('')).toEqual(true);
    expect(Strings.isBinary(' ')).toEqual(true);
    expect(Strings.isBinary('☻')).toEqual(false);
    expect(Strings.isBinary('binary')).toEqual(true);
  });

  test('Strings.isBlank()', () => {
    expect(Strings.isBlank('')).toEqual(true);
    expect(Strings.isBlank(' ')).toEqual(false);
    expect(Strings.isBlank(' d')).toEqual(false);
  });

  test('Strings.isEmpty()', () => {
    expect(Strings.isEmpty('')).toEqual(true);
    expect(Strings.isEmpty(' ')).toEqual(false);
    expect(Strings.isEmpty(' d')).toEqual(false);
  });

  test('Strings.isLowerCase()', () => {
    expect(Strings.isLowerCase('')).toEqual(true);
    expect(Strings.isLowerCase(' ')).toEqual(true);
    expect(Strings.isLowerCase('\n\t%%%?')).toEqual(true);
    expect(Strings.isLowerCase('a')).toEqual(true);
    expect(Strings.isLowerCase('aA')).toEqual(false);
    expect(Strings.isLowerCase('nnn')).toEqual(true);
    expect(Strings.isLowerCase('nnnn')).toEqual(true);
    expect(Strings.isLowerCase('Sdd')).toEqual(false);
    expect(Strings.isLowerCase('123')).toEqual(true);
    expect(Strings.isLowerCase('123 abc de\nfg')).toEqual(true);
    expect(Strings.isLowerCase('123 abc de\nfG')).toEqual(false);
  });

  test('Strings.isMixedCase()', () => {
    expect(Strings.isMixedCase('')).toEqual(false);
    expect(Strings.isMixedCase(' ')).toEqual(false);
    expect(Strings.isMixedCase('abc')).toEqual(false);
    expect(Strings.isMixedCase('Abc')).toEqual(true);
    expect(Strings.isMixedCase('ab Cd ef')).toEqual(true);
    expect(Strings.isMixedCase('ы ü Б Ö')).toEqual(true);
  });

  test('Strings.isNilOrEmpty()', () => {
    expect(Strings.isNilOrEmpty()).toEqual(true);
    expect(Strings.isNilOrEmpty('')).toEqual(true);
    expect(Strings.isNilOrEmpty(' ')).toEqual(false);
    expect(Strings.isNilOrEmpty(null)).toEqual(true);
    expect(Strings.isNilOrEmpty(undefined)).toEqual(true);
    expect(Strings.isNilOrEmpty('undefined')).toEqual(false);
  });

  test('Strings.isNilOrWhitespace()', () => {
    expect(Strings.isNilOrWhitespace('')).toEqual(true);
    expect(Strings.isNilOrWhitespace(' ')).toEqual(true);
    expect(Strings.isNilOrWhitespace(null)).toEqual(true);
    expect(Strings.isNilOrWhitespace(undefined)).toEqual(true);
    expect(Strings.isNilOrWhitespace('undefined')).toEqual(false);
    expect(Strings.isNilOrWhitespace('\n')).toEqual(true);
    expect(Strings.isNilOrWhitespace('\t')).toEqual(true);
    expect(Strings.isNilOrWhitespace('\r')).toEqual(true);
    expect(Strings.isNilOrWhitespace('\f')).toEqual(true);
    expect(Strings.isNilOrWhitespace('\f\r\n')).toEqual(true);
    expect(Strings.isNilOrWhitespace('\f\n\nr')).toEqual(false);
  });

  test('Strings.isNotEmpty()', () => {
    expect(Strings.isNotEmpty('')).toEqual(false);
    expect(Strings.isNotEmpty(' ')).toEqual(true);
    expect(Strings.isNotEmpty(' d')).toEqual(true);
  });

  test('Strings.isNullOrEmpty()', () => {
    expect(Strings.isNullOrEmpty('')).toEqual(true);
    expect(Strings.isNullOrEmpty(' ')).toEqual(false);
    expect(Strings.isNullOrEmpty(null)).toEqual(true);
    expect(Strings.isNullOrEmpty('undefined')).toEqual(false);
  });

  test('Strings.isNullOrWhitespace()', () => {
    expect(Strings.isNullOrWhitespace('')).toEqual(true);
    expect(Strings.isNullOrWhitespace(' ')).toEqual(true);
    expect(Strings.isNullOrWhitespace(null)).toEqual(true);
    expect(Strings.isNullOrWhitespace('undefined')).toEqual(false);
  });

  test('Strings.isNumeric()', () => {
    expect(Strings.isNumeric('')).toEqual(false);
    expect(Strings.isNumeric(' ')).toEqual(false);
    expect(Strings.isNumeric('undefined')).toEqual(false);
    expect(Strings.isNumeric('1e3')).toEqual(true);
    expect(Strings.isNumeric('-0')).toEqual(true);
    expect(Strings.isNumeric('123')).toEqual(true);
    expect(Strings.isNumeric('-56')).toEqual(true);
    expect(Strings.isNumeric('0')).toEqual(true);
    expect(Strings.isNumeric('0x12121')).toEqual(true);
    expect(Strings.isNumeric('0b10011101')).toEqual(true);
    expect(Strings.isNumeric('\u0663\u0664\u0665\u0666')).toEqual(true);
    expect(Strings.isNumeric('\u0968\u0969')).toEqual(true);
    expect(Strings.isNumeric('\u2171')).toEqual(true);
  });

  test('Strings.isString()', () => {
    expect(Strings.isString('')).toEqual(true);
    expect(Strings.isString(' ')).toEqual(true);
    expect(Strings.isString(null)).toEqual(false);
    expect(Strings.isString('undefined')).toEqual(true);
    expect(Strings.isString()).toEqual(false);
  });

  test('Strings.isStringObject()', () => {
    expect(Strings.isStringObject('')).toEqual(false);
    expect(Strings.isStringObject(' ')).toEqual(false);
    expect(Strings.isStringObject(null)).toEqual(false);
    expect(Strings.isStringObject('undefined')).toEqual(false);
    expect(Strings.isStringObject()).toEqual(false);
    // eslint-disable-next-line no-new-wrappers
    expect(Strings.isStringObject(new String())).toEqual(true);
    // eslint-disable-next-line no-new-wrappers
    expect(Strings.isStringObject(new String('abc'))).toEqual(true);
  });

  test('Strings.isSurrogatePair()', () => {
    expect(Strings.isSurrogatePair('🐑🐑🐑😀💖', 0)).toEqual(true);
    expect(Strings.isSurrogatePair('😀💖', 0)).toEqual(true);
    expect(Strings.isSurrogatePair('', 0)).toEqual(false);
    expect(Strings.isSurrogatePair('abc', 1)).toEqual(false);
    expect(Strings.isSurrogatePair('', -1)).toEqual(false);
    expect(Strings.isSurrogatePair('', 2.4)).toEqual(false);
    expect(Strings.isSurrogatePair('😀😀💖', 4)).toEqual(true);
  });

  test('Strings.isUpperCase()', () => {
    expect(Strings.isUpperCase('')).toEqual(true);
    expect(Strings.isUpperCase('\n\t%%%?')).toEqual(true);
    expect(Strings.isUpperCase('A')).toEqual(true);
    expect(Strings.isUpperCase('As')).toEqual(false);
    expect(Strings.isUpperCase('AB')).toEqual(true);
    expect(Strings.isUpperCase('123')).toEqual(true);
    expect(Strings.isUpperCase('ABCD')).toEqual(true);
    expect(Strings.isUpperCase('ABCs')).toEqual(false);
    expect(Strings.isUpperCase('123 ABC DE\nFG')).toEqual(true);
    expect(Strings.isUpperCase('123 ABC DE\nFg')).toEqual(false);
  });

  test('Strings.isWhitespace()', () => {
    expect(Strings.isWhitespace('')).toEqual(true);
    expect(Strings.isWhitespace(' ')).toEqual(true);
    expect(Strings.isWhitespace('\n')).toEqual(true);
    expect(Strings.isWhitespace('\t')).toEqual(true);
    expect(Strings.isWhitespace('\r')).toEqual(true);
    expect(Strings.isWhitespace('\f')).toEqual(true);
    expect(Strings.isWhitespace('\f\n')).toEqual(true);
    expect(Strings.isWhitespace('\f\r')).toEqual(true);
    expect(Strings.isWhitespace('\t\r\f')).toEqual(true);
    expect(Strings.isWhitespace('\f\t\r\n\n')).toEqual(true);
    expect(Strings.isWhitespace('\f\t\r\n\na')).toEqual(false);
  });

  test('Strings.join()', () => {
    expect(Strings.join('')).toEqual('');
    expect(Strings.join('', '')).toEqual('');
    expect(Strings.join('abc', '')).toEqual('abc');
    expect(Strings.join('Lorem')).toEqual('Lorem');
    expect(Strings.join('Lorem', ' ', 'ipsum', ' ', 'dolor')).toEqual(
        'Lorem ipsum dolor');
    expect(Strings.join(
        'Crux', ' ', 'sacra', ' ', 'sit', ' ', 'mihi', ' ', 'lux')).toEqual(
        'Crux sacra sit mihi lux');
  });

  test('Strings.lastIndexOf()', () => {
    expect(Strings.lastIndexOf('', '')).toEqual(0);
    expect(Strings.lastIndexOf('abc', '')).toEqual(0);
    expect(Strings.lastIndexOf('', 'abc')).toEqual(-1);
    expect(Strings.lastIndexOf('d', 'd')).toEqual(0);
    expect(Strings.lastIndexOf('d', 'da')).toEqual(-1);
    expect(Strings.lastIndexOf('Abcddemmaxdemala', 'dem')).toEqual(10);
  });

  test('Strings.lastIndexOfIgnoreCase()', () => {
    expect(Strings.lastIndexOfIgnoreCase('', '')).toEqual(0);
    expect(Strings.lastIndexOfIgnoreCase('d', 'd')).toEqual(0);
    expect(Strings.lastIndexOfIgnoreCase('d', 'da')).toEqual(-1);
    expect(Strings.lastIndexOfIgnoreCase(
        'Abcddemmaxdemala', 'dEM')).toEqual(10);
  });

  test('Strings.left()', () => {
    expect(Strings.left('', 1)).toEqual('');
    expect(Strings.left('Alphabet', 5)).toEqual('Alpha');
    expect(Strings.left('Johndoe', 4)).toEqual('John');
  });

  test('Strings.longest()', () => {
    expect(Strings.longest()).toEqual('');
    expect(Strings.longest('')).toEqual('');
    expect(Strings.longest('abc', 'abc')).toEqual('abc');
    expect(Strings.longest('Alphabet', 'Alpha')).toEqual('Alphabet');
    expect(Strings.longest('Johndoe', 'John')).toEqual('Johndoe');
    expect(Strings.longest(
        'Johndoe', 'John', 'jsdcdscsdcd')).toEqual('jsdcdscsdcd');
  });

  test('Strings.lowerCase()', () => {
    expect(Strings.lowerCase('JOHNDOE')).toEqual('johndoe');
    expect(Strings.lowerCase('')).toEqual('');
    expect(Strings.lowerCase('123')).toEqual('123');
    expect(Strings.lowerCase('A123BC')).toEqual('a123bc');
  });

  test('Strings.normalize()', () => {
    expect(Strings.normalize('')).toEqual(Strings.EMPTY);
    expect(Strings.normalize('  Bye    -  bye   ! ')).toEqual('Bye - bye !');
    expect(Strings.normalize(' ')).toEqual(Strings.EMPTY);
    expect(Strings.normalize('   abc  de   f  ')).toEqual('abc de f');
    expect(Strings.normalize('   abc  de   f')).toEqual('abc de f');
    expect(Strings.normalize(' abc de f ')).toEqual('abc de f');
    expect(Strings.normalize('abc de f')).toEqual('abc de f');
    expect(Strings.normalize(
        'Abcddemmaxdemala   \n\r\t\f')).toEqual('Abcddemmaxdemala');
  });

  test('Strings.prepend()', () => {
    expect(Strings.prepend('', 'abc')).toEqual('abc');
    expect(Strings.prepend('a', 'bc')).toEqual('bca');
    expect(Strings.prepend('a', '')).toEqual('a');
  });

  test('Strings.prependIfMissing()', () => {
    expect(Strings.prependIfMissing('', 'abc')).toEqual('abc');
    expect(Strings.prependIfMissing('a', 'bc')).toEqual('bca');
    expect(Strings.prependIfMissing('a', '')).toEqual('a');
    expect(Strings.prependIfMissing('abcde', 'ab')).toEqual('abcde');
    expect(Strings.prependIfMissing('ABcde', 'ab', true)).toEqual('ABcde');
  });

  test('Strings.prependIfMissingIgnoreCase()', () => {
    expect(Strings.prependIfMissingIgnoreCase('', 'abc')).toEqual('abc');
    expect(Strings.prependIfMissingIgnoreCase('a', 'bc')).toEqual('bca');
    expect(Strings.prependIfMissingIgnoreCase('a', '')).toEqual('a');
    expect(Strings.prependIfMissingIgnoreCase('abcde', 'ab')).toEqual('abcde');
    expect(Strings.prependIfMissingIgnoreCase('ABcde', 'ab')).toEqual('ABcde');
    expect(Strings.prependIfMissingIgnoreCase('a', 'A')).toEqual('a');
  });

  test('Strings.remove()', () => {
    expect(Strings.remove('abcdefg', 'abc')).toEqual('defg');
    expect(Strings.remove('John Jack Doe', 'Jack ')).toEqual('John Doe');
    expect(Strings.remove('', 'abc')).toEqual('');
    expect(Strings.remove('', '')).toEqual('');
    expect(Strings.remove('  ', ' ')).toEqual('');
    expect(Strings.remove('abc', '')).toEqual('abc');
    expect(Strings.remove('abc', '')).toEqual('abc');
    expect(Strings.remove('abc', 'a')).toEqual('bc');
    expect(Strings.remove('Heroes oe oe oe', 'oe')).toEqual('Hers   ');
  });

  test('Strings.removeEnd()', () => {
    expect(Strings.removeEnd('', 'abc')).toEqual('');
    expect(Strings.removeEnd('abc', '')).toEqual('abc');
    expect(Strings.removeEnd('abcdefgh', 'fgh')).toEqual('abcde');
  });

  test('Strings.removeEndIgnoreCase()', () => {
    expect(Strings.removeEndIgnoreCase('', 'abc')).toEqual('');
    expect(Strings.removeEndIgnoreCase('abc', '')).toEqual('abc');
    expect(Strings.removeEndIgnoreCase('abcdefgh', 'fgh')).toEqual('abcde');
    expect(Strings.removeEndIgnoreCase('abcdefgh', 'FGh')).toEqual('abcde');
  });

  test('Strings.removeWhitespace()', () => {
    expect(Strings.removeWhitespace(
        'Abcddemmaxdemala   \n\r\t\f')).toEqual('Abcddemmaxdemala');
    expect(Strings.removeWhitespace(
        'John Doe\njohn@email.com\t')).toEqual('JohnDoejohn@email.com');
    expect(Strings.removeWhitespace('')).toEqual('');
    expect(Strings.removeWhitespace(' ')).toEqual('');
  });

  test('Strings.repeat()', () => {
    expect(Strings.repeat(' ', 1)).toEqual(' ');
    expect(Strings.repeat(' ', 2)).toEqual('  ');
    expect(Strings.repeat(' ', -1)).toEqual('');
    expect(Strings.repeat(' ', 1.33)).toEqual('');
    expect(Strings.repeat(' ', 3)).toEqual('   ');
    expect(Strings.repeat('+', 10)).toEqual('++++++++++');
  });

  test('Strings.startsWith()', () => {
    expect(Strings.startsWith('', '')).toEqual(true);
    expect(Strings.startsWith('abc', 'ab')).toEqual(true);
    expect(Strings.startsWith('abc', 'A', true)).toEqual(true);
    expect(Strings.startsWith('abc', 'b')).toEqual(false);
    expect(Strings.startsWith('abc', 'C', true)).toEqual(false);
  });

  test('Strings.startsWithAny()', () => {
    expect(Strings.startsWithAny('')).toEqual(false);
    expect(Strings.startsWithAny('', '')).toEqual(true);
    expect(Strings.startsWithAny('abc', 'ab')).toEqual(true);
    expect(Strings.startsWithAny('abc', 'A')).toEqual(false);
    expect(Strings.startsWithAny('abc', 'b')).toEqual(false);
    expect(Strings.startsWithAny('abc', 'C')).toEqual(false);
    expect(Strings.startsWithAny('abc', 'C', 'z', 'a')).toEqual(true);
    expect(Strings.startsWithAny('abc def', ...['C', 'z', 'a'])).toEqual(true);
  });

  test('Strings.strip()', () => {
    expect(Strings.strip('')).toEqual('');
    expect(Strings.strip(' ')).toEqual('');
    expect(Strings.strip('  John ')).toEqual('John');
    expect(Strings.strip('\nJohn Doe\t\r\f')).toEqual('John Doe');
  });

  test('Strings.toCamelCase()', () => {
    expect(Strings.toCamelCase('')).toEqual('');
    expect(Strings.toCamelCase(' ')).toEqual('');
    expect(Strings.toCamelCase('  ')).toEqual('');
    expect(Strings.toCamelCase('\t\t\r\n\f')).toEqual('');
    expect(Strings.toCamelCase('\tabc\n\n\t')).toEqual('abc');
    expect(Strings.toCamelCase('a')).toEqual('a');
    expect(Strings.toCamelCase('A')).toEqual('a');
    expect(Strings.toCamelCase('\nA\t')).toEqual('a');
    expect(Strings.toCamelCase('  abc  de  ')).toEqual('abcDe');
    expect(Strings.toCamelCase('  abc de ')).toEqual('abcDe');
    expect(Strings.toCamelCase(' abc  de  ')).toEqual('abcDe');
    expect(Strings.toCamelCase(' abc  de ')).toEqual('abcDe');
    expect(Strings.toCamelCase('\n\t\r\fabc\n\t  de\n ')).toEqual('abcDe');
    expect(Strings.toCamelCase('Abc')).toEqual('abc');
    expect(Strings.toCamelCase('Abc dEF')).toEqual('abcDEF');
  });

  test('Strings.toCharArray()', () => {
    expect(Strings.toCharArray('')).toEqual([]);
    expect(Strings.toCharArray('I 💖 U')).toEqual(['I', ' ', '💖', ' ', 'U']);
    expect(Strings.toCharArray('🐑🐑🐑')).toEqual(['🐑', '🐑', '🐑']);
    expect(Strings.toCharArray('abc')).toEqual(['a', 'b', 'c']);
  });

  test('Strings.toKebabCase()', () => {
    expect(Strings.toKebabCase('')).toEqual('');
    expect(Strings.toKebabCase(' ')).toEqual('');
    expect(Strings.toKebabCase('  ')).toEqual('');
    expect(Strings.toKebabCase('\t\t\r\n\f')).toEqual('');
    expect(Strings.toKebabCase('\tabc\n\n\t')).toEqual('abc');
    expect(Strings.toKebabCase('a')).toEqual('a');
    expect(Strings.toKebabCase('A')).toEqual('a');
    expect(Strings.toKebabCase('\nA\t')).toEqual('a');
    expect(Strings.toKebabCase('  abc  de  ')).toEqual('abc-de');
    expect(Strings.toKebabCase('  abc de ')).toEqual('abc-de');
    expect(Strings.toKebabCase(' abc  de  ')).toEqual('abc-de');
    expect(Strings.toKebabCase(' abc  de ')).toEqual('abc-de');
    expect(Strings.toKebabCase('\n\t\r\fabc\n\t  de\n ')).toEqual('abc-de');
    expect(Strings.toKebabCase('Abc')).toEqual('abc');
    expect(Strings.toKebabCase('Abc dEF')).toEqual('abc-def');
  });

  test('Strings.toPascalCase()', () => {
    expect(Strings.toPascalCase('')).toEqual('');
    expect(Strings.toPascalCase(' ')).toEqual('');
    expect(Strings.toPascalCase('  ')).toEqual('');
    expect(Strings.toPascalCase('\t\t\r\n\f')).toEqual('');
    expect(Strings.toPascalCase('\tabc\n\n\t')).toEqual('Abc');
    expect(Strings.toPascalCase('a')).toEqual('A');
    expect(Strings.toPascalCase('A')).toEqual('A');
    expect(Strings.toPascalCase('\nA\t')).toEqual('A');
    expect(Strings.toPascalCase('  abc  de  ')).toEqual('AbcDe');
    expect(Strings.toPascalCase('  abc de ')).toEqual('AbcDe');
    expect(Strings.toPascalCase(' abc  de  ')).toEqual('AbcDe');
    expect(Strings.toPascalCase(' abc  de ')).toEqual('AbcDe');
    expect(Strings.toPascalCase('\n\t\r\fabc\n\t  de\n ')).toEqual('AbcDe');
    expect(Strings.toPascalCase('Abc')).toEqual('Abc');
    expect(Strings.toPascalCase('Abc dEF')).toEqual('AbcDEF');
    expect(Strings.toPascalCase('\r\t\f\n\nAbc \n\tdEf\t\f')).toEqual('AbcDEf');
  });

  test('Strings.toTitleCase()', () => {
    expect(Strings.toTitleCase('')).toEqual('');
    expect(Strings.toTitleCase('jOhn')).toEqual('John');
    expect(Strings.toTitleCase('iNdEpendENCe')).toEqual('Independence');
    expect(Strings.toTitleCase(
        'lOREM iPsum dOlOR sIT')).toEqual('Lorem Ipsum Dolor Sit');
    expect(Strings.toTitleCase(
        'lOREM  iPsum\tdOlOR\nsIT')).toEqual('Lorem  Ipsum\tDolor\nSit');
    expect(Strings.toTitleCase(
        '\t\nlOREM  iPsum\tdOlOR\nsIT')).toEqual(
        '\t\nLorem  Ipsum\tDolor\nSit');
    expect(Strings.toTitleCase('\nabC')).toEqual('\nAbc');
    expect(Strings.toTitleCase('ab\t\f\t\nc')).toEqual('Ab\t\f\t\nC');
  });

  test('Strings.trim()', () => {
    expect(Strings.trim('')).toEqual('');
    expect(Strings.trim(' ')).toEqual('');
    expect(Strings.trim('  ')).toEqual('');
    expect(Strings.trim('\t\t\r\n\f')).toEqual('');
    expect(Strings.trim('\tabc\n\n\t')).toEqual('abc');
    expect(Strings.trim('  abc  de  ')).toEqual('abc  de');
    expect(Strings.trim('  abc de ')).toEqual('abc de');
    expect(Strings.trim(' abc  de  ')).toEqual('abc  de');
    expect(Strings.trim(' abc  de ')).toEqual('abc  de');
  });

  test('Strings.upperFirst()', () => {
    expect(Strings.upperFirst('')).toEqual('');
    expect(Strings.upperFirst('  ')).toEqual('  ');
    expect(Strings.upperFirst('lorem ')).toEqual('Lorem ');
    expect(Strings.upperFirst('jOHN DOE')).toEqual('JOHN DOE');
    expect(Strings.upperFirst('jOHN DOE', true)).toEqual('John doe');
    expect(Strings.upperFirst('lorem ipsum')).toEqual('Lorem ipsum');
    expect(Strings.upperFirst('cAT')).toEqual('CAT');
    expect(Strings.upperFirst('cAT', true)).toEqual('Cat');
    expect(Strings.upperFirst(' cAT', true)).toEqual(' cat');
  });
});
