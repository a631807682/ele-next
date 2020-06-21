import { App } from 'vue'
import Comp from './src/card.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Card = Comp
export * from './src/type'
