import node from './node.js'
import browser from './browser.js'

var isBrowser = new Function('try {return this===window;}catch(e){ return false;}') // eslint-disable-line
var isNode = new Function('try {return this===global;}catch(e){return false;}') // eslint-disable-line

const config = [...(isNode() ? node : []), ...(isBrowser() ? browser : [])]

export default config
