import {Dates} from './Dates';

describe('Dates', () => {
  const now = Dates.now;

  test('Dates.addMilliseconds()', () => {
    expect(Dates.addMilliseconds(now, 100).valueOf()).toEqual(
        now.valueOf() + 100,
    );
  });

  test('Dates.daysOfMonth()', () => {
    expect(Dates.daysOfMonth(1, 2023)).toEqual(31);
    expect(Dates.daysOfMonth(2, 2023)).toEqual(28);
    expect(Dates.daysOfMonth(-2, 2023)).toEqual(-1);
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
