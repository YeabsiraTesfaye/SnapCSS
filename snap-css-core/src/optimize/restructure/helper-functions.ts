/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
export function reverseString(str: string) {
  let newString = ''
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i]
  }
  return newString
}

export function intersection_destructive(a: any, b: any) {
  const result = []
  while (a.length > 0 && b.length > 0) {
    if (a[0] < b[0]) {
      a.shift()
    } else if (a[0] > b[0]) {
      b.shift()
    } else /* they're equal */ {
      result.push(a.shift())
      b.shift()
    }
  }
  return result
}

export function differences(a: any, b: any) {
  const dif: any = []
  for (var key in a) { // In a and not in b
    if (!b[key.trim()]) {
      dif.push(key.trim())
    }
  }
  for (key in b) { // in b and not in a
    if (!a[key.trim()]) {
      dif.push(key.trim())
    }
  }
  for (var key in a) {
    if (b[key.trim()] && a[key.trim()] !== b[key.trim()]) {
      dif.push(key.trim())
    }
  }
  for (key in b) {
    if (a[key.trim()] && a[key.trim()] !== b[key.trim()]) {
      dif.push(key.trim())
    }
  }
  return dif
}
export function similar(a: any, b: any) {
  const sim: any = []
  for (var key in a) {
    if (b[key.trim()] && a[key.trim()] === b[key.trim()]) {
      sim[key.trim()] = a[key.trim()]
    }
  }
  for (key in b) {
    if (a[key.trim()] && a[key.trim()] === b[key.trim()]) {
      sim[key.trim()] = b[key.trim()]
    }
  }
  return sim
}
export function toUniqueArray(a: any) {
  const newArr: any = []
  for (let i = 0; i < a.length; i++) {
    if (newArr.indexOf(a[i]) === -1) {
      newArr.push(a[i])
    }
  }
  return newArr
}

