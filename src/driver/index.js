import * as webdriver from 'webdriverio'
import waitUntil from './helpers/waitUntil'
import chainFactory from './helpers/chain'
import {init, end, sleep} from './core'
import {fill, click, visit} from './interact'
import {hasText} from './assert'

export default (options) => {
  const browserOptions = {browserName: options.browser}
  const wd = webdriver.remote(browserOptions)

  const retry = waitUntil(options.timeout)
  const chain = chainFactory()
  const autochain = (f) => (...args) => chain(() => f(...args))

  return {
    init: autochain(init(wd)),
    end: autochain(end(wd)),
    kill: end(wd),
    visit: autochain(visit(wd)),
    click: autochain(click(wd, retry)),
    fill: autochain(fill(wd, retry)),
    hasText: autochain(hasText(wd, retry)),
    sleep: autochain(sleep(wd)),
    chain,
  }
}
