import { App } from 'vue'
import Comp from './src/col.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Col = Comp
