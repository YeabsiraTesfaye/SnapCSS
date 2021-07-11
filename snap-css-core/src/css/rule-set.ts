import Rule from './rule'

export default class RuleSet {
  static fromString(block: string) {
    // eslint-disable-next-line no-console
    console.log(block)
    const result = new RuleSet('only screen and (max-width: 600px)')
    const padding = result.media === '' ? '' : '  '
    result.rules = result.rules.concat(Rule.fromString('Trial Rule', padding))
    return result
  }

  public rules: Rule[] = []

  constructor(
    public media: string = '',
  ) {}

  public toString() {
    let result = ''
    if (this.media !== '') result += `@media ${this.media} {\n`
    result += this.rules.join('\n\n')
    if (this.media !== '') result += '\n}'
    return result
  }
}
