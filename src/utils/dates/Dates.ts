import { Numbers } from '../numbers/Numbers';

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
  public static readonly MS_IN_HOUR: number = 36e5 as const;

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
   * Adds the given number of days to the date object.
   *
   * @param date Contains some date object.
   * @param days Contains the number of days to add.
   * @returns a date object.
   */
  public static addDays(date: Date, days: number): Date {
    Dates.validateNaturalNumber(days);
    if (days === 0) {
      return date;
    }

    Dates.validate(date);
    const result = new Date(date.valueOf());
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Adds the specified number of milliseconds to the given date object.
   *
   * @param date Contains some date object.
   * @param ms Contains the number of milliseconds to add to the given date.
   * @returns a date object.
   */
  public static addMilliseconds(date: Date, ms: number): Date {
    Dates.validateNaturalNumber(ms);
    if (ms === 0) {
      return date;
    }

    Dates.validate(date);
    return new Date(date.getTime() + ms);
  }

  /**
   * Adds the specified number of minutes to the given date object.
   *
   * @param date Contains some date object.
   * @param minutes Contains the number of minutes to add to the specified date.
   * @returns a date object.
   */
  public static addMinutes(date: Date, minutes: number): Date {
    Dates.validateNaturalNumber(minutes);
    if (minutes === 0) {
      return date;
    }

    Dates.validate(date);
    return Dates.addMilliseconds(date, minutes * Dates.MS_IN_MINUTE);
  }

  /**
   * Adds the specified number of months to the given date object.
   *
   * @param date Contains some date object.
   * @param months Contains the number of months to add to the specified date.
   * @returns a date object.
   */
  public static addMonths(date: Date, months: number): Date {
    Dates.validateNaturalNumber(months);
    if (months === 0) {
      return date;
    }

    return new Date(date.setMonth(date.getMonth() + months));
  }

  /**
   * Adds the specified number of seconds to the given date object.
   *
   * @param date Contains some date object.
   * @param seconds Contains the number of seconds to add to the specified date.
   * @returns a date object.
   */
  public static addSeconds(date: Date, seconds: number): Date {
    Dates.validateNaturalNumber(seconds);
    if (seconds === 0) {
      return date;
    }

    return Dates.addMilliseconds(date, seconds * Dates.MS_IN_SECOND);
  }

  /**
   * Adds the specified number of weeks to the given date object.
   *
   * @param date Contains some date object.
   * @param weeks Contains the number of weeks to add to the specified date.
   * @returns a date object.
   */
  public static addWeeks(date: Date, weeks: number): Date {
    Dates.validateNaturalNumber(weeks);
    if (weeks === 0) {
      return date;
    }

    const days = weeks * 7;
    return Dates.addDays(date, days);
  }

  /**
   * Adds the specified number of years to the given date object.
   *
   * @param date Contains some date object.
   * @param years Contains the number of years to add to the specified date.
   * @returns a date object.
   */
  public static addYears(date: Date, years: number): Date {
    Dates.validateNaturalNumber(years);
    if (years === 0) {
      return date;
    }

    return Dates.addMonths(date, years * 12);
  }

  /**
   * Gets the date after tomorrow. The time is ignored.
   */
  public static get afterTomorrow(): Date {
    return Dates.addDays(Dates.today, 2);
  }

  /**
   * Clones a date object.
   *
   * @param date Contains some date object.
   * @returns a cloned copy of the given date object. 
   */
  public static clone(date: Date): Date {
    Dates.validate(date);
    return new Date(date.getTime());
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
   * Gets the days difference between the two dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the days difference between the two dates.
   */
  public static daysDifference(date: Date, other: Date): number {
    const timeDifference = Dates.timeDifference(date, other);
    return Math.ceil(timeDifference / Dates.MS_IN_DAY);
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
  }

  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param fromDate Contains some date object.
   * @returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   */
  public static getUTC(fromDate: Date): number {
    Dates.validate(fromDate);
    const yy = fromDate.getFullYear();
    const MM = fromDate.getMonth();
    const dd = fromDate.getDate();
    const hh = fromDate.getHours();
    const mm = fromDate.getMinutes();
    const ss = fromDate.getSeconds();
    const ms = fromDate.getMilliseconds();
    return Date.UTC(yy, MM, dd, hh, mm, ss, ms);
  }

  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: Date, other: Date): number {
    Dates.validate(date);
    Dates.validate(other);
    return Math.abs(date.getTime() - other.getTime()) / Dates.MS_IN_HOUR;
  }

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
    incl: '(]' | '()' | '[]' | '[)' = '()'
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
   * @param value Contains some value.
   * @returns whether the given value is a date object.
   */
  public static isDate(value?: any): value is Date {
    const proto = Object.prototype.toString.call(value);
    return value instanceof Date || proto === '[object Date]';
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
   * Checks whether the given date object is valid.
   *
   * @param date Contains some date object.
   * @returns whether the given value is a valid date object.
   */
  public static isValid(date: Date): boolean {
    return Dates.isDate(date) && !Number.isNaN(date.valueOf());
  }

  /**
   * Gets the difference in milliseconds between the two specified dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in milliseconds between the two specified dates.
   */
  public static millisecondsDifference(date: Date, other: Date): number {
    Dates.validate(date);
    Dates.validate(other);
    return date.getTime() - other.getTime();
  }

  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in minutes between the two specified dates.
   */
  public static minutesDifference(date: Date, other: Date): number {
    Dates.validate(date);
    Dates.validate(other);
    const msDifference = Dates.millisecondsDifference(date, other);
    return Math.round(((msDifference % Dates.MS_IN_DAY) % 36e5) / 6e4);
  }

  /**
   * Gets the difference in months between the two specified dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in months between the two specified dates.
   */
  public static monthsDifference(date: Date, other: Date) {
    let months;
    months = (other.getFullYear() - date.getFullYear()) * 12;
    months -= date.getMonth();
    months += other.getMonth();
    if (months <= 0) {
      return 0;
    }

    return months;
  }

  /**
   * Gets the date and time now.
   */
  public static get now(): Date {
    return new Date();
  }

  /**
   * Parses a value as a date.
   *
   * @param value Contains some value.
   * @returns a date object in case the given value represents
   * a valid date; otherwise null.
   */
  public static parse(value?: any): Date | null {
    if (Dates.isValid(value)) {
      return value;
    }

    const ms = Date.parse(value);
    const date = new Date(ms);
    if (Dates.isValid(date)) {
      const offset = Dates.getTimezoneOffset(date);
      return new Date(date.getTime() - offset);
    }

    return null;
  }

  /**
   * Removes the given number of days to the date object.
   *
   * @param date Contains some date object.
   * @param days Contains the number of days to remove.
   * @returns a date object.
   */
  public static removeDays(date: Date, days: number): Date {
    Dates.validateNaturalNumber(days);
    if (days === 0) {
      return date;
    }

    Dates.validate(date);
    const result = new Date(date.valueOf());
    result.setDate(result.getDate() - days);
    return result;
  }

  /**
   * Gets the time difference between the two dates in milliseconds.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the time difference between the two dates in milliseconds.
   */
  public static timeDifference(date: Date, other: Date): number {
    Dates.validate(date);
    Dates.validate(other);
    return Math.abs(date.getTime() - other.getTime());
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
   * Gets the difference in years between the two specified dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in years between the two specified dates.
   */
  public static yearsDifference(date: Date, other: Date): number {
    Dates.validate(date);
    Dates.validate(other);
    return Dates.monthsDifference(date, other) / 12;
  }

  /**
   * Gets the date yesterday. The time is ignored.
   */
  public static get yesterday(): Date {
    return Dates.removeDays(Dates.today, 1);
  }

  /**
   * Gets the timezone offset in milliseconds.
   *
   * @param date Contains some date object.
   * @returns the timezone offset in milliseconds.
   */
  private static getTimezoneOffset(date: Date): number {
    const utc = new Date(Dates.getUTC(date));
    utc.setUTCFullYear(date.getFullYear())
    return date.getTime() - utc.getTime()
  }

  /**
   * Validates a date object.
   *
   * @param date Contains some date object.
   *
   * @private
   */
  private static validate(date: Date): void {
    if (!Dates.isValid(date)) {
      throw new TypeError(`"${String(date)}" is not a valid date object.`);
    }
  }

  /**
   * Validates a natural number.
   *
   * @param nr Contains some number.
   *
   * @private
   */
  private static validateNaturalNumber(nr: number): void {
    if (!Numbers.isNaturalNumber(nr)) {
      throw new TypeError(`${String(nr)} is not a valid natural number.`);
    }
  }
}
