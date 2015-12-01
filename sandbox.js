const wd = require('wd')
const browser = wd.promiseRemote()
const options = {browserName: 'chrome'}

browser.init(options)
  .then(() => browser.get('http://app.sentia.io'))
