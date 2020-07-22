import { App } from 'vue'
import Comp from '../breadcrumb/src/breadcrumb-item.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const BreadcrumbItem = Comp
