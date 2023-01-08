const isBrowser = new Function('try {return this===window;}catch(e){return false;}') // eslint-disable-line
const isNode = new Function('try {return this===global;}catch(e){return false;}') // eslint-disable-line

export default async () => {
  let module
  if (isBrowser()) {
    const m = await import('./browser.js')
    module = await m.default
  } else {
    const m = await import('./node.js')
    module = await m.default
  }

  return module
}
