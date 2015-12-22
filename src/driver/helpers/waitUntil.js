import R from 'ramda'

const delay = (ms, f) => (...args) => setTimeout(() => f(...args), ms)

// waitUntil keeps retrying a premise (Function)
// until the given number of ms has passed
export default R.curry((ms, premise) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('Timeout')
    }, ms)
    const testPremise = () => {
      return Promise.resolve()
        .then(premise)
        .then((v) => R.isNil(v) ? Promise.reject(v) : v)
        .then((v) => {
          clearTimeout(timer)
          resolve(v)
        })
        .catch(delay(100, testPremise))
    }

    testPremise()
  })
})
