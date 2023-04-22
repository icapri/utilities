export abstract class Validator {
  static isInteger(value?: any): value is number {
    return Validator.isNumber(value) && Number.isSafeInteger(value);
  }

  static isNaturalNumber(value?: any): value is number {
    return Validator.isInteger(value) && value >= 0;
  }

  static isNull(value?: any): value is null {
    return value === null;
  }

  static isNullOrUndefined(value?: any): value is null | undefined {
    return Validator.isNull(value) || Validator.isUndefined(value);
  }

  static isNumber(value?: any): value is number {
    return typeof value === 'number' && Number.isFinite(value);
  }

  static isObject(value?: any): value is object {
    return !Validator.isNull(value) && typeof value === 'object';
  }

  static isString(value?: any): value is string {
    return typeof value === 'string';
  }

  static isStringObject(value?: any): value is String {
    const proto = Object.prototype.toString.call(value);
    return proto === '[object String]' && Validator.isObject(value);
  }

  static isDate(value?: any): value is Date {
    return value instanceof Date && !Number.isNaN(value.valueOf());
  }

  static isUndefined(value?: any): value is undefined {
    return value === undefined || typeof value === 'undefined';
  }
}
