// Browser assertions
// Assertions wrap functions from the get module.
// in order to avoid race conditions the entire function er wrapped by retry
import R from 'ramda'
import {textNotFound, attrNotFound} from '../helpers/errors'
import {getText, getAttr} from '../get'

const check = R.curry((a, b) => a === b ? Promise.resolve(true) : Promise.reject(false))
const asserter = (f, expected) => () => f().then(check(expected))

export const assertText = R.curry((b, retry, selector, text) =>
    retry(asserter(() => getText(b, retry, selector), text))
    .catch(textNotFound(selector, text)))

export const assertAttr = R.curry((b, retry, selector, name, value) =>
  retry(asserter(() => getAttr(b, retry, selector, name), value))
    .catch(attrNotFound(selector, name, value)))
