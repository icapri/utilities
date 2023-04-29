/**
 * Defines an abstract class with map utilities.
 */
export abstract class Maps {
  /**
   * Checks whether the given map is empty.
   *
   * @param map Contains some map.
   * @returns whether the given map is empty.
   */
  public static isEmpty<TKey, TValue>(map: Map<TKey, TValue>): boolean {
    return map.size === 0;
  }

  /**
   * Checks whether the given value is a map.
   *
   * @param value Contains some value.
   * @returns whether the given value is a map.
   */
  public static isMap(value?: any): value is Map<any, any> {
    return value instanceof Map;
  }

  /**
   * Checks whether the given map is not empty.
   *
   * @param map Contains some map.
   * @returns whether the given map is not empty.
   */
  public static isNotEmpty<TKey, TValue>(map: Map<TKey, TValue>): boolean {
    return map.size !== 0;
  }

  /**
   * Converts a map to an object.
   *
   * @param map Contains some map.
   * @returns the object whose property keys and values are the key-value pairs of the map.
   */
  public static toObject<U extends string | number | symbol, V>(
    map: Map<U, V>
  ): Record<U, V> {
    const o: any = {};
    map.forEach((value, key) => {
      o[key] = value;
    });
    return o;
  }

  /**
   * Converts a map to a set.
   *
   * @param map Contains some map.
   * @returns a set.
   */
  public static toSet<U, V>(map: Map<U, V>): Set<V> {
    let i = 0, result = new Set<V>();
    map.forEach((item) => {
      result.add(item);
      i++;
    });

    return result;
  }
}
