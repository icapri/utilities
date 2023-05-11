import { Numbers } from '../numbers/Numbers';
import { Strings } from '../strings/Strings';

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

  /** @private */
  private constructor() {
    throw new Error('Cannot create an instance of an abstract class.');
  }

  /**
   * Adds the given number of days to the date object.
   *
   * @param date Contains some date object.
   * @param days Contains the number of days to add.
   * @returns a date object.
   */
  public static addDays(date: string | number | Date, days: number): Date {
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
   * Adds the specified number of milliseconds to the given date object.
   *
   * @param date Contains some date object.
   * @param ms Contains the number of milliseconds to add to the given date.
   * @returns a date object.
   */
  public static addMilliseconds(date: string | number | Date, ms: number): Date {
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
   * @param date Contains some date object.
   * @param minutes Contains the number of minutes to add to the specified date.
   * @returns a date object.
   */
  public static addMinutes(date: string | number | Date, minutes: number): Date {
    Dates.nonNegative(minutes);
    const dateObj = Dates.tryParse(date);
    if (minutes === 0) {
      return dateObj;
    }

    return new Date(dateObj.getTime() + minutes * Dates.MS_IN_MINUTE);
  }

  /**
   * Adds the specified number of months to the given date object.
   *
   * @param date Contains some date object.
   * @param months Contains the number of months to add to the specified date.
   * @returns a date object.
   */
  public static addMonths(date: string | number | Date, months: number): Date {
    Dates.nonNegative(months);
    const dateObj = Dates.tryParse(date);
    if (months === 0) {
      return dateObj;
    }

    return new Date(dateObj.setMonth(dateObj.getMonth() + months));
  }

  /**
   * Adds the specified number of seconds to the given date object.
   *
   * @param date Contains some date object.
   * @param seconds Contains the number of seconds to add to the specified date.
   * @returns a date object.
   */
  public static addSeconds(date: string | number | Date, seconds: number): Date {
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
   * @param date Contains some date object.
   * @param weeks Contains the number of weeks to add to the specified date.
   * @returns a date object.
   */
  public static addWeeks(date: string | number | Date, weeks: number): Date {
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
   * @param date Contains some date object.
   * @param years Contains the number of years to add to the specified date.
   * @returns a date object.
   */
  public static addYears(date: string | number | Date, years: number): Date {
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
   * **Example:**
   * ```typescript
   * const date = new Date("2023-05-06T11:59:04.623Z");
   * const midnight = Dates.atStartOfDay(date); // "2023-05-06T00:00:00.000Z"
   * ```
   *
   * @param date Contains some date object. If this is not defined
   * the midnight date of the current date is used.
   * @returns a date object.
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
   * @param date Contains some date object.
   * @returns a cloned copy of the given date object. 
   */
  public static clone(date: Date): Date {
    return new Date(date.getTime());
  }

  /**
   * Compares two date objects. Useful for array sorting.
   *
   * @param a Contains some date object.
   * @param b Contains some other date object.
   * @returns
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
   * @param date Contains some date object.
   * @returns only the date part of the date object i. e. the time
   * is zeroed.
   */
  public static dateOnly(date: string | number | Date): Date {
    const dateObj = Dates.tryParse(date);
    const msFromDayStart = dateObj.getTime() % Dates.MS_IN_DAY;
    return new Date(dateObj.getTime() - msFromDayStart);
  }

  /**
   * Gets the days difference between the two dates.
   *
   * _Note:_ The time of the day object is not taken into account from this
   * method.
   *
   * **Example:**
   * ```typescript
   * const now = Dates.now; // "2023-05-06T14:31:13.661Z"
   * const afterTomorrow = Dates.afterTomorrow; // "2023-05-08T14:31:13.662Z"
   * const daysDiff = Dates.daysDifference(now, afterTomorrow); // 3
   * ```
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the days difference between the two dates.
   */
  public static daysDifference(date: string | number | Date, other: string | number | Date): number {
    const dateObj = Dates.tryParse(date);
    const otherObj = Dates.tryParse(other);
    const timeDiff = Dates.timeDifference(dateObj, otherObj);
    return Math.ceil(timeDiff / Dates.MS_IN_DAY);
  }

  /**
   * Gets the number of days in the specified month of the specified year.
   *
   * @param month Contains the month index. The indexes start from `1` (January).
   * @param year Contains the year.
   * @returns the number of days in the given month of the given year.
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
   * @param a Contains some date object.
   * @param b Contains some other date object.
   * @param ignoreTime Contains whether to ignore the time part of both date
   * objects during the comparison.
   * @returns whether the two date objects are equal.
   */
  public static equals(
    a: string | number | Date,
    b: string | number | Date,
    ignoreTime: boolean = false
  ): boolean {
    const aObj = Dates.tryParse(a);
    const bObj = Dates.tryParse(b);
    if (ignoreTime) {
      const x = Dates.dateOnly(a);
      const y = Dates.dateOnly(b);
      return x.getTime() === y.getTime();
    }

    return aObj.getTime() === bObj.getTime();
  }

  /**
   * Returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   *
   * @param fromDate Contains some date object.
   * @returns the number of ms between midnight, January 1, 1970 Universal
   * Coordinated Time a. k. a. GMT and the given date.
   */
  public static getUTC(fromDate: string | number | Date): number {
    const fromDateObj = Dates.tryParse(fromDate);
    const yy = fromDateObj.getFullYear();
    const MM = fromDateObj.getMonth();
    const dd = fromDateObj.getDate();
    const hh = fromDateObj.getHours();
    const mm = fromDateObj.getMinutes();
    const ss = fromDateObj.getSeconds();
    const ms = fromDateObj.getMilliseconds();
    return Date.UTC(yy, MM, dd, hh, mm, ss, ms);
  }

  /**
   * Gets the difference in hours between the two specified dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in hours between the two specified dates.
   */
  public static hoursDifference(date: string | number | Date, other: string | number | Date): number {
    const dateObj = Dates.tryParse(date);
    const otherObj = Dates.tryParse(other);
    return Numbers.abs(dateObj.getTime() - otherObj.getTime()) / Dates.MS_IN_HOUR;
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
  public static isAfter(
    date: string | number | Date,
    other: string | number | Date,
    ignoreTime: boolean = false
  ): boolean {
    if (ignoreTime) {
      const x = Dates.dateOnly(date);
      const y = Dates.dateOnly(other);
      return x.getTime() > y.getTime();
    }

    const dateObj = Dates.tryParse(date);
    const otherObj = Dates.tryParse(other);
    return dateObj.getTime() > otherObj.getTime();
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
  public static isBefore(
    date: string | number | Date,
    other: string | number | Date,
    ignoreTime: boolean = false
  ): boolean {
    if (ignoreTime) {
      const x = Dates.dateOnly(date);
      const y = Dates.dateOnly(other);
      return x.getTime() < y.getTime();
    }

    const dateObj = Dates.tryParse(date);
    const otherObj = Dates.tryParse(other);
    return dateObj.getTime() < otherObj.getTime();
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
    date: string | number | Date,
    from: string | number | Date,
    to: string | number | Date,
    incl: '(]' | '()' | '[]' | '[)' = '()'
  ): boolean {
    if (!['()', '[]', '(]', '[)'].includes(incl)) {
      throw new TypeError('Inclusivity type must be one of (), [], (], [)');
    }

    const isBeforeEqual = incl[0] === '[', isAfterEqual = incl[1] === ']';
    return (
      isBeforeEqual
        ? (Dates.equals(from, date) || Dates.isBefore(from, date))
        : Dates.isBefore(from, date)
    ) && (
        isAfterEqual
          ? (Dates.equals(to, date) || Dates.isAfter(to, date))
          : Dates.isAfter(to, date)
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
  public static isFuture(date: string | number | Date, ignoreTime: boolean = false): boolean {
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
   * **Example:**
   * ```typescript
   * Dates.isISOString('2023-11-11T23:15:22.999Z'); // true
   * Dates.isISOString('2023-13-11T23:15:22.999Z'); // false
   * ```
   *
   * @param str Contains some string.
   * @returns whether the specified string is a valid ISO 8601 date string.
   */
  public static isISOString(str?: string): str is string {
    if (typeof str !== 'string' || str.length !== 24) return false;
    const iso = str;
    if ((iso.charAt(4) === '-')
      && (iso.charAt(7) === '-')
      && (iso.charAt(10) === 'T')
      && (iso.charAt(13) === ':')
      && (iso.charAt(16) === ':')
      && (iso.charAt(19) === '.')
      && (iso.charAt(23) === 'Z')) {
      const year = +iso.substring(0, 4);
      const month = +iso.substring(5, 7);
      const day = +iso.substring(8, 10);
      const hour = +iso.substring(11, 13);
      const minutes = +iso.substring(14, 16);
      const seconds = +iso.substring(17, 19);
      const milliseconds = +iso.substring(20, 23);
      if (Numbers.isNatural(year)
        && Numbers.isNatural(month)
        && Numbers.isNatural(day)
        && Numbers.isNatural(hour)
        && Numbers.isNatural(minutes)
        && Numbers.isNatural(seconds)
        && Numbers.isNatural(milliseconds)
      ) {
        return year >= 0
          && year <= 9999
          && month > 0
          && month <= 12
          && hour >= 0
          && hour <= 23
          && minutes >= 0
          && minutes <= 59
          && seconds >= 0
          && seconds < 60
          && milliseconds >= 0
          && milliseconds <= 999
          && day > 0 && day <= Dates.daysOfMonth(month, year);
      }
    }
    return false;
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
  public static millisecondsDifference(date: string | number | Date, other: string | number | Date): number {
    const dateObj = Dates.tryParse(date);
    const otherObj = Dates.tryParse(other);
    return Numbers.abs(dateObj.getTime() - otherObj.getTime());
  }

  /**
   * Gets the difference in minutes between the two specified dates.
   *
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in minutes between the two specified dates.
   */
  public static minutesDifference(date: string | number | Date, other: string | number | Date): number {
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
  public static monthsDifference(date: string | number | Date, other: string | number | Date) {
    const dateObj = Dates.tryParse(date);
    const otherObj = Dates.tryParse(other);
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
    const dateNow = new Date();
    const offset = Dates.getTimezoneOffset(dateNow);
    return new Date(dateNow.valueOf() - offset);
  }

  /**
   * Parses a value as a date.
   *
   * @param value Contains some value.
   * @returns a date object in case the given value represents
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
   * **Example:**
   * ```typescript
   * Dates.parseISO('2023'); // Date: "2023-01-01T00:00:00.000Z"
   * Dates.parseISO('2023-05'); // Date: "2023-05-01T00:00:00.000Z"
   * Dates.parseISO('2023-05-09T23'); // Date: "2023-05-09T23:00:00.000Z"
   * Dates.parseISO('2023-05-09T23:15'); // Date: "2023-05-09T23:15:00.000Z"
   * Dates.parseISO('2023-05-09T23:15:22'); // Date: "2023-05-09T23:15:22.000Z"
   * Dates.parseISO('2023-05-09T23:15:22.123Z'); // Date: "2023-05-09T23:15:22.123Z"
   * ```
   *
   * @param str Contains some string.
   * @returns a date object if the specified string is a valid
   * ISO 8601 date string; otherwise `null`.
   */
  public static parseISO(str?: string): Date | null {
    if (!Strings.isString(str) || str.length === 0) return null;
    const iso = str.trim(), len = iso.length;
    if (Strings.isEmpty(iso)) return null;
    if (len <= 24) {
      const s1 = iso.charAt(4);
      const s2 = iso.charAt(7);
      const s3 = iso.charAt(10);
      const s4 = iso.charAt(13);
      const s5 = iso.charAt(16);
      const s6 = iso.charAt(19);
      const s7 = iso.charAt(23);

      if (
        (s1 !== '-' && s1 !== '')
        || (s2 !== '-' && s2 !== '')
        || (s3 !== 'T' && s3 !== '')
        || (s4 !== ':' && s4 !== '')
        || (s5 !== ':' && s5 !== '')
        || (s6 !== '.' && s6 !== '')
        || (s7 !== 'Z' && s7 !== '')
      ) {
        return null;
      }

      const yStr = iso.substring(0, 4);
      if (Strings.isEmpty(yStr)) return null;
      const MStr = iso.substring(5, 7);
      const dStr = iso.substring(8, 10);
      const hStr = iso.substring(11, 13);
      const mStr = iso.substring(14, 16);
      const sStr = iso.substring(17, 19);
      const msStr = iso.substring(20, 23);

      const year = +yStr;
      const month = Strings.isEmpty(MStr) ? 1 : +MStr;
      const day = Strings.isEmpty(dStr) ? 1 : +dStr;
      const hour = Strings.isEmpty(hStr) ? 0 : +hStr;
      const minutes = Strings.isEmpty(mStr) ? 0 : +mStr;
      const seconds = Strings.isEmpty(sStr) ? 0 : +sStr;
      const milliseconds = Strings.isEmpty(msStr) ? 0 : +msStr;
      if (!Numbers.isNatural(year)
        || !Numbers.isNatural(month)
        || !Numbers.isNatural(day)
        || !Numbers.isNatural(hour)
        || !Numbers.isNatural(minutes)
        || !Numbers.isNatural(seconds)
        || !Numbers.isNatural(milliseconds)
      ) {
        return null;
      }

      if (year >= 0
        && year <= 9999
        && month > 0
        && month <= 12
        && hour >= 0
        && hour <= 24
        && minutes >= 0
        && minutes <= 59
        && seconds >= 0
        && seconds < 60
        && milliseconds >= 0
        && milliseconds <= 999
      ) {
        const daysOfMonth = Dates.daysOfMonth(month, year);
        if (day > 0 && day <= daysOfMonth) {
          const date = new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
          const offset = Dates.getTimezoneOffset(date);
          return new Date(date.valueOf() - offset);
        }
      }
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
  public static removeDays(date: string | number | Date, days: number): Date {
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
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the time difference between the two dates in milliseconds.
   */
  public static timeDifference(
    date: string | number | Date,
    other: string | number | Date
  ): number {
    const dateObj = Dates.tryParse(date);
    const otherObj = Dates.tryParse(other);
    return Numbers.abs(otherObj.getTime() - dateObj.getTime());
  }

  /**
   * Converts a Universal Coordinated Time (UTC) date object to a local
   * date object.
   *
   * **Example:**
   * ```typescript
   * // some utc date
   * const date = new Date(); // "2023-05-06T12:10:12.191Z" (MESZ)
   * // assume the local date is UTC/GMT +2 hrs
   * const localDate = Dates.toLocalDate(date); // "2023-05-06T14:10:12.191Z"
   * ```
   *
   * @param date Contains some date object.
   * @returns a date object representing the local date.
   */
  public static toLocalDate(date: string | number | Date) {
    const dateObj = Dates.tryParse(date);
    const offsetInMs = dateObj.getTimezoneOffset() * Dates.MS_IN_MINUTE;
    const localDate = new Date(dateObj.getTime() + offsetInMs);
    const offset = dateObj.getTimezoneOffset() / 60;
    const hours = dateObj.getHours();
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
   * @param date Contains some date object.
   * @param other Contains some other date object.
   * @returns the difference in years between the two specified dates.
   */
  public static yearsDifference(
    date: string | number | Date,
    other: string | number | Date
  ): number {
    return Dates.monthsDifference(date, other) / 12;
  }

  /**
   * Parses the given value as a date object.
   *
   * @param value Contains some string, number or Date object. If this argument
   * is not defined, the current date is returned.
   * @returns a date object in case the specified value can be parsed as a
   * date object; otherwise `null`.
   *
   * @private
   */
  private static from(value?: string | number | Date): Date | null {
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
   * @param date Contains some date object.
   * @returns the timezone offset in milliseconds.
   */
  private static getTimezoneOffset(date: Date): number {
    const utc = new Date(Dates.getUTC(date));
    utc.setUTCFullYear(date.getFullYear());
    return date.getTime() - utc.getTime();
  }

  /**
   * @private
   */
  private static tryParse(value: string | number | Date): Date {
    const date = Dates.from(value);
    if (date === null) {
      throw new TypeError(`Cannot parse date: "${String(value)}"`);
    }

    return date;
  }

  /**
   * @private
   */
  private static nonNegative(nr: number): void {
    if (nr < 0) {
      throw new TypeError(`${String(nr)} is not a valid natural number.`);
    }
  }
}
