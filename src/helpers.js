const DEFAULT_TIMEOUT = 5000
export const chainFactory = () => {
  let promise = Promise.resolve()
  return (f) => (...args) => {
    promise = promise.then(() => f(...args))
    return promise
  }
}

export const waitFor = (f) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('TIMEOUT')
    }, DEFAULT_TIMEOUT)
    const test = () => {
      if (!timer) {
        return
      }
      Promise.resolve()
        .then(f)
        .catch(test)
        .then((e) => e === undefined ? Promise.reject() : e)
        .then((result) => {
          clearTimeout(timer)
          resolve(result);
        })
    }
    test();
  })
}
