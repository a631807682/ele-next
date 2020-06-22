import { App } from 'vue'
import Comp from './src/badge.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Badge = Comp
export * from './src/type'
