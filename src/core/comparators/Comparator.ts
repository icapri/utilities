import { Validator } from '../validators';

export abstract class Comparator {
  protected static compare<T extends string>(a: T, b: T): number
  protected static compare<T extends number>(a: T, b: T): number
  protected static compare<T extends Date>(a: T, b: T): number
  protected static compare<T extends string | number | Date>(a: T, b: T): number {
    if (Validator.isString(a) && Validator.isString(b)) {
      return a.localeCompare(b);
    }

    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }

    return 0;
  }
}
