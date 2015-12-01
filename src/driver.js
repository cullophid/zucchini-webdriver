import wd from 'wd'
import {chainFactory, waitFor} from './helpers'
const browser = wd.promiseRemote()
const options = {browserName: 'chrome'}
const HOST = 'http://app.sentia.io'
const DEFAULT_TIMEOUT = 5000

const chain = chainFactory()

const $ = (selector) => waitFor(() => browser.elementByCss(selector))

export const init = chain(() => browser.init(options))

export const end = chain(() => browser.quit())

export const visit = chain((path) => browser.get(HOST + path))

export const fill = chain(async (selector, value) => {
  const e = await $(selector)
  return e.type(value)
})

export const click = chain(async (selector) => {
  const e = await $(selector)
  return e.click()
})

export const find = chain($)

export const sleep = chain((duration) =>
  new Promise((resolve) => setTimeout(() => resolve(), duration)))

export const getText = chain(async (selector) => {
  const e = await $(selector)
  return browser.text(e)
})

export const assertText = chain((selector, text) => waitFor(async () => {
  const actual = await getText(selector)
  if (actual === text) {
    return true
  }
  console.log('assert', actual, text);
  return Promise.reject('mismatch')
}))
