/**
 * Defines a sort comparator.
 */
export abstract class Comparator {
  /**
   * Compares two values with one another.
   *
   * @param a Contains some value.
   * @param b Contains some other value.
   * @returns
   * * `-1` if `a` is smaller than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is greater than `b`.
   */
  protected static compare<T extends string>(a: T, b: T): number
  protected static compare<T extends number>(a: T, b: T): number
  protected static compare<T extends Date>(a: T, b: T): number
  protected static compare<T extends string | number | Date>(a: T, b: T): number {
    if (typeof a === 'string' && typeof b === 'string') {
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
