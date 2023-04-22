/**
 * Defines an abstract class with date utilities.
 */
export abstract class Dates {
  /**
   * Checks whether the given value is a valid date.
   *
   * @param value Contains some value.
   * @returns whether the given value is a valid date.
   */
  public static isDate(value?: any): value is Date {
    return value instanceof Date && !Number.isNaN(value.valueOf());
  }
}
