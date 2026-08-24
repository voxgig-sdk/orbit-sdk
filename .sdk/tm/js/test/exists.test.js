
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { OrbitSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OrbitSDK.test()
    equal(null !== testsdk, true)
  })

})
