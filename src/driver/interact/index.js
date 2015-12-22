import R from 'ramda'
import {find} from '../get'

export const visit = R.curry((browser, url) =>  browser.get(url))

export const fill = R.curry(async (browser, retry, selector, value) => {
  const e = await find(browser, retry, selector)
  await e.clear()
  return e.type(value)
})

export const click = R.curry(async (browser, retry, selector) => {
  const e = await find(browser, retry, selector)
  return e.click()
})

export const sleep = (duration) =>
  new Promise((resolve) => setTimeout(() => resolve(), duration))

export const init = (browser, options) => () => browser.init(options)

export const end = (browser) => () => browser.quit()
