const fs = require('fs')
const render = require('json-templater/string')
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const endOfLine = require('os').EOL
const startOfLine = '  '.repeat(1)

const OUTPUT_PATH = path.join(__dirname, '../../src/index.ts')
const backlist = ['theme-chalk']

let packageNames = fs.readdirSync('./packages', 'utf-8')
let components = packageNames
  .filter((pn) => !backlist.includes(pn))
  .map((pn) => ({
    name: uppercamelcase(pn),
    package: pn,
  }))

const importComponents = components.map(({ name, package }) => {
  return `import { install as ${name} } from 'packages/${package}'`
})

const exportComponents = components.map(({ name, package }) => {
  return `export * from 'packages/${package}'`
})

const template = `
import { App, ref } from 'vue'
import { ElementUIOptions } from 'src/component'
{{importComponents}}

const components = [
  {{components}}
]

export const install = function (app: App, opts = {}) {
  components.forEach((comp)=>{
    app.use(comp)
  })

  const options = {
    ...ElementUIOptions,
    ...opts,
  }

  app.config.globalProperties.$ELEMENT = ref(options)
}

export const version = '{{version}}'
export * from 'src/component'
{{exportComponents}}
`

const code = render(template, {
  version: require('../../package.json').version,
  components: components.map((c) => c.name).join(',' + endOfLine + startOfLine),
  importComponents: importComponents.join(endOfLine),
  exportComponents: exportComponents.join(endOfLine),
})

fs.writeFileSync(OUTPUT_PATH, code)
// console.log('[build entry] DONE:', code)
