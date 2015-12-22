import R from 'ramda'
import {elementNotFound} from '../helpers/errors'

export const find = R.curry((browser, retry, selector) =>
  retry(() => browser.elementByCss(selector))
    .catch(elementNotFound(selector)))

export const getText = R.curry(async (browser, retry, selector) => {
  const e = await find(browser, retry, selector)
  const text = await e.text()
  console.log('TEXT', text);
  return e.text()
})

export const getAttr = R.curry(async (browser, retry, selector, attr) => {
  const e = await find(browser, retry, selector)
  return e.getAttribute(attr)
})

export const isSelected = R.curry(async (browser, retry, selector) => {
  console.log('IS SELECTED');
  const e = await find(browser, retry, selector)
  return e.isSelected()
})
