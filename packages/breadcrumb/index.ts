import { App } from 'vue'
import Comp from './src/breadcrumb.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const Breadcrumb = Comp
