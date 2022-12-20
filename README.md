# OrbitDB Storage Adapter

[![CircleCI](https://circleci.com/gh/orbitdb/orbit-db-storage-adapter/tree/master.svg?style=svg)](https://circleci.com/gh/orbitdb/orbit-db-storage-adapter/tree/master) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/orbitdb/Lobby) [![Matrix](https://img.shields.io/badge/matrix-%23orbitdb%3Apermaweb.io-blue.svg)](https://riot.permaweb.io/#/room/#orbitdb:permaweb.io) 

> A wrapper for abstract-leveldown compliant stores, used by OrbitDB

This is a tool that manages a persistent connection to an [`abstract-leveldown`](https://github.com/Level/abstract-leveldown) compliant store. The implementation tests indicate include examples for the following stores

- **[`leveldown`](https://github.com/Level/leveldown)**
- **[`memdown`](https://github.com/Level/memdown)**
- **[`level-js`](https://github.com/Level/level.js)**

[Help is wanted](https://github.com/orbitdb/orbit-db-storage-adapter/issues/3) to support more stores!

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
import leveldown from 'leveldown' // or any abstract-leveldown complaint store
import storageAdapter from 'orbit-db-storage-adapter')

const leveldownOptions = {}
const storage = storageAdapter(leveldown, leveldownOptions)

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

Pull requests and issues are welcome. Issues tagged with "[Help Wanted](https://github.com/orbitdb/orbit-db-storage-adapter/issues?q=is%3Aopen+is%3Aissue+label%3A"help+wanted")" will have the most impact.

## License 

[MIT](LICENSE) © Haja Networks Oy
