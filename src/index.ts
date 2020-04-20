import { App } from 'vue'
import { ElementUIOptions } from 'src/component'
import { install as Button } from 'packages/button'
import { install as ButtonGroup } from 'packages/button-group'
import { install as Icon } from 'packages/icon'
import { install as Input } from 'packages/input'
import { install as InputNumber } from 'packages/input-number'

const components = [Button, ButtonGroup, Icon, Input, InputNumber]

export const install = function (app: App, opts = {}) {
  components.forEach((comp) => {
    app.use(comp)
  })

  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  }
}

export const version = 'v0.0.0-alpha.0'
export * from 'src/component'
export * from 'packages/button'
export * from 'packages/button-group'
export * from 'packages/icon'
export * from 'packages/input'
export * from 'packages/input-number'
