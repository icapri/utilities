export abstract class Arrays {
  static first<T>(value: T[]): T | null;
  static first<T>(value: readonly T[]): T | null;
  static first<T>(value: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(value)) {
      return null;
    }

    return value[0];
  }

  static has<T>(array: T[], item: T): boolean;
  static has<T>(array: readonly T[], item: T): boolean;
  static has<T>(array: T[] | readonly T[], item: T): boolean {
    return array.includes(item);
  }

  static insertAt<T>(array: T[], index: number, item: T): T[];
  static insertAt<T>(array: T[], index: number, item: T[]): T[];
  static insertAt<T>(array: T[], index: number, item: T | T[]): T[] {
    item = Arrays.isArray(item) ? item : [item];
    return [...array.slice(0, index), ...item, ...array.slice(index)]
  }

  // adpoted from https://mariusschulz.com/blog/read-only-array-and-tuple-types-in-typescript
  static intersperse<T>(array: T[], separator: T): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) {
        result.push(separator);
      }
      result.push(array[i]);
    }
    return result;
  }

  static isArray(value?: any | any[]): value is any[] {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  static isEmpty<T>(value: T[]): boolean;
  static isEmpty<T>(value: readonly T[]): boolean;
  static isEmpty<T>(value: T[] | readonly T[]): boolean {
    return !value.length;
  }

  static isReadonlyArray(value?: any | readonly any[]): value is readonly any[] {
    return Arrays.isArray(value);
  }

  static last<T>(value: T[]): T | null
  static last<T>(value: readonly T[]): T | null
  static last<T>(value: T[] | readonly T[]): T | null {
    if (Arrays.isEmpty(value)) {
      return null;
    }
    return value[value.length - 1];
  }

  static removeAll<T>(array: T[], item: T): T[];
  static removeAll<T>(array: readonly T[], item: T): readonly T[];
  static removeAll<T>(array: T[] | readonly T[], item: T): T[] | readonly T[] {
    return array.filter((v) => v !== item);
  }

  static unique<T>(array: T[]): T[];
  static unique<T>(array: readonly T[]): readonly T[];
  static unique<T>(array: T[] | readonly T[]): T[] | readonly T[] {
    return array.filter((item, index, self) => self.indexOf(item) === index);
  }
}
