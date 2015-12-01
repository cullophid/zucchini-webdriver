import assert from 'assert'
import {
  init, end, visit, sleep,
  fill, click, assertText,
  exists, find, getText
} from '../src/driver';


describe('example', async () => {
  beforeEach(init)
  afterEach(end)

  it('should login', async () => {
    await visit('/login')

    await fill('[name=email]', 'andreas@sentia.io')
    await fill('[name=password]', 'password')
    await click('input[type=submit]')
    await assertText('h1', 'SentiaAnalytics')
  })
})
