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
  });

  test('Dates.daysOfMonth()', () => {
    expect(Dates.daysOfMonth(1, 2023)).toEqual(31);
    expect(Dates.daysOfMonth(2, 2023)).toEqual(28);
    expect(Dates.daysOfMonth(-2, 2023)).toEqual(-1);
  });

  test('Dates.getWeekNumber()', () => {
    expect(Dates.getWeekNumber('2023-01-05T11:13:27.000Z')).toEqual(1);
    expect(Dates.getWeekNumber('2023-03-06T11:13:27.000Z')).toEqual(10);
    expect(Dates.getWeekNumber('2023-05-05T11:13:27.000Z')).toEqual(18);
    expect(Dates.getWeekNumber('2023-10-03T11:13:27.000Z')).toEqual(40);
    expect(Dates.getWeekNumber('2023-12-12T11:13:27.000Z')).toEqual(50);
    expect(Dates.getWeekNumber('2024-01-01T11:13:27.000Z')).toEqual(1);
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
});
