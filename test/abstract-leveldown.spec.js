// TODO: Activate these. As it stands right now a lot of the leveldown stores don't
// pass these tests. It's not exactly "our job," and also orbit-db-storage adapter
// doesn't directly output a leveldown store to be used here. However! They are
// very helpful in seeing the cracks in the stores and would be great to get these passing

// const test = require('tape')
// const tempy = require('tempy')
// const suite = require('abstract-leveldown/test')
// const implementations = require('./implementations')
//
// const Storage = require("..")
//
// implementations.forEach(async (implementation) => {
//   await suite({
//     test: test,
//     factory: function () {
//       return new implementation.module(tempy.directory())
//     }
//   })
// })
