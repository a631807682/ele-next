import { App } from 'vue'
import Comp from './src/input-number.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const InputNumber = Comp
// export * from './src/type'
