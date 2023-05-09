import { Dates } from './Dates'

describe('Dates', () => {
  test('Dates.daysOfMonth()', () => {
    expect(Dates.daysOfMonth(1, 2023)).toEqual(31)
    expect(Dates.daysOfMonth(2, 2023)).toEqual(28)
    expect(Dates.daysOfMonth(-2, 2023)).toEqual(-1)
  })

  test('Dates.parseISO()', () => {
    expect(Dates.parseISO('sdc')).toEqual(null)
    expect(Dates.parseISO('2023-05-09Thh')).toEqual(null)
    expect(Dates.parseISO('2023-05-09T23+11-99:cccZ')).toEqual(null)
    expect(Dates.parseISO('2023-05-09T23+11-99:cccZ')).toEqual(null)
    expect(Dates.parseISO('2023-05-09T23:11-99')).toEqual(null)
    expect(Dates.parseISO('2023-05-09T23:11:99.')).toEqual(null)
    expect(Dates.parseISO('2023-05-09T23:11:12.0000Z')).toEqual(null)
    expect(Dates.parseISO('2023+05-09T23:11:12.0000Z')).toEqual(null)
    expect(Dates.parseISO('-----')).toEqual(null)
    expect(Dates.parseISO([true, false] as unknown as string)).toEqual(null)
    expect(Dates.parseISO('2023-05-09T23:11:12.000z')).toEqual(null)

    expect(Dates.parseISO('0000')?.toISOString()).toEqual('1900-01-01T00:00:00.000Z') // this here is the zero-year
    expect(Dates.parseISO('2023')?.toISOString()).toEqual('2023-01-01T00:00:00.000Z')
    expect(Dates.parseISO('2023-05')?.toISOString()).toEqual('2023-05-01T00:00:00.000Z')
    expect(Dates.parseISO('2023-05-09T23')?.toISOString()).toEqual('2023-05-09T23:00:00.000Z')
    expect(Dates.parseISO('2023-05-09T23:15')?.toISOString()).toEqual('2023-05-09T23:15:00.000Z')
    expect(Dates.parseISO('2023-05-09T23:15:22')?.toISOString()).toEqual('2023-05-09T23:15:22.000Z')
    expect(Dates.parseISO('2023-05-09T23:15:22.123Z')?.toISOString()).toEqual('2023-05-09T23:15:22.123Z')
  })
})
