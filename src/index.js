'use strict'

const levelup = require('levelup')

// Should work for all abstract-leveldown compliant stores

class Storage {
  constructor (storage, options) {
    this.storage = storage
    this.leveldownOptions = options
  }

  createStore (directory = './orbitdb', options = {}) {
    return new Promise((resolve, reject) => {
      const db = this.storage(directory, this.leveldownoptions)

      // For compatibility with older abstract-leveldown stores
      if (!db.status) db.status = 'unknown-shim'
      if (!db.location) db.location = directory

      const store = levelup(db, options)
      store.open((err) => {
        if (err) {
          return reject(err)
        }
        // More backwards compatibility
        if (db.status === 'unknown-shim') db.status = 'open'
        resolve(store)
      })
    })
  }

  destroy (store) {
    return new Promise((resolve, reject) => {
      // TODO: Clean this up
      if (!this.storage.destroy) resolve()

      this.storage.destroy(store._db.location, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }
}

module.exports = (storage, options) => new Storage(storage, options)
