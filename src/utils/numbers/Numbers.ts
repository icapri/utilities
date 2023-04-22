import { Comparator } from '../../core/comparators';

export abstract class Numbers extends Comparator {
  static override compare(a: number, b: number): number {
    return Comparator.compare(a, b);
  }
}
