export default class Declaration {
  static fromString(line: string) {
    // eslint-disable-next-line no-console
    console.log(line)
    return new Declaration('height', 'inherit')
  }

  constructor(
    public property: string,
    public value: string,
    public type: 'HEX' | 'IDENT' | 'STRING' | 'INTEGER' | 'PERCENTAGE' = 'STRING',
    public unit: '%' | 'px' | 'em' | '' = ''
  ) {}

  public toString = () => `${this.property} : ${this.value}${this.unit};`
}
