import { App } from "vue";
import Comp from "./src/button.vue";
export const install = function (app: App) {
  app.component(Comp.name, Comp);
};

export const Button = Comp;
export * from "./src/type";
