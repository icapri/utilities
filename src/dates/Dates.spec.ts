import {Dates} from './Dates';

describe('Dates', () => {
  const now = Dates.now;

  test('Dates.addDays()', () => {
    expect(Dates.addDays(
        new Date('2023-10-26T21:59:22.000Z'), 4),
    ).toEqual(new Date('2023-10-30T22:59:22.000Z')); // time change 1 hr
    expect(Dates.addDays(
        new Date('2023-10-26T21:59:22.000Z'), 1),
    ).toEqual(new Date('2023-10-27T21:59:22.000Z'));
  });

  test('Dates.addMilliseconds()', () => {
    expect(Dates.addMilliseconds(now, 100).valueOf()).toEqual(
        now.valueOf() + 100,
    );
    expect(Dates.addMilliseconds(
        new Date('2023-10-26T21:59:22.000Z'), 4),
    ).toEqual(new Date('2023-10-26T21:59:22.004Z'));
    expect(Dates.addMilliseconds(
        new Date('2023-10-26T21:59:22.000Z'), 999),
    ).toEqual(new Date('2023-10-26T21:59:22.999Z'));
  });

  test('Dates.addMinutes()', () => {
    expect(Dates.addMinutes(
        new Date('2023-10-26T21:50:22.000Z'), 8),
    ).toEqual(new Date('2023-10-26T21:58:22.000Z'));
    expect(Dates.addMinutes(
        new Date('2023-10-26T21:00:22.000Z'), 120),
    ).toEqual(new Date('2023-10-26T23:00:22.000Z'));
  });

  test('Dates.addMonths()', () => {
    expect(Dates.addMonths(
        new Date('2023-10-26T21:50:22.000Z'), 2),
    ).toEqual(new Date('2023-12-26T22:50:22.000Z')); // time change here
    expect(Dates.addMonths(
        new Date('2023-01-01T11:00:22.000Z'), 12),
    ).toEqual(new Date('2024-01-01T11:00:22.000Z'));
  });

  test('Dates.addSeconds()', () => {
    expect(Dates.addSeconds(
        new Date('2023-10-26T21:50:22.000Z'), 30),
    ).toEqual(new Date('2023-10-26T21:50:52.000Z'));
    expect(Dates.addSeconds(
        new Date('2023-01-01T11:00:22.000Z'), 120),
    ).toEqual(new Date('2023-01-01T11:02:22.000Z'));
  });

  test('Dates.addWeeks()', () => {
    expect(Dates.addWeeks(
        new Date('2023-10-16T21:50:22.000Z'), 1),
    ).toEqual(new Date('2023-10-23T21:50:22.000Z'));
    expect(Dates.addWeeks(
        new Date('2023-01-01T11:00:22.000Z'), 3),
    ).toEqual(new Date('2023-01-22T11:00:22.000Z'));
  });

  test('Dates.addYears()', () => {
    expect(Dates.addYears(
        new Date('2023-10-16T21:50:22.000Z'), 1),
    ).toEqual(new Date('2024-10-16T21:50:22.000Z'));
    expect(Dates.addYears(
        new Date('2023-01-01T11:00:22.000Z'), 3),
    ).toEqual(new Date('2026-01-01T11:00:22.000Z'));
  });

  test('Dates.atStartOfDay()', () => {
    expect(
        Dates.atStartOfDay(new Date('2023-10-16T21:50:22.000Z')),
    ).toEqual(new Date('2023-10-16T00:00:00.000Z'));
    expect(
        Dates.atStartOfDay(new Date('2023-01-01T11:00:22.000Z')),
    ).toEqual(new Date('2023-01-01T00:00:00.000Z'));
  });

  test('Dates.dateOnly()', () => {
    expect(
        Dates.dateOnly(new Date('2023-10-16T21:50:22.000Z')),
    ).toEqual(new Date('2023-10-16T00:00:00.000Z'));
    expect(
        Dates.dateOnly(new Date('2023-01-01T11:00:22.000Z')),
    ).toEqual(new Date('2023-01-01T00:00:00.000Z'));
  });

  test('Dates.daysDifference()', () => {
    expect(
        Dates.daysDifference(
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
        ),
    ).toEqual(10);
    expect(
        Dates.daysDifference(
            '2023-10-16T22:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
            true,
        ),
    ).toEqual(10);
    expect(
        Dates.daysDifference(
            '2023-01-05T11:13:27.000Z',
            '2023-01-05T11:13:27.000Z',
        ),
    ).toEqual(0);
    expect(
        Dates.daysDifference(
            '2023-01-05T11:13:27.000Z',
            '2023-01-05T23:13:27.000Z',
        ),
    ).toEqual(0.5);
    expect(
        Dates.daysDifference(
            '2023-01-05T11:13:27.000Z',
            '2023-01-05T22:13:27.000Z',
            true,
        ),
    ).toEqual(0);
    expect(
        Dates.daysDifference(
            '2023-01-05T11:13:27.000Z',
            '2023-01-05T23:13:27.000Z',
            true,
        ),
    ).toEqual(1);
    expect(
        Dates.daysDifference(
            '2023-01-05T11:13:27.000Z',
            '2023-01-01T11:13:27.000Z',
        ),
    ).toEqual(4);
  });

  test('Dates.daysOfMonth()', () => {
    expect(Dates.daysOfMonth(1, 2023)).toEqual(31);
    expect(Dates.daysOfMonth(2, 2023)).toEqual(28);
    expect(Dates.daysOfMonth(-2, 2023)).toEqual(-1);
  });

  test('Dates.firstDayOfWeek()', () => {
    expect(
        Dates.firstDayOfWeek(2023, 44),
    ).toEqual(new Date('2023-10-29T23:00:00.000Z'));
  });

  test('Dates.getWeek()', () => {
    expect(Dates.getWeek('2023-01-05T11:13:27.000Z')).toEqual(1);
    expect(Dates.getWeek('2023-03-06T11:13:27.000Z')).toEqual(10);
    expect(Dates.getWeek('2023-05-05T11:13:27.000Z')).toEqual(18);
    expect(Dates.getWeek('2023-10-03T11:13:27.000Z')).toEqual(40);
    expect(Dates.getWeek('2023-12-12T11:13:27.000Z')).toEqual(50);
    expect(Dates.getWeek('2024-01-01T11:13:27.000Z')).toEqual(1);
  });

  test('Dates.hoursDifference()', () => {
    expect(
        Dates.hoursDifference(
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
        ),
    ).toEqual(240);
    expect(
        Dates.hoursDifference(
            '2023-10-26T21:50:22.000Z',
            '2023-10-26T16:50:22.000Z',
        ),
    ).toEqual(5);
    expect(
        Dates.hoursDifference(
            '2023-10-26T21:01:22.000Z',
            '2023-10-26T21:50:22.000Z',
            true,
        ),
    ).toEqual(1);
    expect(
        Dates.hoursDifference(
            '2023-10-26T21:01:22.000Z',
            '2023-10-26T21:50:22.000Z',
        ),
    ).toEqual(0.8166666666666667);
  });

  test('Dates.isAfter()', () => {
    expect(
        Dates.isAfter(
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
        ),
    ).toEqual(false);
    expect(
        Dates.isAfter(
            '2023-10-26T21:50:22.000Z',
            '2023-10-26T16:50:22.000Z',
        ),
    ).toEqual(true);
    expect(
        Dates.isAfter(
            '2023-10-26T21:01:22.000Z',
            '2023-10-26T21:50:22.000Z',
            true,
        ),
    ).toEqual(false);
    expect(
        Dates.isAfter(
            '2023-10-26T21:01:22.000Z',
            '2023-10-26T21:50:22.000Z',
        ),
    ).toEqual(false);
  });

  test('Dates.isBefore()', () => {
    expect(
        Dates.isBefore(
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
        ),
    ).toEqual(true);
    expect(
        Dates.isBefore(
            '2023-10-26T21:50:22.000Z',
            '2023-10-26T16:50:22.000Z',
        ),
    ).toEqual(false);
    expect(
        Dates.isBefore(
            '2023-10-26T21:01:22.000Z',
            '2023-10-26T21:50:22.000Z',
            true,
        ),
    ).toEqual(false);
    expect(
        Dates.isBefore(
            '2023-10-26T21:01:22.000Z',
            '2023-10-26T21:50:22.000Z',
        ),
    ).toEqual(true);
  });

  test('Dates.isBetween()', () => {
    expect(
        Dates.isBetween(
            '2023-10-26T21:50:22.000Z',
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
            '[]',
        ),
    ).toEqual(true);
    expect(
        Dates.isBetween(
            '2023-10-26T21:50:22.000Z',
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
            '()',
        ),
    ).toEqual(false);
    expect(
        Dates.isBetween(
            '2023-10-16T21:50:22.001Z',
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
            '[]',
        ),
    ).toEqual(true);
    expect(
        Dates.isBetween(
            '2023-10-16T21:50:22.000Z',
            '2023-10-16T21:50:22.000Z',
            '2023-10-26T21:50:22.000Z',
            '(]',
        ),
    ).toEqual(false);
  });

  test('Dates.isDateObject()', () => {
    expect(Dates.isDateObject(undefined)).toEqual(false);
    expect(Dates.isDateObject(new Date())).toEqual(true);
    expect(Dates.isDateObject(new Date('Invalid but date obj'))).toEqual(true);
  });

  test('Dates.isISOString()', () => {
    expect(Dates.isISOString('')).toEqual(false);
    expect(Dates.isISOString('sdc')).toEqual(false);
    expect(Dates.isISOString('2023-05-09Thh')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23+11-99:cccZ')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23+11-99:cccZ')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23:11-99')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23:11:99.')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23:11:12.0000Z')).toEqual(false);
    expect(Dates.isISOString('2023+05-09T23:11:12.0000Z')).toEqual(false);
    expect(Dates.isISOString('-----')).toEqual(false);
    expect(
        Dates.isISOString([true, false] as unknown as string),
    ).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23:11:12.000z')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T24:15:22.123Z')).toEqual(false);
    expect(Dates.isISOString('2023-02-30T24:15:22.123Z')).toEqual(false);
    expect(Dates.isISOString('2023-13-11T24:15:22.123Z')).toEqual(false);

    expect(Dates.isISOString('0000')).toEqual(false);
    expect(Dates.isISOString('2023')).toEqual(false);
    expect(Dates.isISOString('2023-05')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23:15')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23:15:22')).toEqual(false);
    expect(Dates.isISOString('2023-05-09T23:15:22.123Z')).toEqual(true);
    expect(Dates.isISOString('9999-05-09T23:15:22.123Z')).toEqual(true);
    expect(Dates.isISOString('2023-11-11T23:15:22.999Z')).toEqual(true);
  });

  test('Dates.isValid()', () => {
    expect(Dates.isValid(new Date())).toEqual(true);
    expect(Dates.isValid(new Date('Invalid but date obj'))).toEqual(false);
  });

  test('Dates.millisecondsDifference()', () => {
    const utcNow = Dates.utcNow;
    expect(Dates.millisecondsDifference(utcNow, utcNow)).toEqual(0);
    expect(
        Dates.millisecondsDifference(
            '2022-07-22T22:00:00.000Z',
            '2022-07-22T22:00:00.123Z',
        ),
    ).toEqual(123);
    expect(
        Dates.millisecondsDifference(
            '2022-07-22T22:00:00.002Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(2);
  });

  test('Dates.minutesDifference()', () => {
    const utcNow = Dates.utcNow;
    expect(Dates.minutesDifference(utcNow, utcNow)).toEqual(0);
    expect(
        Dates.minutesDifference(
            '2022-07-22T22:00:01.000Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(0.016666666666666666);
    expect(
        Dates.minutesDifference(
            '2022-07-22T22:00:33.000Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(0.55);
    expect(
        Dates.minutesDifference(
            '2022-07-22T22:01:00.000Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(1);
    expect(
        Dates.minutesDifference(
            '2022-07-22T22:12:00.333Z',
            '2022-07-22T22:00:00.000Z',
            true,
        ),
    ).toEqual(12);
  });

  test('Dates.monthsDifference()', () => {
    const utcNow = Dates.utcNow;
    expect(Dates.monthsDifference(utcNow, utcNow)).toEqual(0);
    expect(
        Dates.monthsDifference(
            '2022-07-22T22:00:00.000Z',
            '2022-07-28T22:00:00.000Z',
        ),
    ).toEqual(0);
    expect(
        Dates.monthsDifference(
            '2022-07-22T22:00:33.000Z',
            '2022-10-22T22:00:00.000Z',
        ),
    ).toEqual(3);
    expect(
        Dates.monthsDifference(
            '2022-01-01T22:01:00.000Z',
            '2022-12-01T22:00:00.000Z',
        ),
    ).toEqual(11);
  });

  test('Dates.parse()', () => {
    expect(Dates.parse(1658527200000))
        .toEqual(new Date('2022-07-22T22:00:00.000Z'));
  });

  test('Dates.removeDays()', () => {
    expect(
        Dates.removeDays('2022-07-28T22:00:00.000Z', 2),
    ).toEqual(new Date('2022-07-26T22:00:00.000Z'));
    expect(
        Dates.removeDays('2022-07-28T22:00:00.000Z', 27),
    ).toEqual(new Date('2022-07-01T22:00:00.000Z'));
  });

  test('Dates.removeMilliseconds()', () => {
    expect(
        Dates.removeMilliseconds('2022-07-28T22:00:00.123Z', 3),
    ).toEqual(new Date('2022-07-28T22:00:00.120Z'));
    expect(
        Dates.removeMilliseconds('2022-07-28T22:00:00.000Z', 1000),
    ).toEqual(new Date('2022-07-28T21:59:59.000Z'));
  });

  test('Dates.removeMinutes()', () => {
    expect(
        Dates.removeMinutes('2022-07-28T22:12:00.000Z', 12),
    ).toEqual(new Date('2022-07-28T22:00:00.000Z'));
    expect(
        Dates.removeMinutes('2022-07-28T22:01:00.000Z', 1),
    ).toEqual(new Date('2022-07-28T22:00:00.000Z'));
  });

  test('Dates.removeMonths()', () => {
    expect(
        Dates.removeMonths('2022-07-28T22:00:00.000Z', 12),
    ).toEqual(new Date('2021-07-28T22:00:00.000Z'));
    expect(
        Dates.removeMonths('2022-07-28T22:01:00.000Z', 5),
    ).toEqual(new Date('2022-02-28T23:01:00.000Z'));
  });

  test('Dates.removeSeconds()', () => {
    expect(
        Dates.removeSeconds('2022-07-28T22:00:00.000Z', 12),
    ).toEqual(new Date('2022-07-28T21:59:48.000Z'));
    expect(
        Dates.removeSeconds('2022-07-28T22:01:00.000Z', 5),
    ).toEqual(new Date('2022-07-28T22:00:55.000Z'));
  });

  test('Dates.removeWeeks()', () => {
    expect(
        Dates.removeWeeks('2022-07-28T22:00:00.000Z', 2),
    ).toEqual(new Date('2022-07-14T22:00:00.000Z'));
    expect(
        Dates.removeWeeks('2022-07-28T22:00:00.000Z', 1),
    ).toEqual(new Date('2022-07-21T22:00:00.000Z'));
  });

  test('Dates.removeYears()', () => {
    expect(
        Dates.removeYears('2022-07-28T22:00:00.000Z', 2),
    ).toEqual(new Date('2020-07-28T22:00:00.000Z'));
    expect(
        Dates.removeYears('2022-07-28T22:00:00.000Z', 1),
    ).toEqual(new Date('2021-07-28T22:00:00.000Z'));
  });

  test('Dates.secondsDifference()', () => {
    const utcNow = Dates.utcNow;
    expect(Dates.secondsDifference(utcNow, utcNow)).toEqual(0);
    expect(
        Dates.secondsDifference(
            '2022-07-22T22:00:01.000Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(1);
    expect(
        Dates.secondsDifference(
            '2022-07-22T22:00:33.000Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(33);
    expect(
        Dates.secondsDifference(
            '2022-07-22T22:01:00.000Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(60);
    expect(
        Dates.secondsDifference(
            '2022-07-22T22:12:00.333Z',
            '2022-07-22T22:00:00.000Z',
            true,
        ),
    ).toEqual(720);
  });

  test('Dates.yearsDifference()', () => {
    const utcNow = Dates.utcNow;
    expect(Dates.yearsDifference(utcNow, utcNow)).toEqual(0);
    expect(
        Dates.yearsDifference(
            '2022-07-22T22:00:01.000Z',
            '2022-07-22T22:00:00.000Z',
        ),
    ).toEqual(0);
    expect(
        Dates.yearsDifference(
            '2022-07-22T22:00:33.000Z',
            '2024-07-22T22:00:00.000Z',
            true,
        ),
    ).toEqual(2);
    expect(
        Dates.yearsDifference(
            '2022-07-22T22:00:00.000Z',
            '2016-07-22T22:00:00.000Z',
        ),
    ).toEqual(6);
  });

  test('Dates.firstDayOfWeek()', () => {
    expect(
        Dates.firstDayOfWeek(2023, 44),
    ).toEqual(new Date('2023-10-29T23:00:00.000Z'));
  });
});
