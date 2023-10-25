/**
 * @jest-environment jsdom
 */

/* eslint-disable no-new-wrappers */
import {JsonSerializer} from './JsonSerializer';

describe('JsonSerializer', () => {
  test('JsonSerializer.serialize()', () => {
    expect(JsonSerializer.serialize({})).toEqual('{}');
    expect(JsonSerializer.serialize({
      a: 'abc',
      b: false,
      c: null,
      d: undefined,
    })).toEqual(JSON.stringify({
      a: 'abc',
      b: false,
      c: null,
      d: undefined,
    }));
    expect(JsonSerializer.serialize({
      date: new Date('I am not valid!'),
      otp: 12345,
    })).toEqual(JSON.stringify({
      date: new Date('I am not valid!'),
      otp: 12345,
    }));
    expect(JsonSerializer.serialize([]))
        .toEqual(JSON.stringify([]));
    expect(JsonSerializer.serialize(['a', 'b', 'c']))
        .toEqual(JSON.stringify(['a', 'b', 'c']));
    expect(JsonSerializer.serialize(new RegExp(/[a-z]/g)))
        .toEqual(JSON.stringify(new RegExp(/[a-z]/g)));
    expect(JsonSerializer.serialize(new String('abc')))
        .toEqual(JSON.stringify(new String('abc')));
    expect(JsonSerializer.serialize(new Number('abc')))
        .toEqual(JSON.stringify(new Number('abc')));
    expect(JsonSerializer.serialize(new Number(13)))
        .toEqual(JSON.stringify(new Number(13)));
    expect(JsonSerializer.serialize(undefined))
        .toEqual(JSON.stringify(undefined));
    expect(JsonSerializer.serialize(123)).toEqual(JSON.stringify(123));
    expect(JsonSerializer.serialize(() => true)).toEqual(
        JSON.stringify(() => true));
  });

  test('JsonSerializer.deserialize()', () => {
    expect(JsonSerializer.deserialize('"abc def"'))
        .toEqual('abc def');
    expect(JsonSerializer.deserialize('12345.678'))
        .toEqual(12345.678);
    expect(JsonSerializer.deserialize('1e3'))
        .toEqual(1e3);
    expect(JsonSerializer.deserialize('false'))
        .toEqual(false);
    expect(JsonSerializer.deserialize('true'))
        .toEqual(true);
    expect(JsonSerializer.deserialize('{"date": null}'))
        .toEqual({date: null});
    expect(JsonSerializer.deserialize('"2023-11-03T23:00:00.000Z"'))
        .toEqual('2023-11-03T23:00:00.000Z');
    expect(JsonSerializer.deserialize(`
    {
      "date": "2023-11-03T23:00:00.000Z"
    }
    `)).toEqual({
      date: `${'2023-11-03T23:00:00.000Z'}`,
    });
    expect(JsonSerializer.deserialize('"Some\char"')).toEqual('Somechar');
    expect(JsonSerializer.deserialize('"\"')).toEqual('');
  });
});
