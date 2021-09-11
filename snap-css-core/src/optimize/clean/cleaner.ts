/* eslint-disable max-depth */
/* eslint-disable guard-for-in */
/* eslint-disable unicorn/catch-error-name */
/* eslint-disable no-console */

import loader_1 = require('../../load/loader')
import Optimizer from '../optimizer'
const css = require('../../../node_modules/css')
import color = require('./color')

export default class Cleaner implements Optimizer {
  optimize(input: any): any {
    const nonMedia = this.nonmediaSelectors(input)
    const media = this.mediaSelectors(input)
    return [nonMedia, media]
  }

  nonmediaSelectors(x: any[]) {
    const SelectorsWzDeclaretions: any[] = []
    const data = css.stringify(x[0])
    try {
      for (let i = 0; i < data.length; i++) {
        let selector: any = ''
        let property: any = ''
        if (data.charAt(i) === '{') {
          let j = i - 1
          while (data.charAt(j) !== '}' && j >= 0) {
            selector += data.charAt(j)
            j--
          }
          selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
          let k = i
          while (data.charAt(k - 1) !== '}') {
            property += data.charAt(k)
            k++
          }
          property = property.replace('{', '').replace('}', '').trim()
          if (Object.keys(SelectorsWzDeclaretions).includes(selector.trim())) {
            const oldProp = SelectorsWzDeclaretions[selector]
            const newProp = oldProp + property
            SelectorsWzDeclaretions[selector] = newProp
          } else {
            SelectorsWzDeclaretions[selector] = property
          }
          selector = ''
          property = ''
        }
      }
    } catch (e) {
      console.log(e)
    }
    const NoDuplication: any = []
    for (const tp in SelectorsWzDeclaretions) {
      const eachProps = SelectorsWzDeclaretions[tp].split(';')
      for (const ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim()
      }
      const removeDuplication: any = []
      for (const ep in eachProps) {
        if (eachProps[ep] !== '') {
          let rule = eachProps[ep].split(':')
          try {
            if (color.rules.includes(rule[0].trim())) {
              const hex = color.converter(rule)
              if (hex !== undefined) {
                rule = [rule[0], hex[rule[0]]]
              }
            }
          } catch {
            continue
          }
          if (Object.keys(removeDuplication).includes(rule[0])) {
            if (!removeDuplication[rule[0]].includes('!important')) {
              removeDuplication[rule[0]] = rule[1]
            } else if (rule[1].includes('!important')) {
              removeDuplication[rule[0]] = rule[1]
            }
          } else {
            removeDuplication[rule[0]] = rule[1]
          }
        }
      }
      NoDuplication[tp] = removeDuplication
    }
    let toBEWritten = ''
    for (const n in NoDuplication) {
      let tempProp = ''
      for (const ree in NoDuplication[n]) {
        tempProp = tempProp + '   ' + ree + ' : ' + NoDuplication[n][ree] + ';\n'
      }
      toBEWritten = toBEWritten + n + ' {\n' + tempProp + '}\n\n'
    }
    // return NoDuplication;
    return (css.parse(toBEWritten))
  }

  mediaSelectors(x: any) {
    const SelectorsWzDeclaretions: any = []
    const data = css.stringify(x[1])

    //***********************************************************************************************
    try {
      for (let i = 0; i < data.length; i++) {
        let selector = ''
        let property = ''
        if (data.charAt(i) === '{') {
          let j = i - 1
          while (data.charAt(j) !== '}' && j >= 0) {
            selector += data.charAt(j)
            j--
          }
          let openselector = 0
          let closeselector = 0
          let k = i
          while (k < data.length) {
            property += data[k]
            if (data[k] === '{') {
              openselector++
            } else if (data[k] === '}') {
              closeselector++
            }
            if (openselector === closeselector) {
              selector = this.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
              if (Object.keys(SelectorsWzDeclaretions).includes(selector.trim())) {
                const oldProp = SelectorsWzDeclaretions[selector]
                const newProp = oldProp + property.substring(1, property.length - 2)
                SelectorsWzDeclaretions[selector] = newProp
              } else {
                SelectorsWzDeclaretions[selector] = property.substring(1, property.length - 2)
              }
              openselector = 0
              closeselector = 0
              selector = ''
              property = ''
              i = k + 1
              break
            }
            k++
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    //************************************************************************************************************
    const NoDuplication: any = []
    for (const tp in SelectorsWzDeclaretions) {
      // eslint-disable-next-line new-cap
      const prepared = new loader_1.default('').construct(SelectorsWzDeclaretions[tp])
      NoDuplication[tp] = this.nonmediaSelectors(prepared)
    }
    let toBEWritten = ''
    for (const m in NoDuplication) {
      toBEWritten = toBEWritten + m + '{\n' + css.stringify(NoDuplication[m]) + '\n\n}'
    }
    // return NoDuplication;
    return (css.parse(toBEWritten))
  }

  reverseString(str: any) {
    let newString = ''
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i]
    }
    return newString
  }
}

