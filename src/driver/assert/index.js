import {curry, flatten, any} from 'ramda'
const containsSubStr = curry((subStr, str) =>
  str && str.indexOf(subStr) !== -1)

export const hasText = curry((wd, retry, selector, text) =>
  retry(async () => {
    const result = await wd.getText(selector)
    const results = flatten([result])
    return any(containsSubStr(text), results)
      ? Promise.resolve('ok')
      : Promise.reject('Could not find text')
  }))
