import { App } from 'vue'
import Comp from './src/tag'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Tag = Comp
export * from './src/type'
