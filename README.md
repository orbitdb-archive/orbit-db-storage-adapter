# OrbitDB Storage Adapter

> A wrapper for abstract-leveldown compliant stores, used by OrbitDB

[![CircleCI](https://circleci.com/gh/orbitdb/orbit-db-storage-adapter/tree/master.svg?style=svg)](https://circleci.com/gh/orbitdb/orbit-db-storage-adapter/tree/master)

This is a tool that manages a persistent connection to an [`abstract-leveldown`](https://github.com/Level/abstract-leveldown) compliant store. The implementation tests indicate include examples for the following stores

- TODO

Any other abstract-leveldown compliant store should work, and their integration 

OrbitDB uses it primarily with levelup (in node.js) and level-js (in the browser) and inside the orbit-db-keystore and orbit-db-cache packages.
