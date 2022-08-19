'use strict'

const levelup = require('levelup')
const level = require('level')
const fs = (typeof window === 'object' || typeof self === 'object') ? null : eval('require("fs")') // eslint-disable-line

// Should work for all abstract-leveldown compliant stores

/*
 * createIfMissing (boolean, default: true): If true, will initialise an empty database at the specified location if one doesn't already exist. If false and a database doesn't exist you will receive an error in your open() callback and your database won't open.
 *
 * errorIfExists (boolean, default: false): If true, you will receive an error in your open() callback if the database exists at the specified location.
 *
 * compression (boolean, default: true): If true, all compressible data will be run through the Snappy compression algorithm before being stored. Snappy is very fast and shouldn't gain much speed by disabling so leave this on unless you have good reason to turn it off.
 *
 * cacheSize (number, default: 8 * 1024 * 1024 = 8MB): The size (in bytes) of the in-memory LRU cache with frequently used uncompressed block contents.
 */

class Storage {
  constructor (storage, options = {}) {
    const defaults = {
      createIfMissing: true,
      errorIfExists: false,
      compression: true,
      cacheSize: 8 * 1024 * 1024
    }

    this.storage = storage
    this.preCreate = options.preCreate ? options.preCreate : () => {}

    const leveldownOptions = Object.assign({}, options, defaults)
    delete leveldownOptions.preCreate
    this.options = { down: leveldownOptions }
  }

  async createStore (directory = './orbitdb', options = {}) {
    this.options.up = options
    await this.preCreate(directory, this.options)
    let store, db

    if (this.storage) {
      db = this.storage(directory, this.options.down)

      // For compatibility with older abstract-leveldown stores
      if (!db.status) db.status = 'unknown-shim'
      if (!db.location) db.location = directory

      store = levelup(db, options)
      await store.open() // TODO: Is this necessary? https://www.npmjs.com/package/levelup says it is only necessary when reopening a closed db.

      // More backwards compatibility

      db.status = db && db.status === 'unknown-shim' ? 'open' : db.status

      return store // should this not be db?
    } else {
      // Default leveldown or level-js store with directory creation
      if (fs && fs.mkdirSync) fs.mkdirSync(directory, { recursive: true })

      const db = level(directory, options)
      await db.open()

      return db
    }
  }

  async destroy (store) {

    if (!this.storage.destory) return

    await this.storage.destory(store._db.location)

    return

  }

  async preCreate (directory, options) {} // to be overridden
}

module.exports = (storage, options) => new Storage(storage, options)
