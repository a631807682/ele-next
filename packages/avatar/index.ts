import { App } from 'vue'
import Comp from './src/avatar.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Avatar = Comp
export * from './src/type'
