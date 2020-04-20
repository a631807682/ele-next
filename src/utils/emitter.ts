import { getCurrentInstance, ComponentOptions } from 'vue'

export function dispatch(
  componentName: string,
  eventName: string,
  params: Array<any>
) {
  const instance = getCurrentInstance()
  if (!instance) return

  let parent = instance.parent || instance.root
  let name = (parent.type as ComponentOptions).name

  while (parent && (!name || name !== componentName)) {
    parent = parent.parent

    if (parent) {
      name = (parent.type as ComponentOptions).name
    }
  }
  if (parent) {
    parent.emit.apply(parent, [eventName].concat(params))
  }
}
