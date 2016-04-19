import {curry} from 'ramda'

export const visit = curry((wd, url) => wd.url(url))

export const fill = curry((wd, retry, selector, value) =>
  retry(() => wd.setValue(selector, value)))

export const click = curry((wd, retry, selector) =>
  retry(() => wd.click(selector)))

export const sleep = curry((wd, ms) => wd.pause(ms))
