/* eslint-disable complexity */
/* eslint-disable no-negated-condition */
/* eslint-disable unicorn/catch-error-name */
/* eslint-disable no-console */
/* eslint-disable max-depth */
/* eslint-disable guard-for-in */
import Optimizer from '../optimizer'
import Loader from '../../load/loader'
const cssbeautify = require('cssbeautify')
const css = require('../../../node_modules/css')
import helper_function = require('../restructure/helper-functions')

export default class Restructurer implements Optimizer {
  optimize(input: any): any {
    const nonMedia = this.nonmediaSelectors(input)
    const media = this.mediaSelectors(input)
    const allInOne = css.parse(css.stringify(nonMedia).concat(css.stringify(media)))
    return allInOne
  }

  // eslint-disable-next-line complexity
  private nonmediaSelectors(x: any) {
    const SelectorsProps: any[] = []
    const data = css.stringify(x[0])
    try {
      for (let i = 0; i < data.length; i++) {
        let selector: any = ''
        let property = ''
        if (data.charAt(i) === '{') {
          let j = i - 1
          while (data.charAt(j) !== '}' && j >= 0) {
            selector += data.charAt(j)
            j--
          }
          selector = helper_function.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
          if (selector.includes(',')) {
            const selectors = selector.split(',')
            let k = i
            for (const t in selectors) {
              while (data.charAt(k - 1) !== '}') {
                property += data.charAt(k)
                k++
              }
              property = property.replace('{', '').replace('}', '').trim() + ';'
              if (Object.keys(SelectorsProps).includes(selector[t].trim())) {
                const oldProp = SelectorsProps[selectors[t]]
                const newProp = oldProp + property
                SelectorsProps[selectors[t]] = newProp
              } else {
                SelectorsProps[selectors[t]] = property
              }
            }
            selector = ''
            property = ''
          } else {
            let k = i
            while (data.charAt(k - 1) !== '}') {
              property += data.charAt(k)
              k++
            }
            property = property.replace('{', '').replace('}', '').trim()
            if (Object.keys(SelectorsProps).includes(selector.trim())) {
              const oldProp = SelectorsProps[selector]
              const newProp = oldProp + property
              SelectorsProps[selector] = newProp
            } else {
              SelectorsProps[selector] = property
            }
            selector = ''
            property = ''
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    const NoDuplication: any = []
    for (const tp in SelectorsProps) {
      const eachProps = SelectorsProps[tp].split(';')
      for (const ep in eachProps) {
        eachProps[ep] = eachProps[ep].replace(/\r/g, '').replace(/\n/g, '').trim()
      }
      const removeDuplication: any = []
      for (const ep in eachProps) {
        if (eachProps[ep] !== '') {
          const rule = eachProps[ep].split(':')
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

    const reuse = this.reusable(NoDuplication)
    const similars = reuse[0]
    const difference = reuse[1]
    const differentProps: any = []
    for (const d in difference) {
      const current = d.split(',')
      const prop = difference[d]
      for (const c in current) {
        for (const p in prop) {
          if (!Object.keys(differentProps).includes(current[c])) {
            const x = []
            x[prop[p]] = NoDuplication[current[c]][prop[p]]
            differentProps[current[c]] = x
          } else {
            const x = []
            x[prop[p]] = NoDuplication[current[c]][prop[p]]
            const old = differentProps[current[c]]
            const newer = Object.assign([], old, x)
            differentProps[current[c]] = newer
          }
        }
      }
    }
    for (const d in differentProps) {
      const each = differentProps[d]
      for (const e in each) {
        if (each[e] === undefined) {
          delete each[e]
        }
      }
    }
    for (const d in differentProps) {
      const each = differentProps[d]
      if (Object.values(each).length === 0) {
        delete differentProps[d]
      }
    }
    for (const d in differentProps) {
      for (const s in similars) {
        if (s.includes(d)) {
          for (const d1 in differentProps[d]) {
            if (Object.keys(similars[s]).includes(d1))
              try {
                delete similars[s][d1]
              } catch {
                continue
              }
          }
        }
      }
    }
    for (const i in similars) {
      const spl = i.split(',')
      for (const j in spl) {
        delete NoDuplication[spl[j]]
      }
    }
    for (const i in similars) {
      NoDuplication[i] = similars[i]
    }
    for (const i in similars) {
      for (const j in similars) {
        if (i !== j) {
          if (helper_function.intersection_destructive(i.split(','), j.split(',')).length !== 0) {
            if (i.split(',').length !== j.split(',').length) {
              const smaller = Math.min(i.split(',').length, j.split(',').length)
              if (i.split(',').length === smaller) {
                try {
                  delete NoDuplication[i]
                } catch (_a) {
                  continue
                }
              } else {
                try {
                  delete NoDuplication[j]
                } catch (_b) {
                  continue
                }
              }
            }
          }
        }
      }
    }
    for (const i in differentProps) {
      NoDuplication[i] = differentProps[i]
    }
    let toBEWritten = ''
    for (const n in NoDuplication) {
      let tempProp = ''
      for (const ree in NoDuplication[n]) {
        tempProp = tempProp + '   ' + ree + ' : ' + NoDuplication[n][ree] + ';\n'
      }
      toBEWritten = toBEWritten + n + ' {\n' + tempProp + '}\n\n'
    }

    return (css.parse(toBEWritten))
  }

  private mediaSelectors(x: any) {
    const SelectorsProps: any = []
    const data = css.stringify(x[1])

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
              selector = helper_function.reverseString(selector).replace(/\n/g, '').replace(/\r/g, '').trim()
              if (Object.keys(SelectorsProps).includes(selector.trim())) {
                const oldProp = SelectorsProps[selector]
                const newProp = oldProp + property.substring(1, property.length - 2)
                SelectorsProps[selector] = newProp
              } else {
                SelectorsProps[selector] = property.substring(1, property.length - 2)
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

    const NoDuplication: any = []
    for (const tp in SelectorsProps) {
      const prepared = new Loader('').construct(SelectorsProps[tp])

      NoDuplication[tp] = this.nonmediaSelectors(prepared)
    }
    let toBEWritten = ''
    for (const m in NoDuplication) {
      toBEWritten = toBEWritten + m + '{\n' + css.stringify(NoDuplication[m]) + '\n\n}'
    }
    toBEWritten = cssbeautify(toBEWritten, {
      indent: '  ',
      openbrace: 'separate-line',
      autosemicolon: true,
    })
    return (css.parse(toBEWritten))
  }

  reusable(nmt: any) {
    const dos = 75
    const sims = []
    const diffs = []
    const props = []
    for (const n in nmt) {
      props.push(nmt[n])
    }
    for (const i in props) {
      for (const j in props) {
        if (i !== j) {
          const sim = helper_function.similar(props[i], props[j])
          const dif = helper_function.differences(props[i], props[j])
          const SimilarityLen = Object.keys(sim).length
          const prop1Len = Object.keys(props[i]).length
          const prop2Len = Object.keys(props[j]).length
          if ((SimilarityLen / prop1Len) * 100 >= dos && (SimilarityLen / prop2Len) * 100 >= dos) {
            const Selectors = [Object.keys(nmt)[i].trim(), Object.keys(nmt)[j].trim()].sort().toString()
            const Selectorsplited = Selectors.split(',')
            sims[helper_function.toUniqueArray(Selectorsplited.sort())] = sim
            diffs[helper_function.toUniqueArray(Selectorsplited.sort())] = dif
          }
        }
      }
    }
    const similarSelectors: any = []
    let current
    if (Object.keys(sims).length === 1) {
      return [sims, diffs]
    }
    for (const s in sims) {
      current = s.split(',')
      const t = []
      const p = []
      for (const s1 in sims) {
        if (s.trim() !== s1.trim()) {
          for (const c in current) {
            if (s1.split(',').includes(current[c])) {
              const tempp = helper_function.similar(sims[s], sims[s1])
              if (Object.keys(tempp).length / Object.keys(sims[s]).length * 100 >= dos && Object.keys(tempp).length / Object.keys(sims[s1]).length * 100 >= dos) {
                t.push(current[c])
                const temp = s1.split(',')
                for (const ss1 in temp) {
                  if (!t.includes(temp[ss1])) {
                    t.push(temp[ss1])
                    p.push(tempp)
                  }
                }
              }
            } else {
              t.push(s)
              p.push(sims[s])
            }
          }
        }
      }
      if (p.length !== 0) {
        if (!similarSelectors.includes(helper_function.toUniqueArray(t).sort().toString())) {
          similarSelectors.push(helper_function.toUniqueArray(t).sort().toString())
        }
      }
    }

    for (const st in similarSelectors) {
      for (const si in sims) {
        const c1 = si.split(',')
        if (!similarSelectors[st].includes(c1[0]) && !similarSelectors[st].includes(c1[1])) {
          similarSelectors.push(si)
        }
      }
    }
    const result = []
    for (const st in similarSelectors) {
      let holder = []
      const temp_1 = helper_function.toUniqueArray(similarSelectors[st].split(',')).sort()

      for (let i_1 = 0; i_1 < temp_1.length; i_1++) {
        try {
          if (holder.length === 0) {
            holder = (helper_function.similar(nmt[temp_1[0]], nmt[temp_1[1]]))
          } else {
            const t1 = helper_function.similar(nmt[temp_1[i_1]], nmt[temp_1[i_1 + 1]])
            const t2: any = (helper_function.similar(holder, t1))
            holder = t2
          }
        } catch {
          continue
        }
      }
      result[temp_1] = holder
    }
    return [result, diffs]
  }
}

