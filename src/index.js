import driverFactory from './driver'
import {merge} from 'ramda'

const DEFAULTS = {
  timeout: 5000,
  browser: 'chrome'
}

export default (options) => {
  return driverFactory(merge(DEFAULTS, options || {}))
}
