import driverFactory from './driver'
import R from 'ramda'

const DEFAULTS = {
  timeout: 5000,
  browser: 'chrome'
}

export default (options) => {
  return driverFactory(R.merge(DEFAULTS, options || {}))
}
