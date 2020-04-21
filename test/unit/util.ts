import * as Element from 'src/index'
import { mount } from '@vue/test-utils'
import {
  ComponentOptions,
  ComponentPublicInstance,
  render,
  h,
  createApp,
} from 'vue'

// TODO: duplicate start

export function createTest(
  Compo: new () => ComponentPublicInstance,
  propsData = {}
): Element {
  const root = document.createElement('div')
  render(h(Compo, propsData), root)
  return root.children[0]
}

export function createVue(option: ComponentOptions) {
  const root = document.createElement('div')
  const app = createApp(option)
  app.use(Element)
  app.mount(root)
  return root.children[0]
}

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
export const triggerEvent = function (elm, name, ...opts) {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent ? elm.dispatchEvent(evt) : elm.fireEvent('on' + name, evt)

  return elm
}

// TODO: duplicate end

/**
 * 等待 ms 毫秒，返回 Promise
 * @param {Number} ms
 */
export const wait = function (ms = 50) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

/**
 * 等待一个 Tick，代替 Vue.nextTick，返回 Promise
 */
export const waitImmediate = () => wait(0)

export function mountWithProps(
  originalComponent: any,
  props?: Record<string, any>
) {
  return mount(originalComponent, props ? { props: props } : {})
}

export function mountWithElement(originalComponent: any, options?: object) {
  const ElementPluginOption = {
    global: {
      plugins: [Element],
    },
  }

  return mount(originalComponent, {
    ...options,
    ...ElementPluginOption,
  })
}
