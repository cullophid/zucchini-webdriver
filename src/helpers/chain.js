export default () => {
  let promise = Promise.resolve()

  return (f, g) => {
    console.log('CHAIN');
    promise = promise.then(f, g)
    return promise
  }
}
