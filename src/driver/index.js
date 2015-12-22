import wd from 'wd'
import waitUntil from './helpers/waitUntil'
import chainFactory from './helpers/chain'
import {find, getText, getAttr, isSelected} from './get'
import {init, end, click, fill, sleep, visit} from './interact'
import {assertText, assertAttr} from './assert'

export default (options) => {
  const browser = wd.promiseRemote()
  const browserOptions = {browserName: options.browser}

  const retry = waitUntil(options.timeout)
  const chain = chainFactory()
  const autochain = (f) => (...args) => chain(() => f(...args))

  return {
    init: autochain(init(browser, browserOptions)),
    end: autochain(end(browser)),
    kill: end(browser),
    visit: autochain(visit(browser)),
    find: autochain(find(browser, retry)),
    fill: autochain(fill(browser, retry)),
    click: autochain(click(browser, retry)),
    sleep: autochain(sleep),
    getAttr: autochain(getAttr(browser, retry)),
    getText: autochain(getText(browser, retry)),
    isSelected: autochain(isSelected(browser, retry)),
    assertText: autochain(assertText(browser, retry)),
    assertAttr: autochain(assertAttr(browser, retry)),
    chain,
  }
}
