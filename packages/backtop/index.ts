import { App } from 'vue'
import Comp from './src/backtop.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Backtop = Comp
