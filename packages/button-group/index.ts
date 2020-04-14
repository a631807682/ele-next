import { App } from 'vue'
import Comp from '../button/src/button-group.vue'
export const install = function(app: App) {
  app.component(Comp.name, Comp)
}

export const ButtonGroup = Comp
