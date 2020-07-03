import { App } from 'vue'
import Comp from './src/row.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Row = Comp
