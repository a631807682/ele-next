import { App } from 'vue'
import Comp from './src/row'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Row = Comp
