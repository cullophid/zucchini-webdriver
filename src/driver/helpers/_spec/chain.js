import assert from 'assert'
import chainFactory from '../chain'

describe('chain', () => {
  it('should chain resolved promises', () => {
    const chain = chainFactory()

    chain(() => Promise.reject('chain error'))
    chain(() => Promise.reject('err'))

    return chain(() => {
      throw new Error('failed to throw error')
    }, (err) => {
      console.log(err)
      assert.equal(err, 'chain error')
    })
  })

  it('should chain rejected promises', () => {
    const chain = chainFactory()

    chain(() => Promise.reject('chain error'))
    chain(null, () => Promise.reject('processed err'))

    return chain(() => {
      throw new Error('failed to throw error')
    }, (err) => {
      console.log(err)
      assert.equal(err, 'processed err')
    })
  })

})
