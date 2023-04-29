/**
 * Defines a base utility class.
 */
export abstract class Util {
  /**
   * Checks whether the given values are equal.
   *
   * @param a Contains some value.
   * @param b Contains some other value.
   * @param enforcePropsOrder Contains whether to consider property order during
   * the value comparison.
   * @param cyclic Contains whether to check for cycles in cyclic objects.
   * @returns whether the given values are equal.
   *
   * Adopted from the [`toubkal`](https://github.com/ReactiveSets/toubkal) lib.
   *
   * @author [Jean Vincent](https://github.com/uiteoi)
   */
  public static equal(a?: any, b?: any, enforcePropsOrder = false, cyclic = false) {
    return a === b && a !== 0 || _equal(a, b);

    function _equal(a: any, b: any) {
      let s, l, p, x, y;

      if ((s = toString.call(a)) !== toString.call(b)) {
        return false;
      }

      switch (s) {
        default:
          return a.valueOf() === b.valueOf();

        case '[object Number]':
          a = +a;
          b = +b;

          return a ?
            a === b
            :
            a === a ?
              1 / a === 1 / b
              : b !== b;
        case '[object RegExp]':
          return a.source == b.source
            && a.global == b.global
            && a.ignoreCase == b.ignoreCase
            && a.multiline == b.multiline
            && a.lastIndex == b.lastIndex;
        case '[object Function]':
          return false;
        case '[object Array]':
          if (cyclic && (x = equalReferences(a, b)) !== null) {
            return x;
          }

          if ((l = a.length) != b.length) {
            return false;
          }

          while (l--) {
            if ((x = a[l]) === (y = b[l]) && x !== 0 || _equal(x, y)) {
              continue;
            }
            return false;
          }

          return true;
        case '[object Object]':
          if (cyclic && (x = equalReferences(a, b)) !== null) {
            return x;
          }

          l = 0;

          if (enforcePropsOrder) {
            var properties = [];

            for (p in a) {
              if (a.hasOwnProperty(p)) {
                properties.push(p);

                if ((x = a[p]) === (y = b[p]) && x !== 0 || _equal(x, y)) continue;

                return false;
              }
            }

            for (p in b)
              if (b.hasOwnProperty(p) && properties[l++] != p)
                return false;
          } else {
            for (p in a) {
              if (a.hasOwnProperty(p)) {
                ++l;

                if ((x = a[p]) === (y = b[p]) && x !== 0 || _equal(x, y)) {
                  continue;
                }

                return false;
              }
            }

            for (p in b) {
              if (b.hasOwnProperty(p) && --l < 0) {
                return false;
              }
            }
          }

          return true;
      }
    }

    function equalReferences(a: any, b: any) {
      const references: any[] = [];

      // @ts-ignore
      return (equalReferences = _equalReferences)(a, b);

      function _equalReferences(a: any, b: any) {
        let l = references.length;

        while (l--) {
          if (references[l--] === b) {
            return references[l] === a;
          }
        }

        references.push(a, b);
        return null;
      }
    }
  }

  /**
   * Checks whether the given value is null.
   *
   * @param value Contains some value.
   * @returns whether the given value is `null`.
   */
  public static isNull(value?: any): value is null {
    return value === null;
  }

  /**
   * Checks whether the given value is `null` or `undefined`.
   *
   * @param value Contains some value.
   * @returns whether the given value is `null` or `undefined`.
   */
  public static isNullOrUndefined(value?: any): value is null | undefined {
    return Util.isNull(value) || Util.isUndefined(value);
  }

  /**
   * Checks whether the given value is not defined.
   *
   * @param value Contains some value.
   * @returns whether the given value is not defined.
   */
  public static isUndefined(value?: any): value is undefined {
    return value === undefined || typeof value === 'undefined';
  }
}
