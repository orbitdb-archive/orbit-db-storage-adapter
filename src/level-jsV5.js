'use strict'

const upgradeKey = '__level-js__'
const upgradeValue = '5'

// upgrade level-js to version 5.0.0
// https://github.com/Level/level-js/blob/master/UPGRADING.md#500
async function upgrade (store, leveljs) {
  // return if already upgraded
  if (await isUpgraded(store)) { return }

  // upgrade store and persist that it was upgraded
  await new Promise((resolve, reject) => {
    leveljs.upgrade(function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
  await setUpgraded(store)
  console.log('level-js has been upgraded (v4 -> v5)')
}

const isUpgraded = async store => Number(await store.get(upgradeKey).catch(e => 0)) === Number(upgradeValue)

const setUpgraded = async store => store.put(upgradeKey, upgradeValue)

module.exports = {
  upgradeKey,
  upgradeValue,
  upgrade,
  setUpgraded,
  isUpgraded
}
