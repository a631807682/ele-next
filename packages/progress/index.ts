import { App } from 'vue'
import Comp from './src/progress.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Progress = Comp
export * from './src/type'
