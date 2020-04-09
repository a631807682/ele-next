import { App } from "vue";
import Input from "./src/input.vue";
const install = function (app: App) {
  app.component(Input.name, Input);
};

export { install, Input };
