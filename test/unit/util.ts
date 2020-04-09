import * as Element from "src/index";
import {
  ComponentOptions,
  ComponentPublicInstance,
  render,
  h,
  createApp,
} from "vue";

export function createTest(
  Compo: new () => ComponentPublicInstance,
  propsData = {}
): Element {
  const root = document.createElement("div");
  render(h(Compo, propsData), root);
  return root.children[0];
}

export function createVue(option: ComponentOptions) {
  const root = document.createElement("div");
  const app = createApp(option);
  app.use(Element);
  app.mount(root);
  return root.children[0];
}

/**
 * 等待 ms 毫秒，返回 Promise
 * @param {Number} ms
 */
export const wait = function (ms = 50) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

/**
 * 等待一个 Tick，代替 Vue.nextTick，返回 Promise
 */
export const waitImmediate = () => wait(0);
