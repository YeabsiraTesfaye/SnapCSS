import Declaration from './declaration'
export default class Rule {
  static fromString(block: string, padding = '') {
    // eslint-disable-next-line no-console
    console.log(block)
    const results = []
    const res = new Rule('.home', padding)
    res.declarations.push(Declaration.fromString('Trial Declaration'))
    results.push(res)
    return results
  }

  public declarations: Declaration[] = []

  private suggestions: string[] = []

  constructor(
    public selector: string,
    public padding = ''
  ) {}

  makeSuggestions() {
    this.suggestions = ['.home', 'div']
  }

  public toString() {
    let result = ''
    const tab = `\n${this.padding}  `
    if (this.suggestions.length > 0)
      result += `// Suggested Selectors -> ${this.suggestions.join(', ')}\n`
    result += `${this.padding}${this.selector} {${tab}${this.declarations.join(tab)} \n${this.padding}}`
    return result
  }
}
