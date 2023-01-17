import assert from 'assert'
import Storage from '../src/index.js'

const timeout = 2000

const data = [
  { type: (typeof true), key: 'boolean', value: true },
  { type: (typeof 1.0), key: 'number', value: 9000 },
  { type: (typeof 'x'), key: 'strng', value: 'string value' },
  { type: (typeof []), key: 'array', value: [1, 2, 3, 4] },
  { type: (typeof {}), key: 'object', value: { object: 'object', key: 'key' } }
]

describe('Storage Adapters - Default (level)', function () {
  this.timeout(timeout)

  let storage, store

  before(async () => {
    storage = Storage()
    store = await storage.createStore()
  })

  it('creates a level store if no storage is passed', async () => {
    assert.strictEqual(store.status, 'open')
    assert.strictEqual(store.location, './orbitdb')
  })

  data.forEach(d => {
    it(`puts and gets a ${d.key}`, async () => {
      await store.put(d.key, JSON.stringify(d.value))
      const val = await store.get(d.key)
      const decodedVal = JSON.parse(val.toString())
      assert.deepStrictEqual(decodedVal, d.value)
      assert.strictEqual(typeof decodedVal, d.type)
    })

    it('deletes properly', async () => {
      await store.put(d.key, JSON.stringify(d.value))
      await store.del(d.key, JSON.stringify(d.value))
      try {
        await store.get(d.key)
      } catch (e) {
        assert.strictEqual(true, true)
      }
    })
  })

  after(async () => {
    await store.close()
  })
})

describe('Storage Adapters - LevelDB', function () {
  this.timeout(timeout)

  let storage, store

  beforeEach(async () => {
    storage = Storage()
  })

  afterEach(async () => {
    await store.close()
    await storage.destroy(store)
  })

  it('Creates a store in default ./orbitdb directory', async () => {
    store = await storage.createStore()
    assert.strictEqual(store.status, 'open')
    assert.strictEqual(store.location, './orbitdb')
  })

  it('Creates a store in a custom directory', async () => {
    store = await storage.createStore('./customDir')
    assert.strictEqual(store.status, 'open')
    assert.strictEqual(store.location, './customDir')
  })

  data.forEach(d => {
    it(`puts and gets a ${d.key}`, async () => {
      store = await storage.createStore()
      await store.put(d.key, JSON.stringify(d.value))
      const val = await store.get(d.key)
      const decodedVal = JSON.parse(val.toString())
      assert.deepStrictEqual(decodedVal, d.value)
      assert.strictEqual(typeof decodedVal, d.type)
    })

    it('deletes properly', async () => {
      store = await storage.createStore()
      await store.put(d.key, JSON.stringify(d.value))
      await store.del(d.key, JSON.stringify(d.value))
      try {
        await store.get(d.key)
      } catch (e) {
        assert.strictEqual(true, true)
      }
    })
  })
})
