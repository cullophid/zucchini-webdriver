import webdriverio from 'webdriverio'

const HOST = 'http://app.sentia.io'
const DEFAULT_TIMEOUT = 5000
const options = {desiredCapabilities: { browserName: 'chrome' }}
const client = webdriverio.remote(options)

let browser;

export const init = () =>
  browser = client.init().url(HOST)

export const end = () =>
  browser.end()

export const visit = (path) =>
  browser.url(HOST + path)

export const fill = (selector, value) =>
  browser
    .waitForExist(selector, DEFAULT_TIMEOUT)
    .setValue(selector, value)

export const click = (selector) =>
  browser
    .waitForExist(selector, DEFAULT_TIMEOUT)
    .click(selector)

export const exists = (selector) =>
    browser.waitForExist(selector, DEFAULT_TIMEOUT)

export const getText = (selector) =>
  browser
    .waitForExist(selector, DEFAULT_TIMEOUT)
    .getText(selector)


export const find = (selector) =>
  browser
    .waitForExist(selector, DEFAULT_TIMEOUT)
    .element(selector)

export const assertText = (selector, text) =>
  browser
    .waitUntil(async () =>
      await getText(selector) === text,DEFAULT_TIMEOUT)
