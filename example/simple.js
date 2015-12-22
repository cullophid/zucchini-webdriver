import zwd from '../src/'
const b = zwd()

const f = async () => {

  b.init()
  b.visit('http://www.w3schools.com/')
  b.assertText('h1', 'HTML')
  b.sleep(2)
  b.end()
  b.chain(() => console.log('success'), (err) => {
    console.log('Failed')
    console.log(err.stack)
    b.kill()
      .then(() => process.exit(1))
  })
}
f()
  .catch((err) => console.log('ERR', err));
