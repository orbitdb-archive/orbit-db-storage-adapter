var isBrowser = new Function('try {return this===window;}catch(e){ return false;}') // eslint-disable-line
var isNode = new Function('try {return this===global;}catch(e){return false;}') // eslint-disable-line

if (isBrowser()) module.exports = require('./browser')
if (isNode()) module.exports = require('./node')
