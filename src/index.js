const path = require("path")
const levelup = require('levelup')
const leveldown = require('leveldown')
const mkdirp = require('mkdirp')

// Should work for all abstract-leveldown compliant stores

class Storage {
  constructor (storage, mkdir) {
    this.storage = storage
  }

  createStore(directory = "./orbitdb", options = {}) {
    return new Promise((resolve, reject) => {
      const db = this.storage(directory, options)

      // For compatibility with older abstract-leveldown stores
      if (!db.status) db.status = "unknown-shim"
      if (!db.location) db.location = directory

      const store = levelup(db, options)
      store.open((err) => {
        if (err) {
          return reject(err)
        }
        // More backwards compatibility
        if (db.status === "unknown-shim") db.status = "open"
        resolve(store)
      })
    })
  }

  destroy(store) {
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


module.exports = (storageType) => {
  if(!storageType) storageType = leveldown
  return new Storage(storageType, mkdirp)
}
