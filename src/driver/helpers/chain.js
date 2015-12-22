const logError = (key) => (err) => {
  console.error(key, err)
  return Promise.reject(err)
}

export default () => {
  let promise = Promise.resolve()

  return (resolved, rejected) => {
    promise = promise.then(resolved, rejected)
    return promise
  }
}
