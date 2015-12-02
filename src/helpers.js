const DEFAULT_TIMEOUT = 5000
// create a chain function
// this can be used to chain functions onto
// a promise without having to call '.then(...)'
export const chainFactory = () => {
  let promise = Promise.resolve()
  return (f) => (...args) => {
    promise = promise.then(() => f(...args))
    return promise
  }
}

const delay = (ms, f) => (...args) => setTimeout(() => f(...args), ms);

// waitUntil keeps retrying a premise (Function)
// until the given number of ms has passed
export const waitUntil = (ms) => (premise) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject('Timeout'), ms)
    const testPremise = () => {
      return Promise.resolve()
        .then(premise)
        .then((v) => v === undefined ? Promise.reject(v) : v)
        .then((v) => {
          clearTimeout(timer)
          resolve(v)
        })
        .catch(delay(100, testPremise))
    }
    testPremise()
  })
}
