import {Numbers} from '../numbers/Numbers';
import {Strings} from '../strings/Strings';

/**
 * Defines an abstract class with date utilities.
 */
export abstract class Dates {
  /**
   * Contains the number of days in a year.
   */
  public static readonly DAYS_IN_YEAR: number = 365.2425 as const;

  /**
   * Contains the maximal number of milliseconds allowed.
   */
  public static readonly MAX_ALLOWED_TIME: number = 864e13 as const;

  /**
   * Contains the number of minutes in a day.
   */
  public static readonly MINS_IN_DAY: number = 1440 as const;

  /**
   * Contains the number of minutes in an hour.
   */
  public static readonly MINS_IN_HOUR: number = 60 as const;

  /**
   * Contains the number of minutes in a month.
   */
  public static readonly MINS_IN_MONTH: number = 432e2 as const;

  /**
   * Contains the number of minutes in a year.
   */
  public static readonly MINS_IN_YEAR: number = 5256e2 as const;

  /**
   * Contains the number of milliseconds in a day.
   */
  public static readonly MS_IN_DAY: number = 864e5 as const;

  /**
   * Contains the number of milliseconds in an hour.
   */
  public static readonly MS_IN_HOUR: number = 3.6e6 as const;

  /**
   * Contains the number of milliseconds in a minute.
   */
  public static readonly MS_IN_MINUTE: number = 6e4 as const;

  /**
   * Contains the number of milliseconds in a second.
   */
  public static readonly MS_IN_SECOND: number = 1e3 as const;

  /**
   * Contains the number of milliseconds in a week.
   */
  public static readonly MS_IN_WEEK: number = 6048e5 as const;

  /**
   * Contains the number of seconds in a day.
   */
  public static readonly SECS_IN_DAY: number = 864e2 as const;

  /**
   * Contains the number of seconds in a month.
   */
  public static readonly SECS_IN_MONTH: number = 2629746e3 as const;

  /**
   * Contains the number of seconds in a week.
   */
  public static readonly SECS_IN_WEEK: number = 6048e2 as const;

  /**
   * Contains the number of seconds in a year.
   */
  public static readonly SECS_IN_YEAR: number = 31556952e3 as const;

