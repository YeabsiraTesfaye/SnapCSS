import RuleSet from './rule-set'

export default class CSS {
  static fromString(css: string) {
    // eslint-disable-next-line no-console
    console.log(css)
    const result = new CSS()
    result.ruleSets.push(RuleSet.fromString('Trial RuleSet'))
    return result
  }

  public ruleSets: RuleSet[] = []

  public toString() {
    return this.ruleSets.join('\n')
  }
}
