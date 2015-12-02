import assert from 'assert'
import {
  init, end, visit,
  sleep, fill, click,
  assertText
} from '../src/driver'

const login = async (email, password) => {
  visit('/login')

  fill('[name=email]', email)
  fill('[name=password]', password)
  click('input[type=submit]')
  return assertText('h1', 'SentiaAnalytics')
}

describe('example', async () => {
  beforeEach(init)
  afterEach(() => end())

  it('should login', async () => {
    await login('andreas@sentia.io', 'password')
  })

  it('should show a working dashboard', async () => {
    login('andreas@sentia.io', 'password')
    visit('/')
    fill('#start-date-picker', '2015-11-01')
    fill('#end-date-picker', '2015-11-01')

    assertText('#total-people', '2,586')
    assertText('#total-revenue', '57,192.47')
    assertText('#basket-size', '49.82DKK')
    await assertText('#conversion', '44.39%')
  })
})
