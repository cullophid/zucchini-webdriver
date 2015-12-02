import wd from 'wd'
import {elementNotFound, textNotFound} from './errors'
import {chainFactory, waitUntil} from './helpers'
const browser = wd.promiseRemote()
const options = {browserName: 'firefox'}
const HOST = 'http://app.sentia.io'
const DEFAULT_TIMEOUT = 10000


const retry = waitUntil(DEFAULT_TIMEOUT)

const chain = chainFactory()

const _find = (selector) =>
  retry(() => browser.elementByCss(selector))
    .catch(elementNotFound(selector))


const _init = () => browser.init(options)

const _end = () => browser.quit()

const _visit = (path) => browser.get(HOST + path)

const _fill = async (selector, value) => {
  const e = await _find(selector)
  return e.type(value)
}

const _click = async (selector) => {
  const e = await _find(selector)
  return e.click()
}

const _sleep = (duration) =>
  new Promise((resolve) => setTimeout(() => resolve(), duration))

const _getText = async (selector) => {
  const e = await _find(selector)
  return browser.text(e)
}

const _assertText = (selector, text) => retry(async () => {
  const actual = await _getText(selector)

  if (actual === text) {
    return true
  }
  return Promise.reject('mismatch')
})
  .catch(textNotFound(selector, text))

export const init = chain(_init)
export const end = chain(_end)
export const visit = chain(_visit)
export const find = chain(_find)
export const fill = chain(_fill)
export const click = chain(_click)
export const sleep = chain(_sleep)
export const getText = chain(_getText)
export const assertText = chain(_assertText)
