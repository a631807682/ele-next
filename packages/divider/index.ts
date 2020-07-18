import { App } from 'vue'
import Comp from './src/divider.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Divider = Comp
export * from './src/type'
