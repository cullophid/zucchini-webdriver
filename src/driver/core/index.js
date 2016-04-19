import {curry} from 'ramda'

export const sleep = curry((wd, ms) => wd.pause(ms))
export const init = (wd) => () => wd.init()
export const end = (wd) => () => wd.end()
