/* eslint-disable no-useless-constructor */
/* eslint-disable no-negated-condition */
const validator = require('csstree-validator')

const fs = require('fs')

const cssbeautify = require('cssbeautify')

const strip = require('strip-comments')

const css = require('../../node_modules/css')
export default class Loader {
  constructor(
    public inputPath: string
  ) { }

  scan() {
    let data = ''
    try {
      data = fs.readFileSync(this.inputPath, 'utf8')
      data = cssbeautify(data, {
        indent: '  ',
        openbrace: 'separate-line',
        autosemicolon: true,
      })
      // eslint-disable-next-line unicorn/catch-error-name
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }

    const validated = this.validate(data)
    if (validated === 1) {
      const cleared = this.clearComments(data)
      const constructed = this.construct(cleared)
      // console.log(constructed)
      return constructed
    }
    return 'invalid'
  }

  validate(data: string) {
    const result = validator.validate(data)
    if (result.length === 0) {
      return 1
    }
    // eslint-disable-next-line no-console
    console.log('The css file is not valid')
    return 0
  }

  clearComments(data: any) {
    const x = strip(data) // => var t;
    return x
  }

  construct(data: string) {
    const nonMediaSelectorProp: any = []
    const mediaSelectorProp: any = []
    for (let i = 0; i < data.length; i++) {
      let selector = ''
      let property = ''
      if (data.charAt(i) === '{') {
        let j = i - 1
        while (data.charAt(j) !== '}' && j >= 0) {
          selector += data.charAt(j)
          j--
        }
        if (!this.reverseString(selector).includes('@')) {
          selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
          let k = i
          while (data.charAt(k - 1) !== '}') {
            property += data.charAt(k)
            k++
          }
          property = property.replace('{', '').replace('}', '').trim()
          if (Object.keys(nonMediaSelectorProp).includes(selector.trim())) {
            const oldProp = nonMediaSelectorProp[selector]
            const newProp = oldProp + property
            nonMediaSelectorProp[selector] = newProp
          } else {
            nonMediaSelectorProp[selector] = property
          }
          selector = ''
          property = ''
        } else {
          let openselector = 0
          let closeselector = 0
          let j = i
          while (j < data.length) {
            property += data[j]
            // eslint-disable-next-line max-depth
            if (data[j] === '{') {
              openselector++
            } else if (data[j] === '}') {
              closeselector++
            }
            if (openselector === closeselector) {
              selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
              // eslint-disable-next-line max-depth
              if (Object.keys(mediaSelectorProp).includes(selector.trim())) {
                const oldProp = mediaSelectorProp[selector]
                const newProp = oldProp + property.substring(1, property.length - 2)
                mediaSelectorProp[selector] = newProp
              } else {
                mediaSelectorProp[selector] = property.substring(1, property.length - 2)
              }
              openselector = 0
              closeselector = 0
              selector = ''
              property = ''
              i = j + 1
              break
            }
            j++
          }
        }
      }
    }
    let result = [nonMediaSelectorProp, mediaSelectorProp]
    let mediaSelectorsStr = ''
    let nonMediaSelectorsStr = ''
    // eslint-disable-next-line guard-for-in
    for (const r in result[0]) {
      nonMediaSelectorsStr = nonMediaSelectorsStr + r + '{\n' + result[0][r] + '\n}\n'
    }
    // eslint-disable-next-line guard-for-in
    for (const r in result[1]) {
      mediaSelectorsStr = mediaSelectorsStr + r + '{\n' + result[1][r] + '\n}\n'
    }
    result = [css.parse(nonMediaSelectorsStr), css.parse(mediaSelectorsStr)]
    return result
  }

  reverseString(str: string) {
    let newString = ''
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i]
    }
    return newString
  }
}

