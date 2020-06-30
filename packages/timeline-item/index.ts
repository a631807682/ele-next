import { App } from 'vue'
import Comp from '../timeline/src/timeline-item.vue'
export const install = function (app: App) {
  app.component(Comp.name, Comp)
}

export const TimelineItem = Comp
