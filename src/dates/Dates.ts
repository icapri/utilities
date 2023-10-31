import {Numbers} from '../numbers/Numbers';
import {Strings} from '../strings/Strings';

type DateLike = Date | number | string;

export type {
  DateLike,
};

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
   * Adds the specified number of days to the specified date object, an ISO 8601
   * date string or the milliseconds from midnight, January 1, 1970 UTC.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to add to the specified
   * date.
   * @return {Date} a date object.
   */
  public static addDays(date: DateLike, days: number): Date {
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
   * @param {Date} date Contains a date object, an ISO 8601 date string or the
   * milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} ms Contains the number of milliseconds to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMilliseconds(
      date: DateLike,
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
   * Adds the specified number of minutes to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date
   * string or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} minutes Contains the number of minutes to add
   * to the specified date.
   * @return {Date} a date object.
   */
  public static addMinutes(
      date: DateLike,
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
   * Adds the specified number of months to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} months Contains the number of months to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addMonths(date: DateLike, months: number): Date {
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
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} seconds Contains the number of seconds to add to
   * the specified date.
   * @return {Date} a date object.
   */
  public static addSeconds(
      date: DateLike,
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
   * Adds the specified number of weeks to the given date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} weeks Contains the number of weeks to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addWeeks(date: DateLike, weeks: number): Date {
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
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} years Contains the number of years to add to the
   * specified date.
   * @return {Date} a date object.
   */
  public static addYears(date: DateLike, years: number): Date {
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
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC. If this is not
   * defined the midnight date of the current date is used.
   * @return {Date} a date object.
   */
  public static atStartOfDay(date?: string | number | Date): Date {
    return Dates.dateOnly(date ?? Dates.now);
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
   * Gets the current week number.
   *
   * @since `v2.1.1`
   */
  public static get currentWeek(): number {
    return Dates.getWeek(new Date());
  }

  /**
   * Gets the date part of the date object i. e. the time is zeroed.
   *
   * @param {*} date Contains some date object, the milliseconds from
   * midnight, January 1, 1970 UTC or an ISO 8601 date string.
   * @return {Date} only the date part of the date object i. e. the time
   * is zeroed.
   *
   * @see `Dates.atStartOfDay()`
   */
  public static dateOnly(date: DateLike): Date {
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
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} round Contains whether to round the days difference.
   * Defaults to `false`.
   * @return {Number} the days difference between the two dates.
   */
  public static daysDifference(
      date: DateLike,
      other: DateLike,
      round: boolean = false,
  ): number {
    const days = Dates.millisecondsDifference(date, other) / Dates.MS_IN_DAY;
    return round ? Math.round(days) : days;
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
   * @param {*} a Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {*} b Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the two date objects are equal.
   */
  public static equals(
      a: DateLike,
      b: DateLike,
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
   * Gets the first day of the specified week of the specified year.
   *
   * @param {Number} year Contains the year number.
   * @param {Number} weekNo Contains the week number.
   *
   * @return {Date} the first day of the specified week of the specified year.
   *
   * @since `v2.1.1`
   */
  public static firstDayOfWeek(year: number, weekNo: number): Date {
    // first validate the year and the week
    if (!Numbers.isInteger(year) || year < 0 || year > 9999) {
      throw new Error(`Invalid year "${year}".`);
    }

    if (!Numbers.isInteger(weekNo) || weekNo < 1 || weekNo > 53) {
      throw new Error(`Invalid week number "${weekNo}".`);
    }

    const date = new Date(year, 0, 1), offset = date.getTimezoneOffset();
    // according to the ISO standard week #1 is the one with the year's
    // first Thursday so the nearest Thursday is a calculation of the
    // current date + 4 - current day number
    // sunday is converted from 0 to 7
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    // 7 days * (week - overlapping first week)
    date.setTime(
        date.getTime() +
        7 * 24 * 60 * 60 * 1000 * (
          weekNo + (year === date.getFullYear() ? -1 : 0)
        ),
    );
    // daylight savings fix
    date.setTime(
        date.getTime() +
        (date.getTimezoneOffset() - offset) * 60 * 1000,
    );
    // back to Monday (from Thursday)
    date.setDate(date.getDate() - 3);
    return date;
  }

  /**
   * Gets the Standard Time timezone offset.
   *
   * @param {DateLike} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the standard timezone offset.
   *
   * @since `v2.1.1`
   */
  public static getStdTimezoneOffset(date: DateLike): number {
    const dateObj = Dates.tryParse(date);
    const jan1st = new Date(dateObj.getFullYear(), 0, 1);
    const jul1st = new Date(dateObj.getFullYear(), 6, 1);
    return Math.max(jan1st.getTimezoneOffset(), jul1st.getTimezoneOffset());
  }

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
  public static getUTC(date: DateLike): number {
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
   * Gets the ISO week number of the specified date.
   *
   * **Usage Examples:**
   * ```typescript
   * Dates.getWeek("2023-05-05T11:13:27.000Z"); // 18
   * Dates.getWeek("2024-01-01T11:13:27.000Z"); // 1
   * Dates.getWeek("2023-10-03T11:13:27.000Z"); // 40
   * ```
   *
   * @param {DateLike} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the ISO week number.
   */
  public static getWeek(date: DateLike): number {
    let r: any = Dates.tryParse(date);
    r = new Date(Date.UTC(r.getFullYear(), r.getMonth(), r.getDate()));
    r.setUTCDate(r.getUTCDate() + 4 - (r.getUTCDay() || 7));
    const s: any = new Date(Date.UTC(r.getUTCFullYear(), 0, 1));
    return Math.ceil((((r - s) / Dates.MS_IN_DAY) + 1) / 7);
  }

  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} round Contains whether to round the hours difference.
   * Defaults to `false`.
   * @return {Number} the difference in hours between the two specified dates.
   */
  public static hoursDifference(
      date: DateLike,
      other: DateLike,
      round: boolean = false,
  ): number {
    const hrs = Dates.millisecondsDifference(date, other) / Dates.MS_IN_HOUR;
    return round ? Math.round(hrs) : hrs;
  }

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
      date: DateLike,
      other: DateLike,
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
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} ignoreTime Contains whether to ignore the time part
   * of both date objects during the comparison.
   * @return {Boolean} whether the first date is before the second one.
   */
  public static isBefore(
      date: DateLike,
      other: DateLike,
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
      date: DateLike,
      from: DateLike,
      to: DateLike,
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
   * Dates.isDateObject(new Date('I am not valid')); // true
   * Dates.isDateObject(new Date()); // true
   * ```
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the given value is a date object.
   */
  public static isDateObject(value?: any): value is Date {
    const proto = Object.prototype.toString.call(value);
    return proto === '[object Date]';
  }

  /**
   * Checks whether the specified date belongs to the Daylight Saving
   * Time (DST).
   *
   * @param {DateLike} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Boolean} whether the specified date belongs to the Daylight
   * Saving Time (DST).
   *
   * @since `v2.1.1`
   */
  public static isDST(date: DateLike): boolean {
    const dateObj = Dates.tryParse(date);
    return dateObj.getTimezoneOffset() < Dates.getStdTimezoneOffset(dateObj);
  }

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
      date: DateLike,
      ignoreTime: boolean = false,
  ): boolean {
    const now = Dates.now;
    if (ignoreTime) {
      return Dates.isAfter(Dates.dateOnly(date), now);
    }
    return Dates.isAfter(date, now);
  }

  /**
   * Checks whether the specified string is a valid UTC ISO 8601 date string
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
   * Checks whether the given value is a date object and is valid i. e.
   * it represents a valid date.
   *
   * @param {Date} date Contains some date object.
   * @return {Boolean} whether the given value is a valid date object.
   */
  public static isValid(date: Date): boolean {
    return Dates.isDateObject(date) && !Number.isNaN(date.valueOf());
  }

  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param {*} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {*} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @return {Number} the difference in milliseconds between the two
   * specified dates.
   */
  public static millisecondsDifference(
      date: DateLike,
      other: DateLike,
  ): number {
    const dateObj = Dates.tryParse(date), otherObj = Dates.tryParse(other);
    return Numbers.abs(dateObj.getTime() - otherObj.getTime());
  }

  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} round Contains whether to round the minutes difference.
   * Defaults to `false`.
   * @return {Number} the difference in minutes between the two specified dates.
   */
  public static minutesDifference(
      date: DateLike,
      other: DateLike,
      round: boolean = false,
  ): number {
    const mins = Dates.millisecondsDifference(date, other) / Dates.MS_IN_MINUTE;
    return round ? Math.round(mins) : mins;
  }

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
      date: DateLike,
      other: DateLike,
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
   * a valid date; otherwise `null`.
   */
  public static parse(value?: any): Date | null {
    let ret: Date | null = null;
    if (Dates.isDateObject(value) && Dates.isValid(value)) {
      ret = value;
    } else if (Strings.isString(value) &&
      Strings.isNotEmpty(value) &&
      !Strings.hasWhitespace(value)) {
      const date = new Date(value);
      if (Dates.isDateObject(date) && Dates.isValid(date)) {
        ret = date;
      }
    } else if (Numbers.isNumber(value) &&
      Numbers.isPositiveInteger(value) && value <= Dates.MAX_ALLOWED_TIME) {
      const date = new Date(value);
      if (Dates.isDateObject(date) && Dates.isValid(date)) {
        ret = date;
      }
    }

    return ret;
  }

  /**
   * Removes the given number of days from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} days Contains the number of days to remove.
   * @return {Date} a date object.
   */
  public static removeDays(date: DateLike, days: number): Date {
    Dates.nonNegative(days);
    const dateObj = Dates.tryParse(date);
    if (days !== 0) {
      dateObj.setDate(dateObj.getDate() - days);
    }
    return dateObj;
  }

  /**
   * Removes the given number of milliseconds from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} milliseconds Contains the number of milliseconds to remove.
   * @return {Date} a date object.
   *
   * @since `v2.1.1`
   */
  public static removeMilliseconds(date: DateLike, milliseconds: number): Date {
    Dates.nonNegative(milliseconds);
    const dateObj = Dates.tryParse(date);
    if (milliseconds !== 0) {
      dateObj.setMilliseconds(dateObj.getMilliseconds() - milliseconds);
    }
    return dateObj;
  }

  /**
   * Removes the given number of minutes from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} minutes Contains the number of minutes to remove.
   * @return {Date} a date object.
   *
   * @since `v2.1.1`
   */
  public static removeMinutes(date: DateLike, minutes: number): Date {
    Dates.nonNegative(minutes);
    const dateObj = Dates.tryParse(date);
    if (minutes !== 0) {
      dateObj.setMinutes(dateObj.getMinutes() - minutes);
    }
    return dateObj;
  }

  /**
   * Removes the given number of months from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} months Contains the number of months to remove.
   * @return {Date} a date object.
   *
   * @since `v2.1.1`
   */
  public static removeMonths(date: DateLike, months: number): Date {
    Dates.nonNegative(months);
    const dateObj = Dates.tryParse(date);
    if (months !== 0) {
      dateObj.setMonth(dateObj.getMonth() - months);
    }
    return dateObj;
  }

  /**
   * Removes the given number of seconds from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} seconds Contains the number of seconds to remove.
   * @return {Date} a date object.
   *
   * @since `v2.1.1`
   */
  public static removeSeconds(date: DateLike, seconds: number): Date {
    Dates.nonNegative(seconds);
    const dateObj = Dates.tryParse(date);
    if (seconds !== 0) {
      dateObj.setSeconds(dateObj.getSeconds() - seconds);
    }
    return dateObj;
  }

  /**
   * Removes the given number of weeks from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} weeks Contains the number of weeks to remove.
   * @return {Date} a date object.
   *
   * @since `v2.1.1`
   */
  public static removeWeeks(date: DateLike, weeks: number): Date {
    return Dates.removeDays(date, weeks * 7);
  }

  /**
   * Removes the given number of years from the specified date.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} years Contains the number of years to remove.
   * @return {Date} a date object.
   *
   * @since `v2.1.1`
   */
  public static removeYears(date: DateLike, years: number): Date {
    return Dates.removeMonths(date, years * 12);
  }

  /**
   * Gets the days difference between the two specified dates.
   *
   * @param {DateLike} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {DateLike} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} round Contains whether to round the number of days
   * difference.
   * @return {Number} the days difference.
   */
  public static secondsDifference(
      date: DateLike,
      other: DateLike,
      round: boolean = false,
  ): number {
    const secs = Dates.millisecondsDifference(date, other) / Dates.MS_IN_SECOND;
    return round ? Math.round(secs) : secs;
  }

  /**
   * Gets the Coordinated Universal Time (UTC) right now.
   */
  public static get utcNow(): Date {
    return new Date();
  }

  /**
   * Gets the weeks difference between the two specified dates.
   *
   * @param {DateLike} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {DateLike} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Number} round Contains whether to round the number of weeks
   * difference.
   * @return {Number} the weeks difference.
   *
   * @since `v2.1.2`
   */
  public static weeksDifference(
      date: DateLike,
      other: DateLike,
      round: boolean = false,
  ): number {
    const weeks = Dates.daysDifference(date, other) / 7;
    return round ? Math.round(weeks) : weeks;
  }

  /**
   * Gets the difference in years between the two specified dates.
   *
   * @param {Date} date Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Date} other Contains a date object, an ISO 8601 date string
   * or the milliseconds from midnight, January 1, 1970 UTC.
   * @param {Boolean} round Contains whether to round the years difference.
   * Defaults to `false`.
   * @return {Number} the difference in years between the two specified dates.
   */
  public static yearsDifference(
      date: DateLike,
      other: DateLike,
      round: boolean = false,
  ): number {
    const years = Dates.monthsDifference(date, other) / 12;
    return round ? Math.round(years) : years;
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
  private static tryParse(value: DateLike): Date {
    const parsedValue = Dates.parse(value);
    if (parsedValue === null) {
      throw new TypeError(`Cannot parse date: "${JSON.stringify(value)}"`);
    }
    return parsedValue;
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
