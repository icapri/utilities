import { Numbers } from '../numbers/Numbers';

type Inclusivity = `${'(' | '['}${']' | ')'}`;

/**
 * Defines an abstract class with date utilities.
 */
export abstract class Dates {
  /**
   * Adds the given number of days to the date object.
   *
   * @param date Contains some date object.
   * @param days Contains the number of days to add.
   * @returns a date object.
   */
  public static addDays(date: Date, days: number): Date {
    if (!Numbers.isPositiveInteger(days)) {
      throw new TypeError(`Invalid positive integer '${String(days)}'`);
    }

    Dates.validate(date);
    const result = new Date(date.valueOf());
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Gets the date after tomorrow. The time is ignored.
   */
  public static get afterTomorrow(): Date {
    return Dates.addDays(Dates.today, 2);
  }

  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param date Contains some date object.
   * @returns only the date part of the date object i. e. the time
   * is zeroed.
   */
  public static dateOnly(date: Date): Date {
    Dates.validate(date);
    const dateStr = date.toISOString();
    return new Date(dateStr.substring(0, dateStr.indexOf('T')));
  }

  /**
   * Checks whether the two date objects are equal.
   *
   * @param a Contains some date object.
   * @param b Contains some other date object.
   * @param ignoreTime Contains whether to ignore the time part of both date
   * objects during the comparison.
   * @returns whether the two date objects are equal.
   */
  public static equal(a: Date, b: Date, ignoreTime: boolean = false): boolean {
    Dates.validate(a);
    Dates.validate(b);
    if (ignoreTime) {
      const x = Dates.dateOnly(a);
      const y = Dates.dateOnly(b);
      return x.getTime() === y.getTime();
    }
    return a.getTime() === b.getTime();
  };

  /**
   * Checks whether the first date is after the second one.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @param ignoreTime Contains whether to ignore the time part of both date
   * objects during the comparison.
   * @returns whether the first date is after the second one.
   */
  public static isAfter(date: Date, other: Date, ignoreTime: boolean = false): boolean {
    Dates.validate(date);
    Dates.validate(other);
    if (ignoreTime) {
      const x = Dates.dateOnly(date);
      const y = Dates.dateOnly(other);
      return x.getTime() > y.getTime();
    }
    return date.getTime() > other.getTime();
  }

  /**
   * Checks whether the first date is before the second one.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @param ignoreTime Contains whether to ignore the time part of both date
   * objects during the comparison.
   * @returns whether the first date is before the second one.
   */
  public static isBefore(date: Date, other: Date, ignoreTime: boolean = false): boolean {
    Dates.validate(date);
    Dates.validate(other);
    if (ignoreTime) {
      const x = Dates.dateOnly(date);
      const y = Dates.dateOnly(other);
      return x.getTime() < y.getTime();
    }
    return date.getTime() < other.getTime();
  }

  /**
   * Checks whether the given date is between the given date range.
   *
   * @param date Contains some date object.
   * @param from Contains the lower date.
   * @param to Contains the upper date.
   * @param incl Contains the inclusivity type of the dates range.
   * @returns whether the given date is between the given date range.
   */
  public static isBetween(
    date: Date,
    from: Date,
    to: Date,
    incl: Inclusivity = '()'
  ): boolean {
    if (!['()', '[]', '(]', '[)'].includes(incl)) {
      throw new TypeError('Inclusivity type must be one of (), [], (], [)');
    }

    const isBeforeEqual = incl[0] === '[', isAfterEqual = incl[1] === ']';
    return (
      isBeforeEqual ? (Dates.equal(from, date) || Dates.isBefore(from, date)) : Dates.isBefore(from, date)
    ) && (
        isAfterEqual ? (Dates.equal(to, date) || Dates.isAfter(to, date)) : Dates.isAfter(to, date)
      );
  }

  /**
   * Checks whether the given value is a valid date.
   *
   * @param value Contains some value.
   * @returns whether the given value is a valid date.
   */
  public static isDate(value?: any): value is Date {
    return value instanceof Date && !Number.isNaN(value.valueOf());
  }

  /**
   * Checks whether the given date is in the future.
   *
   * @param date Contains some date object.
   * @param ignoreTime Contains whether to ignore the time part of both date
   * objects during the comparison.
   * @returns whether the given date is in the future.
   */
  public static isFuture(date: Date, ignoreTime: boolean = false): boolean {
    Dates.validate(date);
    const today = Dates.today;
    if (ignoreTime) {
      const x = Dates.dateOnly(date);
      return Dates.isAfter(x, today);
    }

    return Dates.isAfter(date, today);
  }

  /**
   * Gets the date and time now.
   */
  public static get now(): Date {
    return new Date();
  }

  /**
   * Removes the given number of days to the date object.
   *
   * @param date Contains some date object.
   * @param days Contains the number of days to remove.
   * @returns a date object.
   */
  public static removeDays(date: Date, days: number): Date {
    if (!Numbers.isPositiveInteger(days)) {
      throw new TypeError(`Invalid positive integer '${String(days)}'`);
    }

    Dates.validate(date);
    const result = new Date(date.valueOf());
    result.setDate(result.getDate() - days);
    return result;
  }

  /**
   * Gets the date today. The time is ignored.
   */
  public static get today(): Date {
    const date = Dates.now.toISOString();
    const dateOnly = date.substring(0, date.indexOf('T'));
    return new Date(dateOnly);
  }

  /**
   * Gets the date tomorrow. The time is ignored.
   */
  public static get tomorrow(): Date {
    return Dates.addDays(Dates.today, 1);
  }

  /**
   * Gets the date yesterday. The time is ignored.
   */
  public static get yesterday(): Date {
    return Dates.removeDays(Dates.today, 1);
  }

  /**
   * Validates a date object.
   *
   * @param date Contains some date object.
   *
   * @private
   */
  private static validate(date: Date): void {
    if (Dates.isDate(date)) {
      return;
    }

    throw new TypeError(`Invalid Date '${String(date)}'`);
  }
}
