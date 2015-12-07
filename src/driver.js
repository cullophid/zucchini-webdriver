import R from 'ramda'
import wd from 'wd'
import {elementNotFound, textNotFound} from './helpers/errors'
import waitUntil from './helpers/waitUntil'
import chainFactory from './helpers/chain'

export default (options) => {
  const promise = Promise.resolve()
  const browser = wd.promiseRemote()
  const browserOptions =  {browserName: options.browser}

  const retry = waitUntil(options.timeout)
  const chain = chainFactory()

  // driver methods
  const find = (selector) =>
    retry(() => browser.elementByCss(selector))
      .catch(elementNotFound(selector))

  const init = () => browser.init(options)

  const end = () => browser.quit()

  const visit = (url) =>  browser.get(url)

  const fill = async (selector, value) => {
    const e = await find(selector)
    await e.clear()
    return e.type(value)
  }

  const click = async (selector) => {
    const e = await find(selector)
    return e.click()
  }

  const sleep = (duration) =>
    new Promise((resolve) => setTimeout(() => resolve(), duration))

  const getText = async (selector) => {
    const e = await find(selector)
    return browser.text(e)
  }

  const assertText = (selector, text) => retry(async () => {
    const actual = await getText(selector)

    if (actual === text) {
      return true
    }
    return Promise.reject('mismatch')
  })
    .catch(textNotFound(selector, text))

  return {
    init: (...args) => chain(() => init(...args)),
    end: (...args) => chain(() => end(...args)),
    kill: end,
    visit: (...args) => chain(() => visit(...args)),
    find: (...args) => chain(() => find(...args)),
    fill: (...args) => chain(() => fill(...args)),
    click: (...args) => chain(() => click(...args)),
    sleep: (...args) => chain(() => sleep(...args)),
    getText: (...args) => chain(() => getText(...args)),
    assertText: (...args) => chain(() => assertText(...args)),
    chain,
  }
}
