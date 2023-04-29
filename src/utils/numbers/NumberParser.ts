export class NumberParser {
  private readonly group: RegExp;
  private readonly decimal: RegExp;
  private readonly numeral: RegExp;
  private readonly index: (substring: string, ...args: any[]) => string;

  constructor(locale: string) {
    const format = new Intl.NumberFormat(locale);
    const parts = format.formatToParts(12345.6);
    const numerals = Array.from({ length: 10 }).map((_, i) => format.format(i));
    const indexes = new Map(numerals.map((d, i) => [d, i]));
    this.group = new RegExp(`[${parts.find(d => d.type === 'group')?.value}]`, 'g');
    this.decimal = new RegExp(`[${parts.find(d => d.type === 'decimal')?.value}]`);
    this.numeral = new RegExp(`[${numerals.join('')}]`, 'g');
    this.index = d => indexes.get(d) as any;
  }

  parse(str: string): number {
    return (str = str.trim()
      .replace(this.group, '')
      .replace(this.decimal, '.')
      .replace(this.numeral, this.index)) ? +str : NaN;
  }
}