  /**
   * @constructor
   *
   * @private
   */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Adds the specified number of days to the given date object.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} days Contains the number of days to add to the specified
   * date.
   * @return {Date} a date object.
   */
  public static addDays(date: Date, days: number): Date;
  /**
   * Adds the specified number of days to the given date.
   *
   * @param {Number} date Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {Number} days Contains the number of days to add to the specified
   * date.
   * @return {Date} a date object.
   */
  public static addDays(date: number, days: number): Date;
  /**
   * Adds the specified number of days to the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} days Contains the number of days to add to the specified
   * date.
   * @return {Date} a date object.
   */
  public static addDays(date: string, days: number): Date;
  /**
   * Adds the specified number of days to the specified date object, an ISO 8601
   * date string or the milliseconds from midnight, January 1, 1970 UTC.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to add to the specified
   * date.
   * @return {Date} a date object.
   */
  public static addDays(date: Date | number | string, days: number): Date;
  /**
   * Adds the specified number of days to the specified date object, an ISO 8601
   * date string or the milliseconds from midnight, January 1, 1970 UTC.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to add to the specified
   * date.
   * @return {Date} a date object.
   */
  public static addDays(date: Date | number | string, days: number): Date {
    Dates.nonNegative(days);
    const dateObj = Dates.tryParse(date);
    if (days === 0) {
      return dateObj;
    }

    const result = new Date(dateObj);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Adds the specified number of milliseconds to the specified date object.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} ms Contains the number of milliseconds to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMilliseconds(date: Date, ms: number): Date;
  /**
   * Adds the specified number of milliseconds to the given date.
   *
   * @param {Number} date Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {number} ms Contains the number of milliseconds to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMilliseconds(date: number, ms: number): Date;
  /**
   * Adds the specified number of milliseconds to the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {number} ms Contains the number of milliseconds to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMilliseconds(date: string, ms: number): Date;
  /**
   * Adds the specified number of milliseconds to the specified date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} ms Contains the number of milliseconds to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMilliseconds(
      date: Date | number | string,
      ms: number,
  ): Date
  /**
   * Adds the specified number of milliseconds to the specified date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} ms Contains the number of milliseconds to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMilliseconds(
      date: Date | number | string,
      ms: number,
  ): Date {
    Dates.nonNegative(ms);
    const dateObj = Dates.tryParse(date);
    if (ms === 0) {
      return dateObj;
    }
    return new Date(dateObj.getTime() + ms);
  }

  /**
   * Adds the specified number of minutes to the given date object.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} minutes Contains the number of minutes to add
   * to the specified date.
   * @return {Date} a date object.
   */
  public static addMinutes(date: Date, minutes: number): Date;
  /**
   * Adds the specified number of minutes to the given date.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} minutes Contains the number of minutes to add
   * to the specified date.
   * @return {Date} a date object.
   */
  public static addMinutes(date: number, minutes: number): Date;
  /**
   * Adds the specified number of minutes to the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} minutes Contains the number of minutes to add
   * to the specified date.
   * @return {Date} a date object.
   */
  public static addMinutes(date: string, minutes: number): Date;
  /**
   * Adds the specified number of minutes to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date
   * string or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} minutes Contains the number of minutes to add
   * to the specified date.
   * @return {Date} a date object.
   */
  public static addMinutes(
      date: Date | number | string,
      minutes: number,
  ): Date;
  /**
   * Adds the specified number of minutes to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date
   * string or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} minutes Contains the number of minutes to add
   * to the specified date.
   * @return {Date} a date object.
   */
  public static addMinutes(
      date: Date | number | string,
      minutes: number,
  ): Date {
    Dates.nonNegative(minutes);
    const dateObj = Dates.tryParse(date);
    if (minutes === 0) {
      return dateObj;
    }
    dateObj.setMinutes(dateObj.getMinutes() + minutes);
    return dateObj;
  }

  /**
   * Adds the specified number of months to the given date object.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} months Contains the number of months to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMonths(date: Date, months: number): Date;
  /**
   * Adds the specified number of months to the given date.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} months Contains the number of months to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMonths(date: number, months: number): Date;
  /**
   * Adds the specified number of months to the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} months Contains the number of months to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMonths(date: string, months: number): Date;
  /**
   * Adds the specified number of months to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} months Contains the number of months to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMonths(date: Date | number | string, months: number): Date;
  /**
   * Adds the specified number of months to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} months Contains the number of months to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMonths(date: Date | number | string, months: number): Date {
    Dates.nonNegative(months);
    const dateObj = Dates.tryParse(date);
    if (months === 0) {
      return dateObj;
    }
    dateObj.setMonth(dateObj.getMonth() + months);
    return dateObj;
  }

  /**
   * Adds the specified number of seconds to the given date object.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} seconds Contains the number of seconds to add to
   * the specified date.
   * @return {Date} a date object.
   */
  public static addSeconds(date: Date, seconds: number): Date;
  /**
   * Adds the specified number of seconds to the given date.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} seconds Contains the number of seconds to add to
   * the specified date.
   * @return {Date} a date object.
   */
  public static addSeconds(date: number, seconds: number): Date;
  /**
   * Adds the specified number of seconds to the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} seconds Contains the number of seconds to add to
   * the specified date.
   * @return {Date} a date object.
   */
  public static addSeconds(date: string, seconds: number): Date;
  /**
   * Adds the specified number of seconds to the given date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} seconds Contains the number of seconds to add to
   * the specified date.
   * @return {Date} a date object.
   */
  public static addSeconds(
      date: Date | number | string,
      seconds: number,
  ): Date;
  /**
   * Adds the specified number of seconds to the given date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} seconds Contains the number of seconds to add to
   * the specified date.
   * @return {Date} a date object.
   */
  public static addSeconds(
      date: Date | number | string,
      seconds: number,
  ): Date {
    Dates.nonNegative(seconds);
    const dateObj = Dates.tryParse(date);
    if (seconds === 0) {
      return dateObj;
    }
    dateObj.setSeconds(dateObj.getSeconds() + seconds);
    return dateObj;
  }

  /**
   * Adds the specified number of weeks to the given date object.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} weeks Contains the number of weeks to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addWeeks(date: Date, weeks: number): Date;
  /**
   * Adds the specified number of weeks to the given date.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} weeks Contains the number of weeks to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addWeeks(date: number, weeks: number): Date;
  /**
   * Adds the specified number of weeks to the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} weeks Contains the number of weeks to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addWeeks(date: string, weeks: number): Date;
  /**
   * Adds the specified number of weeks to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} weeks Contains the number of weeks to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addWeeks(date: Date | number | string, weeks: number): Date;
  /**
   * Adds the specified number of weeks to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} weeks Contains the number of weeks to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addWeeks(date: Date | number | string, weeks: number): Date {
    Dates.nonNegative(weeks);
    const dateObj = Dates.tryParse(date);
    if (weeks === 0) {
      return dateObj;
    }
    dateObj.setDate(dateObj.getDate() + (weeks * 7));
    return dateObj;
  }

  /**
   * Adds the specified number of years to the given date object.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} years Contains the number of years to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addYears(date: Date, years: number): Date;
  /**
   * Adds the specified number of years to the given date.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} years Contains the number of years to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addYears(date: number, years: number): Date;
  /**
   * Adds the specified number of years to the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} years Contains the number of years to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addYears(date: string, years: number): Date;
  /**
   * Adds the specified number of years to the given date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} years Contains the number of years to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addYears(date: Date | number | string, years: number): Date;
  /**
   * Adds the specified number of years to the given date object.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} years Contains the number of years to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addYears(date: Date | number | string, years: number): Date {
    Dates.nonNegative(years);
    const dateObj = Dates.tryParse(date);
    if (years === 0) {
      return dateObj;
    }
    dateObj.setFullYear(dateObj.getFullYear() + years);
    return dateObj;
  }

  /**
   * Gets the start of the day i. e. the midnight date.
   *
   * **Usage Examples:**
   * ```typescript
   * const date = new Date("2023-05-06T11:59:04.623Z");
   * const midnight = Dates.atStartOfDay(date); // "2023-05-06T00:00:00.000Z"
   * ```
   *
   * @param {Date} date Contains a date object. If this is not defined
   * the midnight date of the current date is used.
   * @return {Date} a date object.
   */
  public static atStartOfDay(date?: Date): Date;
  /**
   * Gets the start of the day i. e. the midnight date.
   *
   * **Usage Examples:**
   * ```typescript
   * const date = new Date("2023-05-06T11:59:04.623Z");
   * const midnight = Dates.atStartOfDay(date); // "2023-05-06T00:00:00.000Z"
   * ```
   *
   * @param {Number} date Contains the milliseconds from midnight, January 1,
   * 1970 UTC. If this is not defined the midnight date of the current date
   * is used.
   * @return {Date} a date object.
   */
  public static atStartOfDay(date?: number): Date;
  /**
   * Gets the start of the day i. e. the midnight date.
   *
   * **Usage Examples:**
   * ```typescript
   * const date = new Date("2023-05-06T11:59:04.623Z");
   * const midnight = Dates.atStartOfDay(date); // "2023-05-06T00:00:00.000Z"
   * ```
   *
   * @param {String} date Contains an ISO 8601 date string. If this is not
   * defined the midnight date of the current date is used.
   * @return {Date} a date object.
   */
  public static atStartOfDay(date?: string): Date;
  /**
   * Gets the start of the day i. e. the midnight date.
   *
   * **Usage Examples:**
   * ```typescript
   * const date = new Date("2023-05-06T11:59:04.623Z");
   * const midnight = Dates.atStartOfDay(date); // "2023-05-06T00:00:00.000Z"
   * ```
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC. If this is not
   * defined the midnight date of the current date is used.
   * @return {Date} a date object.
   */
  public static atStartOfDay(date?: string | number | Date): Date;
  /**
   * Gets the start of the day i. e. the midnight date.
   *
   * **Usage Examples:**
   * ```typescript
   * const date = new Date("2023-05-06T11:59:04.623Z");
   * const midnight = Dates.atStartOfDay(date); // "2023-05-06T00:00:00.000Z"
   * ```
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC. If this is not
   * defined the midnight date of the current date is used.
   * @return {Date} a date object.
   */
  public static atStartOfDay(date?: string | number | Date): Date {
    if (date) {
      const dateObj = Dates.tryParse(date);
      return Dates.dateOnly(dateObj);
    }
    return Dates.dateOnly(Dates.now);
  }

  /**
   * Clones a date object.
   *
   * @param {Date} date Contains some date object.
   * @return {Date} a cloned copy of the given date object.
   */
  public static clone(date: Date): Date {
    return new Date(date.getTime());
  }

  /**
   * Compares two date objects. Useful for array sorting.
   *
   * @param {Date} a Contains some date object.
   * @param {Date} b Contains some other date object.
   * @return {Number}
   * * `-1` if `a` is before than `b`.
   * * `0`  if `a` equals `b`.
   * * `1`  if `a` is after than `b`.
   */
  public static compare(a: Date, b: Date): number {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }

  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param {Date} date Contains a date object.
   * @return {Date} only the date part of the date object i. e. the time
   * is zeroed.
   */
  public static dateOnly(date: Date): Date;
  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Date} only the date part of the date object i. e. the time
   * is zeroed.
   */
  public static dateOnly(date: number): Date;
  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @return {Date} only the date part of the date object i. e. the time
   * is zeroed.
   */
  public static dateOnly(date: string): Date;
  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param {Date} date Contains some date object.
   * @return {Date} only the date part of the date object i. e. the time
   * is zeroed.
   */
  public static dateOnly(date: Date | number | string): Date;
  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param {Date} date Contains some date object.
   * @return {Date} only the date part of the date object i. e. the time
   * is zeroed.
   */
  public static dateOnly(date: Date | number | string): Date {
    const dateObj = Dates.tryParse(date),
      msFromDayStart = dateObj.getTime() % Dates.MS_IN_DAY;
    return new Date(dateObj.getTime() - msFromDayStart);
  }

  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Date} date Contains a date object.
   * @param {Date} other Contains another date object.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: Date, other: Date): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: Date, other: number): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Date} date Contains a date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: Date, other: string): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains a date object.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: number, other: Date): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: number, other: number): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: number, other: string): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Date} other Contains a date object.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: string, other: Date): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: string, other: number): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(date: string, other: string): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number;
  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number {
    const dateObj = Dates.tryParse(date),
      otherObj = Dates.tryParse(other),
      timeDiff = Dates.timeDifference(dateObj, otherObj);
    return Math.ceil(timeDiff / Dates.MS_IN_DAY);
  }

  /**
   * Gets the number of days in the specified month of the specified year.
   *
   * @param {Number} month Contains the month index. The indexes start from
   * 1 (January).
   * @param {Number} year Contains the year.
   * @return {Number} the number of days in the given month of the given year.
   */
  public static daysOfMonth(month: number, year: number): number {
    if (month < 1 || month > 12 || year < 0 || year > 9999) {
      return -1;
    }
    return new Date(year, month, 0).getDate();
  }

  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Date} a Contains a date object.
   * @param {Date} b Contains another date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: Date, b: Date, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Date} a Contains a date object.
   * @param {Number} b Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: Date, b: number, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Date} a Contains a date object.
   * @param {String} b Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: Date, b: string, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Number} a Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {Date} b Contains a date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: number, b: Date, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Number} a Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {Number} b Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: number, b: number, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Number} a Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {String} b Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: number, b: string, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {String} a Contains an ISO 8601 date string.
   * @param {Date} b Contains a date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: string, b: Date, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {String} a Contains an ISO 8601 date string.
   * @param {Number} b Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: string, b: number, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {String} a Contains an ISO 8601 date string.
   * @param {String} b Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(a: string, b: string, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Date} a Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} b Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(
      a: Date | number | string,
      b: Date | number | string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the two date objects are equal.
   *
   * @param {Date} a Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} b Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(
      a: Date | number | string,
      b: Date | number | string,
      ignoreTime: boolean = false,
  ): boolean {
    const aObj = Dates.tryParse(a), bObj = Dates.tryParse(b);
    if (ignoreTime) {
      const x = Dates.dateOnly(a), y = Dates.dateOnly(b);
      return x.getTime() === y.getTime();
    }
    return aObj.getTime() === bObj.getTime();
  }

  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param {Date} date Contains a date object.
   * @return {Number} the number of ms between midnight, January 1, 1970
   * Universal Coordinated Time a. k. a. GMT and the given date.
   */
  public static getUTC(date: Date): number;
  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param {Number} date Contains the milliseconds between midnight, January 1,
   * 1970 UTC and the specified date.
   * @return {Number} the number of ms between midnight, January 1, 1970
   * Universal Coordinated Time a. k. a. GMT and the given date.
   */
  public static getUTC(date: number): number;
  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @return {Number} the number of ms between midnight, January 1, 1970
   * Universal Coordinated Time a. k. a. GMT and the given date.
   */
  public static getUTC(date: string): number;
  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds between midnight, January 1, 1970 UTC and the
   * specified date.
   * @return {Number} the number of ms between midnight, January 1, 1970
   * Universal Coordinated Time a. k. a. GMT and the given date.
   */
  public static getUTC(date: Date | number | string): number;
  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds between midnight, January 1, 1970 UTC and the
   * specified date.
   * @return {Number} the number of ms between midnight, January 1, 1970
   * Universal Coordinated Time a. k. a. GMT and the given date.
   */
  public static getUTC(date: Date | number | string): number {
    const dateObj = Dates.tryParse(date);
    return Date.UTC(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
        dateObj.getHours(),
        dateObj.getMinutes(),
        dateObj.getSeconds(),
        dateObj.getMilliseconds(),
    );
  }

  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: Date, other: Date): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: Date, other: number): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: Date, other: string): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: number, other: Date): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: number, other: number): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: number, other: string): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: string, other: Date): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: string, other: number): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: string, other: string): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {String} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {String} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number;
  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number {
    const dateObj = Dates.tryParse(date),
      otherObj = Dates.tryParse(other),
      msDifference = Numbers.abs(dateObj.getTime() - otherObj.getTime());
    return msDifference / Dates.MS_IN_HOUR;
  }

  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Date} date Contains a date object.
   * @param {Date} other Contains another date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: Date,
      other: Date,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: Date,
      other: number,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Date} date Contains a date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: Date,
      other: string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains a date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: number,
      other: Date,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: number,
      other: number,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: number,
      other: string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Number} date Contains an ISO 8601 date string.
   * @param {Date} other Contains a date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: string,
      other: Date,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: string,
      other: number,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: string,
      other: string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: Date | number | string,
      other: Date | number | string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is after the second one.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is after the second one.
   */
  public static isAfter(
      date: Date | number | string,
      other: Date | number | string,
      ignoreTime: boolean = false,
  ): boolean {
    if (ignoreTime) {
      const x = Dates.dateOnly(date), y = Dates.dateOnly(other);
      return x.getTime() > y.getTime();
    }

    const dateObj = Dates.tryParse(date), otherObj = Dates.tryParse(other);
    return dateObj.getTime() > otherObj.getTime();
  }

  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Date} date Contains a date object.
   * @param {Date} other Contains another date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: Date,
      other: Date,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Date} date Contains a date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: Date,
      other: number,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Date} date Contains a date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: Date,
      other: string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains a date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: number,
      other: Date,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: number,
      other: number,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: number,
      other: string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Number} date Contains an ISO 8601 date string.
   * @param {Date} other Contains a date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: string,
      other: Date,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: string,
      other: number,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: string,
      other: string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: Date | number | string,
      other: Date | number | string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the first date is before the second one.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: Date | number | string,
      other: Date | number | string,
      ignoreTime: boolean = false,
  ): boolean {
    if (ignoreTime) {
      const x = Dates.dateOnly(date), y = Dates.dateOnly(other);
      return x.getTime() < y.getTime();
    }

    const dateObj = Dates.tryParse(date), otherObj = Dates.tryParse(other);
    return dateObj.getTime() < otherObj.getTime();
  }

  /**
   * Checks whether the given date is between the given date range.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} from Contains the lower date.
   * @param {Date} to Contains the upper date.
   * @param {String} incl Contains the inclusivity type of the dates range.
   * - `(]`: Not including the date `from` but including the date `to`.
   * - `()`: Not including the dates `from` and `to`.
   * - `[]`: Including the dates `from` and `to`.
   * - `[)`: Including only the date `from` but not the date `to`.
   * @return {Boolean} whether the given date is between the given date range.
   */
  public static isBetween(
      date: Date | number | string,
      from: Date | number | string,
      to: Date | number | string,
      incl: '(]' | '()' | '[]' | '[)' = '()',
  ): boolean {
    if (!['()', '[]', '(]', '[)'].includes(incl)) {
      throw new TypeError('Inclusivity type must be one of (), [], (], [)');
    }

    const isBeforeEqual = incl[0] === '['; const isAfterEqual = incl[1] === ']';
    return (
      isBeforeEqual ?
        (Dates.equals(from, date) || Dates.isBefore(from, date)) :
        Dates.isBefore(from, date)
    ) && (
        isAfterEqual ?
          (Dates.equals(to, date) || Dates.isAfter(to, date)) :
          Dates.isAfter(to, date)
    );
  }

  /**
   * Checks whether the given value is a date object.
   * **Note:** This method simply checks whether the given value
   * is a date object, it doesn't check whether it represents a
   * valid date object. In order to check for date validity use
   * the @see `Dates.isValid(date)` method.
   *
   * **Example**
   * ```typescript
   * Dates.isDate(new Date('I am not valid')); // true
   * Dates.isValid(new Date()); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a date object.
   */
  public static isDate(value?: any): value is Date {
    const proto = Object.prototype.toString.call(value);
    return value instanceof Date || proto === '[object Date]';
  }

  /**
   * Checks whether the given date is in the future.
   *
   * @param {Date} date Contains a date object.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the given date is in the future.
   */
  public static isFuture(date: Date, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the given date is in the future.
   *
   * @param {Date} date Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the given date is in the future.
   */
  public static isFuture(date: number, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the given date is in the future.
   *
   * @param {Date} date Contains an ISO 8601 date string.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the given date is in the future.
   */
  public static isFuture(date: string, ignoreTime?: boolean): boolean;
  /**
   * Checks whether the given date is in the future.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the given date is in the future.
   */
  public static isFuture(
      date: Date | number | string,
      ignoreTime?: boolean,
  ): boolean;
  /**
   * Checks whether the given date is in the future.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the given date is in the future.
   */
  public static isFuture(
      date: Date | number | string,
      ignoreTime: boolean = false,
  ): boolean {
    const now = Dates.now;
    if (ignoreTime) {
      return Dates.isAfter(Dates.dateOnly(date), now);
    }
    return Dates.isAfter(date, now);
  }

  /**
   * Checks whether the specified string is a valid ISO 8601 date string
   * which has the format `YYYY-MM-DDTHH:mm:ss.sssZ`.
   *
   * **Usage Examples:**
   * ```typescript
   * Dates.isISOString('2023-11-11T23:15:22.999Z'); // true
   * Dates.isISOString('2023-13-11T23:15:22.999Z'); // false
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Boolean} whether the specified string is a valid ISO 8601
   * date string.
   */
  public static isISOString(str?: string): str is string {
    if (typeof str !== 'string' || str.length !== 24) return false;
    if ((str.charAt(4) === '-') &&
      (str.charAt(7) === '-') &&
      (str.charAt(10) === 'T') &&
      (str.charAt(13) === ':') &&
      (str.charAt(16) === ':') &&
      (str.charAt(19) === '.') &&
      (str.charAt(23) === 'Z')) {
      const year = +str.substring(0, 4),
        month = +str.substring(5, 7),
        day = +str.substring(8, 10),
        hour = +str.substring(11, 13),
        minutes = +str.substring(14, 16),
        seconds = +str.substring(17, 19),
        milliseconds = +str.substring(20, 23);
      if (Numbers.isNatural(year) &&
        Numbers.isNatural(month) &&
        Numbers.isNatural(day) &&
        Numbers.isNatural(hour) &&
        Numbers.isNatural(minutes) &&
        Numbers.isNatural(seconds) &&
        Numbers.isNatural(milliseconds)
      ) {
        return year >= 0 &&
          year <= 9999 &&
          month > 0 &&
          month <= 12 &&
          hour >= 0 &&
          hour <= 23 &&
          minutes >= 0 &&
          minutes <= 59 &&
          seconds >= 0 &&
          seconds < 60 &&
          milliseconds >= 0 &&
          milliseconds <= 999 &&
          day > 0 && day <= Dates.daysOfMonth(month, year);
      }
    }
    return false;
  }

  /**
   * Checks whether the given date object is valid.
   *
   * @param {Date} date Contains some date object.
   * @return {Boolean} whether the given value is a valid date object.
   */
  public static isValid(date: Date): boolean {
    return Dates.isDate(date) && !Number.isNaN(date.valueOf());
  }

  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: Date, other: Date): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: Date, other: number): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: Date, other: string): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: number, other: Date): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: number, other: number): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: number, other: string): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: string, other: Date): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: string, other: number): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(date: string, other: string): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {String} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {String} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number;
  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number {
    const dateObj = Dates.tryParse(date), otherObj = Dates.tryParse(other);
    return Numbers.abs(dateObj.getTime() - otherObj.getTime());
  }

  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in minutes between the two specified dates.
   */
  public static minutesDifference(date: Date, other: Date): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: Date, other: number): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: Date, other: string): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: number, other: Date): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: number, other: number): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: number, other: string): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: string, other: Date): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: string, other: number): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(date: string, other: string): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {String} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {String} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in minutes between the two specified
   * dates.
   */
  public static minutesDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number;
  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in minutes between the two specified dates.
   */
  public static minutesDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number {
    const msDifference = Dates.millisecondsDifference(date, other);
    return Math.round(((msDifference % Dates.MS_IN_DAY) % 36e5) / 6e4);
  }

  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: Date, other: Date): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: Date, other: number): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: Date, other: string): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: number, other: Date): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: number, other: number): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: number, other: string): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: string, other: Date): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: string, other: number): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(date: string, other: string): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {String} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {String} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number;
  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in months between the two specified dates.
   */
  public static monthsDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number {
    const dateObj = Dates.tryParse(date), otherObj = Dates.tryParse(other);
    let months;
    months = (otherObj.getFullYear() - dateObj.getFullYear()) * 12;
    months -= dateObj.getMonth();
    months += otherObj.getMonth();
    return Numbers.abs(months);
  }

  /**
   * Gets the local date and time now.
   */
  public static get now(): Date {
    const dateNow = new Date(), offset = Dates.getTimezoneOffset(dateNow);
    return new Date(dateNow.valueOf() - offset);
  }

  /**
   * Parses a value as a date.
   *
   * @param {*} value Contains some value.
   * @return {Date} a date object in case the given value represents
   * a valid date; otherwise null.
   */
  public static parse(value?: any): Date | null {
    if (Dates.isDate(value) && Dates.isValid(value)) {
      return value;
    }
    return Dates.from(value);
  }

  /**
   * Parses an ISO 8601 date string (`YYYY-MM-DDTHH:mm:ss.sssZ`) as a date
   * object.
   *
   * **Usage Examples:**
   * ```typescript
   * Dates.parseISO('2023'); // Date: "2023-01-01T00:00:00.000Z"
   * Dates.parseISO('2023-05'); // Date: "2023-05-01T00:00:00.000Z"
   * Dates.parseISO('2023-05-09T23'); // Date: "2023-05-09T23:00:00.000Z"
   * Dates.parseISO('2023-05-09T23:15'); // Date: "2023-05-09T23:15:00.000Z"
   * Dates.parseISO('2023-05-09T23:15:22'); // Date: "2023-05-09T23:15:22.000Z"
   * Dates.parseISO('2023-05-09T23:15:22.123Z');
   * // Date: "2023-05-09T23:15:22.123Z"
   * ```
   *
   * @param {String} str Contains some string.
   * @return {Date} a date object if the specified string is a valid
   * ISO 8601 date string; otherwise `null`.
   */
  public static parseISO(str?: string): Date | null {
    if (!Strings.isString(str) || str.length === 0) {
      return null;
    }
    const iso = str.trim(), len = iso.length;
    if (Strings.isEmpty(iso)) {
      return null;
    }
    if (len <= 24) {
      const s1 = iso.charAt(4),
        s2 = iso.charAt(7),
        s3 = iso.charAt(10),
        s4 = iso.charAt(13),
        s5 = iso.charAt(16),
        s6 = iso.charAt(19),
        s7 = iso.charAt(23);

      if (
        (s1 !== '-' && s1 !== '') ||
        (s2 !== '-' && s2 !== '') ||
        (s3 !== 'T' && s3 !== '') ||
        (s4 !== ':' && s4 !== '') ||
        (s5 !== ':' && s5 !== '') ||
        (s6 !== '.' && s6 !== '') ||
        (s7 !== 'Z' && s7 !== '')
      ) {
        return null;
      }

      const yStr = iso.substring(0, 4);
      if (Strings.isEmpty(yStr)) {
        return null;
      }
      const MStr = iso.substring(5, 7),
        dStr = iso.substring(8, 10),
        hStr = iso.substring(11, 13),
        mStr = iso.substring(14, 16),
        sStr = iso.substring(17, 19),
        msStr = iso.substring(20, 23);

      const year = +yStr,
        month = Strings.isEmpty(MStr) ? 1 : +MStr,
        day = Strings.isEmpty(dStr) ? 1 : +dStr,
        hour = Strings.isEmpty(hStr) ? 0 : +hStr,
        minutes = Strings.isEmpty(mStr) ? 0 : +mStr,
        seconds = Strings.isEmpty(sStr) ? 0 : +sStr,
        milliseconds = Strings.isEmpty(msStr) ? 0 : +msStr;
      if (!Numbers.isNatural(year) ||
        !Numbers.isNatural(month) ||
        !Numbers.isNatural(day) ||
        !Numbers.isNatural(hour) ||
        !Numbers.isNatural(minutes) ||
        !Numbers.isNatural(seconds) ||
        !Numbers.isNatural(milliseconds)
      ) {
        return null;
      }

      if (year >= 0 &&
        year <= 9999 &&
        month > 0 &&
        month <= 12 &&
        hour >= 0 &&
        hour <= 24 &&
        minutes >= 0 &&
        minutes <= 59 &&
        seconds >= 0 &&
        seconds < 60 &&
        milliseconds >= 0 &&
        milliseconds <= 999
      ) {
        const daysOfMonth = Dates.daysOfMonth(month, year);
        if (day > 0 && day <= daysOfMonth) {
          const date = new Date(
                year,
                month - 1,
                day,
                hour,
                minutes,
                seconds,
                milliseconds,
            ), offset = Dates.getTimezoneOffset(date);
          return new Date(date.valueOf() - offset);
        }
      }
    }
    return null;
  }

  /**
   * Removes the given number of days from the specified date.
   *
   * @param {Date} date Contains some date object.
   * @param {Number} days Contains the number of days to remove.
   * @return {Date} a date object.
   */
  public static removeDays(date: Date, days: number): Date;
  /**
   * Removes the given number of days from the specified date.
   *
   * @param {Date} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to remove.
   * @return {Date} a date object.
   */
  public static removeDays(date: number, days: number): Date;
  /**
   * Removes the given number of days from the specified date.
   *
   * @param {Date} date Contains an ISO 8601 date string.
   * @param {Number} days Contains the number of days to remove.
   * @return {Date} a date object.
   */
  public static removeDays(date: string, days: number): Date;
  /**
   * Removes the given number of days from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to remove.
   * @return {Date} a date object.
   */
  public static removeDays(date: Date | number | string, days: number): Date;
  /**
   * Removes the given number of days from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to remove.
   * @return {Date} a date object.
   */
  public static removeDays(date: Date | number | string, days: number): Date {
    Dates.nonNegative(days);
    const dateObj = Dates.tryParse(date);
    if (days === 0) {
      return dateObj;
    }
    dateObj.setDate(dateObj.getDate() - days);
    return dateObj;
  }

  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: Date, other: Date): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Date} date Contains some date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: Date, other: number): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Date} date Contains some date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: Date, other: string): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains some date object.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: number, other: Date): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: number, other: number): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: number, other: string): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Date} other Contains some date object.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: string, other: Date): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: string, other: number): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: string, other: string): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {String} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {String} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number;
  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the time difference between the two dates in milliseconds.
   */
  public static timeDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number {
    const dateObj = Dates.tryParse(date), otherObj = Dates.tryParse(other);
    return Numbers.abs(otherObj.getTime() - dateObj.getTime());
  }

  /**
   * Converts a Universal Coordinated Time (UTC) date object to a local
   * date object.
   *
   * **Usage Examples:**
   * ```typescript
   * // some utc date
   * const date = new Date(); // "2023-05-06T12:10:12.191Z" (MESZ)
   * // assume the local date is UTC/GMT +2 hrs
   * const localDate = Dates.toLocalDate(date); // "2023-05-06T14:10:12.191Z"
   * ```
   *
   * @param {Date} date Contains some date object.
   * @return {Date} a date object representing the local date.
   */
  public static toLocalDate(date: Date): Date;
  /**
   * Converts a Universal Coordinated Time (UTC) date object to a local
   * date object.
   *
   * **Usage Examples:**
   * ```typescript
   * // some utc date
   * const date = new Date(); // "2023-05-06T12:10:12.191Z" (MESZ)
   * // assume the local date is UTC/GMT +2 hrs
   * const localDate = Dates.toLocalDate(date); // "2023-05-06T14:10:12.191Z"
   * ```
   *
   * @param {Date} date Contains the milliseconds from midnight, January 1,
   * 1970 UTC.
   * @return {Date} a date object representing the local date.
   */
  public static toLocalDate(date: number): Date;
  /**
   * Converts a Universal Coordinated Time (UTC) date object to a local
   * date object.
   *
   * **Usage Examples:**
   * ```typescript
   * // some utc date
   * const date = new Date(); // "2023-05-06T12:10:12.191Z" (MESZ)
   * // assume the local date is UTC/GMT +2 hrs
   * const localDate = Dates.toLocalDate(date); // "2023-05-06T14:10:12.191Z"
   * ```
   *
   * @param {Date} date Contains an ISO 8601 date string.
   * @return {Date} a date object representing the local date.
   */
  public static toLocalDate(date: string): Date;
  /**
   * Converts a Universal Coordinated Time (UTC) date object to a local
   * date object.
   *
   * **Usage Examples:**
   * ```typescript
   * // some utc date
   * const date = new Date(); // "2023-05-06T12:10:12.191Z" (MESZ)
   * // assume the local date is UTC/GMT +2 hrs
   * const localDate = Dates.toLocalDate(date); // "2023-05-06T14:10:12.191Z"
   * ```
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Date} a date object representing the local date.
   */
  public static toLocalDate(date: Date | number | string): Date;
  /**
   * Converts a Universal Coordinated Time (UTC) date object to a local
   * date object.
   *
   * **Usage Examples:**
   * ```typescript
   * // some utc date
   * const date = new Date(); // "2023-05-06T12:10:12.191Z" (MESZ)
   * // assume the local date is UTC/GMT +2 hrs
   * const localDate = Dates.toLocalDate(date); // "2023-05-06T14:10:12.191Z"
   * ```
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Date} a date object representing the local date.
   */
  public static toLocalDate(date: Date | number | string): Date {
    const dateObj = Dates.tryParse(date),
      offsetInMs = dateObj.getTimezoneOffset() * Dates.MS_IN_MINUTE,
      localDate = new Date(dateObj.getTime() + offsetInMs),
      offset = dateObj.getTimezoneOffset() / 60,
      hours = dateObj.getHours();
    localDate.setHours(hours - offset);
    return localDate;
  }

  /**
   * Gets the Coordinated Universal Time (UTC) right now.
   */
  public static get utcNow(): Date {
    return new Date();
  }

  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Date} other Contains some other date object.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: Date, other: Date): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: Date, other: number): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Date} date Contains some date object.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: Date, other: string): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: number, other: Date): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: number, other: number): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Number} date Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: number, other: string): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Date} other Contains some date object.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: string, other: Date): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {Number} other Contains the milliseconds from midnight,
   * January 1, 1970 UTC.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: string, other: number): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {String} date Contains an ISO 8601 date string.
   * @param {String} other Contains an ISO 8601 date string.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(date: string, other: string): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {String} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {String} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number;
  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(
      date: Date | number | string,
      other: Date | number | string,
  ): number {
    return Dates.monthsDifference(date, other) / 12;
  }

  /**
   * Parses the given value as a date object.
   *
   * @param {Date} value Contains some string, number or Date object.
   * If this argument is not defined, the current date is returned.
   * @return {Date} a date object in case the specified value can be
   * parsed as a date object; otherwise `null`.
   *
   * @private
   */
  private static from(value?: Date | number | string): Date | null {
    if (Dates.isDate(value) && Dates.isValid(value)) {
      return value;
    }

    value ??= new Date();
    // if the value is an ISO 8601 date string, parse it
    if (Strings.isString(value)) {
      return Dates.parseISO(value);
    } else {
      if (Dates.isDate(value) === false) {
        value = new Date(value);
        if (Dates.isValid(value)) {
          return value;
        }
      }
    }
    return null;
  }

  /**
   * Gets the timezone offset in milliseconds.
   *
   * @param {Date} date Contains some date object.
   * @return {Number} the timezone offset in milliseconds.
   */
  private static getTimezoneOffset(date: Date): number {
    const utc = new Date(Dates.getUTC(date));
    utc.setUTCFullYear(date.getFullYear());
    return date.getTime() - utc.getTime();
  }

  /**
   * Tries to parse the specified value of either of the types `string`,
   * `number` or `Date` as a `Date` object; otherwise throws `TypeError`.
   *
   * @param {Date} value Contains some date.
   * @return {Date} the parsed date.
   *
   * @private
   */
  private static tryParse(value: Date | number | string): Date {
    const date = Dates.from(value);
    if (date === null) {
      throw new TypeError(`Cannot parse date: "${String(value)}"`);
    }
    return date;
  }

  /**
   * Checks whether the specified number is positive or zero; otheriwse
   * throws `TypeError`.
   *
   * @param {Number} nr Contains some number.
   *
   * @private
   */
  private static nonNegative(nr: number): void {
    if (nr < 0) {
      throw new TypeError(`${String(nr)} is not a valid natural number.`);
    }
  }
}
