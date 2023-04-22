/**
 * Defines an abstract class with object utilities.
 */
export abstract class Objects {
  /**
   * Checks whether the given object is empty.
   *
   * @param o Contains some object.
   * @returns whether the given object is empty.
   */
  public static isEmpty<T extends object>(
    o: T | Record<string, never>
  ): o is Record<string, never>;
  public static isEmpty<T extends Object>(
    o: T | Record<string, never>
  ): o is Record<string, never>;
  public static isEmpty<T extends object | Object>(
    o: T | Record<string, never>
  ): o is Record<string, never> {
    const noProps = Object.getOwnPropertyNames(o).length === 0;
    const noSymbs = Object.getOwnPropertySymbols(o).length === 0;
    return noProps && noSymbs;
  }

  /**
   * Checks whether the given value is an object.
   *
   * @param value Contains some value.
   * @returns whether the given value is an object.
   */
  public static isObject(value?: any): value is object {
    return value !== null && typeof value === 'object';
  }
}
