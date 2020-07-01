import { App } from 'vue'
import Comp from './src/timeline.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Timeline = Comp
export * from './src/type'
