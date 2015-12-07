import assert from 'assert'
import driver from '../dist'

const {
  init, end, visit,
  sleep, fill, click,
  find, assertText
} = driver()

const host = "http://airbnb.com";
const go = (path = '') => visit(host + path)

describe('example', async () => {
  beforeEach(init)
  afterEach(() => end())

  it('should find an airbnb in london', async () => {
    await go()
    fill('#location', 'London')
    fill('#checkin', '12-12-2015')
    fill('#checkout', '14-12-2015')
    click('#submit_location')
    await find('#docked-filters')
  })

})
