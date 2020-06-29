import { App } from 'vue'
import Comp from './src/col'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Col = Comp
