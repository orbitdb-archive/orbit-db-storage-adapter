var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
var isNode=new Function("try {return this===global;}catch(e){return false;}");

if(isBrowser()) module.exports = require('./browser')
if(isNode()) module.exports = require('./node')
