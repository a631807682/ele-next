import { App } from 'vue'
import Comp from './src/alert.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Alert = Comp
export * from './src/type'
