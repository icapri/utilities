import {Arrays} from '../arrays/Arrays';
import {Dates} from '../dates/Dates';
import {Maps} from '../maps/Maps';
import {Numbers} from '../numbers/Numbers';
import {Objects} from './Objects';
import {Sets} from '../sets/Sets';
import {Strings} from '../strings/Strings';
import {Utils} from '../Utils';
import {Chars} from '../chars/Chars';

/**
 * Defines a JSON serializer.
 *
 * @since v1.5.5
 */
export abstract class JsonSerializer {
  /**
   * Contains the current character of the json string being deserialized.
   *
   * @since v1.5.5
   */
  private static __char: string;

  /**
   * Contains the index of the current character of the json string being
   * deserialized.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __charIndex: number;

  /**
   * Contains the escape characters to be replaced during deserialization
   * of the json string.
   *
   * @since v1.5.5
   */
  private static readonly __escapeesMap = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    'b': 'b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t',
  };

  /**
   * Contains a json deserialization reviver.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __reviver: ((this: any, key: string, value: any) => any);

  /**
   * Contains the json string to be deserialized.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __json: string;

  /**
   * @constructor
   *
   * @private
   *
   * @since v1.5.5
   */
  constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Deserializes the specified JSON string.
   *
   * **Usage Examples:**
   * ```typescript
   * Objects.deserialize("{}"); // {}
   * Objects.deserialize('{"a":true}'); // {a: true}
   * Objects.deserialize('{"a":2,"b":"abc"}'); // {a: 2, b: "abc"}
   * ```
   *
   * @param {String} json Contains a JSON string.
   * @param {Function} reviver Contains a JSON reviver function used for
   * transforming the result.
   * @return {T} the JavaScript object corresponding to the specified JSON.
   *
   * @since v1.5.5
   */
  public static deserialize<T>(
      json: string,
      reviver?: ((this: any, key: string, value: any) => any),
  ): T {
    if (window && Objects.hasProperty(window, 'JSON') &&
      Utils.isFunction(JSON.parse)) {
      return JSON.parse(json, reviver);
    }

    JsonSerializer.__json = json;
    JsonSerializer.__charIndex = 0;
    JsonSerializer.__char = ' ';
    const result = JsonSerializer.__deserializedValue;
    JsonSerializer.__skipWhitespace();
    if (JsonSerializer.__char) {
      throw new SyntaxError('Syntax error.');
    }

    if (!Utils.isFunction(reviver)) {
      return result as unknown as T;
    }

    JsonSerializer.__reviver = reviver;
    return JsonSerializer.__iter({'': result}, '');
  }

  /**
   * Converts the specified JavaScript value to a JSON string.
   *
   * **Usage Examples:**
   * ```typescript
   * JsonSerializer.serialize({}); // "{}"
   * JsonSerializer.serialize({a: true}); // "{"a":true}"
   * JsonSerializer.serialize({a: 2, b: "abc"}); // "{"a":2,"b":"abc"}"
   * ```
   *
   * @param {*} value Contains the JavaScript value to be serialized.
   * @return {String} a JSON string.
   *
   * @since v1.5.5
   */
  public static serialize<T>(value: T): string {
    if (window && Objects.hasProperty(window, 'JSON') &&
      Utils.isFunction(JSON.stringify)) {
      let cache = new WeakSet<object>();
      const json = JSON.stringify(value, (_, v) => Objects.isObject(v) ?
          cache.has(v) ?
            undefined : // circular object reference detected
            cache.add(v) && v : // Store v in our collection
          v,
      );
      cache = null as unknown as WeakSet<object>;
      return json;
    }

    if (Utils.isUndefined(value) || Utils.isFunction(value)) {
      return undefined as any;
    }

    let s = Strings.EMPTY;
    // unwrap the value in case it is "stuck" inside a `String`
    // or `Number` instance
    if (Numbers.isNumberObject(value)) {
      const intValue = value.valueOf();
      value = Number.isNaN(intValue) ?
        null as any : intValue as any;
    }

    if (Strings.isStringObject(value)) {
      value = value.valueOf() as any;
    }

    if (Arrays.isArray(value)) {
      s += '['.concat(
          value
              .map((v) => `${JsonSerializer.serialize(v)}`)
              .join(',').concat(']'));
    } else if (Dates.isDate(value)) {
      s += Dates.isValid(value) ? `"${value.toISOString()}"` : 'null';
    } else if (Utils.isRegExp(value) ||
      Sets.isSet(value) ||
      Sets.isWeakSet(value) ||
      Maps.isMap(value) ||
      Maps.isWeakMap(value)) {
      s += '{}';
    } else if (Objects.isObject(value)) {
      s += '{'.concat(Object
          .entries(value)
          .filter(([_, v]) => Utils.isDefined(v))
          .map(([k, v]) => `"${k}":${JsonSerializer.serialize(v)}`)
          .join(',')).concat('}');
    } else if (Strings.isString(value)) {
      s += `"${value}"`;
    } else {
      s += `${value}`;
    }

    return s;
  }

  /**
   * Deserializes a JSON array.
   *
   * @return {Array} a JavaScript array.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __deserializeArray(): any[] {
    // deserialize an array value
    const array: any[] = [];
    if (JsonSerializer.__char === '[') {
      JsonSerializer.__next('[');
      JsonSerializer.__skipWhitespace();
      // @ts-ignore
      if (JsonSerializer.__char === ']') {
        JsonSerializer.__next(']');
        return array; // empty array
      }
      while (JsonSerializer.__char) {
        array.push(JsonSerializer.__deserializedValue);
        JsonSerializer.__skipWhitespace();
        // @ts-ignore
        if (JsonSerializer.__char === ']') {
          JsonSerializer.__next(']');
          return array;
        }
        JsonSerializer.__next(',');
        JsonSerializer.__skipWhitespace();
      }
    }
    throw new SyntaxError('Cannot deserialize JSON array.');
  }

  /**
   * Gets the deserialized value from the JSON string.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static get __deserializedValue():
   string | number | boolean | Record<string, any> | null {
    JsonSerializer.__skipWhitespace();
    switch (JsonSerializer.__char) {
      case '{':
        return JsonSerializer.__deserializeObject();
      case '[':
        return JsonSerializer.__deserializeArray();
      case '"':
        return JsonSerializer.__deserializeString();
      case '-':
        return JsonSerializer.__deserializeNumber();
      default:
        return JsonSerializer.__char >= '0' &&
         JsonSerializer.__char <= '9' ?
         JsonSerializer.__deserializeNumber() :
          JsonSerializer.__deserializeBoolAndNull();
    }
  }

  /**
   * Deserializes a JSON `true`, `false` or `null` value.
   *
   * @return {Boolean} `true`, `false` or `null`.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __deserializeBoolAndNull(): boolean | null {
    switch (JsonSerializer.__char) {
      case 't':
        JsonSerializer.__next('t');
        JsonSerializer.__next('r');
        JsonSerializer.__next('u');
        JsonSerializer.__next('e');
        return true;
      case 'f':
        JsonSerializer.__next('f');
        JsonSerializer.__next('a');
        JsonSerializer.__next('l');
        JsonSerializer.__next('s');
        JsonSerializer.__next('e');
        return false;
      case 'n':
        JsonSerializer.__next('n');
        JsonSerializer.__next('u');
        JsonSerializer.__next('l');
        JsonSerializer.__next('l');
        return null;
    }

    throw new SyntaxError('Unexpected character \'' +
      JsonSerializer.__char + '\'');
  }

  /**
   * Deserializes a JSON number value.
   *
   * @return {Number} a JavaScript number value.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __deserializeNumber(): number {
    let string = '';
    if (JsonSerializer.__char === '-') {
      string = '-';
      JsonSerializer.__next('-');
    }
    while (JsonSerializer.__char >= '0' && JsonSerializer.__char <= '9') {
      string += JsonSerializer.__char;
      JsonSerializer.__next();
    }
    if (JsonSerializer.__char === '.') {
      string += '.';
      while (JsonSerializer.__next() && JsonSerializer.__char >= '0' &&
        JsonSerializer.__char <= '9') {
        string += JsonSerializer.__char;
      }
    }
    if (JsonSerializer.__char === 'e' || JsonSerializer.__char === 'E') {
      string += JsonSerializer.__char;
      JsonSerializer.__next();
    }
    if (JsonSerializer.__char === '-' || JsonSerializer.__char === '+') {
      string += JsonSerializer.__char;
      JsonSerializer.__next();
    }
    while (JsonSerializer.__char >= '0' && JsonSerializer.__char <= '9') {
      string += JsonSerializer.__char;
      JsonSerializer.__next();
    }
    const number: number = +string;
    if (Number.isNaN(number)) {
      throw new SyntaxError(`Cannot deserialize number '${string}'`);
    } else {
      return number;
    }
  }

  /**
   * Deserializes a JSON object.
   *
   * @return {Object} a JavaScript object.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __deserializeObject(): Record<string, any> {
    let key: any; const object = {};
    if (JsonSerializer.__char === '{') {
      JsonSerializer.__next('{');
      JsonSerializer.__skipWhitespace();
      // @ts-ignore
      if (JsonSerializer.__char === '}') {
        JsonSerializer.__next('}');
        return object; // empty object
      }
      while (JsonSerializer.__char) {
        key = JsonSerializer.__deserializeString();
        JsonSerializer.__skipWhitespace();
        JsonSerializer.__next(':');
        (object as any)[key] = JsonSerializer.__deserializedValue;
        JsonSerializer.__skipWhitespace();
        // @ts-ignore
        if (JsonSerializer.__char === '}') {
          JsonSerializer.__next('}');
          return object;
        }
        JsonSerializer.__next(',');
        JsonSerializer.__skipWhitespace();
      }
    }
    throw new SyntaxError('Cannot deserialize object.');
  }

  /**
   * Deserializes a JSON string.
   *
   * @return {*} either a JavaScript `Date` object if the JSON string
   * represents a date ISO string or a string.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __deserializeString(): string | Date {
    // parse a string value
    let hex, string = '', uffff, iso = '';
    // look for " and \ characters
    if (JsonSerializer.__char === '"') {
      while (JsonSerializer.__next()) {
        if (JsonSerializer.__char === '"') {
          JsonSerializer.__next();
          return string;
        } else if (JsonSerializer.__char === '\\') {
          JsonSerializer.__next();
          if (JsonSerializer.__char === 'u') {
            uffff = 0;
            for (let i = 0; i < 4; i++) {
              hex = parseInt(JsonSerializer.__next(), 16);
              if (!Number.isFinite(hex)) {
                break;
              }
              uffff = uffff * 16 + hex;
            }
            string += String.fromCharCode(uffff);
          } else if (
            typeof JsonSerializer.__escapeesMap[
                JsonSerializer.__char] === 'string') {
            string += JsonSerializer.__escapeesMap[JsonSerializer.__char];
          } else if (Chars.isModernDigit(JsonSerializer.__char)) {
            for (let i = 0; i < 24; i++) {
              iso += JsonSerializer.__next();
            }
            if (Dates.isISOString(iso) && JsonSerializer.__char === '"') {
              return new Date(iso);
            }
          } else {
            break;
          }
        } else {
          string += JsonSerializer.__char;
        }
      }
    }
    throw new SyntaxError('Cannot parse string "' + String(string) + '".');
  }

  /**
   * Walks recursively through the specified holder object.
   *
   * @param {Object} holder Contains the holder object.
   * @param {String} key Contains an object key.
   * @return {*}
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __iter(holder: any, key: string): any {
    let k, v;
    const value = (holder as any)[key];
    if (value && typeof value === 'object') {
      for (k in value) {
        if (Object.hasOwnProperty.call(value, k)) {
          v = JsonSerializer.__iter(value, k);
          if (Utils.isDefined(v)) {
            value[k] = v;
          } else {
            delete value[k];
          }
        }
      }
    }

    return JsonSerializer.__reviver.call(holder, key, value);
  }

  /**
   * Gets the next character of the JSON string.
   *
   * @param {String} char Contains the next character.
   * @return {String} the next character of the JSON string.
   *
   * @private
   *
   * @since v1.5.5
   */
  private static __next(char?: string): string {
    if (char && char !== JsonSerializer.__char) {
      throw new SyntaxError('Expected \'' + char + '\' instead of \'' +
        JsonSerializer.__char + '\'');
    }
    JsonSerializer.__char = JsonSerializer.__json.charAt(
        JsonSerializer.__charIndex,
    ),
    JsonSerializer.__charIndex += 1;
    return JsonSerializer.__char;
  }

  /**
   * Skips the whitespace between non-space characters of the JSON string.
   */
  private static __skipWhitespace() {
    while (JsonSerializer.__char && Chars.isWhitespace(JsonSerializer.__char)) {
      JsonSerializer.__next();
    }
  }
}
