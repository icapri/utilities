export abstract class Arrays {
  static first<T>(value: Array<T>): T | null;
  static first<T>(value: ReadonlyArray<T>): T | null;
  static first<T>(value: Array<T> | ReadonlyArray<T>): T | null {
    if (Arrays.isEmpty(value)) {
      return null;
    }

    return value[0];
  }

  static has<T>(array: Array<T>, item: T): boolean;
  static has<T>(array: ReadonlyArray<T>, item: T): boolean;
  static has<T>(array: Array<T> | ReadonlyArray<T>, item: T): boolean {
    return array.includes(item);
  }

  static insertAfter<T>(array: Array<T>, item: T): Array<T>;
  static insertAfter<T>(array: ReadonlyArray<T>, item: T): ReadonlyArray<T>;
  static insertAfter<T>(array: Array<T> | ReadonlyArray<T>, item: T): Array<T> | ReadonlyArray<T> {
    const itemIndex = array.findIndex((value) => value === item);
    if (itemIndex !== -1 && array.length > itemIndex) {
    }

    return array.filter((v) => v !== item);
  }

  static isArray<T>(
    value?: any | Array<T> | ReadonlyArray<T>
  ): value is Array<T> | ReadonlyArray<T> {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  static isEmpty<T>(value: Array<T>): boolean;
  static isEmpty<T>(value: ReadonlyArray<T>): boolean;
  static isEmpty<T>(value: Array<T> | ReadonlyArray<T>): boolean {
    return !value.length;
  }

  static last<T>(value: Array<T>): T | null
  static last<T>(value: ReadonlyArray<T>): T | null
  static last<T>(value: Array<T> | ReadonlyArray<T>): T | null {
    if (Arrays.isEmpty(value)) {
      return null;
    }
    return value[value.length - 1];
  }

  static removeAll<T>(array: Array<T>, item: T): Array<T>;
  static removeAll<T>(array: ReadonlyArray<T>, item: T): ReadonlyArray<T>;
  static removeAll<T>(array: Array<T> | ReadonlyArray<T>, item: T): Array<T> | ReadonlyArray<T> {
    return array.filter((v) => v !== item);
  }

  static unique<T>(array: Array<T>): Array<T>;
  static unique<T>(array: ReadonlyArray<T>): ReadonlyArray<T>;
  static unique<T>(array: Array<T> | ReadonlyArray<T>): Array<T> | ReadonlyArray<T> {
    return array.filter((item, index, self) => self.indexOf(item) === index);
  }
}
