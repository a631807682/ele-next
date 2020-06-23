import { App } from 'vue'
import Comp from './src/link.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Link = Comp
export * from './src/type'
