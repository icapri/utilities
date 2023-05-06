/**
 * Defines an abstract class with set utilities.
 */
export abstract class Sets {
  /** @private */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Checks whether the given set is empty.
   *
   * @param value Contains some set.
   * @returns whether the given set is empty.
   */
  public static isEmpty<T>(value: Set<T>): boolean {
    return value.size === 0;
  }

  /**
   * Checks whether the given set is not emtpy.
   *
   * @param value Contains some set.
   * @returns whether the given set is not emtpy.
   */
  public static isNotEmpty<T>(value: Set<T>): boolean {
    return value.size !== 0;
  }

  /**
   * Checks whether the given value is a set.
   *
   * @param value Contains some value.
   * @returns whether the given value is a set.
   */
  public static isSet(value?: any): value is Set<any> {
    return value instanceof Set;
  }

  /**
   * Converts a set to a map.
   *
   * @param value Contains some set.
   * @returns a map whose keys are the indexes of each set value
   * and the respective values are the set items.
   */
  public static toMap<T>(value: Set<T>): Map<number, T> {
    let i = 0, map = new Map<number, T>();
    value.forEach((item) => {
      map.set(i, item);
      i++;
    });

    return map;
  }
}
