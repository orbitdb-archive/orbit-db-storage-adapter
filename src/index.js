import { Level } from 'level'
import * as fs from 'fs'

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

    // TODO: we can probably remove all of the below as they're related
    // to the older versions of leveldb
    this.preCreate = options.preCreate ? options.preCreate : () => {}

    const leveldownOptions = Object.assign({}, options, defaults)
    delete leveldownOptions.preCreate
    this.options = { down: leveldownOptions }
  }

  async createStore (directory = './orbitdb', options = {}) {
    // TODO: we can probably remove the two lines below as they're
    // related to older versions of leveldb
    this.options.up = options
    await this.preCreate(directory, this.options)

    if (!this.storage) {
      if (fs && fs.mkdirSync) fs.mkdirSync(directory, { recursive: true })
    }

    const db = new Level(directory, options)
    await db.open()

    return db
  }

  async destroy (store) {
    if (!this.storage || !this.storage.destroy) return

    await this.storage.destory(store._db.location)
  }

  async preCreate (directory, options) {} // to be overridden
}

export default (storage, options) => new Storage(storage, options)
