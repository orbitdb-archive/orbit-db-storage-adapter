# OrbitDB Storage Adapter

> A wrapper for abstract-leveldown compliant stores, used by OrbitDB

[![CircleCI](https://circleci.com/gh/orbitdb/orbit-db-storage-adapter/tree/master.svg?style=svg)](https://circleci.com/gh/orbitdb/orbit-db-storage-adapter/tree/master)

This is a tool that manages a persistent connection to an [`abstract-leveldown`](https://github.com/Level/abstract-leveldown) compliant store. The implementation tests indicate include examples for the following stores

- **[`leveldown`](leveldown)**
- **[`level-js`](level-js)**
- **[`jsondown`](jsondown)**
- **[`mongodown`](mongodown)**
- **[`sqldown`](sqldown)**
- **[`fruitdown`](fruitdown)**
- **[`localstorage-down`](localstorage-down)**
- **[`redisdown`](redisdown)**
- **[`localdown`](localdown)**

Help is wanted to support more stores!

OrbitDB uses it primarily with levelup (in node.js) and level-js (in the browser) and inside the orbit-db-keystore and orbit-db-cache packages.

## Install

Leveldown is used as an example here, but you could install any abstract-leveldown complaint store.

```JavaScript
npm install orbit-db-storage-adapter leveldown
```

## Usage

Usage is the same on the command line or in the browser. `async`/`await` used for brevity.

```JavaScript
// Requirements
const Storage = require('orbit-db-storage-adapter')
const leveldown = require('leveldown') // or any abstract-leveldown complaint store

const leveldownOptions = {}
const storage = new Storage(leveldown, leveldownOptions) // These options passed to leveldown factory 

const levelupOptions = {} // see below
store = await storage.createStore(location, levelupOptions) // These options passed to levelup instance
// ***
// Do stuff with the store here: get, put, delete, batch, etc
// **
await store.close()
await storage.destroy(store)
```

### Options

When setting everything up, you have the opportunity to pass two sets of options: one for the `leveldown` instantiation, and the other for the `levelup` instantiation.
 
## Contributing

Pull requests and issues are welcome. Issues tagged with "Help Wanted" will have the most impact.

## License 

MIT © Haja Networks Oy
