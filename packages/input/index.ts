import { App } from 'vue'
import Comp from './src/input.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Input = Comp
export * from './src/type'
