import { Comparator } from '../Comparator';

export abstract class Numbers extends Comparator {
  static override compare(a: number, b: number): number {
    return Comparator.compare(a, b);
  }

  public static isInteger(value?: any): value is number {
    return Numbers.isNumber(value) && Number.isSafeInteger(value);
  }

  public static isNaturalNumber(value?: any): value is number {
    return Numbers.isInteger(value) && value >= 0;
  }

  public static isNumber(value?: any): value is number {
    return typeof value === 'number' && Number.isFinite(value);
  }
}
